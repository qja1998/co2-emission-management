import { defineComponent, h, PropType,ref, computed  } from 'vue'
import {useStore} from 'vuex'
import { Doughnut } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  CategoryScale
)

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    width: {
      type: Number,
      default:50 
    },
    height: {
      type: Number,
      default: 50
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
  },
  setup(props) {
    var store =useStore()
    //날짜 그룹명
    var user_group = computed(()=> store.state.user_group)
    var selected_company = computed(()=> store.state.insight_selected_company)

    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도
    var month = now.getMonth()

    //서버
    var server_last_total_data = computed(()=> store.state.getTotalLastData).value
    var server_total_data = computed(()=> store.state.getTotalNowData).value
    var server_targetTotal_data = computed(()=> store.state.getTargetData).value


    const chartData = {
      labels: [
        '현재 총 탄소 배출량','목표 탄소 배출량'
      ],
      datasets: [
        {
          label: '탄소 배출량 percent',
          backgroundColor: ['#3DC984','white'],
          data: [server_total_data , ((server_last_total_data-server_targetTotal_data)-server_total_data)],
        },
      ],
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          display: false
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
          }
        },
      },
      cutout: '100',
      borderWidth:0
    }
    
    return () =>
      h(Doughnut, {
        chartData,
        chartOptions
      })  
  }
})