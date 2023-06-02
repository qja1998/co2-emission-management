import { defineComponent, h, PropType, ref, computed  } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {useStore} from 'vuex'

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
  
  setup(props) {

    var store = useStore()
    //그룹명
    var selected_company = computed(()=> store.state.insight_selected_company)
    var user_group = computed(()=> store.state.user_group)

    //날짜 
    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도
    var month = now.getMonth() //월

    //서버
    var server_category_data = computed(()=> store.state.getTotalCategoryDataList).value
    var sum_total_category_data = ref([0]) //카테고리별 일년치 데이터

    for(var i=0; i<server_category_data.length; i++){
        var sum = ref(0)
        for(var j =0; j<server_category_data[i].length; j++){
            sum.value = server_category_data[i][j] + sum.value
        }
        sum_total_category_data.value[i] = sum.value
    }

    const chartData = {
      labels: [
        '고정연소', 
        '이동연소', 
        '탈루배출', 
        '폐기물 처리시설', 
        '비료사용', 
        '대학동물 소유', 
        '산림에의한 흡수',
        '전력',
        '스팀',
        '수도',
        '폐기물',
      ],
      datasets: [
        {
          label: '카테고리별 탄소 배출량',
          backgroundColor: ['#9FD72A','#FFA800','#59CFE9','#B67FBF','#CA985E','#F6DD00','#3E9B96','#5E8CFF','#FF7D7D','#088AA6','#475674'],
          data: sum_total_category_data.value,
          
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
      cutout: '70',
      borderWidth:0
    }
    
    return () =>
      h(Doughnut, {
        chartData,
        chartOptions
      })  
  }
})