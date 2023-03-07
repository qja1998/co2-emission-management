<template>
    <div  class="eco">
        <Header></Header>
        <router-link to="/info" class="test-link">test info</router-link>  <!-- 나중에 삭제 -->
        <div class="eco-body1" >
            <TotalCarbonVue class="totalcarbon"></TotalCarbonVue>
            <div class="barchart">
                <barchart></barchart>
            </div>
        </div>
        <div class="eco-body2">
            <overview></overview>
        </div>
        <div class="eco-body3">
            <sectors />
            <sectorAvg/>
        </div>
    </div>
</template>
<style>
    .test-link{
        position: absolute;
        left: 50vw;
        top: 5vw;
        border:solid 2px;
        color: #383a37;
    }

    body{
        margin :0;
    }
    p{
        white-space: nowrap;
    }
    .eco-body1{
        margin-top: 8vw;
        display: flex;
        justify-content: space-around;
    }
    .eco-body2{
        width: 80vw;
        padding:5vw;
        border: 2px solid #383a37;
        border-radius: 30px;
        margin: 4.5vw;
        
    }
    .eco-body3{
        display: flex;
        justify-content: space-around;
    }
    .totalcarbon{
        width: 40vw;
    }
    .barchart{
        margin-top: 5vw;
        width: 30vw;
    }

</style>

<script>
    import Header from "@/components/Header"
    //page 1 -> eco1
    import TotalCarbonVue from "@/components/eco1/TotalCarbon.vue";
    import barchart from "@/components/eco1/barchart";
    //page 2 -> eco 2
    import overview from "@/components/eco2/overview.vue"
    //page 3 -> eco 3
    import sectors from "@/components/eco3/sectors.vue"
    import sectorAvg from "@/components/eco3/sector_avg.vue"

    export default {
        name :"Eco-home",
        components:{
            Header,
            TotalCarbonVue,
            barchart,
            overview,
            sectors,
            sectorAvg
        }
    }
</script>