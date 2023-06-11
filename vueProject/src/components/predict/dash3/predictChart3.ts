import { defineComponent, h, PropType } from 'vue'
import { Line } from 'vue-chartjs'
import {ref,computed} from 'vue'
import {useStore} from 'vuex'


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
    var store = useStore()
    //그룹명
    var selected_company = computed(()=> store.state.insight_selected_company)
    var user_group = computed(()=> store.state.user_group)
    //날짜 
    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도
    var month = now.getMonth()+1 //월
    // x범위 만들기
    var month_Eng = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December']
    var x_legend =['']

    for(var i = 0; i< month_Eng.length; i++){
      if(month-6+i < 0){
          x_legend[i] = month_Eng[month_Eng.length + (month-6+i)]
          console.log(x_legend)
      }
      else{
        x_legend[i] = month_Eng[month-6+i]
      }
    }

    //서버
    var total =  computed(()=> store.state.getTotalLastDataList)
    var server_total_data = [0,0,0,0,0,0] 
    
    for(var i =0; i < 6; i++){
      server_total_data[i]=total.value[i]
    }
    var server_predict_total_data = computed(()=> store.state.getPredictTotal)
    
    var server_predict_data = [NaN, NaN, NaN, NaN, NaN]
    server_predict_data.push(server_total_data[server_total_data.length - 1])

    for(var i=0; i<server_predict_total_data.value.length; i++){
      server_predict_data.push(server_predict_total_data.value[i])
      
    }

    console.log(server_total_data)
    console.log(server_predict_data)
    //차트 데이터
    const chartData = {
      labels: x_legend,
      datasets: [
        {
          label: 'Total Carbon Emission',
          backgroundColor: '#4A946F',
          data: server_total_data,
          borderColor: '#4A946F',
        },
        {
          label: 'Predict Total Carbon Emission',
          backgroundColor: '#3DC984',
          borderColor: '#3DC984',
          data: server_predict_data,
          borderDash:[2]
        },
      ]
    }

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
            display:false,
          },
  
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