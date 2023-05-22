<template>
    <div id="frame-category-lineChart">
        <div class="title-chart">2023년 8월 시점</div>
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
        return{
        }
    }

}
</script>