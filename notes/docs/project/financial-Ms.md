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
| tenant_id            | bigint(20)    | 租户编号                |          |                  |                             |
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

#### **质押信息**

##### 表结构(pledge_info)

| **字段名称**             | **字段类型**      | **字段说明**           | **是否必填** | **数据范围/格式**       | **备注**                      |
| -------------------- | ------------- | ------------------ | -------- | ----------------- | --------------------------- |
| id                   | bigint        | 主键 ID，自增           | 是        |                   | PRIMARY KEY                 |
| basic_info_id        | bigint        | 基本信息表关联 ID         | 是        |                   |                             |
| deposit_no           | varchar(64)   | 存单号，质押存单唯一编号（业务主键） | 是        | 长度不超过 64 字符       | UNIQUE KEY                  |
| deposit_entity_id    | bigint        | 存款单位 ID            | 否        |                   | 外键关联                        |
| deposit_entity_name  | varchar(128)  | 存款单位名称，存入存单的主体名称   | 是        | 个人姓名或企业全称         |                             |
| deposit_bank_id      | bigint        | 存入银行 ID            | 否        |                   | 外键关联                        |
| deposit_bank_name    | varchar(128)  | 存入银行名称，存单开户银行名称    | 是        | 银行全称或标准简称         |                             |
| deposit_amount       | decimal(20,2) | 存款金额（元），存单本金金额     | 是        | 正数，保留 2 位小数       |                             |
| deposit_date         | datetime      | 存入日期，存单开立日期        | 是        | YYYY-MM-DD 格式     |                             |
| maturity_date        | datetime      | 到期日期，存单到期日期        | 是        | YYYY-MM-DD 格式     |                             |
| term_days            | smallint      | 期限（天），存款期限天数       | 是        | 正整数，自动计算或手动录入     |                             |
| deposit_rate         | decimal(8,4)  | 存款利率，年化存款利率        | 是        | 百分比形式，保留 4 位小数    | 如：3.2500 表示 3.25%           |
| annual_interest_days | smallint      | 年计息天数，年度计息基数天数     | 是        | 通常为 360 天或 365 天  | DEFAULT 360                 |
| deposit_interest     | decimal(20,2) | 存款利息（元），到期利息收入     | 是        | 正数，保留 2 位小数       |                             |
| pledge_status        | tinyint       | 质押状态               | 是        | 0:未质押 1:已质押 2:已解押 | DEFAULT 0                   |
| remark               | varchar(500)  | 备注，补充说明信息          | 否        | 长度不超过 500 字符      |                             |
| tenant_id            | bigint        | 租户编号               |          |                   |                             |
| creator              | varchar(255)  | 创建人 ID             | 是        |                   |                             |
| create_time          | datetime      | 创建时间               | 是        |                   | DEFAULT CURRENT_TIMESTAMP   |
| updater              | varchar(255)  | 更新人 ID             | 否        |                   |                             |
| update_time          | datetime      | 更新时间               | 否        |                   | ON UPDATE CURRENT_TIMESTAMP |
| deleted              | tinyint(1)    | 逻辑删除标记             | 是        | 0:未删除 1:已删除       |                             |

##### 业务梳理

**计算关系：**
- 期限（天）= 到期日期 - 存入日期
- 存款利息 = 存款金额 × 存款利率 × 期限（天）÷ 年计息天数

**业务约束：**
- 到期日期必须晚于存入日期

#### **消耗中收基本信息**

##### 表结构 (consume_income_basic_info)

