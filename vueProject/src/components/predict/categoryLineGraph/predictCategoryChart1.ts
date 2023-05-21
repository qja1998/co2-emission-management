import { defineComponent, h, PropType } from 'vue'
import { Line } from 'vue-chartjs'
import {ref} from 'vue'
 

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
    const dash=(ctx,value) => ctx.p0DataIndex > 5 ? value:[1,0]
    //서버 
    var server_category_predict_data = [
      [820, 760, 758, 770, 758, 762],
      [667, 663, 660, 670, 673, 750],
      [550, 587, 590, 723, 640, 743],
      [490, 564, 550, 701, 640, 738],
      [365, 362, 384, 391, 342, 370],
      [213, 310, 300, 512, 320, 430],
      [198, 194, 222, 270, 200, 315],
      [300, 298, 350, 380, 290, 420]
    ]

    var server_category_data = [
      [580, 590, 640, 575, 573, 680],
      [530, 495, 486, 570, 573, 664],
      [495, 397, 480, 390, 475, 510],
      [498, 401, 420, 297, 361, 483],
      [381, 363, 321, 350, 348, 371],
      [140, 143, 184, 123, 120, 212],
      [208, 175, 143, 167, 160, 220],
      [312, 274, 250, 280, 278, 320]
    ]

    var category_data = ref(server_category_data)

    for(var i=0; i<server_category_predict_data.length; i++){
      category_data.value[i].push(...server_category_predict_data[i])
    }

    console.log(category_data.value)


    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
      datasets: [
        {
          label: '고정연소',
          backgroundColor: '#9FD72A',
          data: category_data.value[0],
          borderColor: '#9FD72A',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label:'이동연소',
          backgroundColor: '#FFA800',
          data:  category_data.value[1],
          borderColor: '#FFA800',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '임직원 출퇴근',
          backgroundColor: '#49C5E0',
          data:  category_data.value[2],
          borderColor: '#49C5E0',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '수도',
          backgroundColor: '#FF3B3B',
          data:  category_data.value[3],
          borderColor: '#FF3B3B',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '전력',
          backgroundColor: '#5E8CFF',
          data:  category_data.value[4],
          borderColor: '#5E8CFF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '비료사용',
          backgroundColor: '#904E00',
          data:  category_data.value[5],
          borderColor: '#904E00',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '폐기물',
          backgroundColor: '#ED86EF',
          data:  category_data.value[6],
          borderColor: '#ED86EF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '산림에 의한 흡수',
          backgroundColor: '#FF1686',
          data:  category_data.value[7],
          borderColor: '#FF1686',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        }
      ],
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          display: true,
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
