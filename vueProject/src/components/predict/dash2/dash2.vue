<template>
    <div>
        <div class="title-border">카테고리별 탄소 배출량 예측 순위(차이)</div>
        <div class="frame" id="frame-dash2">
            <div v-for="(cate , num) in sortCategory">
                <div class="sort-category" v-if="num<3">
                    <span>{{num+1}}st<span id="dash2-text">{{cate.name}}</span></span><br>
                    <img :src="cate.img"><br>
                    <div style="color:#5A5A5A;">{{cate.predictData}}kg</div>
                    <div v-if="cate.percent>0">{{cate.percent}}%▲</div>
                    <div style="color:#5A5A5A;" v-if="cate.percent==0">{{cate.percent}}%-</div>
                    <div style="color:#3DC984;" v-if="cate.percent<0">{{-cate.percent}}%▼</div>
                </div>
            </div>
            <button id="sort-btn"><img src="@/assets/re.png" @click="sortReverse()"></button>
        </div>
    </div>

</template>

<style>
    #frame-dash2{
        width:50vw;
    }
    #frame-dash2 > div{
        float: left;
        margin-left:1vw;
    }

    .sort-category{
        min-width: 12vw;
        width:inherit;
    }
    #dash2-text{
        color:#5A5A5A; 
        margin-left:0.5vw; 
        font-size:2.5vh;
        min-width:8vw;
        text-align: center;
        display: inline-block;
    }
    .sort-category > span{
        font-size : 3vh;
        color:#C90000;
        font-weight: 900;
    }
    .sort-category > img{
        height:8vh;
        width:8vh;
        margin:1vh 5vw;
    }
    .sort-category > div{
        height:2vh;
        line-height:2vh;
        width:13vw;
        color:#C90000;
        text-align: center;
        font-size: 2.2vh;
        margin-top:1vh;
    }

    #sort-btn{
        width:4vh;
        padding:0; 
        background: none; 
        border: none;
        margin:0.7vh 1vw;
    }
    #sort-btn > img{
        width:inherit;
    }
</style>


<script>
import {ref,computed } from 'vue';
import {useStore} from 'vuex'

    export default {
        name :"predict_dash2",
        setup(){
            var store=useStore()
            //서버
            var server_category = computed(()=>store.state.getNextMonthcategory)
            var category = [
                    {img:require('@/assets/previewDetail/1.png'),name:'고정 연소',data:server_category.value[1].data, predictData: server_category.value[1].predictData},
                    {img:require('@/assets/previewDetail/2.png'),name:'이동 연소', data:server_category.value[2].data, predictData: server_category.value[2].predictData},
                    {img:require('@/assets/previewDetail/3.png'),name:'탈루 배출', data:server_category.value[3].data, predictData: server_category.value[3].predictData},
                    {img:require('@/assets/previewDetail/4.png'),name:'폐기물 처리시설', data:server_category.value[4].data, predictData: server_category.value[4].predictData},
                    {img:require('@/assets/previewDetail/5.png'),name:'비료 사용', data:server_category.value[5].data, predictData: server_category.value[5].predictData},
                    {img:require('@/assets/previewDetail/6.png'),name:'대학 소유 동물', data:server_category.value[6].data, predictData: server_category.value[6].predictData},
                    {img:require('@/assets/previewDetail/7.png'),name:'산림에 의한 흡수', data:server_category.value[7].data, predictData: server_category.value[7].predictData},
                    {img:require('@/assets/previewDetail/8.png'),name:'전력 사용', data:server_category.value[0].data, predictData: server_category.value[0].predictData},
                    {img:require('@/assets/previewDetail/9.png'),name:'열 사용', data:server_category.value[8].data, predictData: server_category.value[8].predictData},
                    {img:require('@/assets/previewDetail/10.png'),name:'수도 사용', data:server_category.value[9].data, predictData: server_category.value[9].predictData},
                    {img:require('@/assets/previewDetail/11.png'),name:'폐기물', data:server_category.value[10].data, predictData: server_category.value[10].predictData},
                ]
            
            
            
            var sortCategory = ref(percent(category,11))

            const sortReverse=()=> {
                sortCategory.value=sortCategory.value.reverse()
            }
            
            function percent(arr,size){
                for (var i=0; i<size; i++){
                    arr[i].percent = ((arr[i].predictData - arr[i].data)/arr[i].data).toFixed(2)
                    if(arr[i].percent == 'NaN'){
                        arr[i].percent = 0
                    }
                }
                //정렬
                arr.sort(function(a,b){
                    return a.percent - b.percent;
                });
                return arr
            }


               
            return{category,sortCategory,sortReverse}
        },
        components:{
        
        },
        
    }
</script>