---
title: 悲观者永远正确，乐观者永远前行
icon: circle-info
cover:
---
> 主要编程语言：Java

<!-- 只显示文字统计 -->
<!-- <HeatMap :posts="slogans" title="博客文字产量" mode="text" /> -->

<!-- 只显示代码统计 -->
<!-- <HeatMap :posts="slogans" title="博客代码产量" mode="code" /> -->

<!-- 同时显示文字和代码统计 -->
<HeatMap :posts="slogans" title="博客整体产量" mode="both" />

[![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username=hachinekooo&theme=github&area=true&hide_border=true)




<script setup>
import HeatMap from "@/components/heatMap.vue";
import slogans from '@source/heatmap_data.json';


</script>