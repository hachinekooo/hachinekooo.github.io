---
title: Spring 之配置文件
icon: file
order: 
date: 2025-08-18
category: 
tags:
---
## 

## 核心理解

`@ConfigurationProperties(prefix = "blockchain")` **不是专门绑定本地 application.yml 的**！

这个注解的作用是：

- **告诉 Spring 如何 mapping 属性**
- **无论配置来源是哪里**（本地文件 OR Nacos OR 环境变量）

## 配置属性绑定机制

```java
@Data
@Component
@ConfigurationProperties(prefix = "blockchain")  // 这个prefix是通用的！
@RefreshScope
public class BlockchainConfig {
    private String mainAddress;    // 对应任何来源的 blockchain.main-address
    private Integer mainPort;      // 对应任何来源的 blockchain.main-port
    private String fileAddress;    // 对应任何来源的 blockchain.file-address
}
```

## 配置来源的演变

**原来** (本地配置):

```yaml
# application.yml
blockchain:
  main-address: "localhost"
  main-port: 8080
  file-address: "localhost"
```

**现在** (Nacos 配置):

```yaml
# Nacos中的 blockchain-service-dev.yml
blockchain:
  main-address: "https://prod-server.com"
  main-port: 9090
  file-address: "https://file-server.com"
```

**关键点**: prefix="blockchain" 在两种情况下都需要！

## 如果去掉@ConfigurationProperties 会怎样？

```java
// 错误示例 - 没有@ConfigurationProperties
@Data
@Component
@RefreshScope
public class BlockchainConfig {
    @Value("${blockchain.main-address}")  // 必须手动指定每个property
    private String mainAddress;
    
    @Value("${blockchain.main-port}")
    private Integer mainPort;
    
    @Value("${blockchain.file-address}")
    private String fileAddress;
}
```

## 正确的理解

`@ConfigurationProperties` 的作用：

1. **Property mapping** - 将 `blockchain.*` 自动映射到对应字段
2. **Type conversion** - 自动类型转换
3. **Validation support** - 支持数据校验
4. **IDE support** - 更好的 IDE 提示

**它不关心配置的 source 在哪里！**

## 完整的正确配置

```java
@Data
@Component
@ConfigurationProperties(prefix = "blockchain")  // 必须保留！
@RefreshScope  // 支持Nacos动态刷新
@Validated     // 可选：支持校验
public class BlockchainConfig {
    
    @NotBlank
    private String mainAddress;
    
    @Range(min = 1000, max = 65535)
    private Integer mainPort;
    
    private String fileAddress;
}
```

## 总结

- `@ConfigurationProperties` ≠ 绑定本地文件
- 它是**属性映射规则**，适用于所有配置源
- Nacos、本地文件、环境变量都需要这个 prefix 来正确映射

## 配置优先级顺序

根据 Spring Boot 的配置加载优先级（**从高到低**）：

1. **命令行参数** (`--blockchain.main-address=xxx`)
2. **系统环境变量** (`BLOCKCHAIN_MAIN_ADDRESS=xxx`)
3. **Nacos 远程配置**
4. **application-{profile}.properties/yml** (特定环境)
5. **application.properties/yml** (本地默认配置)**