<template>
    <div id="frame-category-lineChart">
        <div class="title-chart">2023년 8월 시점</div>
        <!--<canvas id="lineChart" width="400" height="400"></canvas>-->
        <predict_chart id="category-lineGraph"/>
    </div>
</template>

<style>
#frame-category-lineChart {
    padding:0% 5%
}
.title-chart {
    color:#5A5A5A;
    font-size:2rem;
    font-weight :600;
    text-align: center;
    margin-top: 1em;
    margin-bottom: 2em;
}
.legendBox {
    width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item {
    padding: 5px 10px;
    margin: 10px;
    border-radius: 20px;
    
}
#category-lineGraph{
    margin-top:14vh;
    width:75vw;
    height:60vh;

}
</style>

<script>
import predict_chart from './predictCategoryChart1.ts'

export default {
    name: "predict_category1",
    components: {
        predict_chart
    },
    setup(){
        function changeBackgroundColor() {
            console.log(123)
            document.getElementById('stationaryCombustion').style.backgroundColor = predict_chart.chartData.datasets[0].backgroundColor
        }
        function changeInnerText() {
            document.getElementById('stationaryCombustion').style.innerText = predict_chart.chartData.datasets[0].label
        }
        function toggleData(value) {
            console.log(value)
            const visibilityData = predict_chart.isDatasetVisible(value)
            if (visibilityData === true ){
                predict_chart.hide(value)
            }
            if (visibilityData === false ){
                predict_chart.show(value)
            }
        }
        return{
            changeBackgroundColor, changeInnerText, toggleData
        }
    }

}
</script>