| **字段名称**                    | **字段类型**      | **字段说明**         | **是否必填** | **数据范围/格式** | **备注**                      |
| --------------------------- | ------------- | ---------------- | -------- | ----------- | --------------------------- |
| id                          | bigint        | 主键 ID，自增         | 是        |             | PRIMARY KEY                 |
| basic_info_id               | bigint        | 基本信息表关联 ID       | 是        |             |                             |
| receive_institution_id      | bigint        | 收取机构 ID          | 是        |             | 外键关联                        |
| receive_institution_name    | varchar(128)  | 收取机构名称，接收利息的机构名称 | 是        |             |                             |
| max_deposit_amount          | decimal(20,2) | 该机构最大配存金额        | 是        |             |                             |
| interest_discount_rate      | decimal(8,4)  | 利息折现率            | 否        |             |                             |
| differential_fund_cost_rate | decimal(8,4)  | 差额资金成本率(%)       | 否        |             |                             |
| tenant_id                   | bigint        | 租户编号             |          |             |                             |
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

### 质押贷款

#### **基本信息**
##### 表结构 (pledge_loan_basic_info)

| **字段名称**                          | **字段类型**      | **字段说明**                | **是否必填** | **备注**                                                                                                                |
| --------------------------------- | ------------- | ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| id                                | bigint        | 主键 ID，自增                | 是        | PRIMARY KEY                                                                                                           |
| project_code                      | varchar(64)   | 项目唯一标识编码；提交后生成项目编码，回填到此 | 是        | UNIQUE KEY                                                                                                            |
| financing_entity_id               | bigint        | 融资主体 ID                 | 是        | 外键关联                                                                                                                  |
| financing_entity_name             | varchar(128)  | 融资主体名称                  | 是        |                                                                                                                       |
| financial_institution_id          | bigint        | 金融机构 ID                 | 是        | 外键关联                                                                                                                  |
| financial_institution_name        | varchar(128)  | 提供融资的机构名称               | 是        |                                                                                                                       |
| financing_method_id               | int           | 融资方式 ID；建立字典；如"质押贷款"等   | 是        | 字典表关联                                                                                                                 |
| fund_purpose                      | varchar(128)  | 资金用途，如"经营周转"            | 是        |                                                                                                                       |
| financing_amount                  | decimal(20,2) | 融资金额（元），申请融资的总金额        | 是        | 单位：元                                                                                                                  |
| loan_date                         | datetime      | 放款日期，实际放款日期             | 是        |                                                                                                                       |
| term_months                       | tinyint       | 期限（月），融资期限月数            | 是        | 1-255                                                                                                                 |
| maturity_date                     | datetime      | 到期日期，贷款到期日期             | 是        |                                                                                                                       |
| loan_amount                       | decimal(20,2) | 放款金额（元），实际放款金额          | 是        | 单位：元                                                                                                                  |
| repayment_method_id               | int           | 还本付息方式 ID；建立字典          | 是        | 分期还本付息/到期一次性还本，分期付息/到期一次性还本付息/等额本息/等额本金/不规则还本付息                                                                       |
| interest_rate_type_id             | int           | 利率类型 ID；建立字典            | 是        | 固定利率/浮动利率/分段利率                                                                                                        |
| base_rate                         | decimal(8,4)  | 基准利率（%）                 | 否        | 如：4.3500 表示 4.35%                                                                                                     |
| float_type_id                     | int           | 浮动类型 ID；建立字典            | 否        | 上浮/下浮                                                                                                                 |
| float_ratio                       | int           | 浮动比例                    | 否        |                                                                                                                       |
| float_mode_id                     | int           | 浮动模式 ID；建立字典            | 否        | BP/%                                                                                                                  |
| contract_rate                     | decimal(8,4)  | 合同利率（%）                 | 是        | 如：5.2500 表示 5.25%                                                                                                     |
| interest_payment_cycle_id         | int           | 结息方式/还款分期方式             | 是        | 前端选每月则存 1/每季度则存 3/每半年则存 5/每年存 12/自定义；还本付息方式为“分期还本付息/到期一次性还本，分期付息/到期一次性还本付息”时存的值是“结息方式”的月数值。等额本息/等额本金时存的值是“还款分期方式”的月数值 |
| first_interest_date               | datetime      | 首次付息日/首次还款日             | 否        | 分期还本付息/到期一次性还本，分期付息/到期一次性还本付息存的值是“首次付息日”。等额本息/等额本金时存的值是“首次还款日”                                                        |
| interest_before_payment           | tinyint(1)    | 结息日是否为付息日前一天            | 是        | 0:否 1:是                                                                                                               |
| interest_with_principal           | tinyint(1)    | 利随本清                    | 是        | 0:否 1:是                                                                                                               |
| annual_interest_days              | smallint      | 年计息天数；建立字段              | 是        | 360/365                                                                                                               |
| count_start_day                   | tinyint(1)    | 计息方式-算头                 | 是        | 0:不算 1:算                                                                                                              |
| count_end_day                     | tinyint(1)    | 计息方式-算尾                 | 是        | 0:不算 1:算                                                                                                              |
| holiday_payment_rule_id           | int           | 付款遇节假日处理方式 ID；建立字典      | 是        | 正常扣款/前一工作日/后一工作日                                                                                                      |
| sync_adjustment_interest_calculat | tinyint(1)    | 利息计算同步调整                | 否        | 0:否 1:是                                                                                                               |
| advance_payment_required          | tinyint(1)    | 提前打款特殊要求                | 是        | 0:否 1:是                                                                                                               |
| advance_days                      | int           | 提前多少天                   | 否        |                                                                                                                       |
| interest_calculation_method       | tinyint(1)    | 计息方式                    | 是        | 0:按日计息 1:按月计息                                                                                                         |
| decimal_handling_method_id        | int           | 小数点处理方式 ID；建立字典         | 是        | 0:向上进位 1:四舍五入                                                                                                         |
| status                            | tinyint       | 业务状态                    | 是        | 0:待提交 1:待审核 2:已审核 3:已完成 9:已取消                                                                                         |
| tenant_id                         | bigint(20)    | 租户编号                    | 否        |                                                                                                                       |
| creator                           | varchar(255)  | 创建人 ID                  | 是        |                                                                                                                       |
| create_time                       | datetime      | 创建时间                    | 是        | DEFAULT CURRENT_TIMESTAMP                                                                                             |
| updater                           | varchar(255)  | 更新人 ID                  | 否        |                                                                                                                       |
| update_time                       | datetime      | 更新时间                    | 否        | ON UPDATE CURRENT_TIMESTAMP                                                                                           |
| deleted                           | tinyint(1)    | 逻辑删除标记                  | 是        | 0:未删除 1:已删除                                                                                                           |

