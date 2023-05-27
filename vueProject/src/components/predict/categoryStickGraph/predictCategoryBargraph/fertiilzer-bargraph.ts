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
    var server_category_predict_data = [
      [580, 590, 640, 575, 573, 680, 820, 760, 758, 770, 758, 762],
      [530, 495, 486, 570, 573, 664, 667, 663, 660, 670, 673, 750],
      [495, 397, 480, 390, 475, 510, 550, 587, 590, 723, 640, 743],
      [498, 401, 420, 297, 361, 483, 490, 564, 550, 701, 640, 738],
      [381, 363, 321, 350, 348, 371, 365, 362, 384, 391, 342, 370],
      [140, 143, 184, 123, 120, 212, 213, 310, 300, 512, 320, 430],
      [208, 175, 143, 167, 160, 220, 198, 194, 222, 270, 200, 315],
      [312, 274, 250, 280, 278, 320, 300, 298, 350, 380, 290, 420],
      [100, 130, 250, 287, 325, 400, 380, 250, 400, 302, 500, 450],
      [333, 240, 258, 300, 320, 298, 250, 158, 333, 278, 400, 510],
      [80, 100, 147, 300, 400, 425, 401, 280, 300, 470, 400, 388]
    ]

    //날짜 
    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도
    var month = now.getMonth() //월
    console.log(month)
    // x범위 만들기
    var month_Eng = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December']
    var x_legend =['']

    for(var i = 0; i< month_Eng.length; i++){
      if(month-6+i < 0){
          x_legend[i] = month_Eng[month_Eng.length + (month-6+i)]
          console.log(x_legend)
      }
      else{
        x_legend[i] = month_Eng[month-6+i]
      }
    }

    const chartData = {
      labels: x_legend,
      datasets: [
        {
            label:'비료 사용',
            data: server_category_predict_data[4],
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
          color.push('#CA985E')
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