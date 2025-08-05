---
title: 金融资产管理
icon: file
order: 
date: 2025-08-04
category:
  - 项目
tags:
  - 金融
  - 管理系统
---
## 派生业务

### 票据贴现

#### **基本信息**
##### 表结构 (bill_discount_basic_info)

| **字段名称**                   | **字段类型**      | **字段说明**                  | **是否必填** | **备注**                        |
| -------------------------- | ------------- | ------------------------- | -------- | ----------------------------- |
| id                         | bigint        | 主键 ID，自增                  | 是        | PRIMARY KEY                   |
| project_code               | varchar(64)   | 项目唯一标识编码；提交后生成项目编码，回填到此   | 是        | UNIQUE KEY                    |
| financing_entity_id        | bigint        | 融资主体 ID                   | 是        | 外键关联                          |
| financing_entity_name      | varchar(128)  | 融资主体名称                    | 是        |                               |
| financial_institution_id   | bigint        | 金融机构 ID                   | 是        | 外键关联                          |
| financial_institution_name | varchar(128)  | 提供融资的机构名称                 | 是        |                               |
| financing_method_id        | int           | 融资方式 ID；建立字典；如"票据贴现""质押"等 | 是        | 字典表关联                         |
| fund_purpose               | varchar(128)  | 资金用途，如"经营周转"              | 是        |                               |
| bill_amount                | decimal(20,2) | 开票金额，票据的字面值               | 是        | 单位：元                          |
| bill_date                  | datetime      | 开票日期，票据开具日期               | 是        |                               |
| term_months                | tinyint       | 期限（月），融资期限月数              | 是        | 1-255                         |
| maturity_date              | datetime      | 到期日期，票据到期日期               | 是        |                               |
| fee_rate                   | decimal(8,4)  | 手续费率(%)，手续费比例             | 是        | 如：1.5000 表示 1.5%              |
| fee_amount                 | decimal(20,2) | 手续费金额                     | 否        | 计算字段                          |
| status                     | tinyint       | 业务状态                      | 是        | 0:待提交 1:待审核 2:已审核 3:已完成 9:已取消 |
| tenant_id                  | bigint(20)    | 租户编号                      |          |                               |
| creator                    | varchar(255)  | 创建人 ID                    | 是        |                               |
| create_time                | datetime      | 创建时间                      | 是        | DEFAULT CURRENT_TIMESTAMP     |
| updater                    | varchar(255)  | 更新人 ID                    | 否        |                               |
| update_time                | datetime      | 更新时间                      | 否        | ON UPDATE CURRENT_TIMESTAMP   |
| deleted                    | tinyint(1)    | 逻辑删除标记                    | 是        | 0:未删除 1:已删除                   |

##### 业务梳理
**计算关系**
- 输入开票日期，以及期限，自动计算出到期日期
- 手续费金额 = 开票金额 x 手续费率

#### **贴现信息**

##### 表结构 (bill_discount_info)