##### 业务梳理
**计算关系**
- 输入放款日期和期限，自动计算出到期日期
- 合同利率 = 基准利率 + 浮动比例（根据浮动类型和模式计算）

**前端逻辑**
- 
- 提前打款特殊要求为是时，后面展示"提前 X 天"的输入框
- 还本付息方式为“分期还本付息/到期一次性还本，分期付息/到期一次性还本付息”时，合同利率后出现一个名为“结息方式”一栏，其中包含这些表单项
	- 每满【选择每日/每季度/每年/自定义的下拉框】【展示所选值的输入框，不是自定义时为 Disable 状态】
	- 首次付息日【根据上一条选择的值，自动计算出日期】
	- 如当月无对应日则为末日，结息日是否为付息日前一天【是否的下拉框】
	- 利随本清：【是否下拉框】
	- 年计息天数：【src/utils/dict.ts 中的ANNUAL_INTEREST_DAYS 的值作为下拉框】
	- 计息方式-算头：【是否下拉框】
	- 计息方式-算尾：【是否下拉框】
	- 付款遇节假日：【src/utils/dict.ts 中的HOLIDAY_PAYMENT_RULE 的值作为下拉框数据源】
	- 利息计算同步调整：【是否下拉框】；（付款遇节假日选择“前一工作日/后一工作日”时展示）
	- 提前打款特殊要求：【是否下拉框】
	- 提前【输入框】天；（当提前打款特殊要求选择为是时展示）
