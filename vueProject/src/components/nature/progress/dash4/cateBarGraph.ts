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
    var goalCarbonCategory = computed(()=> store.state.getTargetList).value
    var server_category_data = computed(()=> store.state.getTotalCategoryDataList).value
    var categoryLastList = computed(()=> store.state.getTotalLastCategoryDataList).value
    var sum_total_category_data: number[] = [] //카테고리별 현재 데이터
    var sum_last_category_data : number[] = []

    var result_target_data : number[] = []

    for(var i=0; i<server_category_data.length; i++){
        var sum = ref(0)
        for(var j =0; j<server_category_data[i].length; j++){
            sum.value = server_category_data[i][j] + sum.value
        }    
        sum_total_category_data.push(sum.value)
    }

    
    for(var i=0; i<categoryLastList.length; i++){
      var sum = ref(0)
      for(var j =0; j<categoryLastList[i].length; j++){
          sum.value = categoryLastList[i][j] + sum.value
      }    
      sum_last_category_data.push(sum.value)
    }

    for (var i=0; i<goalCarbonCategory.length; i++){
        var data = sum_last_category_data[i] - goalCarbonCategory[i]
        result_target_data.push(data)
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
        label : '탄소 감축 목표량',
        backgroundColor: ['#3DC984'],
        data: result_target_data,
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
