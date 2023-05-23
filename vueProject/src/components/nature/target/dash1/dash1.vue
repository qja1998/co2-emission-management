<template>
    <div> 
        <div class="title-border">전년도 카테고리별 탄소 배출량</div>
        <div class="frame" id="target_dash1_content">
            <div class="dash-text-middle">{{ year }}년 카테고리별 탄소 배출량</div>
            <targetdonut id="target-dount-graph"></targetdonut>
            <div class = "target-dount-legend" >
                <div v-for="cate, i in categoryLastEmission">
                    <div class="legend-style" :style="{ background:activeColor[i]}"></div>{{ cate.category}}<span>{{ cate.emission }}kg</span>
                </div>
            </div>
                
        </div>
    </div>
        

</template>

<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import targetdonut from "@/components/nature/target/dash1/targetDonutGraph"
    export default {
        name :"target_dash1",
        components:{
            targetdonut
        },
        setup(){
            var store = useStore()
            //그룹명
            var group_name = computed(()=> store.state.insight_selected_company)
            var user_group = computed(()=> store.state.user_group)

            var now = new Date();	// 현재 날짜 및 시간
            var year = ref(now.getFullYear()-1)	// 년도
            //서버
            var server_category_data = [
                [580, 590, 640, 575, 573, 680, 250,502,600,500,120,130],
                [530, 495, 486, 570, 573, 664, 250,502,600,500,120,130],
                [495, 397, 480, 390, 475, 510, 250,502,600,500,120,130],
                [498, 401, 420, 297, 361, 483, 250,502,600,500,120,130],
                [381, 363, 321, 350, 348, 371, 250,502,600,500,120,130],
                [140, 143, 184, 123, 120, 212, 250,502,600,500,120,130],
                [208, 175, 143, 167, 160, 220, 250,502,600,500,120,130],
                [312, 274, 250, 280, 278, 320, 250,502,600,500,120,130],
                [312, 274, 250, 280, 278, 320, 250,502,600,500,120,130],
                [312, 274, 250, 280, 278, 320, 250,502,600,500,120,130],
                [312, 274, 250, 280, 278, 320, 250,502,600,500,120,130],
            ]
            var sum_total_category_data = ref([]) //카테고리별 일년치 데이터

            for(var i=0; i<server_category_data.length; i++){
                var sum = ref(0)
                for(var j =0; j<server_category_data[i].length; j++){
                    sum.value = server_category_data[i][j] + sum.value
                }    
                sum_total_category_data.value.push(sum.value)
            }
            var categoryLastEmission = [
                {category:'고정연소', emission:sum_total_category_data.value[0] },
                {category:'이동연소', emission:sum_total_category_data.value[1] },
                {category:'탈루배출', emission:sum_total_category_data.value[2] },
                {category:'폐기물 처리시설', emission:sum_total_category_data.value[3] },
                {category:'비료사용', emission:sum_total_category_data.value[4] },
                {category:'대학동물소유', emission:sum_total_category_data.value[5] },
                {category:'산림에의한흡수', emission:sum_total_category_data.value[6] },
                {category:'전력', emission:sum_total_category_data.value[7] },
                {category:'열', emission:sum_total_category_data.value[8] },
                {category:'수도', emission:sum_total_category_data.value[9] },
                {category:'폐기물', emission:sum_total_category_data.value[10] },
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
            return{
                year,
                categoryLastEmission,
                activeColor,
            }
        }
    }
</script>

<style>
.dash-text-middle{
    font-size:2.5vh;
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
.target-dount-legend  span{
    float: right;
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