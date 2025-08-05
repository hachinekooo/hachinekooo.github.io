---
title: 解决 Spring Boot 微服务注册到错误 IP 地址的问题
icon: file
order: 
date: 2025-07-16
category: 
tags:
  - SpringBoot
  - SpringCloud
  - Nacos
  - 微服务
  - 网络配置
  - APIPA
  - 服务注册
  - inetutils
  - 故障排查
  - 网络接口
---
## 场景

不知道是不是因为哪个软件内存泄露，感觉我的电脑卡卡的（我怀疑是 Easy Connect，最近一直想把它卸载，换用 Docker 的方式安装）。于是我就重启了一下，重启之后，我重新启动 Spring Boot 微服务项目，结果发现前端无法正常请求接口了。  

经过一系列排查，我发现网关服务的控制台打印了这么一行日志。

```log
----------------------------------------------------------
	启动成功！
----------------------------------------------------------
2025-07-16 11:11:49.499 | ERROR 10547 | reactor-http-nio-2 [TID: N/A] c.s.g.g.handler.GlobalExceptionHandler   | [responseStatusExceptionHandler][uri(http://169.254.207.50:48080/actuator/health/GET) 发生异常]

org.springframework.web.server.ResponseStatusException: 404 NOT_FOUND
	at org.springframework.web.reactive.resource.ResourceWebHandler.lambda$handle$1(ResourceWebHandler.
```

一开始注意到了 `actuator/health` 是一个健康检查，我登录了 Nacos 服务，发现是正常的。再折腾了一会后，我点进了服务实例列表，猛然发现各个服务注册的都是 `169.254.207.50`，我恍然大悟，这个地址，不就是那个.... !!! 网络出现错误，地址配置错误时的默认地址？

于是我在终端上一笔一画的输入了 `ifconfig`：
```shell
en12: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	options=404<VLAN_MTU,CHANNEL_IO>
	ether 32:d5:3e:d3:80:c5
	inet6 fe80::c89:a469:30e5:25b3%en12 prefixlen 64 secured scopeid 0xd 
	inet 169.254.207.50 netmask 0xffff0000 broadcast 169.254.255.255
	nd6 options=201<PERFORMNUD,DAD>
	media: autoselect (100baseTX <full-duplex>)
	status: active

en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	options=6460<TSO4,TSO6,CHANNEL_IO,PARTIAL_CSUM,ZEROINVERT_CSUM>
	ether c2:8a:e7:2e:81:eb
	inet6 fe80::4a9:9cb4:8445:c967%en0 prefixlen 64 secured scopeid 0x10 
	inet 10.193.51.148 netmask 0xffffff00 broadcast 10.193.51.255
	nd6 options=201<PERFORMNUD,DAD>
	media: autoselect
	status: active
```

发现了罪魁祸首 `en12`，正是它在抢尽风头。

它的地址属于 APIPA (Automatic Private IP Addressing) 范围 `169.254.0.0/16`，通常在以下情况下出现：

- 网卡无法获取 DHCP 地址时的自动分配
- 某些虚拟化软件创建的虚拟网卡
- 系统服务或应用程序创建的临时网络接口

而 Spring Boot 的网络接口选择机制会按照以下优先级：

1. 活跃状态 (active)
2. 接口顺序 (系统枚举顺序)
3. IP 地址类型 (非回环、非链路本地)

重启后，系统的网络接口枚举顺序可能发生变化，导致 `en12` 被优先选择。

## 方案

知道问题所在，那解决方法就比较简单了，而且 Spring Cloud 也提供了解决方案。

### application 配置

最简单的就是我们可以在配置文件中添加 `inetutils` 配置项 :
```yml
spring:
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848 # Nacos 服务器地址
      username: nacos # Nacos 账号
      password: nacos # Nacos 密码
      discovery: # 【配置中心】配置项
        namespace: xxx # 命名空间。这里使用 wms 开发环境
        group: DEFAULT_GROUP # 使用的 Nacos 配置分组，默认为 DEFAULT_GROUP
      config: # 【注册中心】配置项
        namespace: xxx # 命名空间。这里使用 dev 开发环境
        group: DEFAULT_GROUP # 使用的 Nacos 配置分组，默认为 DEFAULT_GROUP
    inetutils:
      ignoredInterfaces:
        - en12         # 排除问题接口
        - anpi.*
        - utun.*
        - awdl0
        - lo0
        - bridge.*
```

### 启动时命令行参数

```java
# 方式1：指定优先网络
java -Dspring.cloud.inetutils.preferred-networks=10.193.51 -jar your-app.jar

# 方式2：指定忽略的接口
java -Dspring.cloud.inetutils.ignored-interfaces=en12,utun.* -jar your-app.jar

# 方式3：直接指定 IP
java -Dspring.cloud.nacos.discovery.ip=10.193.51.148 -jar your-app.jar
```

### 直接暂时关掉相关网卡
Mac：
```shell
sudo ifconfig en12 down
```