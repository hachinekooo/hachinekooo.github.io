<template>
  <div class="heatmap-wrapper">
    <div class="heatmap-header">
      <span class="heatmap-stats">{{ totalPosts }} blog posts in the last year</span>
    </div>
    <div 
      ref="heatmapRef" 
      class="heatmap-container" 
      :style="{
        maxWidth: '800px',
        height: getContainerHeight(),
        minHeight: '160px'
      }"
    ></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref, nextTick } from 'vue';
import * as echarts from 'echarts/core';
import { CalendarComponent, TooltipComponent, VisualMapComponent, LegendComponent } from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import { Blog } from "vuepress-theme-hope/blog"; // Blog 博客布局

// 注册必要的组件
echarts.use([
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent,
  HeatmapChart,
  CanvasRenderer
]);

export default defineComponent({
  name: 'HeatMap',
  props: {
    posts: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: '博客产出统计'
    },
    mode: {
      type: String,
      default: 'text', // 'text', 'code', 'both'
      validator: (value) => ['text', 'code', 'both'].includes(value)
    }
  },
  setup(props) {
    const heatmapRef = ref(null);
    const totalPosts = ref(0);
    let myChart = null;
    let resizeHandler = null;
    const dataMap = new Map();

    // 根据模式获取容器高度
    const getContainerHeight = () => {
      if (props.mode === 'both') {
        return '200px'; // 双模式优化高度
      } else {
        return '140px'; // 单模式更紧凑，更接近GitHub
      }
    };

    // 处理数据
    const processData = () => {
      dataMap.clear();
      
      // 构建dataMap格式 {date: [{wordCount, codeLines, link, title}]}
      props.posts.forEach(post => {
        const key = post.date.substring(0, 10); // 假设日期格式为 "YYYY-MM-DD..."
        const value = dataMap.get(key);
        
        // 提取文字计数和代码行数
        const wordCount = post.wordCount || 0;
        const codeLines = post.codeLines || 0;
        
        const link = post.path;
        const title = post.title;
        
        // 同一天多篇文章的处理
        if (!value) {
          dataMap.set(key, [{wordCount, codeLines, link, title}]);
        } else {
          value.push({wordCount, codeLines, link, title});
        }
      });

      // 根据模式计算每天的总数
      const data = [];
      for (const [key, value] of dataMap.entries()) {
        let textSum = 0;
        let codeSum = 0;
        
        for (const v of value) {
          textSum += v.wordCount;
          codeSum += v.codeLines;
        }
        
        // 根据模式返回不同的数据
        if (props.mode === 'text') {
          data.push([key, (textSum / 1000).toFixed(1)]);
        } else if (props.mode === 'code') {
          data.push([key, (codeSum / 100).toFixed(1)]); // 代码行数除以100，使其与文字千字数量级相似
        } else {
          // 'both' 模式，返回两种类型
          data.push([key, (textSum / 1000).toFixed(1), (codeSum / 100).toFixed(1)]);
        }
      }
      
      return data;
    };

    // 根据窗口宽度设置显示范围
    const getRangeArr = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 600) {
        return getDateRange(12); // 显示一年的数据
      } else if (windowWidth >= 400) {
        return getDateRange(6);  // 半年
      } else {
        return getDateRange(3);  // 3个月
      }
    };

    // 计算日期范围
    const getDateRange = (months) => {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - months);
      const endDate = new Date();
      
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      
      return [formattedStartDate, formattedEndDate];
    };

    // 计算统计信息
    const getStatistics = () => {
      let postsCount = 0;
      for (const [key, posts] of dataMap.entries()) {
        if (posts && posts.length > 0) {
          postsCount += posts.length;
        }
      }
      totalPosts.value = postsCount;
      return {
        totalPosts: postsCount,
        year: new Date().getFullYear()
      };
    };

    // 日期格式化 YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // 初始化图表
    const initChart = () => {
      if (!heatmapRef.value) return;
      
      myChart = echarts.init(heatmapRef.value);
      
      // 监听窗口大小变化
      resizeHandler = () => {
        myChart.resize();
        // 更新日期范围
        myChart.setOption({
          calendar: {
            range: getRangeArr()
          }
        });
      };
      window.addEventListener('resize', resizeHandler);
      
      const data = processData();
      const statistics = getStatistics();
      
      // 基础配置
      const option = {
        tooltip: {
          hideDelay: 1000,
          enterable: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#333',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          formatter: function (p) {
            const date = p.data[0];
            const posts = dataMap.get(date);
            if (!posts) return `${date}<br/>无内容`;
            
            let content = `<strong>${date}</strong>`;
            let totalText = 0;
            let totalCode = 0;
            
            for (const post of posts) {
              totalText += post.wordCount;
              totalCode += post.codeLines;
              content += "<br>";
              const link = post.link;
              const title = post.title;
              
              if (props.mode === 'text') {
                const wordCount = (post.wordCount / 1000).toFixed(1);
                content += `<a href="${link}" style="color: #58a6ff; text-decoration: none;">${title}</a> <span style="color: #8b949e;">(${wordCount}k字)</span>`;
              } else if (props.mode === 'code') {
                const codeLines = post.codeLines;
                content += `<a href="${link}" style="color: #58a6ff; text-decoration: none;">${title}</a> <span style="color: #8b949e;">(${codeLines}行)</span>`;
              } else {
                const wordCount = (post.wordCount / 1000).toFixed(1);
                const codeLines = post.codeLines;
                content += `<a href="${link}" style="color: #58a6ff; text-decoration: none;">${title}</a> <span style="color: #8b949e;">(${wordCount}k字, ${codeLines}行)</span>`;
              }
            }
            
            // 添加总计信息
            if (props.mode === 'text') {
              content += `<br/><span style="color: #f0f6fc;">总计: ${(totalText / 1000).toFixed(1)}k字</span>`;
            } else if (props.mode === 'code') {
              content += `<br/><span style="color: #f0f6fc;">总计: ${totalCode}行代码</span>`;
            } else {
              content += `<br/><span style="color: #f0f6fc;">总计: ${(totalText / 1000).toFixed(1)}k字, ${totalCode}行代码</span>`;
            }
            
            return content;
          }
        },
        calendar: {
          top: 20,
          left: 30,
          right: 20,
          bottom: 20,
          cellSize: ['auto', 11], // 更小的方块，更接近GitHub
          range: getRangeArr(),
          itemStyle: {
            color: '#ebedf0', // GitHub的默认灰色
            borderWidth: 2,
            borderColor: '#ffffff',
            borderRadius: 2 // 圆角效果
          },
          yearLabel: { 
            show: false
          },
          monthLabel: {
            show: true,
            nameMap: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            fontSize: 10,
            color: '#656d76',
            margin: 5
          },
          dayLabel: {
            show: true,
            nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''], // 只显示奇数行，更接近GitHub
            fontSize: 9,
            color: '#656d76',
            margin: 8
          },
          splitLine: {
            show: false
          }
        }
      };
      
      // 根据模式设置不同的visualMap和series
      if (props.mode === 'text') {
        option.visualMap = {
          min: 0,
          max: 10,
          type: 'piecewise',
          show: false, // 隐藏VisualMap工具条
          inRange: {
            color: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'] // GitHub绿色系
          },
          pieces: [
            {min: 0, max: 0, color: '#ebedf0'},
            {min: 0.1, max: 2, color: '#9be9a8'},
            {min: 2.1, max: 5, color: '#40c463'},
            {min: 5.1, max: 8, color: '#30a14e'},
            {min: 8.1, color: '#216e39'}
          ]
        };
        
        option.series = {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: data,
        };
      } else if (props.mode === 'code') {
        option.visualMap = {
          min: 0,
          max: 10,
          type: 'piecewise',
          show: false, // 隐藏VisualMap工具条
          inRange: {
            color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'] // GitHub蓝绿色系
          },
          pieces: [
            {min: 0, max: 0, color: '#ebedf0'},
            {min: 0.1, max: 2, color: '#c6e48b'},
            {min: 2.1, max: 5, color: '#7bc96f'},
            {min: 5.1, max: 8, color: '#239a3b'},
            {min: 8.1, color: '#196127'}
          ]
        };
        
        option.series = {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: data,
        };
      } else {
        // 'both' 模式，使用两个系列
        option.visualMap = [
          {
            min: 0,
            max: 10,
            type: 'piecewise',
            show: false, // 隐藏VisualMap工具条
            inRange: {
              color: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
            },
            pieces: [
              {min: 0, max: 0, color: '#ebedf0'},
              {min: 0.1, max: 2, color: '#9be9a8'},
              {min: 2.1, max: 5, color: '#40c463'},
              {min: 5.1, max: 8, color: '#30a14e'},
              {min: 8.1, color: '#216e39'}
            ],
            seriesIndex: 0
          },
          {
            min: 0,
            max: 10,
            type: 'piecewise',
            show: false, // 隐藏VisualMap工具条
            inRange: {
              color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
            },
            pieces: [
              {min: 0, max: 0, color: '#ebedf0'},
              {min: 0.1, max: 2, color: '#c6e48b'},
              {min: 2.1, max: 5, color: '#7bc96f'},
              {min: 5.1, max: 8, color: '#239a3b'},
              {min: 8.1, color: '#196127'}
            ],
            seriesIndex: 1
          }
        ];
        
        // 生成文字和代码的两个数据系列
        const textData = data.map(item => [item[0], item[1]]);
        const codeData = data.map(item => [item[0], item[2]]);
        
        option.series = [
          {
            name: '文字',
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: textData,
          },
          {
            name: '代码',
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: codeData,
          }
        ];
      }
      
      myChart.setOption(option);
      
      // 点击事件 - 改进的交互
      myChart.on('click', function(params) {
        if (params.componentType === 'series') {
          const posts = dataMap.get(params.data[0]);
          if (posts && posts.length > 0) {
            if (posts.length === 1) {
              // 只有一篇文章，直接打开
              const link = window.location.origin + posts[0].link;
              window.open(link, '_blank').focus();
            } else {
              // 多篇文章，可以考虑显示列表或打开第一篇
              const link = window.location.origin + posts[0].link;
              window.open(link, '_blank').focus();
            }
          }
        }
      });
      
      // 添加鼠标悬停效果
      myChart.on('mouseover', function(params) {
        if (params.componentType === 'series') {
          myChart.getZr().setCursorStyle('pointer');
        }
      });
      
      myChart.on('mouseout', function(params) {
        myChart.getZr().setCursorStyle('default');
      });
    };

    onMounted(() => {
      // 使用nextTick确保DOM已经渲染
      nextTick(() => {
        initChart();
      });
    });

    onBeforeUnmount(() => {
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      if (myChart) {
        myChart.dispose();
      }
    });

    return {
      heatmapRef,
      totalPosts,
      getContainerHeight
    };
  }
});
</script>

<style scoped>
.heatmap-wrapper {
  max-width: 800px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
  background-color: #ffffff;
  border: 1px solid #d1d9e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: none;
  position: relative;
}

.heatmap-wrapper:hover {
  border-color: #c1c9d0;
  transition: border-color 0.2s ease-in-out;
}

.heatmap-header {
  margin-bottom: 10px;
}

.heatmap-stats {
  font-size: 14px;
  font-weight: normal;
  color: #656d76;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
}

.heatmap-container {
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .heatmap-wrapper {
    background-color: #0d1117;
    border-color: #30363d;
    color: #f0f6fc;
  }
  
  .heatmap-wrapper:hover {
    border-color: #40464d;
  }
  
  .heatmap-stats {
    color: #8b949e;
  }
}

/* 更紧凑的布局 */
.heatmap-container canvas {
  max-width: 100%;
}
</style>