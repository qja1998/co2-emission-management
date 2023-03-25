import { defineComponent, h, PropType  } from 'vue'
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
  setup(props) {
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
          data: [2000, 1800, 1500, 1600, 1000, 1200, 680, 820, 760, 758, 100],
          
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