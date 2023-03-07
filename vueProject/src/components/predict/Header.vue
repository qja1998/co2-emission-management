<template>
    <div class="predict-header">
        <p class="measure-name">탄소 예측</p>
        <div class="measure-setting">
            <p class="header-text">탄소 배출량 예측</p>
            <p class="header-text">카테고리별 탄소 배출량</p>
        </div>
    </div>
</template>

<style>
    .predict-header{
        background-color: white;
        width: 85vw;
        height: 14vh;
        overflow: hidden
    }
    .header-text{
        font-weight:900;
        margin-left:4vw;
        color:#11263C;
    }

</style>


<script>
    export default {
        name :"predict_header",
        components:{
            

        }
    }
</script>