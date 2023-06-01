import { defineComponent, h, PropType } from 'vue'
import annotationPlugin from 'chartjs-plugin-annotation'
import { Bar, Line } from 'vue-chartjs'
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, annotationPlugin)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar, Line
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default:300 
    },
    height: {
      type: Number,
      default: 150
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
    //날짜, 그룹명
    var group_name = computed(()=> store.state.insight_selected_company)
    var user_group = computed(()=> store.state.user_group)
    var now = new Date();	// 현재 날짜 및 시간
    var year = ref(now.getFullYear())	// 년도
    
    //서버
    var server_total_data = ref(computed(()=> store.state.getTotalCategoryData))
    var server_evaluation = {BaseYear:2019, BaseEmissions:980}

    var month_baseemissions = server_evaluation.BaseEmissions/12

    const chartData = {
      type: "bar",
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
      datasets: [
        {
          label:'총 탄소 배출량',
          data: server_total_data.value,
          backgroundColor : '#3DC984',
          barThickness: 30,
        },
        // {
        //     type: "Line",
        //     label: '월별 기준량',
        //     data: [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
        //     backgroundColor: '#FF3B3B'
        // }
      ]
    }
    const chartData2 = {
      type: "line",
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
      datasets: [
        {
            label: '월별 기준량',
            data: [
              month_baseemissions, month_baseemissions, 
              month_baseemissions, month_baseemissions, 
              month_baseemissions, month_baseemissions, 
              month_baseemissions, month_baseemissions, 
              month_baseemissions, month_baseemissions, 
              month_baseemissions, month_baseemissions
            ],
            backgroundColor: '#FF3B3B'
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend:{
          display:true,
          position:'top' as const,
        },
        // annotation: {
        //   annotations: {
        //     line1: {
        //       type: 'line',
        //       xMin: 590,
        //       yMax: 590,
        //       borderColor: '#FF3B3B',
        //       borderWidth: 2
        //     }
        //   }
        // }
      },
      scales:{
        x:{
          grid:{
            display:false
          }
        },
        y:{
          stacked:true,
          display:true,
        },
      },
    }

    return () =>
      h(Bar, {
        chartData,
        chartData2,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      }, Line)
  }
})
