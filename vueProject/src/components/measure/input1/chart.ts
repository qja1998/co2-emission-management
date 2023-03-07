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
        'scope1',
        'scope2',
        'scope3'
      ],
      datasets: [
        {
          label : 'Scpoe1',
          backgroundColor: ['#E0F599'],
          borderRadius:10,
          data: [40],
        },
        {
          label : 'Scpoe2',
          backgroundColor: ['#62BC8A'],
          data: [40],
        },
        {
          label : 'Scpoe3',
          backgroundColor: ['#15575C'],
          borderRadius:10,
          data: [40],
        }
      ]
    }

    const chartOptions = {
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          position:'top' as const,
          align	: 'start' as const,
          labels : {
            padding: 10,
            usePointStyle: true,
            boxWidth:20,
            boxHeight:10,
            color:'#223354'
          }

        },
      },
      scales:{
        x:{
          stacked:true,
          display:false,
        },
        y:{
          stacked:true,
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
