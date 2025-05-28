---
title: 请求处理流中的"回响模式"：利用拦截器为过滤器提供上下文
icon: file
order: 
date: 2025-04-27
category:
  - Java
tags:
  - SpringBoot
  - Filter
  - Interceptor
  - 架构设计
  - 设计模式
  - 日志记录
  - API监控
---
## 1. 引言

在现代 Web 应用开发中，请求处理流程的复杂性日益增长。从简单的 CRUD 操作到复杂的业务逻辑处理，每一个 HTTP 请求都需要经历多个处理层次：跨域处理、身份认证、权限校验、参数验证、业务逻辑执行、日志记录等。这些横切关注点的处理通常依赖于 Spring 框架提供的过滤器（Filter）和拦截器（Interceptor）机制。

然而，在实际开发过程中，我们经常遇到这样的困境：过滤器虽然执行得最早，但无法获取到控制器的详细信息；拦截器能够访问 HandlerMethod 等丰富的上下文，却无法将这些信息有效地传递回过滤器层进行统一处理。这种单向的信息流动限制了我们在架构设计上的灵活性。

考虑一个典型的场景：我们需要记录 API 访问日志，包含请求的基本信息（IP、路径、参数）以及具体的控制器方法信息（类名、方法名、注解信息）。传统的做法要么在过滤器中记录不完整的信息，要么在拦截器中重复处理已经在过滤器中处理过的逻辑，导致代码分散和职责不清。

正是在这样的背景下，"回响模式"（Echo Pattern）应运而生。这个模式巧妙地利用了 Spring 框架的请求属性机制，在保持过滤器和拦截器各自职责清晰的前提下，实现了信息的双向流动，让拦截器中获取的丰富上下文信息能够"回响"到过滤器层，从而实现更优雅的横切关注点处理。

本文将深入探讨"回响模式"的设计理念、实现原理和最佳实践，并通过具体的 API 访问日志记录案例，展示如何在真实项目中应用这种模式来解决传统架构的局限性。

## 2. 过滤器与拦截器的基本概念

### 过滤器（Filter）的角色与职责

过滤器是 Servlet 规范的一部分，工作在 Servlet 容器级别，对所有进入 Web 应用的请求进行预处理和后处理。在 Spring Boot 应用的请求处理流程中，过滤器是最早介入的组件，具有以下特点：

**优势：**

- 执行时机最早，能够对原始的 HTTP 请求进行处理
- 不依赖 Spring 容器，可以处理 Spring 管理之外的请求
- 适合处理通用的横切关注点，如 CORS、编码转换、请求体缓存等
- 可以完全控制请求的生命周期，包括是否继续执行后续处理

**局限性：**

- 无法获取 Spring MVC 的上下文信息，如 HandlerMethod、Controller 实例等
- 不能直接访问 Spring 的依赖注入和 AOP 功能
- 处理逻辑相对简单，难以实现复杂的业务判断

### 拦截器（Interceptor）的特性与优势

拦截器是 Spring MVC 框架的组件，工作在 DispatcherServlet 内部，能够在请求到达控制器前后进行处理。相比过滤器，拦截器具有更丰富的上下文信息：

**优势：**

- 可以获取 HandlerMethod，了解即将执行的控制器方法详情
- 能够访问 Spring 容器中的 Bean，享受依赖注入的便利
- 提供了更细粒度的切入点：preHandle、postHandle、afterCompletion
- 可以根据具体的控制器方法来决定处理逻辑

**局限性：**

- 执行时机较晚，一些基础的请求处理可能已经在过滤器层完成
- 只能处理 Spring MVC 管理的请求，对于静态资源等直接访问无效
- 无法像过滤器那样完全控制请求的执行流程

### 传统执行流程中的限制

在传统的 Spring Boot 应用中，请求的执行流程遵循严格的单向模式：

```
请求进入 → 过滤器链 → DispatcherServlet → 拦截器 → 控制器 → 拦截器 → DispatcherServlet → 过滤器链 → 响应返回
```

这种单向流动虽然保证了处理流程的清晰性，但也带来了信息孤岛的问题：过滤器无法利用拦截器中获取的丰富上下文信息，导致在实现某些横切关注点时面临困难。

