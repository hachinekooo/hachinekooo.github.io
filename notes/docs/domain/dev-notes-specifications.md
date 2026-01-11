---
title: 开发小记之规范
icon: file
order:
date: 2025-08-05
category:
  - Java
tags:
---
本文记录了开发过程中遇到的各类实践问题和解决方案。

核心理念： 实用主义优于完美主义，避免过度设计和盲目追求规范化。

<!-- more -->

## 代码规范 Code Specifications


> [!TIP] 
> 不要过度抽取方法 DO NOT OVER-EXTRACT METHODS

- 抽取时机
	- 如果抽取的方法只被一个地方调用，可能就是过度抽取了。当相同的代码出现三次时，再考虑抽取，避免看到任何重复就立即抽取方法
	- 每个方法应该只做一件事（`Single Responsibility Principle`）
- 抽取动机
	- 好的抽取动机：真正的重复使用、复杂逻辑简化
	- 不好的抽取动机：为了减少方法长度而盲目拆分

> 代码的可读性更重要。有时候直观的重复代码比过度抽取的"优雅"代码更容易理解和维护。


> [!TIP] 
> 不要过度追求所谓的规范性 DO NOT OVER-PURSUE THE SO-CALLED “STANDARDIZATION”

- 关于 DTO 
	- 用于接收想要接受的前端参数，避免恶意用户传递过量参数，导致不可控行为。

- 关于 VO
	- 当 DTO 不能满足前端展示需求时，才需要引入 VO
	- 比如 API 的返回数据需要进行多个业务数据组合，或者前端需要的数据结构与数据库差异很大
	- 需要显示统计信息，显示衍生字段，特定格式化等时
	- 需要分页信息（总记录数、当前页、页大小等）


对于大多数英语使用这两个即可：`utf8mb4` 和 `utf8mb4_unicode_ci` 

- utf8mb4 character set supports full UTF-8 encoding, including emojis and special characters
- utf8mb4_unicode_ci collation provides accurate sorting for international characters
- Case-insensitive (不区分大小写) comparison