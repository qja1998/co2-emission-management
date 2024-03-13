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
  LineElement,
  CategoryScale,
  LinearScale,
  Plugin,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, annotationPlugin)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar, Line
  },
  props: {
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
    var group_name = computed(()=> store.state.group_name)
    var user_group = computed(()=> store.state.user_group)
    var now = new Date();	// 현재 날짜 및 시간
    var year = ref(now.getFullYear())	// 년도
    
    //서버
    var server_total_data = computed(()=> store.state.getTotalLastDataList)
    var server_evaluation = {BaseYear:2019, BaseEmissions:980}

    var month_baseemissions = server_evaluation.BaseEmissions/12

    const chartData = {
      
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
      datasets: [
        {
          type: "bar" as const,
          label:'총 탄소 배출량',
          data: [NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,],
          backgroundColor : '#3DC984',
          // barThickness: 30,
        },
      ]
    }


    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend:{
          display:true,
          position:'top' as const,
        }
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
        chartOptions,
      }, )
  
  }
})