- 还本付息方式为“等额本息/等额本金”时则出现一个名为“还款分期方式”一栏，其中包含这些表单项
	- 每满【选择每日/每季度/每年/自定义的下拉框】【展示所选值的输入框，不是自定义时为 Disable 状态】
	- 首次还款日【根据上一条选择的值，自动计算出日期】
	- 如当月无对应日则为末日，共【输入框】期
	- 计息方式：【src/utils/dict.ts 中的INTEREST_CALCULATION_METHOD 的值作为下拉框数据源】
	- 小数点处理方式：【src/utils/dict.ts 中的DECIMAL_HANDLING_METHOD 的值作为下拉框数据源】

#### **还款付息计划**

##### 表结构 (payment_plan)

| **字段名称**                   | **字段类型**      | **字段说明**     | **是否必填** | **数据范围/格式**                         | **备注**                                 |
| -------------------------- | ------------- | ------------ | -------- | ----------------------------------- | -------------------------------------- |
| id                         | bigint        | 主键 ID，自增     | 是        |                                     | PRIMARY KEY                            |
| basic_info_id              | bigint        | 基本信息表关联 ID   | 是        |                                     | 外键关联                                   |
| payment_type               | varchar(20)   | 付款类型         | 是        | REPAYMENT:还本 INTEREST:付息 MIXED:本息合并 | 区分还本、付息或本息合并                           |
| payment_date               | datetime      | 付款日期         | 是        | YYYY-MM-DD 格式                       |                                        |
| principal_amount           | decimal(20,2) | 还本金额（元）      | 否        | 正数，保留 2 位小数                         | payment_type=REPAYMENT或MIXED时可填        |
| interest_amount_calculated | decimal(20,2) | 付息金额（计算值）（元） | 否        | 正数，保留 2 位小数                         | payment_type=INTEREST或MIXED时填写，系统自动计算  |
| interest_amount_confirmed  | decimal(20,2) | 付息金额（确认值）（元） | 否        | 正数，保留 2 位小数                         | payment_type=INTEREST或MIXED时填写，手动确认或调整 |
| remark                     | varchar(500)  | 备注，补充说明信息    | 否        | 长度不超过 500 字符                        |                                        |
| tenant_id                  | bigint        | 租户编号         | 否        |                                     |                                        |
| creator                    | varchar(255)  | 创建人 ID       | 是        |                                     |                                        |
| create_time                | datetime      | 创建时间         | 是        |                                     | DEFAULT CURRENT_TIMESTAMP              |
| updater                    | varchar(255)  | 更新人 ID       | 否        |                                     |                                        |
| update_time                | datetime      | 更新时间         | 否        |                                     | ON UPDATE CURRENT_TIMESTAMP            |
| deleted                    | tinyint(1)    | 逻辑删除标记       | 是        | 0:未删除 1:已删除                         |                                        |

##### 业务梳理

**计算关系**
- **还本记录（REPAYMENT）**：
  - 还本计划总金额应等于基本信息中的放款金额
  - 还本日期应在放款日期和到期日期之间

- **付息记录（INTEREST）**：
  - 付息金额（计算值） = 放款金额 × 年利率 × (占用天数 / 年计息天数);同时需要查看计息方式-算头/算尾模式是否开启。
  - 付息金额（确认值）默认等于计算值，可手动调整

- **本息合并记录（MIXED）**：
  - 总金额 = principal_amount + interest_amount_confirmed（前端实时计算）
  - 适用于等额本息、等额本金等还款方式

**字段约束**
- payment_type=REPAYMENT 时，principal_amount 必填，利息相关字段为空
- payment_type=INTEREST 时，interest_amount_calculated 必填，principal_amount为空
- payment_type=MIXED 时，principal_amount、interest_amount_calculated、display_category 必填
- 付款日期应在放款日期和到期日期之间

