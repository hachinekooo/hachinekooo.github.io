---
title: 两分钟让你入门 SpringBoot Test，书写自己的测试类
icon: file
order:
date: 2025-09-26
category:
  - Java
tags:
  - 测试
  - SpringBoot
  - Mock
---
## 什么是 @MockBean

Mock 这个单词本身就有：`adj. 仿制的；模拟的` 的意思，所以见词知意，就是用于模拟测试的一个东西。  
`@Mock` 是 Mockito 框架提供的注解，可以在 Maven 项目中引入使用。  
而 @MockBean 和 @Mock 差不多，但是支持了 SpringBoot

## 一句话点拨出 MockBean 的核心作用

### 模拟行为并统计 

一旦使用` @MockBean` 标注某个依赖，这个依赖就会被完全替换为一个 “模拟对象”。它仅实现了接口的方法签名，但**没有任何业务逻辑**。如果不通过 `when()` 预设行为，模拟对象就不知道该返回什么，只能返回 `Java` 类型的默认值

当我们使用了 `MockBean` 标注了依赖之后，使用这个依赖的时候会自动记录各种信息：

- 哪个方法被调用了 Which methods were called
- 方法被调用了多少次 How many times they were called
- 传递给方法的参数信息 What parameters were passed
- 方法是什么时候被调用的 When they were called

```java
```java
@MockBean
private CertifyEngine certifyEngine;
@MockBean
private BlockchainConfig blockchainConfig;


// 你可以定义模拟的行为要做什么 You define what the mock should do when called
when(blockchainConfig.isEnabled()).thenReturn(true);
when(certifyEngine.certify(any())).thenReturn(CompletableFuture.completedFuture(mockResult));

// 在运行代码之后，你可以检查方法的运行情况 After your code runs, you can check:
verify(certifyService, times(1)).saveCertifyData(any(), any()); // 调用一次？Called once?
verify(certifyService, never()).deleteData(); // 验证是否没调用过这个方法 Never called?
```


基本原理是代理，动态生成一个代理对象，当测试代码调用 Mock 对象的方法时，框架会拦截这个调用，不会执行真实对象的逻辑。

## 什么是 @SpyBean

部分方法模拟，部分方法调用真实逻辑

使用 `Spring Boot` 测试注解 `@SpyBean` 或 `Mockito` 的 `@Spy` 注解，它们的特性是：
- 默认会调用真实对象的方法
- 可以通过 `when().thenReturn()` 对特定方法进行模拟控制
- 未被控制的方法仍会执行真实逻辑

```java
@SpyBean
private CertifyService certifyService;

// 测试方法中
@Test
void test() {
    // 对需要控制的方法进行模拟
    when(certifyService.verify(anyString())).thenReturn(new CertResult(false));
    
    // 未被模拟的方法会调用真实逻辑
    int count = certifyService.getCount(); // 执行真实的 getCount() 方法
}
```

### 总结
- `@MockBean`：完全替换为模拟对象，所有方法默认返回空值，需显式配置才返回指定结果
- `@SpyBean`：基于真实对象创建代理，默认执行真实方法，可选择性模拟部分方法