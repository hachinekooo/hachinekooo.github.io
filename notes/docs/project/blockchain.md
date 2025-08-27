---
title: 论如何优雅的给系统接入区块链存证功能
icon: file
order: 
date: 2025-08-24
category:
  - Java
tags:
  - 区块链
  - SpringBoot
  - AOP
  - 设计模式
---
## Part 1: 理论基础篇 (Foundation)

### 场景再现

#### 业务痛点

传统的业务系统中，业务操作产生的相关记录的可信度并不高。业务操作方有很大的空间可以自己捏造改造假的数据，另外就算依靠第三方机构，也并不安全，非常考验第三方机构本身的专业性，以及可信度。

这两种方式都有一个特点，就是真实性非常依赖一方。为了解决这个痛点，去中心化的方案应运而生。

#### 传统方案的局限性

- 业务系统拥有方/操作方捏造/修改数据非常容易
- 第三方机构可能存在可信度，以及数据安全性低的问题

#### 区块链存证的价值

- 去中心化存储，数据在互联网中的多个节点中拷贝存储
- 多数节点中的数据确定最终数据，不受个别节点中数据变更的影响
- 很难被篡改，可信度极高

### 什么是区块链

#### 区块链的基本原理



#### 存证的技术原理


### AOP 的基本概念

#### 切面编程的原理

切面一词，本身就非常通俗易懂了。我们就像是把一条流程且了几道口子，在此处编程书写我们想要的逻辑，流程本身还是没变，多的只是在某处要执行的额外逻辑。

切面编程的关键概念：
- 切面类
- 切面
- 通知
- 切点

#### 为什么选择使用 AOP 实现

- 存证执行失败，也不影响原业务流程
- 存证逻辑与业务逻辑完全解耦，不需要在原业务流程中修改，确保系统稳定性
- 存证逻辑集中，修改维护方便。并且可以封装为 starter（公共组件）以便复用

### 常见的设计模式

## Part 2: 渐进式实现篇 (Progressive Implementation)

### 表设计

考虑到数据字段可能比较大，为了优化查询性能，我们将分为 2 张表 `blockchain_certify_record`、`blockchain_certify_detail`

这样的好处是：
1. 优化查询性能，简单的查询不需要加载大字段的内容
2. 减轻主表的存储压力，大字段单独存储
3. 方便未来在详情表中增加更多大数据字段

#### 主表

| **字段名称**           | **字段类型**     | **字段说明**    | **是否必填** | **备注**                           |     |
| ------------------ | ------------ | ----------- | -------- | -------------------------------- | --- |
| id                 | bigint       | 主键（逻辑主键）    | 是        |                                  |     |
| biz_type           | varchar(100) | 操作业务的类型     | 是        | 如 stockIn/stockOut/stockTransfer |     |
| biz_id             | varchar(100) | 操作业务的主键     | 是        | 关联的具体业务记录 ID                     |     |
| biz_opt_time       | datetime     | 业务操作时间      | 是        | 实际的业务操作发生时间                      |     |
| certify_time       | datetime     | 存证时间        |          | 区块链存证成功的时间                       |     |
| status             | varchar(20)  | 存证状态        | 是        | 存证状态（PENDING/SUCCESS/FAILED）     |     |
| errorCode          | varchar(50)  | 我们自己的统一错误码  |          |                                  |     |
| error_message      | varchar(100) | 我们自己的统一错误描述 |          |                                  |     |
| transaction_hash   | varchar(64)  | 交易哈希        |          | 区块链上每笔交易的唯一标识符，类似于交易的"身份证号"      |     |
| block_height       | bigint       | 区块高度        |          | 表示该交易被打包到区块链的第几个区块中              |     |
| sdk_vendor         | varchar(50)  | SDK 厂商标识    | 是        |                                  |     |
| sdk_version        | varchar(20)  | SDK 版本号     | 是        |                                  |     |
| sdk_code           | varchar(50)  | SDK 错误码     |          | SDK 返回的 errorCode 字段             |     |
| sdk_message        | varchar(500) | SDK 返回消息    |          | SDK 返回的 msg 字段                   |     |
| sdk_certificate_id | varchar(100) | 存证凭证ID      |          | 存证平台生成的业务层面的凭证编号                 |     |
| retry_count        | int          | 重试次数        |          | DEFAULT 0                        |     |
| max_retry_count    | int          | 最大重试次数      |          | DEFAULT 3                        |     |
| next_retry_time    | datetime     | 下次重试时间      |          |                                  |     |
| tenant_id          | bigint(20)   | 租户编号        |          |                                  |     |
| creator            | varchar(255) | 创建人 ID      | 是        |                                  |     |
| create_time        | datetime     | 创建时间        | 是        | DEFAULT CURRENT_TIMESTAMP        |     |
| updater            | varchar(255) | 更新人 ID      |          |                                  |     |
| update_time        | datetime     | 更新时间        |          | ON UPDATE CURRENT_TIMESTAMP      |     |
| deleted            | tinyint(1)   | 逻辑删除标记      | 是        | 0:未删除 1:已删除                      |     |

#### 详情表

| **字段名称**                 | **字段类型**     | **字段说明**          | **是否必填** | **备注**                       |     |
| ------------------------ | ------------ | ----------------- | -------- | ---------------------------- | --- |
| id                       | bigint       | 主键                | 是        |                              |     |
| certify_record_id        | bigint       | 关联主表ID            | 是        |                              |     |
| certify_struct_data      | json         | 存证结构化数据（JSON 格式）  |          | 业务表单数据组合                     |     |
| certify_struct_data_hash | varchar(255) | 结构化数据的 HASH 值     |          | 结构化数据的 HASH 值                |     |
| certify_un_struct_data   | json         | 存证非结构化数据（JSON 格式） |          | 业务表单的附件信息                    |     |
| sdk_data                 | text         | SDK 返回数据          |          | SDK 返回的 data 字段内容            |     |
| sdk_response_data        | text         | 完整响应数据            |          | SDK 返回的完整 JSON 响应（用于备份和排查问题） |     |
| create_time              | datetime     | 创建时间              | 是        | DEFAULT CURRENT_TIMESTAMP    |     |

### 使用 AOP 无感引入 

  核心思路：
  - 自定义注解 `@ChainBlockCertify`，标记需要存证的方法
  - 通过 `AOP` 拦截带注解的方法调用、提取数据、异步调用区块链 SDK
  - 在方法执行成功后，异步处理存证逻辑，不影响业务流程，完全解耦

### 使用设计模式增加拓展与可维护性

#### 用适配器/包装器模式兼容不同 SDK

  - `BlockchainSDKClientAdapter` 接口统一不同区块链 SDK 的调用方式
  - 同时支持真实 `SDK` 和 `Mock SDK`，便于测试和开发
  - 通过配置切换不同实现，无需修改业务代码


#### 用策略模式统一数据提取

- `DataExtractor` 接口支持不同业务类型的数据提取策略

#### 用模板方法模式减少样板代码

- `AbstractDataExtractor` 提供通用的文件处理和哈希计算模板
- 子类只需实现具体的业务数据提取逻辑

#### 管理器模式

- `MappingHandlerManager` 管理多个数据映射处理器
- 按优先级依次执行机构、部门、人员等字段映射
- 支持动态扩展新的映射规则

### 异步处理与重试机制


## Part 3: 封装为复用 Starter (Reusable Component)


### 工程结构划分


### 

## Part 4: 总结（Summary）








 

 
