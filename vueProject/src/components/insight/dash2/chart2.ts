import { defineComponent, h, PropType,computed,ref } from 'vue'
import axios from "axios";
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
      default: 600
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
  async setup(props) {
    const store = useStore();
    var chartData = {
      labels: [
        '2021년','2022년','2023년'
      ],
      datasets: [
        {
          label : 'Scope1',
          backgroundColor: ['#E0F599'],
          data: [210000,210000,210000],
          barThickness: 50,
        },
        {
          label : 'Scope2',
          backgroundColor: ['#62BC8A'],
          data: [1300000,1000200,420123],
          barThickness: 50,
        },
        {
          label : 'Scope3',
          backgroundColor: ['#15575C'],
          data: [420123,850000,123000],
          barThickness: 50,
        }
      ],
      
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          position:'right' as const,
          align	: 'start' as const,
          labels : {
            padding: 40,
            boxWidth:25,
            boxHeight:25,
            color:'#223354'
          }

        },
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
    }

    var today = new Date(); 
    var year = computed(() => store.state.insight_year).value;

    var temp_arr = [0,0,0]
    var config = {
      headers:{
        "Authorization":"Bearer"+" "+store.state.accessToken,
        "Content-Type": "text/html; charset=utf-8"
      }
    }
    async function get_total_emission_year(i){
      await axios.get("Company/Preview/"+store.state.insight_selected_company+"/"+(year-i)+"-01-01/"+(year-i)+"-12-28",config).then(res => {
            chartData.datasets[0].data[2-i] = res.data.Scopes[0]
            chartData.datasets[1].data[2-i] = res.data.Scopes[1]
            chartData.datasets[2].data[2-i] = res.data.Scopes[2]
          
            console.log(JSON.stringify(res.data)+"체크")
            temp_arr[0] +=res.data.Scopes[0] //3년치 데이터 합산 
            temp_arr[1] +=res.data.Scopes[1]
            temp_arr[2]  +=res.data.Scopes[2]
        })
        .catch(error => {
            console.log(error)
            console.log("insight")
        })
        .finally(() => {
          
        })
    }
    temp_arr = [0,0,0]
    for (var i =0;i<3;i++){
      await get_total_emission_year(i)
    }
    console.log(temp_arr+"뉴 어레이")
    store.commit("set_scopes",temp_arr);

    chartData.labels = [year-2,year-1,year]
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
