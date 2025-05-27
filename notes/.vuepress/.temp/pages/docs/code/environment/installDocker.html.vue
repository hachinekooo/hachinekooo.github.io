<template><div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2>
<h3 id="linux-centos" tabindex="-1"><a class="header-anchor" href="#linux-centos"><span>Linux(centos)</span></a></h3>
<h4 id="卸载旧版" tabindex="-1"><a class="header-anchor" href="#卸载旧版"><span>卸载旧版</span></a></h4>
<p>首先如果系统中已经存在旧的Docker，则先卸载：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> remove</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-client</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-client-latest</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-common</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-latest</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-latest-logrotate</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-logrotate</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-engine</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-selinux</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置docker的yum库" tabindex="-1"><a class="header-anchor" href="#配置docker的yum库"><span>配置Docker的yum库</span></a></h4>
<p>首先要安装一个yum工具</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum-utils</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> device-mapper-persistent-data</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lvm2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>安装成功后，执行命令，配置Docker的yum源（已更新为阿里云源）：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum-config-manager</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --add-repo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sed</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 's+download.docker.com+mirrors.aliyun.com/docker-ce+'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/yum.repos.d/docker-ce.repo</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新yum，建立缓存</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> makecache</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fast</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装Docker</span></a></h4>
<p>最后，执行命令，安装Docker</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker-ce</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker-ce-cli</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> containerd.io</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker-buildx-plugin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker-compose-plugin</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="启动和校验" tabindex="-1"><a class="header-anchor" href="#启动和校验"><span>启动和校验</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 启动Docker</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> start</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 停止Docker</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> stop</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 重启</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 设置开机自启</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 执行docker ps命令，如果不报错，说明安装启动成功</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ps</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置镜像加速" tabindex="-1"><a class="header-anchor" href="#配置镜像加速"><span>配置镜像加速</span></a></h4>
<p>镜像地址可能会变更，如果失效可以百度找最新的docker镜像。</p>
<p>配置镜像步骤如下：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 创建目录</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mkdir</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 复制内容</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/docker/daemon.json</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;&#x3C;-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">'EOF'</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">{</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    "registry-mirrors": [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "http://hub-mirror.c.163.com",</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "https://mirrors.tuna.tsinghua.edu.cn",</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "http://mirrors.sohu.com",</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "https://ustc-edu-cn.mirror.aliyuncs.com",</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "https://ccr.ccs.tencentyun.com",</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "https://docker.m.daocloud.io",</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "https://docker.awsl9527.cn"</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    ]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 重新加载配置</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 重启Docker</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="macos" tabindex="-1"><a class="header-anchor" href="#macos"><span>Macos</span></a></h3>
<p>访问官网，按需下载即可。
<a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker: Accelerated Container Application Development</a></p>
<h2 id="常见命令" tabindex="-1"><a class="header-anchor" href="#常见命令"><span>常见命令</span></a></h2>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>docker pull</td>
<td>拉取镜像</td>
</tr>
<tr>
<td>docker push</td>
<td>推送镜像到DockerRegistry</td>
</tr>
<tr>
<td>docker images</td>
<td>查看本地镜像</td>
</tr>
<tr>
<td>docker rmi</td>
<td>删除本地镜像</td>
</tr>
<tr>
<td>docker run</td>
<td>创建并运行容器（不能重复创建）</td>
</tr>
<tr>
<td>docker stop</td>
<td>停止指定容器</td>
</tr>
<tr>
<td>docker start</td>
<td>启动指定容器</td>
</tr>
<tr>
<td>docker restart</td>
<td>重新启动容器</td>
</tr>
<tr>
<td>docker rm</td>
<td>删除指定容器</td>
</tr>
<tr>
<td>docker ps</td>
<td>查看容器</td>
</tr>
<tr>
<td>docker logs</td>
<td>查看容器运行日志</td>
</tr>
<tr>
<td>docker exec</td>
<td>进入容器</td>
</tr>
<tr>
<td>docker save</td>
<td>保存镜像到本地压缩文件</td>
</tr>
<tr>
<td>docker load</td>
<td>加载本地压缩文件到镜像</td>
</tr>
<tr>
<td>docker inspect</td>
<td>查看容器详细信息</td>
</tr>
</tbody>
</table>
</div></template>


