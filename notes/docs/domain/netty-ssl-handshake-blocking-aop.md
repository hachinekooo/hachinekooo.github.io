---
title: 一次厂商 SDK 异常导致的永久线程阻塞：Netty SSL 握手与 @Async 失效复盘
icon: file
order:
date: 2025-09-08
category:
  - Java
  - 生产问题
tags:
  - Netty
  - SSL
  - CountDownLatch
  - Async
  - AOP
---
一次生产事故复盘：因厂商 SDK 对 SSL 握手与异常释放处理不当，叠加切面中 @Async 自调用导致异步失效，引发线程长期阻塞。文章还分析 Netty 连接池与握手时机、CountDownLatch 使用风险及修复方案。
<!-- more -->

这是一次因厂商 `SDK` 异常处理机制不完善导致的永久线程阻塞问题。

其中主要的责任：
- 厂商 `SDK` 的存证 `save` 方法中，异常处理机制不完善。
- 没有妥善的释放等待资源

次要的自身责任：
- 切面中方法中编写的 `asyncCallBlockchainSDK` 方法异步未能正常生效，导致调用时实际上是同步调用，若其中有任何地方卡住，讲导致加了存证注解的方法速速变慢，或一直卡住无法正常处理业务。

## 1.问题概述 (Problem Summary)

系统上线后，生产上的预警消息开始发生一些异常行为，并且加了存证注解的业务方法变慢。

## 2.排查过程 (Investigation Process)


1. 首先拉取生产上对应服务的日志到本地，方便查看

```shell
sftp root@10.100.100.100
get /home/logs/xxx-server/xxx-server.log
```


```log
2025-09-05 09:31:47.536 | INFO | http-nio-48084-exec-4 | BlockchainAspect | 开始处理区块链存证，businessType: system_warning
2025-09-05 09:31:47.536 | INFO | http-nio-48084-exec-4 | SystemWarningDataExtractor | 开始提取预警消息存证数据: {
  ....
}

2025-09-05 09:31:47.647 | INFO | http-nio-48084-exec-4 | BlockchainCertifyService | 保存区块链存证记录成功，id: 9, businessType: system_warning, businessId: 2971
2025-09-05 09:31:47.647 | INFO | http-nio-48084-exec-4 | BlockchainAspect | 添加非结构化数据到存证请求: fileName=xxx, filePath=xxxx
2025-09-05 09:31:47.648 | INFO | http-nio-48084-exec-4 | BlockchainAspect | 开始调用区块链SDK存证, recordId: 9, request: {
    "asyncFlag":true,
    "structData":{
        ...
    },
    "unStructDataList":[{
        ...
    }]
}
2025-09-05 09:31:47.648 | INFO | http-nio-48084-exec-4 | RealBankSDKClientWrapper | 调用真实区块链SDK进行存证

2025-09-05 09:31:47.657 | INFO | mnioEventLoopGroup-5-8 ChannelPoolDataHandler | channelCreated. Channel ID：【27ec4ba9】

2025-09-05 09:31:47.672 | INFO | mnioEventLoopGroup-5-8  ChannelPoolDataHandler | channelAcquired. Channel ID：【27ec4ba9】

2025-09-05 09:31:47.673 | INFO | mnioEventLoopGroup-6-3 ChannelPoolFileHandler | channelAcquired. Channel ID：【b5e51ed8】

2025-09-05 09:31:47.675 | INFO | mnioEventLoopGroup-6-3 ChannelPoolFileHandler | channelReleased. Channel ID：【b5e51ed8】

2025-09-05 09:31:47.678 | INFO | mnioEventLoopGroup-5-8 ChannelPoolDataHandler | channelReleased. Channel ID：【27ec4ba9】

2025-09-05 09:31:47.687 | INFO | mnioEventLoopGroup-5-8 DataHandler | 客户端结构化数据执行异常，原因：【{}】

io.netty.handler.codec.DecoderException: javax.net.ssl.SSLHandshakeException: General SSLEngine problem

其它业务爆出异常...
```

2. 收集了生产上的配置信息
- 生产环境中使用了对接厂商给的生产环境需要用区块链存证 IP
- 生产环境使用的证书是测试时所用的证书