| **字段名称**             | **字段类型**      | **字段说明**            | **是否必填** | **数据范围/格式**      | **备注**                      |
| -------------------- | ------------- | ------------------- | -------- | ---------------- | --------------------------- |
| id                   | bigint        | 主键 ID，自增            | 是        |                  | PRIMARY KEY                 |
| basic_info_id        | bigint        | 基本信息表关联 ID          | 是        |                  | 外键关联                        |
| bill_no              | varchar(64)   | 票据号，票据唯一编号标识（业务主键）  | 是        | 长度不超过 64 字符      | UNIQUE KEY                  |
| bill_amount          | decimal(20,2) | 票据金额（元），票据面值金额      | 是        | 正数，保留 2 位小数      |                             |
| disposal_method_id   | int           | 处置方式 ID，票据处理方式；建立字典 | 是        | 如"贴现"、"背书"、"托收"等 | 字典表关联                       |
| discounter_id        | bigint        | 贴现人 ID，申请贴现的主体 ID   | 否        |                  | 外键关联                        |
| discounter_name      | varchar(128)  | 贴现人名称，申请贴现的主体名称     | 是        | 个人姓名或企业名称        |                             |
| discount_bank_id     | bigint        | 贴现行 ID，执行贴现业务的银行 ID | 否        |                  | 外键关联                        |
| discount_bank_name   | varchar(128)  | 贴现行名称，执行贴现业务的银行名称   | 是        | 银行全称或简称          |                             |
| discount_date        | date          | 贴现日期，贴现操作执行日期       | 是        | YYYY-MM-DD 格式    | 范围为基本信息的开票日期与结束日期之间         |
| discount_days        | smallint      | 贴现天数，从贴现日到票据到期日的天数  | 是        | 正整数，一般≤3650 天    |                             |
| annual_interest_days | smallint      | 年计息天数，年度计息基数天数；建立字典 | 是        | 通常为 360 天或 365 天 | DEFAULT 360                 |
| discount_rate        | decimal(8,4)  | 贴现利率，贴现年利率          | 是        | 百分比形式，保留 4 位小数   | 如：5.2500 表示 5.25%           |
| discount_interest    | decimal(20,2) | 贴现利息（元），计算得出的贴现利息金额 | 是        | 正数，保留 2 位小数      |                             |
| remark               | varchar(500)  | 备注，补充说明信息           | 否        | 长度不超过 500 字符     |                             |
| creator              | varchar(255)  | 创建人 ID              | 是        |                  |                             |
| create_time          | datetime      | 创建时间                | 是        |                  | DEFAULT CURRENT_TIMESTAMP   |
| updater              | varchar(255)  | 更新人 ID              | 否        |                  |                             |
| update_time          | datetime      | 更新时间                | 否        |                  | ON UPDATE CURRENT_TIMESTAMP |
| deleted              | tinyint(1)    | 逻辑删除标记              | 是        | 0:未删除 1:已删除      |                             |

##### 业务梳理

**计算关系：**
- 贴现利息 
	- 贴现利息（处置方式为贴现） = 票据金额 × 贴现利率 × 贴现天数 ÷ 年计息天数
	- 贴现利息（处置方式为转财务付款） = 票据金额 × 贴现利率
- 贴现天数 = “贴现日期”到基本信息中的“到期日期”的天数差

**字段约束：**
- 贴现日期不能晚于票据到期日
- 票据金额应大于贴现利息

##### **质押信息**

##### 表结构(pledge_info)

| **字段名称**             | **字段类型**      | **字段说明**           | **是否必填** | **数据范围/格式**       | **备注**                      |
| -------------------- | ------------- | ------------------ | -------- | ----------------- | --------------------------- |
| id                   | bigint        | 主键 ID，自增            | 是        |                   | PRIMARY KEY                 |
| basic_info_id        | bigint        | 基本信息表关联 ID          | 是        |                   | 外键关联                        |
| deposit_no           | varchar(64)   | 存单号，质押存单唯一编号（业务主键） | 是        | 长度不超过 64 字符         | UNIQUE KEY                  |
| deposit_entity_id    | bigint        | 存款单位 ID             | 否        |                   | 外键关联                        |
| deposit_entity_name  | varchar(128)  | 存款单位名称，存入存单的主体名称   | 是        | 个人姓名或企业全称         |                             |
| deposit_bank_id      | bigint        | 存入银行 ID             | 否        |                   | 外键关联                        |
| deposit_bank_name    | varchar(128)  | 存入银行名称，存单开户银行名称    | 是        | 银行全称或标准简称         |                             |
| deposit_amount       | decimal(20,2) | 存款金额（元），存单本金金额     | 是        | 正数，保留 2 位小数         |                             |
| deposit_date         | datetime      | 存入日期，存单开立日期        | 是        | YYYY-MM-DD 格式      |                             |
| maturity_date        | datetime      | 到期日期，存单到期日期        | 是        | YYYY-MM-DD 格式      |                             |
| term_days            | smallint      | 期限（天），存款期限天数       | 是        | 正整数，自动计算或手动录入     |                             |
| deposit_rate         | decimal(8,4)  | 存款利率，年化存款利率        | 是        | 百分比形式，保留 4 位小数      | 如：3.2500 表示 3.25%             |
| annual_interest_days | smallint      | 年计息天数，年度计息基数天数     | 是        | 通常为 360 天或 365 天      | DEFAULT 360                 |
| deposit_interest     | decimal(20,2) | 存款利息（元），到期利息收入     | 是        | 正数，保留 2 位小数         |                             |
| pledge_status        | tinyint       | 质押状态               | 是        | 0:未质押 1:已质押 2:已解押 | DEFAULT 0                   |
| remark               | varchar(500)  | 备注，补充说明信息          | 否        | 长度不超过 500 字符        |                             |
| creator              | varchar(255)  | 创建人 ID              | 是        |                   |                             |
| create_time          | datetime      | 创建时间               | 是        |                   | DEFAULT CURRENT_TIMESTAMP   |
| updater              | varchar(255)  | 更新人 ID              | 否        |                   |                             |
| update_time          | datetime      | 更新时间               | 否        |                   | ON UPDATE CURRENT_TIMESTAMP |
| deleted              | tinyint(1)    | 逻辑删除标记             | 是        | 0:未删除 1:已删除       |                             |

