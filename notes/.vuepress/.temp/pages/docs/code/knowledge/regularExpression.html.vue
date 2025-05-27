<template><div><ol>
<li>
<p>任意一个字符表示匹配任意对应的字符，如 <code v-pre>a</code> 匹配 <code v-pre>a</code>，<code v-pre>7</code>匹配<code v-pre>7</code>，<code v-pre>-</code>匹配<code v-pre>-</code>。</p>
</li>
<li>
<p><code v-pre>[]</code>代表匹配中括号中其中任一个字符，如<code v-pre>[abc]</code>匹配 <code v-pre>a</code> 或 <code v-pre>b</code> 或 <code v-pre>c</code>。</p>
</li>
<li>
<p><code v-pre>-</code>在中括号里面和外面代表含义不同，如在外时，就匹配<code v-pre>-</code>，如果在中括号内<code v-pre>[a-b]</code>表示匹配26个小写字母中的任一个；<code v-pre>[a-zA-Z]</code>匹配大小写共52个字母中任一个；<code v-pre>[0-9]</code>匹配十个数字中任一个。</p>
</li>
<li>
<p><code v-pre>^</code> 在中括号里面和外面含义不同，如在外时，就表示开头，如 <code v-pre>^7[0-9]</code> 表示匹配开头是7的，且第二位是任一数字的字符串；如果在中括号里面，表示除了这个字符之外的任意字符(包括数字，特殊字符)，如 <code v-pre>[^abc]</code> 表示匹配除去 abc 之外的其他任一字符。</p>
</li>
<li>
<p><code v-pre>.</code>表示匹配<font color="#de7802">任意的字符</font>。</p>
</li>
<li>
<p><code v-pre>\d</code> 表示<font color="#de7802">数字</font>。</p>
</li>
<li>
<p><code v-pre>\D</code> 表示<font color="#de7802">非数字</font>。</p>
</li>
</ol>
<p>8. <code v-pre>\s</code> 表示由<font color="#de7802">空字符</font>组成，<code v-pre>[\t\n\r\x\f]</code>。</p>
<p>9. <code v-pre>\S</code> 表示由非空字符组成，<code v-pre>[^\s]</code>。</p>
<p>10. <code v-pre>\w</code> 表示<font color="#de7802">字母</font>、<font color="#de7802">数字</font>、<font color="#de7802">下划线</font>，<code v-pre>[a-zA-Z0-9_]</code>。</p>
<p>11. <code v-pre>\W</code>表示<font color="#de7802">不是</font>由字母、数字、下划线组成。</p>
<p>12. <code v-pre>?</code> 表示出现<font color="#de7802">0次</font>或<font color="#de7802">1次</font>。</p>
<p>13. <code v-pre>+</code>表示出现<font color="#de7802">1次</font>或<font color="#de7802">多次</font>。</p>
<p>14. <code v-pre>*</code>表示出现<font color="#de7802">0次</font>、<font color="#de7802">1次</font>或<font color="#de7802">多次</font>。</p>
<p>15. <code v-pre>{n}</code>表示出现<font color="#de7802">n次</font>。</p>
<p>16. <code v-pre>{n,m}</code>表示出现<font color="#de7802">n~m次</font>。</p>
<p>17. <code v-pre>{n,}</code>表示出现<font color="#de7802">n次或n次以上</font>。</p>
<p>18. <code v-pre>XY</code>表示X后面跟着Y，这里X和Y分别是正则表达式的一部分。</p>
<p>19. <code v-pre>X|Y</code>表示X或Y，比如&quot;food|f&quot;匹配的是foo（d或f），而&quot;(food)|f&quot;匹配的是food或f。</p>
<p>20. <code v-pre>(X)</code>子表达式，将X看做是<font color="#de7802">一个整体</font></p>
<h2 id="在-javascript-中使用" tabindex="-1"><a class="header-anchor" href="#在-javascript-中使用"><span>在 JavaScript 中使用</span></a></h2>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">&#x3C;!</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B">DOCTYPE</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> html</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">html</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> lang</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"en"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">head</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">meta</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> charset</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"UTF-8"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Title&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">style</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">style</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">head</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">body</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg1 = /^[0-9]$/;   //匹配一个数字  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg1.test("1"));; //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg1.test("11"));; //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg2 = /^[0-9][0-9]$/;  //匹配两个数字  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg3 = /^[a-zA-Z][0-9][0-9]$/;  //匹配一个字母连个数字  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg3.test("a11"));  //ture  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg3.test("111"));  //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg4 = /^[0-9]</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">{</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$/;   //匹配数字(10次)  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg4.test("1234567890"));    //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg4.test("12345"));    //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg5 = /^[0-9]</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">{</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$/; //匹配数字(6次-10次)  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg5.test("123456"));    //ture  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg5.test("12345"));     //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg6 = /^[0-9]+$/;   //匹配数字(1次或多次)  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg6.test("")); //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg6.test("111"));   //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg7 = /^[0-9]?$/;   //匹配数字(0次或1次)  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg7.test("")); //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg7.test("1"));   //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg7.test("1111111111"));   //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg8 = /^[0-9]*$/;   //匹配数字(0次或多次)  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg8.test("")); //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg8.test("11"));   //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg8.test("1111111111"));   //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg9 = /^\d</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">{</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$/;   //匹配数字(6次-10次)  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg9.test("12345"));    //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg9.test("123456"));   //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg10 = /^\w</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">{</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$/;   //匹配字母数字下划线(6次-10次)  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg9.test("12345"));    //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg9.test("123456"));   //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg11 = /^.</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">{</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$/;   //匹配任意字符3次  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg11.test("---"));  //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg12 = /^[a-zA-Z]\w</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">{</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">9</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$/;   //匹配以字母开头，以数字,字母,下划线组成的6-10位的字符串  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg12.test("12345"));    //false  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg12.test("a123456"));   //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    var reg13 = /^\\\\$/; //匹配2个反斜杠  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    console.log(reg13.test("\\\\")); //true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">body</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">html</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在-java-中使用" tabindex="-1"><a class="header-anchor" href="#在-java-中使用"><span>在 Java 中使用</span></a></h2>
<p>在 java 中使用需要两个反斜杠来表示一个反斜杠</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> TestRegx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Test</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> testRegx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> regx</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\\</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">d{5}"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//匹配5位数字  </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "12345"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">matches</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(regx));  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> regx2</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\\</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">d{5}</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\\</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">*"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//匹配5位数字和一个星花  </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str2</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "12345*"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">str2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">matches</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(regx2));  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//true  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