根据配置信息与日志报错 `General SSLEngine problem` ，我猜测，应该就是配置与证书不匹配的问题导致的。顺着这个大方向，我们进一步排查 `SDK` 行为。

业务系统存证关键代码：

```java
@AfterReturning // 在业务方法完成后执行
public void afterMethod(JoinPoint joinPoint) {
	log.info("开始处理区块链存证，businessType: {}", xxx.businessType());
	// ...
  	asyncPreserveData(record);
}

@Async
public void asyncPreserveData(DataRecordDO record) {
    try {
        // 构建数据处理请求
        DataRequest dataRequest = buildDataRequest(record);
        
        log.info("开始调用区块链SDK存证, recordId: {}, request: {}", record.getId(), JSON.toJSONString(preserveRequest));
        
        // 调用数据处理服务
        DataResponse response = dataProcessingClient.saveData(dataRequest);
        
        log.info("区块链SDK返回结果, recordId: {}, response: {}", record.getId(), JSON.toJSONString(response));
     
        // 更新记录状态
        updateRecordStatus(record, response);
        
    } catch (Exception e) {
        log.error("区块链存证失败, recordId: {}", record.getId(), e);
        recordService.updateRecordAsFailed(record.getId(), e.getMessage());
    }
}

private DataRequest buildDataRequest(DataRecordDO record) {
    // 根据记录构建请求参数
    return DataRequest.builder()
            .recordId(record.getId())
            .structuredData(record.getStructuredContent())
            .unstructuredData(record.getUnstructuredContent())
            .asyncFlag(true);
            .retryCount(DEFAULT_RETRY_COUNT)
            .build();
}
```

SDK 关键代码（简化后）：

```java
public DataResponse saveData(DataRequest request) {
    try {
        // 根据数据类型确定需要等待的任务数量
        int taskCount = request.hasUnstructuredData() ? 2 : 1;
        CountDownLatch latch = new CountDownLatch(taskCount);
        
        // 异步处理结构化数据
        Future<Result> structuredTask = processStructuredData(request, latch);
        
        // 异步处理非结构化数据（如果存在）
        Future<Result> unstructuredTask = null;
        if (request.hasUnstructuredData()) {
            unstructuredTask = processUnstructuredData(request, latch);
        }
        
        // 等待所有任务完成
        latch.await();
        
        // 组装响应结果
        return buildResponse(structuredTask, unstructuredTask);
        
    } catch (Exception e) {
        logger.error("数据处理失败", e);
        return handleError(e);
    }
}
```

刚看到这份代码的时候，我觉得乍一看觉得挺有意思的，用到了我之前被八股文背过的 `CountDownLatch`，而且我大概翻了翻压根没看到 `DataRequest` 中 `AsyncFlag` 属性的使用，saveData 方法本身还是同步阻塞的......，`await()` 让调用线程一直等到所有任务完成。我还以为 `AsyncFlag` 为 `true`，可以让 `saveData` 方法直接返回，有可能这个标志是控制了其它的处理逻辑吧。

然后我就开始怀疑，如果报错抛异常，会不会没有处理好，导致 latch 没有自减，导致 `latch` 用于大于 `0`，`saveData` 无限期卡死啊？然后我就开始顺着看线程 `ID` 这块，仔细一缕，才发现，哈哈！`asyncPreserveData` 方法没有正确启用异步，`asyncPreserveData` 依然是在 `http-nio-48084-exec-4` 中执行：

```
http-nio-48084-exec-4 | BlockchainAspect | 开始处理区块链存证，businessType: system_warning

http-nio-48084-exec-4 | BlockchainAspect | 开始调用区块链SDK存证, recordId: xxx, request: xxx
```

这个是因为在类内部调用，调用时没有走代理，导致 `@Async` 注解没有正常生效。排查至此，我基本确定了是 `asyncPreserveData` 方法中调用的 `saveData` 有问题，导致 `asyncPreserveData` 卡死，再加上 `asyncPreserveData` 不是在新线程执行的，导致整个切面逻辑被卡死。


```java
Long messageId = warningAopService.createWarningMessage(bean);  
bean.setId(messageId);  
saveAlgoMsg(bean,JSON.toJSONString(params));
```