举个具体的例子
- CacheRequestBodyFilter: 缓存请求体
- **ApiAccessLogFilter**: 记录 API 访问日志，需要收集完整的请求信息

传统方式下，ApiAccessLogFilter 只能记录基础的请求信息（如 URL、IP、请求参数），而无法获取到具体的控制器方法信息，这就限制了日志的完整性和可用性。

这正是"回响模式"要解决的核心问题：如何在保持现有架构清晰性的前提下，实现信息的有效回传，让过滤器也能享受到拦截器提供的丰富上下文信息。

## 原理解析

### 核心思想
"回响模式"的核心思想非常简洁：利用 HttpServletRequest 作为信息载体，实现拦截器到过滤器的信息传递。一句话描述就是：HttpServletRequest 就像是封装了一个请求信息的 Map，我们不仅可以从中获取请求信息，同时也能往里存放自定义信息，从而实现跨层级的信息传递。

```java
// 简化的结构示意
public class HttpServletRequestImpl implements HttpServletRequest {
    
    // 1. HTTP基本信息
    private String method;          // GET, POST, PUT等
    private String requestURI;      // 请求URI
    private String queryString;     // 查询参数
    private String protocol;        // HTTP/1.1
    
    // 2. 请求头信息
    private Map<String, List<String>> headers;
    
    // 3. 请求参数
    private Map<String, String[]> parameters;
    
    // 4. 会话信息
    private HttpSession session;
    
    // 5. 请求体
    private ServletInputStream inputStream;
    
    // 6. 自定义属性存储 - 这就是我们"回响模式"所用到的属性
    private Map<String, Object> attributes;
    
    // 7. 路径信息
    private String contextPath;
    private String servletPath;
    private String pathInfo;

}
```

### 关键代码 :

- 在拦截器环节，我们将具体的 Handler 存储起来
```java
@Override  
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {  
    // 记录 HandlerMethod，提供给 Filter 使用  
    HandlerMethod handlerMethod = handler instanceof HandlerMethod ? (HandlerMethod) handler : null;  
    if (handlerMethod != null) {  
        request.setAttribute(ATTRIBUTE_HANDLER_METHOD, handlerMethod);  
    }  
  
    return true;  
}
```

- filterChain.doFilter 方法执行完毕后，执行记录日志方法
```java
    private void processApiRequest(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        LocalDateTime beginTime = LocalDateTime.now();
        Map<String, String> queryString = ServletUtil.getParamMap(request);
        String requestBody = ServletUtil.getBody(request);

        try {
            // 执行下一个过滤器
            filterChain.doFilter(request, response);
            // 成功处理，记录正常日志
            createApiAccessLog(request, beginTime, queryString, requestBody, null);
        } catch (Exception ex) {
            // 异常处理，记录异常日志
            createApiAccessLog(request, beginTime, queryString, requestBody, ex);
            throw ex;
        }
    }
```


```
请求进入 → 过滤器链 → DispatcherServlet → 拦截器 → 控制器 → 拦截器（放入Handler信 息） → DispatcherServlet → 过滤器链中的日志过滤器(创建日志) → 响应返回
```


### 为什么称之为 “回响”？
回响，就像是往深井中投下的一块石头，片刻之后，声音便会传入你的耳中，信息也随之而来，你知道大概有多深，是否有水...

这种模式的好处在于，信息是自然流动的，并不需要什么复杂的设计。同时也让过滤器和拦截器的职责更加清晰，拦截器负责信息收集，过滤器负责统一处理。

## 安全性
每个 HTTP 请求都有独立的 HttpServletRequest 实例，单个请求在整个生命周期中都是由同一个线程处理，请求和请求之间天然隔离，不存在多个请求访问到同一个 HttpServletRequest 对象的情况。

在使用 Map 是最典型的一个问题就是内存泄漏了，而 HttpServletRequest 可以底层就用到了 Map。但是在这个场景下基本不可能存在内存泄漏的问题。因为首先 HandlerMethod 对象很小，在一个就是请求结束时整个对象都会被 GC 回收。
