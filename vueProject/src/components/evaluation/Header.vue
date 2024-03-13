<template>
    <div class="evaluation-header">
        <p class="measure-name">탄소 중립</p>
        <div class="measure-setting">
            <router-link to="/evaluation" class="header-text">탄소 배출량 평가</router-link>
            <router-link to="/nature/target" class="header-text">탄소 배출량 감축 목표</router-link>
            <router-link to="/nature/progress" class="header-text">탄소 감축 진행상황</router-link>
        </div>
    </div>
</template>

<style>
    .evaluation-header{
        background-color: white;
        width: 85vw;
        height: 14vh;
        overflow: hidden
    }

</style>


<script>
    export default {
        name :"evaluation_header",
        components:{
            

        }
    }
</script>