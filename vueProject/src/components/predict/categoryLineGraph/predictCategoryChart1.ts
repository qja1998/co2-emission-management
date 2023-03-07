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
          label: '고정연소',
          backgroundColor: '#9FD72A',
          data: [580, 590, 640, 575, 573, 680, 680, 820, 760, 758],
          borderColor: '#9FD72A',
        },
        {
          backgroundColor: '#9FD72A',
          data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 758, 770, 758, 762],
          borderColor: '#9FD72A',
          borderDash: [2]
        },
        {
          label:'이동연소',
          backgroundColor: '#FFA800',
          data: [530, 495, 486, 570, 573, 664, 667, 663, 660, NaN, NaN, NaN],
          borderColor: '#FFA800',
        },
        {
          backgroundColor: '#FFA800',
          data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 660, 670, 673, 750],
          borderColor: '#FFA800',
          borderDash: [2]
        },
        {
          label: '임직원 출퇴근',
          backgroundColor: '#49C5E0',
          data: [495, 397, 480, 390, 475, 510, 550, 587, 590, NaN, NaN, NaN],
          borderColor: '#49C5E0',
        },
        {
          backgroundColor: '#49C5E0',
          data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 590, 723, 640, 743],
          borderColor: '#49C5E0',
          borderDash: [2]
        },
        {
          label: '수도',
          backgroundColor: '#FF3B3B',
          data: [498, 401, 420, 297, 361, 483, 490, 564, 550, NaN, NaN, NaN],
          borderColor: '#FF3B3B',
        },
        {
          backgroundColor: '#FF3B3B',
          data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 550, 701, 640, 738],
          borderColor: '#FF3B3B',
          borderDash: [2]
        },
        {
          label: '전력',
          backgroundColor: '#5E8CFF',
          data: [381, 363, 321, 350, 348, 371, 365, 362, 384, NaN, NaN, NaN],
          borderColor: '#5E8CFF',
        },
        {
          backgroundColor: '#5E8CFF',
          data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 384, 391, 342, 370],
          borderColor: '#5E8CFF',
          borderDash: [2]
        },
        {
          label: '비료사용',
          backgroundColor: '#904E00',
          data: [140, 143, 184, 123, 120, 212, 213, 310, 300, NaN, NaN, NaN],
          borderColor: '#904E00',
        },
        {
          backgroundColor: '#904E00',
          data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 300, 512, 320, 430],
          borderColor: '#904E00',
          borderDash: [2]
        },

        {
          label: '폐기물',
          backgroundColor: '#ED86EF',
          data: [208, 175, 143, 167, 160, 220, 198, 194, 222, NaN, NaN, NaN],
          borderColor: '#ED86EF',
        },
        {
          backgroundColor: '#ED86EF',
          data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 222, 270, 200, 315],
          borderColor: '#ED86EF',
          borderDash: [2]
        },
        {
          label: '산림에 의한 흡수',
          backgroundColor: '#FF1686',
          data: [312, 274, 250, 280, 278, 320, 300, 298, 350, NaN, NaN, NaN],
          borderColor: '#FF1686',
        },
        {
          backgroundColor: '#FF1686',
          data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 350, 380, 290, 420],
          borderColor: '#FF1686',
          borderDash: [2]
        }
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
