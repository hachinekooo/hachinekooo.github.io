<template><div><h3 id="添加文件到忽略列表" tabindex="-1"><a class="header-anchor" href="#添加文件到忽略列表"><span>添加文件到忽略列表</span></a></h3>
<p>一般我们总会有些文件无需纳入Git的管理，也不希望它们总出现在未跟踪文件列表。 通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。 在这种情况下，我们可以在工作目录中创建一个名为 .gitignore的文件（文件名称固定），列出要忽略的文件模式。</p>
<p>通常开发工具会帮我们生成。</p>
<h2 id="远程仓库" tabindex="-1"><a class="header-anchor" href="#远程仓库"><span>远程仓库</span></a></h2>
<h3 id="注册-gitee-github" tabindex="-1"><a class="header-anchor" href="#注册-gitee-github"><span>注册 gitee/github</span></a></h3>
<h3 id="配置-ssh" tabindex="-1"><a class="header-anchor" href="#配置-ssh"><span>配置 SSH</span></a></h3>
<h4 id="在本地生成密钥" tabindex="-1"><a class="header-anchor" href="#在本地生成密钥"><span>在本地生成密钥</span></a></h4>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ssh-keygen</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsa</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "your email@example.com"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">//引号里面填写你的邮箱地址，比如我的是</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ssh-keygen</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsa</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "xxxxx@163.com"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## wangwenpeng @ AppleBook in ~/.ssh [16:46:18]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ~/.ssh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## wangwenpeng @ AppleBook in ~/.ssh [16:47:54]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pwd</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/Users/wangwenpeng/.ssh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## wangwenpeng @ AppleBook in ~/.ssh [16:47:55]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ls</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">id_rsa</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">          id_rsa.pub</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在-gitee-github-上填入密钥" tabindex="-1"><a class="header-anchor" href="#在-gitee-github-上填入密钥"><span>在 gitee/github 上填入密钥</span></a></h4>
<p>把 id_rsa.pub 中的内容填入</p>
<h3 id="操作远程仓库" tabindex="-1"><a class="header-anchor" href="#操作远程仓库"><span>操作远程仓库</span></a></h3>
<h4 id="上传操作" tabindex="-1"><a class="header-anchor" href="#上传操作"><span>上传操作</span></a></h4>
<h5 id="在-gitee-github-创建远程仓库" tabindex="-1"><a class="header-anchor" href="#在-gitee-github-创建远程仓库"><span>在 gitee/github 创建远程仓库</span></a></h5>
<h5 id="将本地仓库关联到远程仓库并且推送" tabindex="-1"><a class="header-anchor" href="#将本地仓库关联到远程仓库并且推送"><span>将本地仓库关联到远程仓库并且推送</span></a></h5>
<p>本地仓库关联远程仓库，以及推送：<br>
<img src="@source/appends/img/gitlearning9.png" alt="" loading="lazy"><br>
在 gitee 上查看：<br>
<img src="@source/appends/img/gitlearning10.png" alt="" loading="lazy"></p>
<p>命令：git push [-f] [--set-upstream] [远端名称 [本地分支名][:远端分支名] ]</p>
<p>如果远程分支名和本地分支名称相同，则可以只写本地分支</p>
<p>例如： <code v-pre>git push origin main</code>，向名为 origin 的远程仓库，推送本地 main 分支到 origin 远程仓库的 main 分支。</p>
<p>如果远程分支名和本地分支名称不同，则需要特别指定</p>
<p>例如： <code v-pre>git push origin main:master</code>，向名为 origin 的远程仓库，推送本地 main 分支到 origin 远程仓库的 master 分支。</p>
<ul>
<li>-f 表示强制覆盖(谨慎使用，可能出现数据覆盖，致使原来数据找不回来的情况)</li>
<li>--set-upstream 推送到远端的同时并且建立起和远端分支的关联关系</li>
<li>git push --set-upstream origin main(推送时同时把本地 main 分支和远程 main 分支建立关联关系)
<ul>
<li>如果当前分支已经和远端分支关联，则可以省略分支名和远端名</li>
<li>下次直接使用 <code v-pre>git push</code> 。当你运行 <code v-pre>git push</code> 命令时，如果当前分支已经与远程分支建立了关联关系（使用 <code v-pre>--set-upstream</code> 或 <code v-pre>-u</code> 选项），Git 将会根据当前分支的上游分支来决定推送到哪个远程分支。</li>
</ul>
</li>
</ul>
<h4 id="下载操作" tabindex="-1"><a class="header-anchor" href="#下载操作"><span>下载操作</span></a></h4>
<h5 id="从远程仓库克隆" tabindex="-1"><a class="header-anchor" href="#从远程仓库克隆"><span>从远程仓库克隆</span></a></h5>
<p>如果已经有一个远端仓库，我们可以直接clone到本地。</p>
<p>命令： <code v-pre>git clone &lt;仓库路径&gt; [本地目录]</code></p>
<ul>
<li>本地目录可以省略，会自动生成一个目录</li>
</ul>
<h5 id="从远程仓库抓取和拉取" tabindex="-1"><a class="header-anchor" href="#从远程仓库抓取和拉取"><span>从远程仓库抓取和拉取</span></a></h5>
<p>远程分支和本地的分支一样，我们可以进行merge操作，只是需要先把远端仓库里的更新都下载到本地，再进行操作。</p>
<ul>
<li>抓取命令：git fetch [remote name] [branch name]</li>
</ul>
<p>抓取指令就是将仓库里的更新都抓取到本地，不会进行合并</p>
<p>如果不指定远端名称和分支名，则抓取所有分支。</p>
<ul>
<li>拉取命令：git pull [remote name] [branch name]</li>
</ul>
<p>拉取指令就是将远端仓库的修改拉到本地并自动进行合并，等同于fetch+merge<br>
如果不指定远端名称和分支名，则抓取所有并更新当前分支</p>
<h3 id="解决合并冲突" tabindex="-1"><a class="header-anchor" href="#解决合并冲突"><span>解决合并冲突</span></a></h3>
<p>A、B用户修改了同一个文件，且修改了同一行位置的代码，此时会发生合并冲突。</p>
<p>A用户在本地修改代码后优先推送到远程仓库，此时B用户在本地修订代码，提交到本地仓库后，也需要推送到远程仓库，此时B用户晚于A用户，故需要先拉取远程仓库的提交，经过合并后才能推送到远端分支。</p>
<p>在B用户拉取代码时，因为A、B用户同一段时间修改了同一个文件的相同位置代码，故会发生合并冲突。</p>
<p>远程分支也是分支，所以合并时冲突的解决方式也和解决本地分支冲突相同相同。</p>
</div></template>