##### 业务梳理

**计算关系：**
- 期限（天）= 到期日期 - 存入日期
- 存款利息 = 存款金额 × 存款利率 × 期限（天）÷ 年计息天数

**业务约束：**
- 到期日期必须晚于存入日期

##### **消耗中收基本信息**

##### 表结构 (consume_income_basic_info)

| **字段名称**                    | **字段类型**      | **字段说明**         | **是否必填** | **数据范围/格式** | **备注**                      |
| --------------------------- | ------------- | ---------------- | -------- | ----------- | --------------------------- |
| id                          | bigint        | 主键 ID，自增         | 是        |             | PRIMARY KEY                 |
| basic_info_id               | bigint        | 基本信息表关联 ID       | 是        |             | 外键关联                        |
| receive_institution_id      | bigint        | 收取机构 ID          | 是        |             | 外键关联                        |
| receive_institution_name    | varchar(128)  | 收取机构名称，接收利息的机构名称 | 是        |             |                             |
| max_deposit_amount          | decimal(20,2) | 该机构最大配存金额        | 是        |             |                             |
| interest_discount_rate      | decimal(8,4)  | 利息折现率            | 否        |             |                             |
| differential_fund_cost_rate | decimal(8,4)  | 差额资金成本率(%)       | 否        |             |                             |
| creator                     | varchar(255)  | 创建人 ID           | 是        |             |                             |
| create_time                 | datetime      | 创建时间             | 是        |             | DEFAULT CURRENT_TIMESTAMP   |
| updater_id                  | varchar(255)  | 更新人 ID           | 否        |             |                             |
| update_time                 | datetime      | 更新时间             | 否        |             | ON UPDATE CURRENT_TIMESTAMP |
| deleted                     | tinyint(1)    | 逻辑删除标记           | 是        | 0:未删除 1:已删除 |                             |

##### 业务梳理

**计算关系：**
- 本单净损失 = 手续费 + 贴现利息- 存款利息折现后金额
- 本单期限 = 基本信息中的“期限”
- 本单开票金额 = 基本信息中的“开票金额”
- 本单存款金额 = 质押信息中的“存款金额”总和
- 本单存款折扣率(%) = 与“开票金额”有关，50000000 是为 1000%，10000000 为 200
- 手续费率(%) = 基本信息中的“手续费率”
- 本单手续费 = 基本信息中的手续费
- 贴现率(%) = 贴现信息中条目中的第一个"贴现率"
- 本单贴现利息 = 贴现信息中各条目“贴现利息”总和
- 存款利率(%) = 质押信息中的第一个“存款利率”
- 本单存款利息 = 质押信息中各个条目的“存款利息”之和
- 利息折现率 = 手动输入
- 利息折现后金额 = 本单存款利息 × (1 - 利息折现率)

#### **消耗中收空间表 (consume_income_space)**

