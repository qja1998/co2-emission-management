import { defineComponent,computed, h, PropType } from 'vue'
import {ref} from 'vue'
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
      default:5
    },
    height: {
      type: Number,
      default: 10
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
    var server_total_data = [20,50,60,40,20,30,50,50,40,20,30,60]
    var sum =ref(0)
    for(var i=0; i<server_total_data.length; i++){
        sum.value = server_total_data[i] + sum.value
    }
    var server_evaluation = {BaseYear:2019, BaseEmissions:980}
    var realData = (server_evaluation.BaseEmissions-sum.value)/(server_evaluation.BaseEmissions) *100

    const chartData = {
        labels : [''],
      datasets: [
        {
          label : '기준량 대비 총 탄소 배출량',
          borderRadius:20,
          backgroundColor: chooseColor(),
          data: [realData], // 기준량 대비 총 탄소배출량(%)
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
            display: false,
            drawBorder: false,
          },
    

        },
        yAxes:{
          grid:{
            display: false,
            drawBorder: false,   
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
