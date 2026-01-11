---
title: 开发小记之后端
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

## 后端 BACKEND

> [!tip] 
> 后端进行类型转换时，最好是使用空值安全的工具类进行转换

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

> [!question] 
> 为什么 Feign 序列化实体类的时候需要全参/无参构造函数？

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

> [!question] 
> Builder 模式是什么？

Builder 模式主要解决了一个便捷性的问题：
- 如果你需要更灵活的构造参数，可能需要写 0-全参个个数的构造方法
- 可以流式调用，便捷性更好
- 在 build 方法中可以进行参数校验
- ...

> [!question] 
> 程序包不存在与找不到符号的问题

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


> [!question] 
> 关于 JSON 序列化

-  `@TableField(typeHandler = JacksonTypeHandler.class)` 注解
	- 实现前台传递的数组类型数据到后台直接转为数组类型的功能
	- 将 Java 中的数组类型序列化为 JSON 字符串存储到数据库
	- 从数据库读取时，将 JSON 字符串反序列化为 Java 数组类型

举例：
```java
@TableName("user")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String name;
    
    // 使用JacksonTypeHandler处理数组类型
    @TableField(typeHandler = JacksonTypeHandler.class)
    private String[] hobbies;
    
   // setter
   // getter
}
```

当前台以 JSON 格式传递包含数组的数据时：
```json
{ "name": "张三", "hobbies": ["读书", "运动", "听音乐"] }
```


```java
	@PostMapping("/user")
    public String addUser(@RequestBody User user) {
        // 这里的user对象中的hobbies已经是String[]类型
        System.out.println("用户爱好数量：" + user.getHobbies().length);
        userService.save(user);
        return "用户添加成功";
    }
```



> [!question]
> 关于日期的处理。前端传参数、SpringBoot 接参、BeanUtils 转换

- 后端对外暴露的 API 接口中，日期字段可以使用 String 类型，更好的兼容性和错误处理
- 内部实体类，使用日期类型，可以获得更好的类型安全支持，性能
- 数据库实体，必须使用日期类型，满足数据库层面的类型约束


```java
public class OptimalUserDTO {
    
    // 对外接口使用字符串（灵活性）
    @JsonProperty("createTime")
    private String createTimeStr;
    
    // 内部处理使用日期类型（类型安全）
    @JsonIgnore
    private LocalDateTime createTime;
    
    // 提供转换方法
    @JsonIgnore
    public LocalDateTime getCreateTime() {
        if (createTime == null && createTimeStr != null) {
            createTime = parseCreateTime(createTimeStr);
        }
        return createTime;
    }
    
    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
        this.createTimeStr = createTime != null ? 
            createTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null;
    }
    
    private LocalDateTime parseCreateTime(String timeStr) {
        // 支持多种格式的解析逻辑
        return TimeUtils.parseFlexible(timeStr);
    }
}
```

## 数据库 DATABASE

在 Java 使用 MybatisX 写多表感觉不是一个明智的选择，还是使用 XML 更清晰  