| **字段名称**        | **字段类型**      | **字段说明**       | **是否必填** | **数据范围/格式** | **备注**                      |
| --------------- | ------------- | -------------- | -------- | ----------- | --------------------------- |
| id              | bigint        | 主键 ID，自增       | 是        |             | PRIMARY KEY                 |
| basic_info_id   | bigint        | 基本信息表关联 ID     | 是        |             | 外键关联                        |
| space_type      | varchar(32)   | 空间类型           | 是        |             | 如：总空间、子空间等                  |
| total_space     | decimal(20,2) | 空间总额（元），预算总限额  | 是        |             |                             |
| consumed_amount | decimal(20,2) | 累计消耗（元），已使用的金额 | 是        |             | DEFAULT 0                   |
| remaining_space | decimal(20,2) | 空间余额（元），剩余可用额度 | 是        |             | 计算字段                        |
| creator         | varchar(255)  | 创建人 ID         | 是        |             |                             |
| create_time     | datetime      | 创建时间           | 是        |             | DEFAULT CURRENT_TIMESTAMP   |
| updater         | varchar(255)  | 更新人 ID         | 否        |             |                             |
| update_time     | datetime      | 更新时间           | 否        |             | ON UPDATE CURRENT_TIMESTAMP |
| deleted         | tinyint(1)    | 逻辑删除标记         | 是        | 0:未删除 1:已删除 |                             |

**计算关系：**
- 空间余额 = 空间总额 - 累计消耗
#### SQL