```java
@Slf4j
@Service
public class WarningAopServiceImpl implements WarningAopService{
    @Resource
    private WarningMessageMapper warningMessageMapper;
    @Override
    @Certify(
            businessType = "system_warning",
            description = "预警消息"
    )
    public Long createProjectWarningMessage(WarningMessageSaveReqVO createReqVO) {
        WarningMessageDO warningMessage = BeanUtils.toBean(createReqVO, WarningMessageDO.class);
       
        warningMessageMapper.insert(warningMessage);
        createReqVO.setId(warningMessage.getId());
        return warningMessage.getId();
    }
}
```

而我们又知道，AOP的基本原理是“动态代理”，无论是 `JDK` 动态代理还是 `CGLib`，生成的代理类中的代理方法结构无非就是这样：

```java
{
	advice.before();
	Object result = method.invoke(waiter, objects);
	advice.after();
	
	return result;
}
```


增强逻辑与被增强方法，同处一个方法中，是链式的关系，这确保了增强逻辑并不会改变原有方法的语意。

知晓这一点之后，我们便可得知，如果其中有任何一个步骤卡住，方法便会堵塞。综上 `SDK#saveData` 方法分析与 `AOP` 原理，我们便会得知，如果 `saveData` 方法卡住，业务系统中会在 `warningAopService.createWarningMessage` 这里卡住，一直卡住，直到被 `Tomcat` 回收机制处理，当然后续的 `saveAlgoMsg` 也不会得到正确执行。其它线程处理业务时，就可能发现，有些数据不完整，从而执行失败。

## 3.解决方案 (Solution)

分析到现在，答案已经很明显了

我们这边只需要确保 `asyncPreserveData` 是异步执行就可以，自己注入并调用一下自己：

```java
@Lazy   // 避免循环依赖  
@Autowired  
private BlockchainAspect self;

...
self.asyncPreserveData(record);
```


如此以来，当执行切面增强逻辑，执行到 `asyncPreserveData`，便会开启新的 `TASK-X` 线程执行，然后切面增强逻辑继续往后走，正常结束，`warningAopService.createWarningMessage` 也正常返回。


为了完整复现生产环境的问题，我手动编写了一个 `MockClient`，模拟 `saveData` 的行为。

根据生产日志，我们推测 `Netty` 的行为是先先入池 --> 后握手（`Netty` 默认情况是入池之前要先握手成功）

```log
2025-09-05 09:31:47.657 | INFO | mnioEventLoopGroup-5-8 ChannelPoolDataHandler | channelCreated. Channel ID：【27ec4ba9】

2025-09-05 09:31:47.672 | INFO | mnioEventLoopGroup-5-8  ChannelPoolDataHandler | channelAcquired. Channel ID：【27ec4ba9】

2025-09-05 09:31:47.673 | INFO | mnioEventLoopGroup-6-3 ChannelPoolFileHandler | channelAcquired. Channel ID：【b5e51ed8】

2025-09-05 09:31:47.675 | INFO | mnioEventLoopGroup-6-3 ChannelPoolFileHandler | channelReleased. Channel ID：【b5e51ed8】

2025-09-05 09:31:47.678 | INFO | mnioEventLoopGroup-5-8 ChannelPoolDataHandler | channelReleased. Channel ID：【27ec4ba9】

SSL握手失败
```

模拟代码（简化后）：

