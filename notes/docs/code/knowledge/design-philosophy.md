---
title: 一些设计哲学
icon: file
order: 
date: 2025-07-04
category: 
tags:
---
## Let it crash
让异常自然向上传播，而不是用布尔值来包装错误。这样代码更简洁，错误处理也更统一。

布尔值只用于业务逻辑分支，没异常就意味着成功。No exception means success

