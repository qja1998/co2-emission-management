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
    var server_total_data = [152,120,123,130,128,136,139,150,130]
    var server_predict_total_data = [50,60,40,20,30,40]
    
    var server_predict_data = [NaN, NaN, NaN, NaN, NaN,NaN,NaN,NaN]
    server_predict_data.push(server_total_data[server_total_data.length - 1])
    for(var i=0; i<server_predict_total_data.length; i++){
      server_predict_data.push(server_predict_total_data[i])
      
    }
    console.log(server_predict_data)
    const chartData = {
      labels: ['January','February','March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
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