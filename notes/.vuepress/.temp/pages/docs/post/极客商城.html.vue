<template><div><h1 id="拆分公共部分" tabindex="-1"><a class="header-anchor" href="#拆分公共部分"><span>拆分公共部分</span></a></h1>
<ul>
<li>提取谁？除了 web 层之外的内容，mapper、service、实体类工具类</li>
<li>如何做？
<ul>
<li>在工程下新建子模块 common
<ul>
<li>把 mapper、service、实体类工具按照一定的层次剪切进来</li>
<li>修改 pom.xml，主要是引入父工程以及倒入子模块需要单独用到的依赖项</li>
</ul>
</li>
<li>修改全局配置文件</li>
<li>测试</li>
</ul>
</li>
</ul>
<h1 id="部署项目" tabindex="-1"><a class="header-anchor" href="#部署项目"><span>部署项目</span></a></h1>
<p>大致步骤：</p>
<ul>
<li>检查项目的 jdk 版本与服务器生产环境的 jdk 版本是否对应</li>
<li>在 idea Maven 窗口中的设置 &quot;跳过测试&quot;</li>
<li>删除父工程的打包插件</li>
<li>在需要打包的子模块中配置打包插件
<ul>
<li>修改主类为子类启动类</li>
<li>skip 去掉</li>
</ul>
</li>
<li>修改路径问题，某些映射路径可能需要对应服务器路径单独设置一遍</li>
<li>在云服务器的 Mysql 中导入相关数据库</li>
<li>向云服务器中上传一些测试图片</li>
</ul>
<p>配置项目可能出现的问题：</p>
<ul>
<li>访问端口不对，检查 server.xml</li>
<li>检查防火墙设置</li>
<li>数据源的配置</li>
</ul>
<p>在服务器中运行项目：
启动 jar 时也可以指定端口：java -jar xxx.jar --server.port=8090</p>
<p>后台运行 jar 并保持日志保存：
<code v-pre>nohup java -jar pengchengBook.jar &gt; catalina.out  2&gt;&amp;1 &amp;</code></p>
<p>查看所有后台进程</p>
<ul>
<li><code v-pre>netstat -tulnp</code></li>
<li><code v-pre>ps -ef</code> （可以查看系统进程）
强制结束进程</li>
<li><code v-pre>kill -9 PID</code></li>
</ul>
<h1 id="雪花算法" tabindex="-1"><a class="header-anchor" href="#雪花算法"><span>雪花算法</span></a></h1>
<p>雪花算法是 64 位 的二进制，一共包含了四部分：</p>
<ul>
<li>1位是符号位，也就是最高位，始终是0，没有任何意义，因为要是唯一计算机二进制补码中就是负数，0才是正数。</li>
<li>41位是时间戳，具体到毫秒，41位的二进制可以使用69年，因为时间理论上永恒递增，所以根据这个排序是可以的。</li>
<li>10位是机器标识，可以全部用作机器ID，也可以用来标识机房ID + 机器ID，10位最多可以表示1024台机器。</li>
<li>12位是计数序列号，也就是同一台机器上同一时间，理论上还可以同时生成不同的ID，12位的序列号能够区分出4096个ID。</li>
</ul>
<p><a href="https://segmentfault.com/a/1190000040964518" target="_blank" rel="noopener noreferrer">参考链接</a></p>
<h1 id="排错" tabindex="-1"><a class="header-anchor" href="#排错"><span>排错</span></a></h1>
<h2 id="参数接收" tabindex="-1"><a class="header-anchor" href="#参数接收"><span>参数接收</span></a></h2>
<ul>
<li>检查前端是否正确发送请求，并且携带对应的参数</li>
<li>检查请求是否可以被正确的方法接收</li>
<li>检查前后端参数名是否匹配</li>
<li>检查后端的方法是否加了 RequestBody（如果需要返回 JSON 时）</li>
<li>检查 Ajax 中发送请求的参数类型是否正确；
<ul>
<li>例如你可能发现你 Ajax 中使用了 JSON.stringify 和 contentType，但是前端接受的不是 JSON 数据；</li>
</ul>
</li>
</ul>
<h1 id="thymeleaf-和-layui" tabindex="-1"><a class="header-anchor" href="#thymeleaf-和-layui"><span>Thymeleaf 和 Layui</span></a></h1>
<p>Thymeleaf 在服务器端获取数据并且填充到模板中，将填充好数据的 html 文件直接返回给浏览器，由浏览器渲染展示成品页面。
Layui，使用 Layui 发送 ajax 请求，在服务器端获取到数据以 JSON 数据的形式返回给 ajax 的回调函数，在函数中会数据进行相关处理。</p>
<blockquote>
<p>[!WARNING]
An alert of type 'warning' using global style 'callout'.</p>
</blockquote>
</div></template>


