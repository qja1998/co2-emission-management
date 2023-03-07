<template>
    <div>
        <!-- <div class="frame" id="frame-categoryChart"> -->
        <div> 
            <div class="title-chart">2023년 8월 시점</div>
<!--            <div class="legentBox">
                <button class="item" id="stationaryCombustion" @click="toggleData(0)"></button>
                <button class="item" id="mobileCombustion" @click="toggleData(1)"></button>
                <button class="item" id="commute" @click="toggleData(2)"></button>
                <button class="item" id="waterworks" @click="toggleData(3)"></button>
                <button class="item" id="power" @click="toggleData(4)"></button>
                <button class="item" id="fertilizer" @click="toggleData(5)"></button>
                <button class="item" id="waste" @click="toggleData(6)"></button>
                <button class="item" id="forest" @click="toggleData(7)"></button>
            </div>
-->
            <predict_chart id="category-lineGraph"/>
            
        </div>
    </div>
</template>

<style>
#frame-categoryChart {
    width: 95%;
    height: 100%;
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

/*document.getElemebtById('stationaryCombustion').style.backgroundColor = predict_chart.chartData.datasets[0].backgroundColor
document.getElemebtById('mobileCombustion').style.backgroundColor = predict_chart.chartData.datasets[1].backgroundColor
document.getElemebtById('commute').style.backgroundColor = predict_chart.chartData.datasets[2].backgroundColor
document.getElemebtById('waterworks').style.backgroundColor = predict_chart.chartData.datasets[3].backgroundColor
document.getElemebtById('power').style.backgroundColor = predict_chart.chartData.datasets[4].backgroundColor
document.getElemebtById('fertilizer').style.backgroundColor = predict_chart.chartData.datasets[5].backgroundColor
document.getElemebtById('waste').style.backgroundColor = predict_chart.chartData.datasets[6].backgroundColor
document.getElemebtById('forest').style.backgroundColor = predict_chart.chartData.datasets[7].backgroundColor

document.getElemebtById('stationaryCombustion').innerText = predict_chart.chartData.datasets[0].label
document.getElemebtById('mobileCombustion').innerText = predict_chart.chartData.datasets[1].label
document.getElemebtById('commute').innerText = predict_chart.chartData.datasets[2].label
document.getElemebtById('waterworks').innerText = predict_chart.chartData.datasets[3].label
document.getElemebtById('power').innerText = predict_chart.chartData.datasets[4].label
document.getElemebtById('fertilizer').innerText = predict_chart.chartData.datasets[5].label
document.getElemebtById('waste').innerText = predict_chart.chartData.datasets[6].label
document.getElemebtById('forest').innerText = predict_chart.chartData.datasets[7].label
*/

export default {
    name: "predict_category1",
    components: {
        predict_chart
    },
/*    setup(){
        const toggleData = (value) => {
            console.log(value)
            const visibilityData = predict_chart.isDatasetVisible(0)
            if (visibilityData === true ){
                predict_chart.hide(value)
            }
            if (visibilityData === false ){
                predict_chart.show(value)
            }
        }
        return{
            toggleData
        }
    }
*/
}
</script>