**前端回显时的逻辑**
- **还本计划展示**：
  - 显示 payment_type=REPAYMENT 的记录
  - 基本信息"还本付息方式"为"分期还本付息"时，展示"新增还本"按钮
  - 基本信息"还本付息方式"为"到期一次性还本"时，自动生成一条还本记录
  
- **付息计划展示**：
  - 显示 payment_type=INTEREST 的记录
  - 展示"生成付息计划"按钮，根据基本信息自动生成付息记录
  

**业务场景**
- **等额本息/等额本金**：使用 MIXED 类型，一条记录包含本金和利息
- **分期还本付息/到期一次性还本付息**：还本/付息计划分别使用 REPAYMENT 和 INTEREST 类型存储

**前端展示逻辑**

- 还本付息方式为“分期还本付息”时，“提前打款特殊要求”后会出现“还本计划”与“付息计划”一栏，其中分别包含 2 个表格：
【新增按钮，可以自己新增还款条目，自己选择日期和还本金额】

（补充：表格 1 中每行数据都payment_type 都设置为 REPAYMENT）

| 序号         | 还本日期 | 还本金额 | 备注  |
| ---------- | ---- | ---- | --- |
| 根据条目实时生成序号 |      |      |     |

（补充：表格 2 中每行数据都 payment_type 都设置为 INTEREST）

【生成付息计划的按钮，可以手动触发】

| 序号                                     | 付息日期              | 付息金额（计算值） | 付息金额（确认值） | 备注  |
| -------------------------------------- | ----------------- | --------- | --------- | --- |
| 根据条目实时生成序号                             | 根据放款日、结息方式、期限计算得出 |           |           |     |
| 付息计划条目可以根据之前的的信息自动触发计划，也可以自己点按钮手动再触发计算 |                   |           |           |     |

- 还本付息方式为“到期一次性还本，分期付息”时，“提前打款特殊要求”后会出现“还本计划”一栏，其中分别包含 2个表格：

（补充：表格 1 中每行数据都 payment_type 都设置为 REPAYMENT）

| 序号         | 还本日期        | 还本金额        | 备注       |
| ---------- | ----------- | ----------- | -------- |
| 根据条目实时生成序号 | 基本信息中到期日的时间 | 基本信息中的放款金额值 | 自动回填“还本” |

（补充：表格 2 中每行数据都 payment_type 都设置为 INTEREST）
【生成付息计划的按钮，可以手动触发】

| 序号         | 付息日期              | 付息金额（计算值） | 付息金额（确认值） | 备注  |
| ---------- | ----------------- | --------- | --------- | --- |
| 根据条目实时生成序号 | 根据放款日、结息方式、期限计算得出 |           |           |     |

- 还本付息方式为“到期一次性还本付息”时，“提前打款特殊要求”后会出现“还本计划”一栏，其分别中包含 2个表格：

（补充：表格 1 中每行数据都 payment_type 都设置为 REPAYMENT）

| 序号         | 还本日期        | 还本金额        | 备注       |
| ---------- | ----------- | ----------- | -------- |
| 根据条目实时生成序号 | 基本信息中到期日的时间 | 基本信息中的放款金额值 | 自动回填“还本” |

（补充：表格 2 中每行数据都 payment_type 都设置为 INTEREST）

| 序号         | 付息日期        | 付息金额（计算值） | 付息金额（确认值） | 备注  |
| ---------- | ----------- | --------- | --------- | --- |
| 根据条目实时生成序号 | 基本信息中到期日的时间 | 计算出的付息金额  | 手动确定的付息金额 |     |

- 还本付息方式为“等额本息”时，“小数点处理方式”后会出现“还本付息”一栏，其中包含一个表格：

（补充：表格中每行数据都 payment_type 都设置为 MIXED）

| 序号         | 还款日期                | 本金(元) | 利息(元) | 合计(元)    | 备注       |
| ---------- | ------------------- | ----- | ----- | -------- | -------- |
| 根据条目实时生成序号 | 根据放款日、还款分期方式、期限计算得出 |       |       | 本金+利息的总和 | 自动回填“本息” |

