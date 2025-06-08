<template>
  <div 
    ref="heatmapRef" 
    class="heatmap-container" 
    :style="{
      maxWidth: '600px',
      height: '180px',
      padding: '2px',
      textAlign: 'center'
    }"
  ></div>
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
    let myChart = null;
    let resizeHandler = null;
    const dataMap = new Map();

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
        return getDateRange(12);
      } else if (windowWidth >= 400) {
        return getDateRange(9);
      } else {
        return getDateRange(6);
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
      
      // 基础配置
      const option = {
        title: {
          top: 0,
          left: 'center',
          text: props.title
        },
        tooltip: {
          hideDelay: 1000,
          enterable: true,
          formatter: function (p) {
            const date = p.data[0];
            const posts = dataMap.get(date);
            if (!posts) return date;
            
            let content = `${date}`;
            for (const post of posts) {
              content += "<br>";
              const link = post.link;
              const title = post.title;
              
              if (props.mode === 'text') {
                const wordCount = (post.wordCount / 1000).toFixed(1);
                content += `<a href="${link}" target="_blank">${title} | ${wordCount} 千字</a>`;
              } else if (props.mode === 'code') {
                const codeLines = post.codeLines;
                content += `<a href="${link}" target="_blank">${title} | ${codeLines} 行代码</a>`;
              } else {
                const wordCount = (post.wordCount / 1000).toFixed(1);
                const codeLines = post.codeLines;
                content += `<a href="${link}" target="_blank">${title} | ${wordCount} 千字 | ${codeLines} 行代码</a>`;
              }
            }
            return content;
          }
        },
        calendar: {
          top: 80,
          left: 20,
          right: 4,
          cellSize: ['auto', 12],
          range: getRangeArr(),
          itemStyle: {
            color: '#F1F1F1',
            borderWidth: 2.5,
            borderColor: '#fff',
          },
          yearLabel: { show: false },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.0)',
            }
          }
        }
      };
      
      // 根据模式设置不同的visualMap和series
      if (props.mode === 'text') {
        option.visualMap = {
          min: 0,
          max: 10,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 30,
          inRange: {
            color: ['#7aa8744c', '#7AA874']
          },
          splitNumber: 4,
          text: ['千字', ''],
          showLabel: true,
          itemGap: 20,
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
          orient: 'horizontal',
          left: 'center',
          top: 30,
          inRange: {
            color: ['#5470c64c', '#5470C6']
          },
          splitNumber: 4,
          text: ['百行代码', ''],
          showLabel: true,
          itemGap: 20,
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
            orient: 'horizontal',
            left: 'center',
            top: 30,
            inRange: {
              color: ['#7aa8744c', '#7AA874']
            },
            splitNumber: 4,
            text: ['千字', ''],
            showLabel: true,
            itemGap: 20,
            seriesIndex: 0
          },
          {
            min: 0,
            max: 10,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 55,
            inRange: {
              color: ['#5470c64c', '#5470C6']
            },
            splitNumber: 4,
            text: ['百行代码', ''],
            showLabel: true,
            itemGap: 20,
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
        
        // 在both模式下调整日历位置，为两个visualMap留出空间
        option.calendar.top = 105;
      }
      
      myChart.setOption(option);
      
      // 点击事件
      myChart.on('click', function(params) {
        if (params.componentType === 'series') {
          const post = dataMap.get(params.data[0])?.[0];
          if (post) {
            const link = window.location.origin + post.link;
            window.open(link, '_blank').focus();
          }
        }
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
      heatmapRef
    };
  }
});
</script>

<style scoped>
.heatmap-container {
  margin: 0 auto;
}
</style>