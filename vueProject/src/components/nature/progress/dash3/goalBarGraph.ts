import { defineComponent, h, PropType, ref  ,computed } from 'vue'
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
      default: 100
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

    var store =useStore()
    //날짜 그룹명
    var user_group = computed(()=> store.state.user_group)
    var selected_company = computed(()=> store.state.insight_selected_company)

    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도

    //서버
    var server_EmissionInfo = {
        groupName:'경상국립대학교',
        BaseYear:2019,
        BaseEmissions:2650
    }

    var server_total_data = [20,80,30,80,40,90,120,160,10,60,20,80]
    var server_targetTotal_data = 570
    var sum =ref(0) 
    for(var i=0; i<server_total_data.length; i++){
        sum.value = server_total_data[i] + sum.value
    }


    const chartData = {
      labels: [
        '기준량', '2022년 탄소 배출량', '감축 목표 달성시 2023년 탄소 배출량'
      ],
      datasets: [
        {
          label : '총 탄소 배출량',
          backgroundColor: ['#777777', '#2A565B','#3DC984'],
          borderRadius:10,
          data: [server_EmissionInfo.BaseEmissions,sum.value,server_targetTotal_data],
          barThickness:27,
        },
      ]
    }

    const chartOptions = {
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          display:false,
          position:'top' as const,
          align	: 'end' as const,
          labels : {
            padding: 30,
            usePointStyle: true,
            boxWidth:20,
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
          display:false,
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
