<template>
  <div>
    <p id="custom-text">{{ hitokoto }}</p>
    <p v-if="author">— {{ author }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hitokoto: '', // 存储获取的文字
      author: ''    // 存储来源
    };
  },
  async mounted() {
    // 异步请求数据
    await this.getHitokoto();
  },
  methods: {
    async getHitokoto() {
      try {
        const response = await fetch('https://v1.hitokoto.cn');
        const data = await response.json();
        this.hitokoto = data.hitokoto;
        this.author = data.from;
      } catch (error) {
        console.error('Failed to fetch hitokoto:', error);
      }
    }
  }
}
</script>