```sql
-- 票据贴现派生业务数据库脚本
-- 1. 票据贴现基本信息表
CREATE TABLE bill_discount_basic_info (
    id BIGINT AUTO_INCREMENT COMMENT '主键ID，自增',
    project_code VARCHAR(64) NOT NULL COMMENT '项目唯一标识编码；提交后生成项目编码，回填到此',
    financing_entity_id BIGINT NOT NULL COMMENT '融资主体ID',
    financing_entity_name VARCHAR(128) NOT NULL COMMENT '融资主体名称',
    financial_institution_id BIGINT NOT NULL COMMENT '金融机构ID',
    financial_institution_name VARCHAR(128) NOT NULL COMMENT '提供融资的机构名称',
    financing_method_id INT NOT NULL COMMENT '融资方式ID；建立字典；如"票据贴现""质押"等',
    fund_purpose VARCHAR(128) NOT NULL COMMENT '资金用途，如"经营周转"',
    bill_amount DECIMAL(20,2) NOT NULL COMMENT '开票金额，票据的字面值，单位：元',
    bill_date DATETIME NOT NULL COMMENT '开票日期，票据开具日期',
    term_months TINYINT NOT NULL COMMENT '期限（月），融资期限月数，1-255',
    maturity_date DATETIME NOT NULL COMMENT '到期日期，票据到期日期',
    fee_rate DECIMAL(8,4) NOT NULL COMMENT '手续费率(%)，手续费比例，如：1.5000 表示 1.5%',
    fee_amount DECIMAL(20,2) COMMENT '手续费金额，计算字段',
    status TINYINT DEFAULT 0 COMMENT '业务状态：0:待提交 1:待审核 2:已审核 3:已完成 9:已取消',
    tenant_id bigint null comment '租户编号',
    creator VARCHAR(255) NOT NULL COMMENT '创建人ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updater VARCHAR(255) COMMENT '更新人ID',
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除标记：0:未删除 1:已删除',
    PRIMARY KEY (id),
    UNIQUE KEY uk_project_code (project_code),
    KEY idx_financing_entity_id (financing_entity_id),
    KEY idx_financial_institution_id (financial_institution_id),
    KEY idx_status (status),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='票据贴现基本信息表';

-- 2. 贴现信息表
CREATE TABLE bill_discount_info (
    id BIGINT AUTO_INCREMENT COMMENT '主键ID，自增',
    basic_info_id BIGINT NOT NULL COMMENT '基本信息表关联ID',
    bill_no VARCHAR(64) NOT NULL COMMENT '票据号，票据唯一编号标识（业务主键）',
    bill_amount DECIMAL(20,2) NOT NULL COMMENT '票据金额（元），票据面值金额',
    disposal_method_id INT NOT NULL COMMENT '处置方式ID，票据处理方式；建立字典，如"贴现"、"背书"、"托收"等',
    discounter_id BIGINT COMMENT '贴现人ID，申请贴现的主体ID',
    discounter_name VARCHAR(128) NOT NULL COMMENT '贴现人名称，申请贴现的主体名称',
    discount_bank_id BIGINT COMMENT '贴现行ID，执行贴现业务的银行ID',
    discount_bank_name VARCHAR(128) NOT NULL COMMENT '贴现行名称，执行贴现业务的银行名称',
    discount_date DATE NOT NULL COMMENT '贴现日期，贴现操作执行日期',
    discount_days SMALLINT NOT NULL COMMENT '贴现天数，从贴现日到票据到期日的天数',
    annual_interest_days SMALLINT NOT NULL DEFAULT 360 COMMENT '年计息天数，年度计息基数天数，通常为360天或365天',
    discount_rate DECIMAL(8,4) NOT NULL COMMENT '贴现利率，贴现年利率，如：5.2500 表示 5.25%',
    discount_interest DECIMAL(20,2) NOT NULL COMMENT '贴现利息（元），计算得出的贴现利息金额',
    remark VARCHAR(500) COMMENT '备注，补充说明信息',
    creator VARCHAR(255) NOT NULL COMMENT '创建人ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updater VARCHAR(255) COMMENT '更新人ID',
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除标记：0:未删除 1:已删除',
    PRIMARY KEY (id),
    UNIQUE KEY uk_bill_no (bill_no),
    KEY idx_basic_info_id (basic_info_id),
    KEY idx_discounter_id (discounter_id),
    KEY idx_discount_bank_id (discount_bank_id),
    KEY idx_discount_date (discount_date),
    FOREIGN KEY (basic_info_id) REFERENCES bill_discount_basic_info(id) ON DELETE CASCADE,
    CHECK (bill_amount > 0),
    CHECK (discount_days > 0 AND discount_days <= 3650),
    CHECK (discount_rate >= 0),
    CHECK (discount_interest >= 0)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='贴现信息表';

-- 3. 质押信息表
CREATE TABLE pledge_info (
    id BIGINT AUTO_INCREMENT COMMENT '主键ID，自增',
    basic_info_id BIGINT NOT NULL COMMENT '基本信息表关联ID',
    deposit_no VARCHAR(64) NOT NULL COMMENT '存单号，质押存单唯一编号（业务主键）',
    deposit_entity_id BIGINT COMMENT '存款单位ID',
    deposit_entity_name VARCHAR(128) NOT NULL COMMENT '存款单位名称，存入存单的主体名称',
    deposit_bank_id BIGINT COMMENT '存入银行ID',
    deposit_bank_name VARCHAR(128) NOT NULL COMMENT '存入银行名称，存单开户银行名称',
    deposit_amount DECIMAL(20,2) NOT NULL COMMENT '存款金额（元），存单本金金额',
    deposit_date DATETIME NOT NULL COMMENT '存入日期，存单开立日期',
    maturity_date DATETIME NOT NULL COMMENT '到期日期，存单到期日期',
    term_days SMALLINT NOT NULL COMMENT '期限（天），存款期限天数',
    deposit_rate DECIMAL(8,4) NOT NULL COMMENT '存款利率，年化存款利率，如：3.2500 表示 3.25%',
    annual_interest_days SMALLINT NOT NULL DEFAULT 360 COMMENT '年计息天数，年度计息基数天数，通常为360天或365天',
    deposit_interest DECIMAL(20,2) NOT NULL COMMENT '存款利息（元），到期利息收入',
    pledge_status TINYINT NOT NULL DEFAULT 0 COMMENT '质押状态：0:未质押 1:已质押 2:已解押',
    remark VARCHAR(500) COMMENT '备注，补充说明信息',
    creator VARCHAR(255) NOT NULL COMMENT '创建人ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updater VARCHAR(255) COMMENT '更新人ID',
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除标记：0:未删除 1:已删除',
    PRIMARY KEY (id),
    UNIQUE KEY uk_deposit_no (deposit_no),
    KEY idx_basic_info_id (basic_info_id),
    KEY idx_deposit_entity_id (deposit_entity_id),
    KEY idx_deposit_bank_id (deposit_bank_id),
    KEY idx_deposit_date (deposit_date),
    KEY idx_pledge_status (pledge_status),
    FOREIGN KEY (basic_info_id) REFERENCES bill_discount_basic_info(id) ON DELETE CASCADE,
    CHECK (deposit_amount > 0),
    CHECK (maturity_date > deposit_date),
    CHECK (term_days > 0),
    CHECK (deposit_rate >= 0),
    CHECK (deposit_interest >= 0),
    CHECK (pledge_status IN (0, 1, 2))
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='质押信息表';

-- 4. 消耗中收基本信息表
CREATE TABLE consume_income_basic_info (
    id BIGINT AUTO_INCREMENT COMMENT '主键ID，自增',
    basic_info_id BIGINT NOT NULL COMMENT '基本信息表关联ID',
    receive_institution_id BIGINT NOT NULL COMMENT '收取机构ID',
    receive_institution_name VARCHAR(128) NOT NULL COMMENT '收取机构名称，接收利息的机构名称',
    max_deposit_amount DECIMAL(20,2) NOT NULL COMMENT '该机构最大配存金额',
    interest_discount_rate decimal(8, 4) null comment '利息折现率',  
	differential_fund_cost_rate decimal(8, 4) null comment '差额资金成本率(%)',
    creator VARCHAR(255) NOT NULL COMMENT '创建人ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updater VARCHAR(255) COMMENT '更新人ID',
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除标记：0:未删除 1:已删除',
    PRIMARY KEY (id),
    KEY idx_basic_info_id (basic_info_id),
    KEY idx_receive_institution_id (receive_institution_id),
    FOREIGN KEY (basic_info_id) REFERENCES bill_discount_basic_info(id) ON DELETE CASCADE,
	CHECK (max_deposit_amount >= 0),  
	CHECK (interest_discount_rate >= 0 AND interest_discount_rate <= 100)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='消耗中收基本信息表';

-- 创建索引优化查询性能
CREATE INDEX idx_bill_discount_basic_info_compound ON bill_discount_basic_info(status, create_time, deleted);
CREATE INDEX idx_bill_discount_info_compound ON bill_discount_info(basic_info_id, discount_date, deleted);
CREATE INDEX idx_pledge_info_compound ON pledge_info(basic_info_id, pledge_status, deleted);
```