- 还本付息方式为“等额本金”时，“小数点处理方式”后会出现“还本付息”一栏，其中包含一个表格：

（补充：表格中每行数据都 payment_type 都设置为 MIXED）

| 序号         | 还款日期                | 本金(元) | 利息(元) | 合计(元)    | 备注       |
| ---------- | ------------------- | ----- | ----- | -------- | -------- |
| 根据条目实时生成序号 | 根据放款日、还款分期方式、期限计算得出 |       |       | 本金+利息的总和 | 自动回填“本息” |

#### **质押信息**

##### 表结构 (使用已经存在的 pledge_info 表)

**说明**：质押贷款的质押信息复用票据贴现中的质押信息表结构，通过 `basic_info_id` 字段关联到质押贷款基本信息表。

**字段约束**
- 质押存单的存款金额总和应不少于贷款金额的一定比例（风控要求）
- 质押存单的到期日期应不早于贷款到期日期


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

## 费用及往来支付

### 费用支付
#### 基本信息

##### 表(expense_payment_basic_info)

| **字段名称**                  | **字段类型**      | **字段说明**            | **是否必填** | **数据范围/格式**   | **备注**                        |
| ------------------------- | ------------- | ------------------- | -------- | ------------- | ----------------------------- |
| id                        | bigint        | 主键 ID，自增            | 是        |               | PRIMARY KEY                   |
| payment_no                | varchar(64)   | 支付单号，用于标识付款单的编号     | 是        | 长度不超过 64 字符   | UNIQUE KEY                    |
| payer_entity_id           | bigint        | 付款单位 ID             | 是        |               | 外键关联                          |
| payer_entity_name         | varchar(128)  | 付款单位名称              | 是        | 长度不超过 128 字符  |                               |
| expense_category_id       | int           | 费用项 ID，费用的项目类别；建立字典 | 是        | 如"手续费"、"咨询费"等 | 字典表关联                         |
| payee_entity_id           | bigint        | 收款单位 ID             |          |               |                               |
| payee_entity_name         | varchar(128)  | 收款单位名称              | 否        | 长度不超过 128 字符  |                               |
| payee_account             | varchar(64)   | 收款账号，收款的银行账号        | 否        | 长度不超过 64 字符   |                               |
| payee_bank                | varchar(128)  | 开户行，收款账号对应的开户银行     | 否        | 银行全称或标准简称     |                               |
| payment_date              | datetime      | 支付日期，付款的日期          | 是        | YYYY-MM-DD 格式 |                               |
| payment_amount            | decimal(20,2) | 支付金额（元），付款的金额       | 是        | 正数，保留 2 位小数   |                               |
| consume_income            | tinyint(1)    | 是否消耗中收，标记是否消耗中收     | 否        | 0:否 1:是       | DEFAULT 0                     |
| related_financing_project | varchar(256)  | 关联融资项目，关联的融资项目信息    | 否        | 长度不超过 256 字符  |                               |
| payment_reason            | text          | 付款事由，付款的原因或事由描述     | 否        |               |                               |
| status                    | tinyint       | 业务状态                | 是        |               | 0:待提交 1:待审核 2:已审核 3:已完成 9:已取消 |
| tenant_id                 | bigint        | 租户编号                | 否        |               |                               |
| creator                   | varchar(255)  | 创建人 ID              | 是        |               |                               |
| create_time               | datetime      | 创建时间                | 是        |               | DEFAULT CURRENT_TIMESTAMP     |
| updater                   | varchar(255)  | 更新人 ID              | 否        |               |                               |
| update_time               | datetime      | 更新时间                | 否        |               | ON UPDATE CURRENT_TIMESTAMP   |
| deleted                   | tinyint(1)    | 逻辑删除标记              | 是        | 0:未删除 1:已删除   |                               |

