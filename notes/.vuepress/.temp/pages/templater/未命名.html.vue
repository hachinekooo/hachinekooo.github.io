<template><div><h2 id="let-today-tp-date-now-yyyy-mm-dd-let-momentdate-window-moment-today-yyyy-mm-dd-true-let-titlename-momentdate-format-yyyy-mm-dd-let-year-momentdate-format-yyyy-let-month-momentdate-format-mm" tabindex="-1"><a class="header-anchor" href="#let-today-tp-date-now-yyyy-mm-dd-let-momentdate-window-moment-today-yyyy-mm-dd-true-let-titlename-momentdate-format-yyyy-mm-dd-let-year-momentdate-format-yyyy-let-month-momentdate-format-mm"><span>&lt;%*<br>
let today = tp.date.now(&quot;YYYY-MM-DD&quot;)<br>
let momentDate = window.moment(today, &quot;YYYY-MM-DD&quot;, true)<br>
let titleName = momentDate.format(&quot;YYYY-MM-DD&quot;)<br>
let year = momentDate.format(&quot;YYYY&quot;)<br>
let month = momentDate.format(&quot;MM&quot;)<br>
-%&gt;</span></a></h2>
<h2 id="感触" tabindex="-1"><a class="header-anchor" href="#感触"><span>感触</span></a></h2>
<ul>
<li>#感触</li>
<li>#感触</li>
</ul>
<hr>
<h2 id="感恩" tabindex="-1"><a class="header-anchor" href="#感恩"><span>感恩</span></a></h2>
<ul>
<li>#感恩</li>
<li>#感恩</li>
<li>#祝福</li>
<li>#祝福</li>
</ul>
<p>&lt;%*<br>
let destDir = &quot;docs/dailyNotes/&quot; + year + &quot;/&quot; + month<br>
await tp.file.move(destDir + &quot;/&quot; + titleName)<br>
tp.file.cursor()<br>
-%&gt;</p>
</div></template>


