import { defineComponent,computed, h, PropType } from 'vue'

import { Bar } from 'vue-chartjs'
import { useStore } from "vuex";
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
      default:10
    },
    height: {
      type: Number,
      default: 1000
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

    var chartData = {
      labels: [
        '고정연소','이동연소','탈루배출','폐기물 처리시설','비료사용','폐기물','대학 동물 사육','산림에 의한 흡수','전력'
        
      ],
      datasets: [
        {
          label : 'Scope1',
          borderRadius:20,
          backgroundColor: ['#15575C','#62BC8A','#A0A0A0','#C7C5C5','#EAE7E7','#F1F1F1','#F1F1F1','#F1F1F1','#F1F1F1','#F1F1F1',],
          data: [142,132,120,100,75,60,42,30,20],
          barThickness: 10,
          padding:4,
        },
      ],
      indexAxis:'y'
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {display: false} 
      },
      scales:{
        xAxes:{
          ticks:{
            padding:20
          },  
          grid:{
            display:false
          }

        },
        yAxes:{
          grid:{
            display:false
          },
        },
      },
      indexAxis:'y' as const,
    }


    const store = useStore();

    //배출량 순서대로 정렬 
    const detail_emission_lable = computed(() => store.state.CarbonCategories).value;
    var detail_emission_value = computed(() => store.state.detail_emission).value;

    var new_arr = [[0,""]] //타입 지정 

    console.log(typeof(new_arr))
    for(var label in detail_emission_lable){
      var key = JSON.stringify(Object.keys(detail_emission_value[label])[0])
      var value = JSON.stringify(Object.values(detail_emission_value[label])[0])
      new_arr.push([Number(value),key.replace(/\"/g,"")])
    }
    new_arr.shift()
    
    console.log(new_arr)
    console.log(typeof(new_arr[1][1]))
    new_arr.sort(sortFunction)

    function sortFunction(a, b) {
      if (a[0] === b[0]) {
          return 0;
      }
      else {
          return (a[0] > b[0]) ? -1 : 1;
      }
    }
    for( let i = 0; i < new_arr[0].length ; i++){
      const tmp = Array();
         // 2. 배열의 행에서 선택한 열의 값을 추출
         new_arr.forEach( (row, idx) => tmp.push(row[i]));
        // 3. 추출한 값을 저장
        new_arr.push(tmp);
    }
    new_arr[20].pop()
    console.log(typeof(new_arr[20]))

    chartData.labels = new_arr[20].map(String)

    chartData.datasets[0].data = new_arr[19].map(Number)

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
