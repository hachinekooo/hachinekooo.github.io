<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <!-- 覆盖默认 Hero 标志为更高级的，像主题主页一样 -->
    <template #heroLogo>
      <div>一个 3D 标志</div>
    </template>
  </Layout>
</template>