```java
@PostMapping("/test")
public CommonResult<Map<String, Object>> testWarningMessageWithBlockchain() {
    log.info("=== 开始测试 ===");
    
    Map<String, Object> result = new HashMap<>();
    long startTime = System.currentTimeMillis();
    
    try {
        // 1. 构造测试数据
        WarningMessageSaveReqVO createReqVO = createWarningMessage();
        log.info("构造测试数据完成: {}", createReqVO);
        
        // 2. 调用创建预警消息方法
        log.info("开始调用 createWarningMessage 方法...");
        long startTime = System.currentTimeMillis();
        
        Long msgId = warningAopService.createWarningMessage(createReqVO);
        
        long endTime = System.currentTimeMillis();
        log.info("warningMessage 方法执行完成, msgId: {}, 耗时: {}ms", 
                msgId, (endTime - startTime));
        
        log.info("=== 测试完成，msgId: {}, 总耗时: {}ms ===", msgId, (System.currentTimeMillis() - startTime));
        
    } catch (Exception e) {
        log.error("发生异常", e);
        ...
    }
    
    return success(result);
}

@Override  
public DataResponse save(DataRequest dataRequest) {  
    log.info("调用Mock区块链SDK进行存证");  

    int latchCount = dataRequest.getUnStructDataList() != null && dataRequest.getUnStructDataList().size() > 0 ? 2 : 1;  
    CountDownLatch latch = new CountDownLatch(latchCount);  
	return simulateSSLFailure(dataRequest, latch);  
}

/**
 * 模拟SSL失败且不调用 countDown
 */
private DataResponse simulateSSLFailure(DataRequest dataRequest, CountDownLatch latch) {
    log.info("模拟 SSL 失败且不调用 countDown 情况");
    
    // 模拟厂商SDK的异步处理逻辑
    nettyThreadPool.submit(() -> {
        try {
            // 模拟通道创建和获取
            simulateChannelOperations();
            
            // 数据传输开始
                    
            // 模拟SSL握手异常
            simulateSSLHandshakeFailure();
            
            log.info("SSL握手失败（不调用 countDown）");
            
        } catch (Exception e) {
            log.error("Mock 异常", e);
            // 就算有异常，这里也不调用countDown
        }
    });
}

/**  
 * 模拟SSL握手失败  
 */  
private void simulateSSLHandshakeFailure() {  
    log.info("客户端结构化数据执行异常，原因：【{}】", "javax.net.ssl.SSLHandshakeException: General SSLEngine problem");  
    // 不调用countDown
}
```



触发模拟的 SDK 方法，首先我们能看到这个接口一直会卡住，一直转圈圈，接着我们可以使用 `arthas` 查看线程情况，可以观察到一直 `WAITING` 的 HTTP 线程:

```
java -jar arthas-boot.jar

[arthas@76191]$ dashboard 
ID   NAME                           GROUP          PRIORITY   STATE     %CPU      DELTA_TIM TIME       INTERRUPT DAEMON    
207  DestroyJavaVM                  main           5          RUNNABLE  0.0       0.000     0:20.495   false     false     
-1   C1 CompilerThread3             -              -1         -         0.0       0.000     0:2.029    false     true      
177  http-nio-48084-exec-6          main           5          WAITING   0.0       0.000     0:1.604    false     true      
172  http-nio-48084-exec-1          main           5          WAITING   0.0       0.000     0:0.620    false     true      
-1   VM Thread                      -              -1         -         0.0       0.000     0:0.380    false     true      
-1   GC task thread#6 (ParallelGC)  -              -1         -         0.0       0.000     0:0.269    false     true      
-1   GC task thread#4 (ParallelGC)  -              -1         -         0.0       0.000     0:0.269    false     true      
```

最终实测，`asyncPreserveData` 方法异步执行后，没有再出现异常情况。即使执行 `asyncPreserveData` 的线程阻塞被回收，那也没关系，定时任务会查询失败/处理中的存证记录，重新尝试推送。

## 4.经验总结 (Lessons Learned)
- 上线生产要使用正确的生产配置，对面使用测试配置、测试配置与生产配置混着用的情况
- 注意 `@Async` 的使用姿势，避免内部类直接调用。
- 切面中合理使用异步操作，避免某些操作堵塞，导致卡死，影响正常的业务流程。
- 切面类中过处理好异常的捕获，不要让切面逻辑中的异常影响被增强的业务方法，增强逻辑应该是无感的、透明的。


这本应该是一个极小概率才能发生的问题，那天却发生了：
- 生产用了错误的测试证书但是用了正确生产 IP
- `asyncPreserveData` 的异步执行刚好没生效
- 厂商SDK的 SSL 异常处理的地方资源释放逻辑刚好有问题

PS：上线不是我负责的哈，是另外一个同事，问题发生之后，我觉的这是个非常难得的机会啊，我觉得深入排查一下，还好也是顺利解决了问题，也学到了不少东西🤣