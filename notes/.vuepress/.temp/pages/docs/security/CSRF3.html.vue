<template><div><p>预检请求的触发条件</p>
<ol>
<li>简单请求：
<ul>
<li>浏览器不会为简单请求发出预检请求。简单请求是指满足以下条件的请求：</li>
<li>使用的 HTTP 方法是 <code v-pre>GET</code>、<code v-pre>POST</code> 或 <code v-pre>HEAD</code>。</li>
<li>请求头部仅包含以下标准头：<code v-pre>Accept</code>、<code v-pre>Accept-Language</code>、<code v-pre>Content-Language</code>、<code v-pre>Content-Type</code>（其值仅限于 <code v-pre>application/x- www-form-urlencoded</code>、<code v-pre>multipart/form-data</code>、<code v-pre>text/plain</code> ）。</li>
</ul>
</li>
<li>非简单请求：
<ul>
<li>如果请求不符合简单请求的条件，则浏览器会先发送一个 <code v-pre>OPTIONS</code> 请求进行预检，以确定服务器是否允许该请求。</li>
</ul>
</li>
</ol>
<p>构造简单请求，防止浏览器自动发出预检请求而带来的额外安全检查。</p>
</div></template>


