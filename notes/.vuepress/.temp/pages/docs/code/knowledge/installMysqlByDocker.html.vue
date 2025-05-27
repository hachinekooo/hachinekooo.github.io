<template><div><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -d</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mysql</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 3306:3306</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -e</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> TZ=Asia/Shanghai</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -e</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> MYSQL_ROOT_PASSWORD=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">123</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  mysql</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>docker run -d</code> ：创建并运行一个容器，<code v-pre>-d</code>则是让容器以后台进程运行</li>
<li><code v-pre>--name</code> <code v-pre>mysql</code> : 给容器起个名字叫<code v-pre>mysql</code>，你可以叫别的</li>
<li><code v-pre>-p 3306:3306</code> : 设置端口映射。
<ul>
<li><strong>容器是隔离环境</strong>，外界不可访问。但是可以<strong>将<strong><strong>宿主机</strong></strong>端口****映射容器内到端口</strong>，当访问宿主机指定端口时，就是在访问容器内的端口了。</li>
<li>容器内端口往往是由容器内的进程决定，例如MySQL进程默认端口是3306，因此容器内端口一定是3306；而宿主机端口则可以任意指定，一般与容器内保持一致。</li>
<li>格式： <code v-pre>-p 宿主机端口:容器内端口</code>，示例中就是将宿主机的3306映射到容器内的3306端口</li>
</ul>
</li>
<li><code v-pre>-e TZ=Asia/Shanghai</code> : 配置容器内进程运行时的一些参数
<ul>
<li>格式：<code v-pre>-e KEY=VALUE</code>，KEY和VALUE都由容器内进程决定</li>
<li>案例中，<code v-pre>TZ``=Asia/Shanghai</code>是设置时区；<code v-pre>MYSQL_ROOT_PASSWORD=123</code>是设置MySQL默认密码</li>
</ul>
</li>
<li><code v-pre>mysql</code> : 设置<strong>镜像</strong>名称，Docker会根据这个名字搜索并下载镜像
<ul>
<li>格式：<code v-pre>REPOSITORY:TAG</code>，例如<code v-pre>mysql:8.0</code>，其中<code v-pre>REPOSITORY</code>可以理解为镜像名，<code v-pre>TAG</code>是版本号</li>
<li>在未指定<code v-pre>TAG</code>的情况下，默认是最新版本，也就是<code v-pre>mysql:latest</code></li>
</ul>
</li>
</ul>
</div></template>


