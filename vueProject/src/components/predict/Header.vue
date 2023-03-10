<template>
    <div class="predict-header">
        <p class="measure-name">탄소 예측</p>
        <div class="measure-setting">
            <router-link to="/predict" class="header-text">탄소 배출량 예측</router-link>
            <router-link to="/predictCategory" class="header-text">카테고리별 탄소 배출량</router-link>
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
        text-decoration: none;
    }

</style>


<script>
    export default {
        name :"predict_header",
        components:{
            

        }
    }
</script>