前端展示逻辑
【是否消耗中收】为是是，后面展示【关联融资项目输入框】

#### 附件信息

##### 表（框架自带）

##### 显示效果

| 序号  | 资料名称 | 是否必传 | 归档属性                 | 附件信息                                  |
| --- | ---- | ---- | -------------------- | ------------------------------------- |
| 1   | 支付凭证 | 必传   | 【单选框：全部归档、暂时有缺、无此类型】 | 【上传文件按钮（文件上传数量不限制，单个文件大小不限制，文件格式不限制）】 |
| 2   | 发票   | 不必传  |                      | 【上传文件按钮（文件上传数量不限制，单个文件大小不限制，文件格式不限制）】 |

##### 接口和上传逻辑

参考 src/views/xyzc/investproject/components/InvertFilesForm.vue 

#### 走账流程

##### 表结构 (payment_process)

| **字段名称**           | **字段类型**      | **字段说明**   | **是否必填** | **数据范围/格式**       | **备注**                      |
| ------------------ | ------------- | ---------- | -------- | ----------------- | --------------------------- |
| id                 | bigint        | 主键 ID，自增   | 是        |                   | PRIMARY KEY                 |
| basic_info_id      | bigint        | 基本信息表关联 ID | 是        |                   | 不需要外键约束，这里可能关联多个表的主键        |
| payer_name         | varchar(128)  | 付款户名       | 是        | 长度不超过 128 字符      |                             |
| payer_account      | varchar(64)   | 付款账号       | 是        | 长度不超过 64 字符       |                             |
| payer_bank         | varchar(128)  | 付款开户行      | 是        | 银行全称或标准简称         |                             |
| payee_account_type | int           | 收款账户类别 ID  | 是        | 对公账户/对私账户/同业账户/其他 | 字典值                         |
| payee_name         | varchar(128)  | 收款户名       | 是        | 长度不超过 128 字符      |                             |
| payee_account      | varchar(64)   | 收款账号       | 是        | 长度不超过 64 字符       |                             |
| payee_bank         | varchar(128)  | 收款开户行      | 是        | 银行全称或标准简称         |                             |
| transfer_amount    | decimal(20,2) | 转账金额       | 是        | 正数，保留 2 位小数       |                             |
| remark             | varchar(500)  | 备注，补充说明信息  | 否        | 长度不超过 500 字符      |                             |
| tenant_id          | bigint        | 租户编号       | 否        |                   |                             |
| creator            | varchar(255)  | 创建人 ID     | 是        |                   |                             |
| create_time        | datetime      | 创建时间       | 是        |                   | DEFAULT CURRENT_TIMESTAMP   |
| updater            | varchar(255)  | 更新人 ID     | 否        |                   |                             |
| update_time        | datetime      | 更新时间       | 否        |                   | ON UPDATE CURRENT_TIMESTAMP |
| deleted            | tinyint(1)    | 逻辑删除标记     | 是        | 0:未删除 1:已删除       |                             |

##### 业务梳理

**计算关系：**
- 走账流程中所有转账金额总和应等于基本信息中的支付金额
- 序号按照走账的先后顺序自动生成或手动调整

**字段约束：**
- 付款账号和收款账号不能相同
- 转账金额必须大于 0
- 收款账户类别需要从字典中选择

**业务场景：**
- **直接支付**：无走账流程，直接从付款单位账户转至收款单位账户
- **多级走账**：需要通过多个中间账户进行转账的复杂支付流程
- **同业转账**：银行间的资金划转流程

##### 显示效果

##### 新增表单

【新增走账流程按钮】

