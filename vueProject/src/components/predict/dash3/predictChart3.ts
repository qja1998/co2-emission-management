import { defineComponent, h, PropType } from 'vue'
import { Line } from 'vue-chartjs'



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
    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
      datasets: [
        {
          label: 'Total Carbon Emission',
          backgroundColor: '#4A946F',
          data: [152, 120, 123, 130, 128,136,139,150,130],
          borderColor: '#4A946F',
        },
        {
          label: 'Predict Total Carbon Emission',
          backgroundColor: '#3DC984',
          borderColor: '#3DC984',
          data: [NaN, NaN, NaN, NaN, NaN,NaN,NaN,NaN,130,142,154,158],
          borderDash:[2]
        },
      ]
    }
    
    var server_total_data=[20,50,30,40,20,50,]
    //해당 조직의 정한 기간만큼의 총 탄소 배출량 
    
    var server_predict_total_data= [50,40,30,20,50,80] 
    // 예측된 6개월치 총 탄소 배출량 
      
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          position:'top' as const,
          align	: 'end' as const,
          labels : {
            padding: 30,
            boxWidth:30,
            boxHeight:6,
            color:'#223354'
          }

        },
      },
      scales:{
        x:{
          display:true,
          grid:{
            display:false
          }
        },
        y:{
          display:true,
          grid:{
            display:false
          }
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
