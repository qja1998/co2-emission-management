import { defineComponent, h, PropType  } from 'vue'
import axios from "axios";
import { Doughnut } from 'vue-chartjs'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed,ref } from "vue";


import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  CategoryScale,
  )

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
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
      type: Array as PropType<Plugin<'doughnut'>[]>,
      default: () => []
      
    }
  },
  setup(props) {
    
    const chartData = {
      labels: ['기준량 대비 총 탄소배출량', '기준량'],
      datasets: [
        {
          backgroundColor: ['#3DC984', '#EFEFEF'], 
          borderColor: "#eee",
          hoverBorderColor: "#eee",
          data: [30, 70], //기준량 대비 총 탄소배출량 = 작년 탄소배출량/기준량*100 -> 작년탄소배출량이 기준량보다 많으면, 비율이 1 이상
        }
      ]
    }

    // function chooseColor(){
    //   const color: string[] = []
    //   if (chartData.datasets[0].data[0] > 1){  실제 데이터로 해야할듯.
    //     color.push('#FF7E7E')
    //     color.push('#EFEFEF')
    //   }
    //   else{
    //     color.push('#3DC984')
    //     color.push('#EFEFEF')
    //   }
    // }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend: {
          position:'bottom' as const,
          labels : {
            usePointStyle: true,
            padding:12,
            boxWidth:100,
            boxHeight:20,
          }
        },
        Tooltip: {
          boxWidth: 15,
        },
      },
      layout: {
        padding: {
          top: 50,
          bottom: 50
        }
      },
      elements: {
        arc: {
          borderWidth: 2
        }
      },
      animation: {
        duration: 5000
      }
    }
    
    // const store = useStore();


    // async function get_list(){
    //   const data = ref(computed(() =>store.state.scopes).value)
    //   if((data.value.reduce((a, b) => a + b, 0))!=0 ){
        
    //     chartData.datasets[0].data = data.value
    //     console.log("3년치"+ data.value)
    //   }else{
    //     chartData.datasets[0].data = [2,1.4,1]
    //   }
      
    //   console.log("리렌ㅌ도ㅓ")
    // }
    // await get_list()
    return () =>
      h(Doughnut, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
      
  },
  created(){
    //this.$forceUpdate();
    
  },   
})