| 序号       | 付款户名 | 付款账号       | 开户行   | 收款账户类别 | 收款户名  | 收款账号       | 开户行   | 金额        | 备注   | 操作    |
| -------- | ---- | ---------- | ----- | ------ | ----- | ---------- | ----- | --------- | ---- | ----- |
| 序号前端自动生成 | 手动输入 | 手动输入       | 手动输入  | 下拉选择   | 手动输入  | 手动输入       | 手动输入  | 手动输入      | 手动输入 | 删除记录键 |
| 1        | 示例银行 | 1234567890 | 示例开户行 | 对公账户   | 示例收款方 | 0987654321 | 收款开户行 | 25,000.00 |      | 删除记录键 |

**表单字段说明：**
- 收款账户类别：下拉选择（对公账户/对私账户/同业账户/其他）
- 金额：支持千分位显示，自动计算总和并与基本信息支付金额进行校验

**前端校验规则：**
- 所有走账流程金额总和 = 基本信息支付金额
- 付款账号与收款账号不能相同
- 账号格式校验（数字、长度限制）

### 往来支付

#### 基本信息

##### 表(transaction_payment_basic_info)

| **字段名称**                 | **字段类型**      | **字段说明**          | **是否必填** | **数据范围/格式**     | **备注**                        |
| ------------------------ | ------------- | ----------------- | -------- | --------------- | ----------------------------- |
| id                       | bigint        | 主键 ID，自增          | 是        |                 | PRIMARY KEY                   |
| payment_no               | varchar(64)   | 支付单号，用于标识付款单的编号   | 是        | 长度不超过 64 字符     | UNIQUE KEY                    |
| payment_type_id          | int           | 类型 ID，往来款项类型；建立字典 | 是        | 如"业务往来"等        | 字典表关联                         |
| project_name             | varchar(128)  | 项目名称              | 是        | 长度不超过 128 字符    |                               |
| transaction_item_id      | int           | 往来款项 ID；建立字典      | 是        | 如"信托保证基金"等      | 字典表关联                         |
| recovery_method_id       | int           | 回收方式 ID；建立字典      | 是        | 如"到期回收"、"提前回收"等 | 字典表关联                         |
| payment_date             | datetime      | 支付日期              | 是        | YYYY-MM-DD 格式   |                               |
| payment_amount           | decimal(20,2) | 支付金额（元）           | 是        | 正数，保留 2 位小数     |                               |
| payer_entity_id          | bigint        | 付款单位 ID           | 是        |                 | 外键关联                          |
| payer_entity_name        | varchar(128)  | 付款单位名称，付款的单位名称    | 是        | 长度不超过 128 字符    |                               |
| has_interest             | tinyint(1)    | 有无利息              | 是        | 0:无利息 1:有利息     | DEFAULT 0                     |
| annual_rate              | decimal(8,4)  | 年利率（%）            | 否        | 百分比形式，保留 4 位小数  | 如：3.2500 表示 3.25%，有利息时必填      |
| expected_recovery_date   | datetime      | 预计回收日期            | 是        | YYYY-MM-DD 格式   |                               |
| expected_recovery_amount | decimal(20,2) | 预计回收金额（元）         | 是        | 正数，保留 2 位小数     |                               |
| payment_reason           | text          | 付款事由，付款的原因或事由描述   | 是        |                 |                               |
| status                   | tinyint       | 业务状态              | 是        |                 | 0:待提交 1:待审核 2:已审核 3:已完成 9:已取消 |
| tenant_id                | bigint        | 租户编号              | 否        |                 |                               |
| creator                  | varchar(255)  | 创建人 ID            | 是        |                 |                               |
| create_time              | datetime      | 创建时间              | 是        |                 | DEFAULT CURRENT_TIMESTAMP     |
| updater                  | varchar(255)  | 更新人 ID            | 否        |                 |                               |
| update_time              | datetime      | 更新时间              | 否        |                 | ON UPDATE CURRENT_TIMESTAMP   |
| deleted                  | tinyint(1)    | 逻辑删除标记            | 是        | 0:未删除 1:已删除     |                               |

**前端显示逻辑**

如果【有无利息】为否，则不现实【年利率输入框】

#### 走账流程

##### 表（使用之前的表）