### 质押贷款
#### 基本信息
##### 表结构
项目编码
融资主体
金融机构
融资方式
资金用途
融资金额
放款日
期限(月)
到期日
放款金额(元)
还本付息方式(分期还本付息/到期一次性还本，分期付息/到期一次性还本付息/等额本息/等额本金/不规则还本付息)
利率类型(固定利率/浮动利率/分段利率)
基准利率
浮动类型(上浮/下浮)
浮动模式(BP/%)
合同利率(%)
结息方式(每月/每季度/每半年/自定义)
首次付息日
结息日是否为付息日前一天
利随本清(是/否)
年计息天数(360/365)
计息方式-算头(算/不算)
计息方式-算尾(算/不算)
付款遇节假日(正常扣款/前一工作日/后一工作日)
提前打款特殊要求(是/否)

#### 还本计划

##### 表结构
还本日期
还本金额
备注

#### 付息计划

##### 表结构
付息日期
付息金额（计算值）
付息金额（确认值）
备注

##### 业务梳理

**计算关系**
- 利息 = 占用金额 x 年利率 x (占用天数 / 年计息天数 )

#### 质押信息表(使用已经存在的 pledge_info 表)


#### 消耗中收基本信息

##### 表结构 (使用已经存在的 consume_income_basic_info 表)

##### 业务梳理

**计算关系**
- 本单贷款金额(元) = 基本信息中的“放款金额”
- 本单放款日期 = 基本信息中的“放款日”
- 本单到账日期 = 基本信息中的“到期日”
- 本单期限(月) = 基本信息中的“期限”
- 本单存款金额(元) = 质押信息中的“存款金额(元)”总和
- 本单存款折扣率(%) = 
- 贷款利率(%) = 基本信息中的“合同利率”
- 存款利率(%) = 质押信息中的“存款利率”第一个
- 本单贷款利息(元) = 付息计划中的“付息金额（确认值）”总和
- 本单存款利息(元) = 质押信息中的“存款利息(元)”总和
- 本单存款差额(元) = 数据来源未知，你可以推理补充
- 差额折算损失(元) = 计算方式未知，你可以推理补充
- 本单净损失(元) = 计算方式未知，你可以推理补充