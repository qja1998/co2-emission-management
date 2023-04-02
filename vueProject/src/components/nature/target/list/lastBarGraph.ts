import { defineComponent, h, PropType } from 'vue'

import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title , Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default:900 
    },
    height: {
      type: Number,
      default: 100
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },

    plugins: {
      type: Array as PropType<Plugin<'bar'>[]>,
      default: () => []
    },
    
  },
  setup(props) {
    const chartData = {
      labels: [
        '2022년 총 탄소 배출량', '2023년 총 탄소 배출량',
      ],
      datasets: [
        {
          label : '총 탄소 배출량',
          backgroundColor: ['#2A565B','#3DC984'],
          borderRadius:10,
          data: [40,30],
          barThickness:20,
        },
      ]
    }

    const chartOptions = {
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          display:false,
          position:'top' as const,
          align	: 'end' as const,
          labels : {
            padding: 30,
            usePointStyle: true,
            boxWidth:20,
            boxHeight:10,
            color:'#223354'
          }

        },
      },
      ticks: {
        minRotation: 80, // x축 값의 회전 각도를 설정할 수 있어요.
        padding: 5, // x축 값의 상하 패딩을 설정할 수 있어요.
      },
      scales:{
        x:{
          display:false,
        },
        y:{
          display:false,
        },
      }
    }

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      })
  }
})
