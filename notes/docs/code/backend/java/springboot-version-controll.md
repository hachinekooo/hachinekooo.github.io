---
title: SpringBoot项目版本管理的几种方式
icon: file
order: 
date: 2025-04-25
category:
  - Java
tags:
  - SpringBoot
---


## 使用 BOM 依赖管理

### 什么是BOM
BOM（Bill of Materials） 是 Maven 中的一种依赖管理机制，主要用于集中管理项目中所有依赖的版本号。它的核心作用是确保项目中的依赖版本一致，避免因版本冲突导致的问题。
在 Maven 中，BOM 是一个特殊的 POM 文件，通常以 `<packaging>pom</packaging>` 的形式存在，并通过 `<dependencyManagement>` 定义一组依赖及其版本号。其他模块可以通过 import 的方式引入这个 BOM，从而继承其中定义的依赖版本。

---

### BOM 的常见形式

BOM（Bill of Materials）通常以以下形式出现：

#### 1. **独立的 Maven 模块**
>一个 maven 项目中只有一个 pom 文件，只做版本管理

   - **特点**：
     - BOM 是一个独立的 Maven 模块，专门用于集中管理依赖版本。
     - 它通常只包含一个 `pom.xml` 文件，没有其他代码或资源文件。
   - **结构**：
     ```plaintext
     xxxprojct-dependencies/
     ├── pom.xml
     ```

   - **pom 内容示例**：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>example-bom</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>

    <name>Example BOM</name>
    <description>示例 BOM 文件，用于统一依赖版本管理</description>

    <properties>
        <spring.boot.version>2.7.18</spring.boot.version>
        <mybatis.plus.version>3.5.9</mybatis.plus.version>
        <hutool.version>5.8.35</hutool.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <!-- Spring Boot -->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring.boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!-- MyBatis Plus -->
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-boot-starter</artifactId>
                <version>${mybatis.plus.version}</version>
            </dependency>

            <!-- Hutool 工具类 -->
            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-all</artifactId>
                <version>${hutool.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <!-- 将 BOM 文件打包发布到 Maven 仓库时，生成一个“扁平化”的 POM 文件，去掉不必要的构建信息（如插件配置、模块化信息等），只保留依赖管理相关的内容，方便其他项目直接引用 -->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>flatten-maven-plugin</artifactId>
                <version>1.6.0</version>
                <configuration>
                    <flattenMode>bom</flattenMode>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```


 - 在需要的地方，如项目的根 pom 文件中通过 `import` 引用。

 ```xml
 <dependency>
	 <groupId>com.examplek</groupId>
	 <artifactId>xxxprojct-dependencies</artifactId>
	 <version>${revision}</version>
	 <type>pom</type>
	 <scope>import</scope>
 </dependency>
 ```


---

#### 2. **嵌入在父 POM 中**
   - **特点**：
     - BOM 的功能可以直接嵌入到父 POM 中，作为父 POM 的一部分。
     - 子模块继承父 POM 后，会自动继承其中定义的依赖版本。
   - **结构**：
     ```plaintext
     parent-module/
     ├── pom.xml
     ├── module-a/
     │   └── pom.xml
     └── module-b/
         └── pom.xml
     ```

   - **示例**：
     如果直接在项目根 pom 文件 `<dependencyManagement>` 中定义了所有依赖版本，那么它也可以充当 BOM 的角色。

     ```xml
     <dependencyManagement>
         <dependencies>
             <dependency>
                 <groupId>org.springframework.boot</groupId>
                 <artifactId>spring-boot-dependencies</artifactId>
                 <version>2.7.18</version>
                 <type>pom</type>
                 <scope>import</scope>
             </dependency>
             ...
         </dependencies>
     </dependencyManagement>
     ```


---

#### 3. **第三方提供的 BOM**
   - **特点**：
     - 一些流行的框架或库（如 Spring Boot、Spring Cloud 等）会提供官方的 BOM，供开发者直接使用。
     - 开发者可以通过 `import` 引用这些 BOM，从而继承框架推荐的依赖版本。
   - **示例**：
     ```xml
     <dependencyManagement>
         <dependencies>
             <!-- Spring Boot 官方 BOM -->
             <dependency>
                 <groupId>org.springframework.boot</groupId>
                 <artifactId>spring-boot-dependencies</artifactId>
                 <version>2.7.18</version>
                 <type>pom</type>
                 <scope>import</scope>
             </dependency>
             <!-- Spring Cloud 官方 BOM -->
             <dependency>
                 <groupId>org.springframework.cloud</groupId>
                 <artifactId>spring-cloud-dependencies</artifactId>
                 <version>2021.0.9</version>
                 <type>pom</type>
                 <scope>import</scope>
             </dependency>
         </dependencies>
     </dependencyManagement>
     ```


---

#### 4. **多模块项目中的共享模块**
   - **特点**：
     - 在多模块项目中，BOM 可以作为一个共享模块存在，供其他模块引用。
     - 这种方式适合大型项目，尤其是微服务架构。
   - **结构**：
     ```plaintext
     project-root/
     ├── bom-module/
     │   └── pom.xml
     ├── module-a/
     │   └── pom.xml
     └── module-b/
         └── pom.xml
     ```

 如 `bom-module` 就是这样的共享模块，其他模块的 pom 中通过 `import` 引用了它。

---


