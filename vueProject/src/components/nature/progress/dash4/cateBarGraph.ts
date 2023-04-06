import { defineComponent, h, PropType } from 'vue'

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
          data: [160, 120, 100 , 0 ,90, 0 ,0,0,60,80],
          barThickness:27,
        },
        {
          label : '현재 탄소 배출량',
          backgroundColor: ['#376B7C'],

          data: [70,40,30,50,60,70,50,60,40,20,30],
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
