<template><div><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>
<h3 id="_1-websocket-基础" tabindex="-1"><a class="header-anchor" href="#_1-websocket-基础"><span>1. <strong>WebSocket 基础</strong></span></a></h3>
<ul>
<li>
<p><strong>WebSocket 协议</strong>：</p>
<ul>
<li>WebSocket 是一种全双工通信协议，允许客户端和服务器之间建立持久连接，进行实时数据传输。</li>
<li>以 WebSocket 被用于实现 AI 助手的实时聊天功能为例</li>
</ul>
</li>
<li>
<p><strong>STOMP 协议</strong>：</p>
<ul>
<li>STOMP（Simple Text Oriented Messaging Protocol）是基于 WebSocket 的高级消息协议，提供更丰富的消息路由和订阅机制。</li>
<li>通过 <code v-pre>@EnableWebSocketMessageBroker</code> 和 <code v-pre>WebSocketMessageBrokerConfigurer</code> 配置了 STOMP 协议的支持。</li>
</ul>
</li>
</ul>
<hr>
<h3 id="_2-websocket-实现方式" tabindex="-1"><a class="header-anchor" href="#_2-websocket-实现方式"><span>2. <strong>WebSocket 实现方式</strong></span></a></h3>
<h4 id="stomp-协议实现" tabindex="-1"><a class="header-anchor" href="#stomp-协议实现"><span><strong>STOMP 协议实现</strong></span></a></h4>
<ul>
<li>
<p><strong>配置 WebSocket 端点</strong>：</p>
<ul>
<li><code v-pre>WsChatConfig</code> 类实现了 <code v-pre>WebSocketMessageBrokerConfigurer</code> 接口，配置了 WebSocket 的端点和消息代理。
<ul>
<li>注册 2 个端点：<code v-pre>/gpt/{id}/{aiType}</code> 和 <code v-pre>/notify</code>，分别用于 AI 聊天和系统通知。</li>
<li>设置握手处理器和拦截器： <code v-pre>AuthHandshakeInterceptor</code> 和 <code v-pre>AuthHandshakeHandler</code> 可以用与初始化会话属性、Principal（用户唯一标识）。</li>
<li>允许跨域访问：<code v-pre>setAllowedOriginPatterns(&quot;*&quot;)</code>。</li>
<li>配置消息代理（broker）：可以简单理解是一个消息队列，前端订阅这个队列消费，后端生产</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>消息路由与广播</strong>：</p>
<ul>
<li>使用 <code v-pre>@MessageMapping</code> 注解定义消息路由。
<ul>
<li>示例：<code v-pre>ChatRestController</code> 中的 <code v-pre>chat</code> 方法，接收客户端发送的消息并处理。</li>
</ul>
</li>
<li>使用 <code v-pre>SimpMessagingTemplate</code> 发送消息到指定用户或广播消息。</li>
</ul>
</li>
</ul>
<h4 id="_3-websocket-拦截器" tabindex="-1"><a class="header-anchor" href="#_3-websocket-拦截器"><span>(3) <strong>WebSocket 拦截器</strong></span></a></h4>
<ul>
<li><strong>入站拦截器</strong>：
<ul>
<li><code v-pre>configureClientInboundChannel</code> 方法中添加了 <code v-pre>AuthInChannelInterceptor</code>，用于拦截和验证客户端发送的消息。</li>
</ul>
</li>
<li><strong>出站拦截器</strong>：
<ul>
<li><code v-pre>configureClientOutboundChannel</code> 方法中添加了 <code v-pre>AuthOutChannelInterceptor</code>，用于拦截服务器发送的消息。</li>
</ul>
</li>
</ul>
<hr>
<h3 id="_4-websocket-安全性" tabindex="-1"><a class="header-anchor" href="#_4-websocket-安全性"><span>4. <strong>WebSocket 安全性</strong></span></a></h3>
<ul>
<li><strong>身份验证</strong>：
<ul>
<li>在 <code v-pre>AuthHandshakeInterceptor</code> 和 <code v-pre>AuthHandshakeHandler</code> 中实现了身份验证逻辑，确保只有合法用户可以建立 WebSocket 连接。</li>
</ul>
</li>
<li><strong>会话管理</strong>：
<ul>
<li>使用 <code v-pre>LoadingCache&lt;Long, Set&lt;String&gt;&gt; wsUserSessionCache</code> 缓存用户与 WebSocket 会话的关系，便于广播通知。</li>
</ul>
</li>
</ul>
<hr>
<h3 id="_5-websocket-性能优化" tabindex="-1"><a class="header-anchor" href="#_5-websocket-性能优化"><span>5. <strong>WebSocket 性能优化</strong></span></a></h3>
<ul>
<li><strong>线程池配置</strong>：
<ul>
<li>在 <code v-pre>configureClientInboundChannel</code> 和 <code v-pre>configureClientOutboundChannel</code> 中配置了线程池参数：
<ul>
<li>核心线程数：4</li>
<li>最大线程数：10</li>
<li>线程存活时间：60 秒</li>
</ul>
</li>
</ul>
</li>
<li><strong>消息序列化</strong>：
<ul>
<li>使用 <code v-pre>ObjectMapper</code> 将消息序列化为 JSON 格式，便于传输和解析。</li>
</ul>
</li>
</ul>
<hr>
<h3 id="_6-相关工具类" tabindex="-1"><a class="header-anchor" href="#_6-相关工具类"><span>6. <strong>相关工具类</strong></span></a></h3>
<ul>
<li><strong>WebSocketResponseUtil</strong>：
<ul>
<li>提供了封装 WebSocket 消息的工具方法，简化消息发送逻辑。</li>
</ul>
</li>
<li><strong>IdUtil</strong>：
<ul>
<li>生成唯一标识符，用于区分不同的 WebSocket 会话。</li>
</ul>
</li>
</ul>
<hr>
<h3 id="_7-数据库支持" tabindex="-1"><a class="header-anchor" href="#_7-数据库支持"><span>7. <strong>数据库支持</strong></span></a></h3>
<ul>
<li><strong>全局配置</strong>：
<ul>
<li>在 <code v-pre>global_conf</code> 表中存储了 AI 助手的相关配置信息，如星球介绍、AI 使用权限等。</li>
</ul>
</li>
<li><strong>用户绑定信息</strong>：
<ul>
<li><code v-pre>UserAiServiceImpl</code> 中实现了用户与 AI 服务的绑定逻辑，包括初始化和更新绑定信息。</li>
</ul>
</li>
</ul>
<h2 id="消息头消息体和会话属性" tabindex="-1"><a class="header-anchor" href="#消息头消息体和会话属性"><span>消息头消息体和会话属性</span></a></h2>
<h3 id="message-对象" tabindex="-1"><a class="header-anchor" href="#message-对象"><span>Message 对象</span></a></h3>
<p><code v-pre>Message&lt;?&gt;</code> 包含消息头和消息体。</p>
<h4 id="消息头" tabindex="-1"><a class="header-anchor" href="#消息头"><span>消息头</span></a></h4>
<p>消息头是键值对形式的元数据，用于描述消息的上下文信息。消息头通过 <code v-pre>StompHeaderAccessor</code> 提取。<br>
常见的消息头包括：</p>
<ul>
<li><code v-pre>destination</code>：目标路径，例如 <code v-pre>/app/chat/{session}</code>。</li>
<li><code v-pre>simpSessionId</code>：WebSocket 会话 ID</li>
<li><code v-pre>simpMessageType</code>：消息类型</li>
<li><code v-pre>simpSubscriptionId</code>：订阅 ID，用于标识客户端订阅的路径。</li>
<li><code v-pre>simpUser</code>：用户标识（Principal），通常在握手阶段生成</li>
<li>自定义消息头：例如 <code v-pre>'s-uid': session</code>。</li>
</ul>
<p>几种消息头访问器：</p>
<ul>
<li><code v-pre>MessageHeaderAccessor</code>：通用的消息头访问器，可以从 <code v-pre>Message&lt;?&gt;</code>  提取消息头，适用于所有消息传递场景。</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">MessageHeaderAccessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getAccessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(message, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">MessageHeaderAccessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><code v-pre>StompHeaderAccessor</code>：专门针对 <code v-pre>STOMP</code> 协议设计，继承自 <code v-pre>MessageHeaderAccessor</code>，增加了对 <code v-pre>STOMP</code> 特有字段的支持。适用于拦截器中处理原始消息对象</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> StompHeaderAccessor</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> accessor </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> MessageHeaderAccessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getAccessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(message, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">StompHeaderAccessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>SimpMessageHeaderAccessor <code v-pre>：提供了更高的抽象层次和更便捷的会话属性访问能力。</code> 专门为 <code v-pre>Spring WebSocket</code> 框架设计的，它不仅支持 <code v-pre>STOMP</code> 协议，还集成了 <code v-pre>WebSocket</code> 的其他特性，如会话属性 <code v-pre>simpSessionAttributes</code>。在 <code v-pre>@MessageMapping</code> 方法中，<code v-pre>Spring</code> 自动将消息封装为 <code v-pre>SimpMessageHeaderAccessor</code>，以便开发者更方便地访问消息头和会话属性。</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">MessageMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/chat/{session}"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> chat</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> msg</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                     @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">DestinationVariable</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"session"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> session</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 获取路径变量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                     @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Header</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"simpSessionAttributes"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Map</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> Object</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> attrs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 获取 WebSocket会话的属性</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">                     SimpMessageHeaderAccessor</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> accessor)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="消息体" tabindex="-1"><a class="header-anchor" href="#消息体"><span>消息体</span></a></h4>
<p>消息体通过 <code v-pre>message.getPayload()</code> 提取。</p>
<h3 id="会话属性" tabindex="-1"><a class="header-anchor" href="#会话属性"><span>会话属性</span></a></h3>
<p>会话属性是 <code v-pre>WebSocket</code> 会话中保存的上下文信息。在握手阶段通过 <code v-pre>attributes</code> 设置。
在消息处理阶段可以通过 <code v-pre>SimpMessageHeaderAccessor.getSessionAttributes()</code> 获取。</p>
<h3 id="关系" tabindex="-1"><a class="header-anchor" href="#关系"><span>关系</span></a></h3>
<p><code v-pre>Message&lt;?&gt;</code> 的消息头中包含会话属性的引用（<code v-pre>simpSessionAttributes</code>）。</p>
<hr>
<h2 id="关于订阅时user" tabindex="-1"><a class="header-anchor" href="#关于订阅时user"><span>关于订阅时user</span></a></h2>
<p><code v-pre>stompClient.subscribe('/user/chat/rsp', function (message) {...})</code> 中的 <code v-pre>/user</code> 前缀是 STOMP 协议的一个内置特性，用于实现<strong>用户级别的消息订阅</strong>。以下是详细解释：</p>
<hr>
<h3 id="_1-stomp-协议中的-user-前缀" tabindex="-1"><a class="header-anchor" href="#_1-stomp-协议中的-user-前缀"><span>1. <strong>STOMP 协议中的 <code v-pre>/user</code> 前缀</strong></span></a></h3>
<ul>
<li>在 Spring 的 WebSocket 和 STOMP 实现中，<code v-pre>/user</code> 是一个特殊的前缀，用于支持<strong>用户专属的消息通道</strong>。</li>
<li>当客户端订阅路径以 <code v-pre>/user</code> 开头时，Spring 会自动将该路径映射到当前用户的专属队列。</li>
<li>这种机制允许服务器向特定用户发送消息，而不会影响其他用户。</li>
</ul>
<hr>
<h3 id="_2-为什么需要-user-前缀" tabindex="-1"><a class="header-anchor" href="#_2-为什么需要-user-前缀"><span>2. <strong>为什么需要 <code v-pre>/user</code> 前缀？</strong></span></a></h3>
<p>在你的场景中，<code v-pre>/user/chat/rsp</code> 的作用是：</p>
<ul>
<li>确保只有当前用户能够接收到服务器发送到 <code v-pre>/chat/rsp</code> 的消息。</li>
<li>Spring 会在后台为每个用户生成一个唯一的队列，并将消息路由到该队列。</li>
</ul>
<p>例如：</p>
<ul>
<li>用户 A 订阅了 <code v-pre>/user/chat/rsp</code>。</li>
<li>用户 B 也订阅了 <code v-pre>/user/chat/rsp</code>。</li>
<li>当服务器向 <code v-pre>/user/chat/rsp</code> 发送消息时，Spring 会根据用户的会话信息（如 <code v-pre>session</code> 或 <code v-pre>Principal</code>），将消息分别路由到用户 A 和用户 B 的专属队列。</li>
</ul>
<hr>
<h3 id="_3-user-前缀的自动处理" tabindex="-1"><a class="header-anchor" href="#_3-user-前缀的自动处理"><span>3. <strong><code v-pre>/user</code> 前缀的自动处理</strong></span></a></h3>
<p>Spring 的 <code v-pre>@EnableWebSocketMessageBroker</code> 和 <code v-pre>SimpleBroker</code> 已经内置了对 <code v-pre>/user</code> 的支持，不需要显式定义 <code v-pre>/user</code> 前缀。</p>
<h4 id="相关配置" tabindex="-1"><a class="header-anchor" href="#相关配置"><span>相关配置：</span></a></h4>
<p>在 <code v-pre>WsChatConfig</code> 中：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> configureMessageBroker</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">MessageBrokerRegistry</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> config) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 启用简单消息代理，支持 /chat 和 /msg 路径</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">enableSimpleBroker</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/chat"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/msg"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 设置应用前缀为 /app</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setApplicationDestinationPrefixes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/app"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>enableSimpleBroker(&quot;/chat&quot;, &quot;/msg&quot;)</code>：启用了 <code v-pre>/chat</code> 和 <code v-pre>/msg</code> 作为消息代理的目标路径。</li>
<li><code v-pre>/user</code> 前缀由 Spring 自动处理，无需额外配置。</li>
</ul>
<h4 id="消息路由逻辑" tabindex="-1"><a class="header-anchor" href="#消息路由逻辑"><span>消息路由逻辑：</span></a></h4>
<p>当客户端订阅 <code v-pre>/user/chat/rsp</code> 时：</p>
<ol>
<li>Spring 会将 <code v-pre>/user/chat/rsp</code> 转换为类似 <code v-pre>/user/{sessionId}/chat/rsp</code> 的路径。</li>
<li><code v-pre>{sessionId}</code> 是当前用户的会话标识，确保消息只发送给特定用户。</li>
</ol>
<hr>
<h3 id="_4-服务器端如何发送消息" tabindex="-1"><a class="header-anchor" href="#_4-服务器端如何发送消息"><span>4. <strong>服务器端如何发送消息？</strong></span></a></h3>
<p>在服务器端，你可以通过 <code v-pre>SimpMessagingTemplate</code> 向特定用户发送消息。例如：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Autowired</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SimpMessagingTemplate</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> messagingTemplate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> sendMessageToUser</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> userId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> message) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 向指定用户发送消息</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    messagingTemplate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">convertAndSendToUser</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(userId, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/chat/rsp"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, message);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>convertAndSendToUser</code> 方法会自动将消息发送到 <code v-pre>/user/{userId}/chat/rsp</code>。</li>
<li>客户端订阅 <code v-pre>/user/chat/rsp</code> 后，就能接收到该消息。</li>
</ul>
<hr>
</div></template>


