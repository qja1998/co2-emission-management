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
    const dash=(ctx,value) => ctx.p0DataIndex > 4 ? value:[1,0]
    var store = useStore()

    //그룹명
    var user_group = computed(()=> store.state.user_group)
    var selected_company = computed(()=> store.state.insight_selected_company)

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
      }
      else{
        x_legend[i] = month_Eng[month-6+i]
      }
    }
    //서버 

    var server_category_data = computed(()=>store.state.getTotalLastCategoryDataList)
    var server_category_predict_data = computed(()=>store.state.getPredictCategory)


    var category_data = ref(server_category_data.value)
    var categoryList = ['고정연소','이동연소','탈루배출','폐기물처리시설','비료사용','대학소유동물','산림에의한흡수','전력','열','수도','폐기물']
   

    for(var i=0; i<11; i++){
      category_data.value[i].push(...server_category_predict_data.value[categoryList[i]])

    }

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
<<<<<<< HEAD
          label:'탈루배출',
          backgroundColor: '#FFA800',
          data: [530, 495, 486, 570, 573, 664, 667, 663, 660, 670, 673, 750],
          borderColor: '#FFA800',
=======
          label: '탈루 배출',
          backgroundColor: '#49C5E0',
          data:  category_data.value[2],
          borderColor: '#49C5E0',
>>>>>>> origin/main
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
<<<<<<< HEAD
          label:'폐기물 처리시설',
          backgroundColor: '#FFA800',
          data: [530, 495, 486, 570, 573, 664, 667, 663, 660, 670, 673, 750],
          borderColor: '#FFA800',
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
          label: '대학동물소유',
          backgroundColor: '#5E8CFF',
          data: [381, 363, 321, 350, 348, 371, 365, 362, 384, 391, 342, 370],
          borderColor: '#5E8CFF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '산림에 의한 흡수',
          backgroundColor: '#FF1686',
          data: [312, 274, 250, 280, 278, 320, 300, 298, 350, 380, 290, 420],
          borderColor: '#FF1686',
=======
          label: '폐기물',
          backgroundColor: '#475674',
          data:  category_data.value[10],
          borderColor: '#475674',
>>>>>>> origin/main
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
 
        {
          label: '전력',
          backgroundColor: '#5E8CFF',
          data: [381, 363, 321, 350, 348, 371, 365, 362, 384, 391, 342, 370],
          borderColor: '#5E8CFF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '스팀',
          backgroundColor: '#5E8CFF',
          data: [381, 363, 321, 350, 348, 371, 365, 362, 384, 391, 342, 370],
          borderColor: '#5E8CFF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },

        {
          label: '수도',
          backgroundColor: '#5E8CFF',
          data: [381, 363, 321, 350, 348, 371, 365, 362, 384, 391, 342, 370],
          borderColor: '#5E8CFF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },
        {
          label: '폐기물',
          backgroundColor: '#ED86EF',
          data: [208, 175, 143, 167, 160, 220, 198, 194, 222, 270, 200, 315],
          borderColor: '#ED86EF',
          segment:{
            borderDash: (ctx: any) => dash(ctx,[2,2]) || [6,0]
          }
        },

      ],
    }
    var server_category_predict_data = [
      [580,300,800,400,200,200],
      [580,300,800,400,200,200],
      [580,300,800,400,200,200],
      [580,300,800,400,200,200],
      [580,300,800,400,200,30],
      [580,300,800,400,200,30],
      [580,300,800,200,200,30]
    ]

    var server_category_data = [
      [580,300,800,400,200,200,30,50,20],
      [580,300,800,400,200,200,30,50,20],
      [580,300,800,400,200,200,30,50,20],
      [580,300,800,400,200,200,30,50,20],
      [580,300,800,400,200,200,30,50,20],
      [580,300,800,400,200,200,30,50,20],
      [580,300,800,400,200,200,30,50,20]
    ]

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
