<template><div><h2 id="let-today-tp-date-now-yyyy-mm-dd-let-momentdate-window-moment-today-yyyy-mm-dd-true-let-titlename-momentdate-format-yyyy-mm-dd-let-year-momentdate-format-yyyy-let-month-momentdate-format-mm" tabindex="-1"><a class="header-anchor" href="#let-today-tp-date-now-yyyy-mm-dd-let-momentdate-window-moment-today-yyyy-mm-dd-true-let-titlename-momentdate-format-yyyy-mm-dd-let-year-momentdate-format-yyyy-let-month-momentdate-format-mm"><span>&lt;%*<br>
let today = tp.date.now(&quot;YYYY-MM-DD&quot;)<br>
let momentDate = window.moment(today, &quot;YYYY-MM-DD&quot;, true)<br>
let titleName = momentDate.format(&quot;YYYY-MM-DD&quot;)<br>
let year = momentDate.format(&quot;YYYY&quot;)<br>
let month = momentDate.format(&quot;MM&quot;)<br>
-%&gt;</span></a></h2>
<h2 id="_3-things-worth-it" tabindex="-1"><a class="header-anchor" href="#_3-things-worth-it"><span>3 things worth it</span></a></h2>
<ul>
<li></li>
<li></li>
</ul>
<hr>
<h2 id="one-thing-you-could-do-better-next-week" tabindex="-1"><a class="header-anchor" href="#one-thing-you-could-do-better-next-week"><span>One thing you could do better next week</span></a></h2>
<ul>
<li></li>
</ul>
<h2 id="thinking-what" tabindex="-1"><a class="header-anchor" href="#thinking-what"><span>Thinking what</span></a></h2>
<p>&lt;%*<br>
let destDir = &quot;docs/quiettalks/&quot; + year + &quot;/&quot; + month<br>
await tp.file.move(destDir + &quot;/&quot; + titleName)<br>
tp.file.cursor()<br>
-%&gt;</p>
</div></template>


