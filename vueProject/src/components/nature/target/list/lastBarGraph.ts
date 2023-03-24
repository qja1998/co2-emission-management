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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
        '총 탄소 배출량',
      ],
      datasets: [
        {
          label : '2022년',
          backgroundColor: ['#E0F599'],
          borderRadius:10,
          data: [40],
          barThickness:20,
          barPercentage: 0.5
        },
        {
          label : '2023년',
          backgroundColor: ['#62BC8A'],
          borderRadius:10,
          data: [30],
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
