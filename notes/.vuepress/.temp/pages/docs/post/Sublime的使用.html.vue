<template><div><p>快捷键说明
Command+D	先选中文本，再按 Command+D，会选中下一个相同的文本，再继续按 D (Command 不放)则会选中下一个相同的文本，可以同时编辑被选中的文本
Control+Command+G	选中文本，按下此快捷键，即可一次性选择全部的相同文本进行同时编辑。比如：快速选中并更改所有相同的变量名、函数名等，和 QQ 快捷键冲突
Option+拖动鼠标垂直选中，意义不大
Commandl+L	选中整行，继续操作则继续选择下一行
Shift+↓	向下选中多行，效果和 Command+L 类似，但是选中首行时，如果光标不是在行首，此快捷键并不会选中整行，而是把光标右侧的字符全部选中，按住 Shift 不放，继续点按↓则会选中下一行，意义不大
Shift+↑	向上选中多行，意义不大
Shift+Option+↓	按住前两个键不放，每次点按↓则会选中下一行
Shift+Option+↑	按住前两个键不放，每次点按↑则会选中上一行
Shift+Command+L	先选中多行，再按下快捷键，会在每行行尾插入光标，即可同时编辑这些行
Shift+Control+M	将光标放在括号内，按下此快捷键会全部选中括号内的内容（按住 Control 和 Shift 不放，继续点按 M，则会选择父括号中的内容）。比如我们要重写函数，就可以执行此快捷键来快速选中并删除函数中的代码
Shift+←	选中光标左侧的字符，每按一下左箭头会选中一个字符
Shift+→	选中光标右侧的字符，每按一下右箭头会选中一个字符
Shift+Option+←	选中光标左侧的字符，每按一下左箭头会选中一个单词
Shift+Option+→	选中光标右侧的字符，每按一下右箭头会选中一个单词
Shift+Command+←	选中光标左侧的全部文本
Shift+Command+→	选中光标右侧的全部文本
Shift+Command+↑	选中光标所在行及上方的全部文本内容
Shift+Command+↓	选中光标所在行及下方的全部文本内容
Command+鼠标左键按住 Command，再按住鼠标左键拖动选择文本，可以同时选择多处文本，编辑的时候被选中的多处文本会同时编辑
Shift+Command+J	选中同一缩进区块，持续按键会逐步扩大选择区域，意义不大
Shift+Command+space	选中范围，持续按键会逐步扩大选择区域，意义不大
Shift+Control+A	选中光标左侧的字符文本
移动光标
快捷键说明
Control+M	光标移动至括号结束或开始的位置
Command+←	快速移动光标到行首
Command+→	快速移动光标到行尾
Control+E	光标移到行尾
Control+A	光标移到行首
Option+→	向右移动光标到单词尾部
Option+←	向左移动光标到单词头部
编辑文本
快捷键说明
Shift+Control+↑	向上添加多行光标，可同时编辑多行，意义不大
Shift+Control+↓	向下添加多行光标，可同时编辑多行，意义不大
Control+Command+↑	将光标所在行上移
Control+Command+↓	将光标所在行下移
Command+Enter	在光标所在行的下一行插入新行
Shift+Command+Enter	在上一行插入新行
Commandl+J	合并选中的多行为一行。比如：将多行格式的 CSS 属性合并为一行
Shift+Command+D	复制光标所在整行，插入到下一行
Tab	缩进
Shift+Tab	取消缩进
Command+]	缩进当前行或者段落
Command+[	取消缩进当前行或者段落
Control+K	从光标处开始删除至行尾
Command+Del	从光标处开始删除至行首
Shift+Control+K	删除整行
Command+X	删除当前行
Option+Del 或者 Control+Del	向左按词删除
Command+/	注释单行
Option+Command+/	注释多行
Command+K 或者 Command+U	单词大写，MBA 亲测无效
Command+K 或者 Command+L	单词小写，MBA 亲测无效
Command+Z	撤销
Command+Y	反撤销
Command+U	软撤销，感觉和 Command+Z 一样
Control+T	靠近光标左侧的一个字符，向右移动，即交换光标前后字母/文字
查找/替换
快捷键说明
Command+F	打开底部搜索框，查找关键字
Shift+Command+F	在文件夹内查找和替换，与普通编辑器不同的地方是 Sublime 允许添加多个文件夹进行查找，默认是在当前打开的文件所在目录下寻找
Option+Command+F	在当前文件内查找替换
Command+P 或者 Command+T	打开搜索框，显示当前文件所在目录下所有文件，输入文件名或移动光标可以预览或打开文件。特殊用法：1. 输入当前项目中的文件名，快速搜索文件；2. 输入@和关键字，查找文件中函数名；3. 输入：和数字，跳转到文件中该行位置；4. 输入#和关键字 ，查找变量名
Control+G	打开搜索框，自动带:，输入数字快速跳转到该行位置
Command+R	打开搜索框，自动带@，输入关键字，查找文件中的函数名
Shift+Command+P	打开命令面板
窗口显示
快捷键说明
Control+Tab	向右切换当前窗口的标签页（每个标签页其实是一份文件）
Shift+Control+Tab	向右切换当前窗口的标签页
Shift+Command+[	向左切换当前窗口的标签页
Shift+Command+]	向右切换当前窗口的标签页
Option+Command+1	窗口恢复 1 屏
Option+Command+2	窗口左右分屏-2 列
Option+Command+3	窗口左右分屏-3 列
Option+Command+4	窗口左右分屏-4 列
Option+Command+5	窗口等分 4 屏
Option+Command+8	窗口垂直分屏-2 屏
Option+Command+9	窗口垂直分屏-3 屏
Control+W	关闭当前打开文件，多个标签页，就是关闭当前标签页
Control+Shift+W	关闭所有打开文件
Shift+Command+N	新建窗口
Command+N	新建文件，也就是标签页
Control+Command+F	窗口全屏
书签和标记
快捷键说明
Command+F 2	设置和取消书签，MBA 使用功能键需要结合 Fn 键使用，MBA 亲测无法取消
F 2	跳到下一个书签，需要结合 Fn 键使用
Shift+F 2	跳到上一个书签，需要结合 Fn 键使用
Shift+Command+F 2	取消所有书签，MBA 需要结合 Fn 使用
Command+K	设置和取消标记，MBA 亲测无效
其它
快捷键说明
Option+Command+[	选中代码，按下快捷键，折叠代码
Option+Command+]	选中代码，按下快捷键，展开代码
Command+K 或者 Command+0	展开所有折叠代码
F 5	行排序，按数字、字母、文字排序，结合 Fn 键使用
F 6	单词检测拼写，结合 Fn 使用
Ctrl + `	打开控制台
————————————————
版权声明：本文为 CSDN 博主「liaowenxiong」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接： https://blog.csdn.net/liaowenxiong/article/details/113640489</p>
<h1 id="pretty-json" tabindex="-1"><a class="header-anchor" href="#pretty-json"><span>Pretty_JSON</span></a></h1>
<ul>
<li>package install pretty json</li>
<li>重启</li>
<li>首选项-快捷键设置</li>
<li></li>
<li>在右侧窗口中自定义快捷键：shift + control + J</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[</span></span>
<span class="line"><span>	{ "keys": ["ctrl+shift+j"], "command": "pretty_json" },</span></span>
<span class="line"><span>]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


