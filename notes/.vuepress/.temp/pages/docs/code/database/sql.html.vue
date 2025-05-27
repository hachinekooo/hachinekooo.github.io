<template><div><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>
<h3 id="连续登陆问题" tabindex="-1"><a class="header-anchor" href="#连续登陆问题"><span>连续登陆问题</span></a></h3>
<p>窗口函数是为每行返回一个结果的函数。常见的有</p>
<ul>
<li>sum、max、min</li>
<li>row_number(每行分配唯一序号)、rank(分配排名，相同值排名相同，后续排名跳过)</li>
<li>lead(获取后续行)、lag(获取前面行)</li>
</ul>
<div class="language-mysql line-numbers-mode" data-highlighter="shiki" data-ext="mysql" data-title="mysql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select distinct</span></span>
<span class="line"><span>    t.num as ConsecutiveNums</span></span>
<span class="line"><span>from</span></span>
<span class="line"><span>    (</span></span>
<span class="line"><span>        select</span></span>
<span class="line"><span>            num,</span></span>
<span class="line"><span>            LAG(num, 1) over(order by id) as prev1,</span></span>
<span class="line"><span>            LAG(num, 2) over(order by id) as prev2</span></span>
<span class="line"><span>        from</span></span>
<span class="line"><span>            Logs</span></span>
<span class="line"><span>    ) as t</span></span>
<span class="line"><span>where t.num = prev1 and t.num = prev2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设 <code v-pre>Logs</code> 表中有以下数据：</p>
<table>
<thead>
<tr>
<th>id</th>
<th>num</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>1</td>
</tr>
<tr>
<td>4</td>
<td>2</td>
</tr>
<tr>
<td>5</td>
<td>1</td>
</tr>
<tr>
<td>6</td>
<td>2</td>
</tr>
<tr>
<td>7</td>
<td>2</td>
</tr>
<tr>
<td>8</td>
<td>2</td>
</tr>
</tbody>
</table>
<p>运行子查询后，生成的虚表如下：</p>
<table>
<thead>
<tr>
<th>num</th>
<th>prev1</th>
<th>prev2</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>NULL</td>
<td>NULL</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>NULL</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td>2</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
<td>2</td>
</tr>
</tbody>
</table>
</div></template>


