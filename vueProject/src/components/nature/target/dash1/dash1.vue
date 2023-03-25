<template>
    <div> 
        <div class="title-border">전년도 카테고리별 탄소 배출량</div>
        <div class="frame" id="target_dash1_content">
            <div class="dash-text-middle">{{ year }}년 카테고리별 탄소 배출량</div>
            <targetdonut id="target-dount-graph"></targetdonut>
            <div class = "target-dount-legend" >
                <div v-for="cate, i in categoryLastEmission">
                    <div class="legend-style" :style="{ background:activeColor[i]}"></div>{{ cate.category}}<span style="float: right">{{ cate.emission }}kg</span>
                </div>
            </div>
                
        </div>
    </div>
        

</template>

<style>
.dash-text-middle{
    font-size:1.4rem;
    width:inherit;
    text-align: center;
    margin-top:2vh;
    font-weight: bold;
    color:#5A5A5A;
}
#target_dash1_content{
    width:40vw;
    height: 50vh;
}
#target-dount-graph{
    display:inline-block;
    float: left;
    width:20vw;
    height: 30vh;
    margin-top:7vh;
    
}
.target-dount-legend{
    overflow: auto;
    height:30vh;
    width: 17vw;
    margin-top:7vh;
    margin-left:2vw;
    display: inline-block;
}
.target-dount-legend > div{
    margin-bottom:4vh;
    font-size:1.6vh;
    font-weight: bolder;
    color:#5A5A5A;
}
.legend-style{
    display:inline-block;
    height:1vh;
    width:1vh;
    border-radius: 50%;
    background: #5A5A5A;
    margin-right:1vw;
    
}
</style>


<script>
import {ref} from 'vue'
import targetdonut from "@/components/nature/target/dash1/targetDonutGraph"
    export default {
        name :"target_dash1",
        components:{
            targetdonut
        },
        setup(){
            var year = ref('2022')
            var categoryLastEmission = [
                {category:'고정연소', emission:20486 },
                {category:'이동연소', emission:20486 },
                {category:'탈루배출', emission:20486 },
                {category:'폐기물 처리시설', emission:20486 },
                {category:'비료사용', emission:20486 },
                {category:'대학동물소유', emission:20486 },
                {category:'산림에의한흡수', emission:20486 },
                {category:'전력', emission:20486 },
                {category:'열', emission:20486 },
                {category:'수도', emission:20486 },
                {category:'폐기물', emission:20486 },
            ]
            var activeColor = [
                '#9FD72A',
                '#FFA800',
                '#59CFE9',
                '#B67FBF',
                '#CA985E',
                '#F6DD00',
                '#3E9B96',
                '#5E8CFF',
                '#FF7D7D',
                '#088AA6',
                '#864887'
            ]

            var color_box = document.querySelectorAll('.legend-style');
            
            return{
                year,
                categoryLastEmission,
                activeColor,
            }
        }
    }
</script>