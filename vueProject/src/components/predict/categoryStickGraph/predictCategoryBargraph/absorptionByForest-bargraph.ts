import { defineComponent, h, PropType } from 'vue'

import { Bar } from 'vue-chartjs'
import { useStore } from 'vuex'
import {ref, computed} from 'vue'
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
    //서버 
    var store = useStore()

    var server_category_data = computed(()=>store.state.getTotalLastCategoryDataList[6])
    var server_category_predict_data = computed(()=>store.state.getPredictCategory['산림에의한흡수'])

    var data = [0,0,0,0,0,0,0,0,0,0,0,0]

    for(var i=0; i<6; i++){
      data[i]=server_category_data.value[i]
      data[i+6] =server_category_predict_data.value[i]
    }

    //날짜 
    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도
    var month = now.getMonth() //월
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

    const chartData = {
      labels: x_legend,
      datasets: [
        {
            label:'산림에 의한 흡수',
            data: data,
            backgroundColor : chooseColor(),
            barThickness: 20,
        }
      ]
    }
    function chooseColor(){
      var color : string[] = []
      for (var i=0;  i<=12; i++){
        if (i > month+1) {
          color.push('#BFBFBF')
        } else {
          color.push('#3E9B96')
        }
      }
      return color
    }
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend:{
          display:false
        }
      },
      scales:{
        x:{
          grid:{
            display:false
          },
        },
        y:{
          stacked:true,
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