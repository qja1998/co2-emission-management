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
import chart from '@/components/measure/input1/chart'

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
    var server_category_predict_data = [
        [580, 590, 640, 575, 573, 680, 680, 820, 760, 758, 770, 758, 762],
        [530, 495, 486, 570, 573, 664, 667, 663, 660, 670, 673, 750],
        [495, 397, 480, 390, 475, 510, 550, 587, 590, 723, 640, 743],
        [498, 401, 420, 297, 361, 483, 490, 564, 550, 701, 640, 738],
        [381, 363, 321, 350, 348, 371, 365, 362, 384, 391, 342, 370],
        [140, 143, 184, 123, 120, 212, 213, 310, 300, 512, 320, 430],
        [208, 175, 143, 167, 160, 220, 198, 194, 222, 270, 200, 315],
        [312, 274, 250, 280, 278, 320, 300, 298, 350, 380, 290, 420]
      ]
    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
      datasets: [
        {
            label:'임직원 출퇴근',
            data: server_category_predict_data[0],
            backgroundColor : chooseColor(),
            barThickness: 20,
          }
      ]
    }

    function chooseColor(){
      var color : string[] = []
      for (var i=0;  i<=12; i++){
        if (i >= 9) {
          color.push('#BFBFBF')
        } else {
          color.push('#49C5E0')
        }
      }
      return color
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend:{
          display:false
        }
      },
      scales:{
        x:{
          grid:{
            display:false
          }
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