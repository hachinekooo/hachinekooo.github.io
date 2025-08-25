---
title: 开发小记
icon: file
order:
date: 2025-08-05
category:
  - Java
tags:
---
这里将记录我在开发过程中，遇到的一些小的盲点。待我有时间的时候，便会解决它们。

## 代码规范 Code Specifications


> [!TIP] 不要过度抽取方法 DO NOT OVER-EXTRACT METHODS

- 抽取时机
	- 如果抽取的方法只被一个地方调用，可能就是过度抽取了。当相同的代码出现三次时，再考虑抽取，避免看到任何重复就立即抽取方法
	- 每个方法应该只做一件事（Single Responsibility Principle）
- 抽取动机
	- 好的抽取动机：真正的重复使用、复杂逻辑简化
	- 不好的抽取动机：为了减少方法长度而盲目拆分

> 代码的可读性更重要。有时候直观的重复代码比过度抽取的"优雅"代码更容易理解和维护。


> [!TIP] 不要过度追求所谓的规范性 DO NOT OVER-PURSUE THE SO-CALLED “STANDARDIZATION”

- 关于 DTO 
	- 当需要过滤敏感属性、数据转换、DO 包含无关字段、或有性能优化要求时，才考虑为 API 层创建 DTO。

- 关于 VO
	- 当 DTO 不能满足前端展示需求时，才需要引入 VO
	- 比如 API 的返回数据需要进行多个业务数据组合，或者前端需要的数据结构与数据库差异很大
	- 需要显示统计信息，显示衍生字段，特定格式化等时
	- 需要分页信息（总记录数、当前页、页大小等）


## 前端 FRONTEND

> [!tip] 前端计算后，格式化精度的操作要放在最后的时候去处理

之前我就疏忽给放错位置了，导致算出来的精度不对•ᴗ•💧 

 > [!tip] 前端处理数据时，可以使用 `await`，以确保异步的操作可以同步进行，避免后续操作使用脏数据计算

当时要参与计算的变量打印 log 数据都正常，但是最终计算的不对。后来排查出来原来是这个参数还没有处理完毕时，计算公式就使用脏数据计算并显示了。

## 后端 BACKEND

> [!tip] 后端进行类型转换时，最好是使用空值安全的工具类进行转换

这可以避免将 `null` 值转成 null 字符串的问题（数据库类型设计规范时应该没有这种问题） 

一个类型转换工具实例：
```java
public class TypeConvertUtil {

	// 私有构造器，防止实例化 

    /**
     * Integer转String，空值安全
     * 
     * @param value Integer值
     * @return String值，如果输入为null则返回null
     */
    public static String integerToString(Integer value) {
        return value != null ? String.valueOf(value) : null;
    }

    /**
     * Long转String，空值安全
     * 
     * @param value Long值
     * @return String值，如果输入为null则返回null
     */
    public static String longToString(Long value) {
        return value != null ? String.valueOf(value) : null;
    }
}
```

> [!question] 为什么 Feign 序列化实体类的时候需要全参/无参构造函数？

一句话理解：因为 Feign 默认使用的序列化器是 JACKSON，Jackson反序列化JSON时需要经历以下步骤：
- 创建对象，默认使用无参构造函数，它是整个复杂反序列化流程的起点
- 设置字段值
- 类型分析
- 字段映射
- 类型转换
- 设置字段值
- 处理嵌套对象
- 应用注解
- 各种处理...

> [!question] Builder 模式是什么？

Builder 模式主要解决了一个便捷性的问题：
- 如果你需要更灵活的构造参数，可能需要写 0-全参个个数的构造方法
- 可以流式调用，便捷性更好
- 在 build 方法中可以进行参数校验
- ...

> [!question] 程序包不存在与找不到符号的问题

- 如果报错说"程序包不存在"但文件确实存在 → 依赖问题
- 如果报错说"找不到符号"但类确实存在 → 编译顺序问题


Maven 多模块项目的特点

1. 模块间依赖：A 模块依赖 B 模块，必须先编译 B
2. 本地仓库：依赖的模块必须安装到 ~/.m 2/repository
3. 传递依赖：可能间接依赖其他模块


  问题根源：
  - 这些模块可能有代码变更，但还没有安装到本地仓库
  - 或者之前编译失败，导致本地仓库没有最新的 jar 包
  
  解决方案：`mvn clean install -DskipTests`

  这样可以：
  1. 编译所有模块
  2. 将所有模块安装到本地仓库
  3. 确保依赖关系正确


> [!question] 前端传参数、SpringBoot 接参、BeanUtils 转换





## 数据库 DATABASE

在 Java 使用 MybatisX 写多表感觉不是一个明智的选择，还是使用 XML 更清晰  