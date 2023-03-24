<template>
    <div class="predict-header">
        <p class="measure-name">탄소 중립</p>
        <div class="measure-setting">
            <router-link to="/nature" class="header-text">탄소 배출량 평가</router-link>
            <router-link to="/nature/target" class="header-text">탄소 배출량 감축 목표</router-link>
            <router-link to="/nature/target" class="header-text">탄소 중립 시나리오</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name :"nature_header",
        components:{
            

        }
    }
</script>