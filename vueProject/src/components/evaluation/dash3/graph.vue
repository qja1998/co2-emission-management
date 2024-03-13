<template>
    <canvas id="planet-chart"></canvas>
</template>

<script>
import {Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, Decimation, Filler, Title, Tooltip} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

Chart.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    Decimation,
    Filler,
    Title,
    Tooltip,
    annotationPlugin
)

export default {
    props: {
        charData: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Setember','October','November','December'],
            datasets: [
                {
                    label:'총 탄소 배출량',
                    data: [530, 495, 486, 570, 573, 664, 667, 663, 660, 670, 673, 750],
                    backgroundColor : '#3DC984',
                    barThickness: 30,
                },
            ]
        },
        chartOptions: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            myChart: null
        }
    },
    mounted() {
        this.fillData()
    },
    methods: {
        fillData() {
            const ctx = document.getElementById('planet-chart').getContext('2d')
            this.myChart = new Chart(ctx, {
                type: 'bar',
                data: this.charData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins:{
                        legend:{
                            display:true,
                            position:'top',
                        },
                        annotation: {
                            annotations: {
                                line1: {
                                    type: 'line',
                                    xMin: 590,
                                    yMax: 590,
                                    borderColor: '#FF3B3B',
                                    borderWidth: 2
                                }
                            }
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
            })
        },
        updateChart(){
            if (this.myChart) this.myChart.destroy()
            this.fillData()
        }
    }
}
</script>