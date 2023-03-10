<template>
    <div>
        <div class="frame" id="frame-categoryChart" style="height: 100%;">
        <div> 
            <div class="title-chart">2023년 8월 시점</div>
            <div class="legendBox" >
                <button class="item" id="stationaryCombustion" v-on:click="toggleData(0)"></button>
                <button class="item" id="mobileCombustion" v-on:click="toggleData(2)"></button>
                <button class="item" id="commute" v-on:click="toggleData(4)"></button>
                <button class="item" id="waterworks" v-on:click="toggleData(6)"></button>
                <button class="item" id="power" v-on:click="toggleData(8)"></button>
                <button class="item" id="fertilizer" v-on:click="toggleData(10)"></button>
                <button class="item" id="waste" v-on:click="toggleData(12)"></button>
                <button class="item" id="forest" v-on:click="toggleData(14)"></button>
            </div>
            <!--<canvas id="lineChart" width="400" height="400"></canvas>-->
            <predict_chart id="category-lineGraph"/>
        </div>
        </div>
    </div>
</template>

<style>
#frame-categoryChart {
    width: 95%;
}
.title-chart {
    color:#5A5A5A;
    font-size:1.5rem;
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
    margin-top:5vh;
    width:76vw;
    height:70vh;
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