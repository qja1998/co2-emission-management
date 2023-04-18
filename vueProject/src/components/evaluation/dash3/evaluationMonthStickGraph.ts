import { defineComponent, h, PropType } from 'vue'
import annotationPlugin from 'chartjs-plugin-annotation'
import { Bar, Line } from 'vue-chartjs'

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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, annotationPlugin)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar, Line
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default:300 
    },
    height: {
      type: Number,
      default: 150
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
      type: "bar",
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
      datasets: [
        {
          label:'총 탄소 배출량',
          data: [530, 495, 486, 570, 573, 664, 667, 663, 660, 670, 673, 750],
          backgroundColor : '#3DC984',
          barThickness: 30,
        },
        // {
        //     type: "Line",
        //     label: '월별 기준량',
        //     data: [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
        //     backgroundColor: '#FF3B3B'
        // }
      ]
    }
    const chartData2 = {
      type: "line",
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
      datasets: [
        {
            label: '월별 기준량',
            data: [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
            backgroundColor: '#FF3B3B'
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend:{
          display:true,
          position:'top' as const,
        },
        // annotation: {
        //   annotations: {
        //     line1: {
        //       type: 'line',
        //       xMin: 590,
        //       yMax: 590,
        //       borderColor: '#FF3B3B',
        //       borderWidth: 2
        //     }
        //   }
        // }
      },
      scales:{
        x:{
          grid:{
            display:false
          }
        },
        y:{
          stacked:true,
          display:true,
        },
      },
    }

    return () =>
      h(Bar, {
        chartData,
        chartData2,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      }, Line)
  }
})
