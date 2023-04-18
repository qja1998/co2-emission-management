import { defineComponent,computed, h, PropType } from 'vue'

import { Bar } from 'vue-chartjs'
import { useStore } from "vuex";
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
      default:10
    },
    height: {
      type: Number,
      default: 1000
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
        labels : [''],
      datasets: [
        {
          label : '기준량 대비 총 탄소 배출량',
          borderRadius:20,
          backgroundColor: chooseColor(),
          data: [63], // 기준량 대비 총 탄소배출량(%)
          barThickness: 20,
          padding: 4,
        },
      ],
      indexAxis:'y'
    }

    function chooseColor(){
        const data = 80
        let color = '#eee'
        if (data > 0) {
            color = '#3DC984'
        }
        else if (data < 0) {
            color = '#FF7E7E'
        }
        return color
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
            display: false
        } 
      },
      scales:{
        xAxes:{
          min: -20,
          max: 100,
          ticks: {
            padding: 10,
            stepSize: 10
          },
          grid:{
            display: true
          }

        },
        yAxes:{
          grid:{
            display: false   
          },
        },
      },
      indexAxis:'y' as const,
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
