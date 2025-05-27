<template><div><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2>
<p>基于内存进行存储，支持 key-value 的存储形式，底层是用 C 语言编写的。
基于 key-value 形式的数据字典，结构非常简单，没有数据表的概念，直接用键值对的形式完成数据的管理。</p>
<p>Redis 支持多种数据类型：这里给出 5 个先</p>
<ul>
<li>字符串类型<code v-pre>string</code></li>
<li>哈希类型<code v-pre>hash</code></li>
<li>列表类型<code v-pre>list</code></li>
<li>集合类型<code v-pre>set</code></li>
<li>有序集合类型<code v-pre>sortedset</code></li>
</ul>
<p>Redis的应用场景：</p>
<ul>
<li>缓存（数据查询、短连接、新闻内容、商品内容等等）</li>
<li>聊天室的在线好友列表</li>
<li>任务队列（秒杀、抢购、12306等等）</li>
<li>应用排行榜</li>
<li>网站访问统计</li>
<li>数据过期处理（可以精确到毫秒）</li>
<li>分布式集群架构中的 session 分离</li>
</ul>
<p><code v-pre>Redis</code>存储的是<code v-pre>key-value</code>格式的数据，其中key都是字符串，value有5种不同的数据结构。</p>
<p><code v-pre>value</code>的数据结构：</p>
<ol>
<li>字符串类型<code v-pre>string</code>；</li>
<li>哈希类型<code v-pre>hash</code>，可以理解成<code v-pre>Java</code>中的<code v-pre>Map</code>结构；</li>
<li>列表类型<code v-pre>list</code>，可以理解成<code v-pre>LinkedList</code>格式，支持重复元素；</li>
<li>集合类型<code v-pre>set</code>，不允许重复元素；</li>
<li>有序集合类型<code v-pre>zset sortedset</code>，不允许重复元素，且元素有顺序。</li>
</ol>
<h2 id="安装和配置" tabindex="-1"><a class="header-anchor" href="#安装和配置"><span>安装和配置</span></a></h2>
<p>使用 homebrew 安装： <code v-pre>brew insatll redis</code>
启动 redis 服务端: <code v-pre>redis-server</code>
启动 redis 客户端：<code v-pre>redis-cli</code></p>
<p>GUI 客户端：<code v-pre>RedisInsightv2</code></p>
<h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2>
<h3 id="全局常用命令" tabindex="-1"><a class="header-anchor" href="#全局常用命令"><span>全局常用命令</span></a></h3>
<ul>
<li>
<p>查看当前链接数量<code v-pre>CLIENT LIST</code></p>
</li>
<li>
<p>关闭某个链接 <code v-pre>CLIENT KILL &lt;ip:port&gt;</code></p>
</li>
<li>
<p>查询所有的键：<code v-pre>keys *</code></p>
</li>
<li>
<p>查看指定的 key 谁否存在：<code v-pre>exists key</code></p>
</li>
<li>
<p>获取键对应的 value 的类型：<code v-pre>type key</code></p>
</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">127.0.0.1:6379</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mysort</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">zset</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">127.0.0.1:6379</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> username</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>删除指定的 key-value：<code v-pre>del key</code></p>
</li>
<li>
<p>切换数据库：<code v-pre>select index</code></p>
</li>
</ul>
<p>redis中默认有16个db，编号0-15</p>
<ul>
<li>将键值对从当前 db 移动到目标 db： <code v-pre>move key index</code></li>
<li>删除当前数据库中所有的 key：<code v-pre>flushdb</code></li>
<li>删除所有库所有的 key：<code v-pre>flushall</code></li>
<li>查看当前 db 中 k-v 个数：<code v-pre>dbsize</code></li>
<li>清除屏幕：<code v-pre>clear</code></li>
</ul>
<h3 id="数据操作" tabindex="-1"><a class="header-anchor" href="#数据操作"><span>数据操作</span></a></h3>
<h4 id="字符串类型的操作" tabindex="-1"><a class="header-anchor" href="#字符串类型的操作"><span>字符串类型的操作</span></a></h4>
<ul>
<li>
<p>存储：<code v-pre>set key value</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> set username Peter</span></span>
<span class="line"><span>OK</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取：<code v-pre>get key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> get username</span></span>
<span class="line"><span>"Peter"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除：<code v-pre>del key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> del username</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379> get username</span></span>
<span class="line"><span>(nil)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>批量添加：<code v-pre>mset k1 v1 [k2 v2 k3 v3]</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> mset username zs age 10 addr qd</span></span>
<span class="line"><span>OK</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>批量取值：<code v-pre>mget k1 [k2 k3...]</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> mget username age addr</span></span>
<span class="line"><span>1) "zs"</span></span>
<span class="line"><span>2) "10"</span></span>
<span class="line"><span>3) "qd"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="自增操作" tabindex="-1"><a class="header-anchor" href="#自增操作"><span>自增操作</span></a></h4>
<blockquote>
<p>必须对“数值”进行操作</p>
</blockquote>
<ul>
<li>
<p>在 <code v-pre>key</code> 对应的 <code v-pre>value</code> 上自增 +1：<code v-pre>incr key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> incr age</span></span>
<span class="line"><span>(integer) 11</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在 key 对应的 value 上自减 -1：<code v-pre>decr key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> decr age</span></span>
<span class="line"><span>(integer) 10</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在 key 对应的 value 上+v：<code v-pre>incrby key v</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> incrby age 5</span></span>
<span class="line"><span>(integer) 15</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在 key 对应的 value 上-v：<code v-pre>decrby key v</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> decrby age 5</span></span>
<span class="line"><span>(integer) 10</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>添加键值对，并设置过期时间(TTL)： <code v-pre>setex key time(seconds) value</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> setex age 10 30</span></span>
<span class="line"><span>OK</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>设置值，如果 <code v-pre>key</code> 不存在则成功添加，如果 <code v-pre>key</code> 存在则添加失败（不做修改操作）： <code v-pre>setnx key value</code></p>
<p>设置 --- 不存在就添加，存在不做任何操作</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> setnx age 10</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379> get age</span></span>
<span class="line"><span>"10"</span></span>
<span class="line"><span>127.0.0.1:6379> setnx age 20</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>127.0.0.1:6379> get age</span></span>
<span class="line"><span>"10"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在指定的 <code v-pre>key</code> 对应 <code v-pre>value</code> 拼接字符串：<code v-pre>append key value</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> append addr _snq</span></span>
<span class="line"><span>(integer) 6</span></span>
<span class="line"><span>127.0.0.1:6379> get addr</span></span>
<span class="line"><span>"qd_snq"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取 <code v-pre>key</code> 对应的字符串的长度：<code v-pre>strlen key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> strlen addr</span></span>
<span class="line"><span>(integer) 6</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="hash-类型" tabindex="-1"><a class="header-anchor" href="#hash-类型"><span>hash 类型</span></a></h4>
<ol>
<li>
<p>向<code v-pre>key</code>对应的<code v-pre>hash</code>中添加键值对：<code v-pre>hset key field value</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hset Person username Peter</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379> hset Person age 10</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379> hset Person address Beijing</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取指定的<code v-pre>field</code>对应的值：<code v-pre>hget key field</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hget Person age</span></span>
<span class="line"><span>"10"</span></span>
<span class="line"><span>127.0.0.1:6379> hget Person username</span></span>
<span class="line"><span>"Peter"hdel </span></span>
<span class="line"><span>127.0.0.1:6379> hget Person address</span></span>
<span class="line"><span>"Beijing"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>向<code v-pre>key</code>对应的<code v-pre>hash</code>结构中批量添加键值对：<code v-pre>hmset key f1 v1 [f2 v2 ...]</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hmset person name zs age 10 addr bj</span></span>
<span class="line"><span>OK</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在<code v-pre>key</code>对应的<code v-pre>hash</code>中的<code v-pre>field</code>对应<code v-pre>value</code>上加v：<code v-pre>hincrby key field v</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hincrby person age 1</span></span>
<span class="line"><span>(integer) 11</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取所有的<code v-pre>field</code>和<code v-pre>value</code>：<code v-pre>hgetall key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hgetall Person</span></span>
<span class="line"><span>1) "username"</span></span>
<span class="line"><span>2) "Peter"</span></span>
<span class="line"><span>3) "age"</span></span>
<span class="line"><span>4) "10"</span></span>
<span class="line"><span>5) "address"</span></span>
<span class="line"><span>6) "Beijing"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取<code v-pre>key</code>对应的<code v-pre>hash</code>中所有的<code v-pre>field</code>：<code v-pre>hkeys key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hkeys person</span></span>
<span class="line"><span>1) "name"</span></span>
<span class="line"><span>2) "age"</span></span>
<span class="line"><span>3) "addr"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取<code v-pre>key</code>对应的<code v-pre>hash</code>中所有的<code v-pre>value</code>：<code v-pre>hvals key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hvals person</span></span>
<span class="line"><span>1) "zs"</span></span>
<span class="line"><span>2) "11"</span></span>
<span class="line"><span>3) "bj"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>检查<code v-pre>key</code>对应的<code v-pre>hash</code>中是否有指定的<code v-pre>field</code>：<code v-pre>hexists key field</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hexists person height</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>127.0.0.1:6379> hexists person name</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取<code v-pre>key</code>对应的<code v-pre>hash</code>中键值对的个数：<code v-pre>hlen key</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hlen person</span></span>
<span class="line"><span>(integer) 3</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>向<code v-pre>key</code>对应的<code v-pre>hash</code>结构中添加<code v-pre>k-v</code>，如果<code v-pre>field</code>在<code v-pre>hash</code>中已经存在，则添加失败：<code v-pre>hsetnx key field value</code></li>
</ol>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hsetnx person name aaa</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>127.0.0.1:6379> hgetall person</span></span>
<span class="line"><span>1) "name"</span></span>
<span class="line"><span>2) "zs"</span></span>
<span class="line"><span>3) "age"</span></span>
<span class="line"><span>4) "11"</span></span>
<span class="line"><span>5) "addr"</span></span>
<span class="line"><span>6) "bj"</span></span>
<span class="line"><span>127.0.0.1:6379> hsetnx person height 180</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379> hgetall person</span></span>
<span class="line"><span>1) "name"</span></span>
<span class="line"><span>2) "zs"</span></span>
<span class="line"><span>3) "age"</span></span>
<span class="line"><span>4) "11"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除单个域：<code v-pre>hdel key field</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hdel Person age</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379> hgetall Person</span></span>
<span class="line"><span>1) "username"</span></span>
<span class="line"><span>2) "Peter"</span></span>
<span class="line"><span>3) "address"</span></span>
<span class="line"><span>4) "Beijing"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除多个域：<code v-pre>hdel key field1 field2 field3...</code></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>127.0.0.1:6379> hdel Person username address</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>127.0.0.1:6379> hgetall Person</span></span>
<span class="line"><span>(empty list or set)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</div></template>


