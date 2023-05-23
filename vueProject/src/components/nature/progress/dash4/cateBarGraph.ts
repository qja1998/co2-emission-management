import { defineComponent, h, PropType, ref, computed } from 'vue'
import {useStore} from 'vuex'
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title , Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default:900 
    },
    height: {
      type: Number,
      default:300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },

    plugins: {
      type: Array as PropType<Plugin<'bar'>[]>,
      default: () => []
    },
    
  },
  setup(props) {
    var store = useStore()

    //날짜 그룹명
    var user_group = computed(()=> store.state.user_group)
    var selected_company = computed(()=> store.state.insight_selected_company)

    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도
    var month = now.getMonth()

    //서버
    var goalCarbonCategory = [7800,4680,7890,8950,4600,7890,7950,9720,8060,5020,6080]
    var server_category_data = [
      [580, 590, 640, 575, 573, 680, 250,502,600,500,120,130],
      [530, 495, 486, 570, 573, 664, 250,502,600,500,120,130],
      [495, 397, 480, 390, 475, 510, 250,502,600,500,120,130],
      [498, 401, 420, 297, 361, 483, 250,502,600,500,120,130],
      [381, 363, 321, 350, 348, 371, 250,502,600,500,120,130],
      [140, 143, 184, 123, 120, 212, 250,502,600,500,120,130],
      [208, 175, 143, 167, 160, 220, 250,502,600,500,120,130],
      [312, 274, 250, 280, 278, 320, 250,502,600,500,120,130],
      [312, 274, 250, 280, 278, 320, 250,502,600,500,120,130],
      [312, 274, 250, 280, 278, 320, 250,502,600,500,120,130],
      [312, 274, 250, 280, 278, 320, 250,502,600,500,120,130],
  ]
  var sum_total_category_data: number[] = [] //카테고리별 일년치 데이터
  for(var i=0; i<server_category_data.length; i++){
      var sum = ref(0)
      for(var j =0; j<server_category_data[i].length; j++){
          sum.value = server_category_data[i][j] + sum.value
      }    
      sum_total_category_data.push(sum.value)
  }
  console.log(sum_total_category_data)
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
        label : '탄소 감축 목표량',
        backgroundColor: ['#3DC984'],
        data: goalCarbonCategory,
        barThickness:27,
      },
      {
        label : '현재 탄소 배출량',
        backgroundColor: ['#376B7C'],

        data: sum_total_category_data,
        barThickness:27,
      },
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
      legend: {
        display:true,
        position:'top' as const,
        align	: 'end' as const,
        labels : {
          padding: 30,
          boxWidth:40,
          boxHeight:10,
          color:'#223354'
        }

      },
    },
    ticks: {
      minRotation: 80, // x축 값의 회전 각도를 설정할 수 있어요.
      padding: 5, // x축 값의 상하 패딩을 설정할 수 있어요.
    },
    scales:{
      x:{
        display:true,
        grid:{
          display:false
        }
      },
      y:{
        display:false,
      },
    }
  }

  return () =>
    h(Bar, {
      chartData,
      chartOptions,
      chartId: props.chartId,
      width: props.width,
      height: props.height,
      cssClasses: props.cssClasses,
      styles: props.styles,
      plugins: props.plugins,
    })
  }
})
