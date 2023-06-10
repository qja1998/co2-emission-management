import { defineComponent, h, PropType } from 'vue'
import { Line } from 'vue-chartjs'
import {ref,computed} from 'vue'
import {useStore} from 'vuex'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default defineComponent({
  name: 'BarChart',
  components: {
    Line
  },
  setup(props) {
    //서버
    var store = useStore()
    var server_base = computed(()=> store.state.baseData)
    var server_evaluation = {BaseYear:2019, BaseEmissions:980}
    
    //서버

    var server_evaluation = {BaseYear:2019, BaseEmissions:980}
    var month_baseemissions = server_evaluation.BaseEmissions/12
    var month_baseemissions = server_base.value/12

    if(month_baseemissions == 0){
      month_baseemissions = NaN
    }
    const chartData = {
      labels: ['기준량','기준량','기준량','기준량','기준량','기준량','기준량','기준량','기준량','기준량','기준량','기준량'],
      datasets: [
        {
          label: '기준량',
          backgroundColor: '#FF3B3B',
          data: [month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions,month_baseemissions],
          borderColor: '#FF3B3B',
        },
      ],
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          display: false,
          position: 'right' as const,
          labels:{
            boxHeight:6,
            boxWidth:25,
            padding:35
          }
        },
      },
      scales:{
        x:{
          display:false,
          grid:{
            display:false
          }
        },
        y:{
          display:false,
          grid:{
            display:false
          },
          min: 0,
          max: server_base.value/12 + 1000,
        },
      }
    }
    
    return () =>
      h(Line, {
        chartData,
        chartOptions,
      })
  }
})
