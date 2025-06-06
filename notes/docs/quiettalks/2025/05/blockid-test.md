---
title: 块测试
icon: pen-nib
order: 
date: 2025-05-30
category:
  - 日记
tags:
---
---

# 块标识测试

## 基本示例

这是一个带有块标识的段落。 ^block1

7
7
8
8
9
9


这是另一个普通段落，没有块标识。

8
8
79
79
7


这是第三个段落，也有一个块标识。 ^block2


13


1


4141

## 链接测试

下面是到块标识的链接：

- [链接到第一个块](#^block1)
- [链接到第二个块](#block2)
- [链接到不存在的块](#^nonexistent)

## 标题测试

### 这是一个带有块标识的标题 ^heading1

### 这是一个普通标题

## 列表测试

- 列表项 1 ^list1
- 列表项 2
- 列表项 3 ^list3

1. 有序列表项 1 ^ordered1
2. 有序列表项 2
3. 有序列表项 3 ^ordered3

## 引用块测试

> 这是一个引用块，带有块标识 ^quote1

## 跨文档链接测试

[链接到动态配置文档中的块](./docs/code/backend/java/dynamicconfig.md#^pc0bpw)
