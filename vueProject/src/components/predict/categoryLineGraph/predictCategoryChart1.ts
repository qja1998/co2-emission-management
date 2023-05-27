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
    const dash=(ctx,value) => ctx.p0DataIndex > 4 ? value:[1,0]
    var store = useStore()

    //그룹명
    var user_group = computed(()=> store.state.user_group)
    var selected_company = computed(()=> store.state.insight_selected_company)
    console.log('선 그래프 선택 그룹',selected_company.value)
    //날짜 
    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도
    var month = now.getMonth() //월
    console.log(month)
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
    var server_category_predict_data = [
      [820, 760, 758, 770, 758, 762],
      [667, 663, 660, 670, 673, 750],
      [550, 587, 590, 723, 640, 743],
      [490, 564, 550, 701, 640, 738],
      [365, 362, 384, 391, 342, 370],
      [213, 310, 300, 512, 320, 430],
      [198, 194, 222, 270, 200, 315],
      [300, 298, 350, 380, 290, 420],
      [380, 250, 400, 302, 500, 450],
      [250, 158, 333, 278, 400, 510],
      [401, 280, 300, 470, 400, 388]
    ]

    var server_category_data = [
      [580, 590, 640, 575, 573, 680],
      [530, 495, 486, 570, 573, 664],
      [495, 397, 480, 390, 475, 510],
      [498, 401, 420, 297, 361, 483],
      [381, 363, 321, 350, 348, 371],
      [140, 143, 184, 123, 120, 212],
      [208, 175, 143, 167, 160, 220],
      [312, 274, 250, 280, 278, 320],
      [100, 130, 250, 287, 325, 400],
      [333, 240, 258, 300, 320, 298],
      [80, 100, 147, 300, 400, 425]
    ]

    var category_data = ref(server_category_data)

    for(var i=0; i<server_category_predict_data.length; i++){
      category_data.value[i].push(...server_category_predict_data[i])
    }

    console.log(category_data.value)


    const chartData = {
      labels: x_legend,
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
          label: '탈루 배출',
          backgroundColor: '#49C5E0',
          data:  category_data.value[2],
          borderColor: '#49C5E0',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '폐기물 처리시설',
          backgroundColor: '#B67FBF',
          data:  category_data.value[3],
          borderColor: '#B67FBF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '비료 사용',
          backgroundColor: '#CA985E',
          data:  category_data.value[4],
          borderColor: '#CA985E',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '대학동물 소유',
          backgroundColor: '#F6DD00',
          data:  category_data.value[5],
          borderColor: '#F6DD00',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '산림에 의한 흡수',
          backgroundColor: '#3E9B96',
          data:  category_data.value[6],
          borderColor: '#3E9B96',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '전력',
          backgroundColor: '#5E8CFF',
          data:  category_data.value[7],
          borderColor: '#5E8CFF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '스팀',
          backgroundColor: '#FF7D7D',
          data:  category_data.value[8],
          borderColor: '#FF7D7D',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '수도',
          backgroundColor: '#088AA6',
          data:  category_data.value[9],
          borderColor: '#088AA6',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '폐기물',
          backgroundColor: '#475674',
          data:  category_data.value[10],
          borderColor: '#475674',
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
