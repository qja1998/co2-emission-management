<template>
    <div>
        <div class="title-border">카테고리별 탄소 배출량 예측 순위(차이)</div>
        <div class="frame" id="frame-dash2">
            <div v-for="(cate , num) in sortCategory">
                <div class="sort-category" v-if="num<3">
                    <span>{{num+1}}st<span id="dash2-text">{{cate.name}}</span></span><br>
                    <img :src="cate.img"><br>
                    <div style="color:#5A5A5A;">{{cate.data}}kg</div>
                    <div v-if="cate.gapData>0">{{cate.gapData}}kg▲</div>
                    <div style="color:#5A5A5A;" v-if="cate.gapData==0">{{cate.gapData}}kgㅡ</div>
                    <div style="color:#3DC984;" v-if="cate.gapData<0">{{-cate.gapData}}kg▼</div>
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
        width:5vh;
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
import {ref } from 'vue';

    export default {
        name :"predict_dash2",
        setup(){
            var category = [
                {img:require('@/assets/previewDetail/1.png'),name:'고정 연소',data:210, predictData: 304, gapData:0},
                {img:require('@/assets/previewDetail/2.png'),name:'이동 연소', data:130, predictData: 120, gapData:0},
                {img:require('@/assets/previewDetail/3.png'),name:'탈루 배출', data:20, predictData: 513, gapData:0},
                {img:require('@/assets/previewDetail/4.png'),name:'폐기물 처리시설', data:150, predictData: 150, gapData:0},
                {img:require('@/assets/previewDetail/5.png'),name:'비료 사용', data:170, predictData: 120, gapData:0},
                {img:require('@/assets/previewDetail/6.png'),name:'대학 소유 동물', data:130, predictData: 53, gapData:0},
                {img:require('@/assets/previewDetail/7.png'),name:'산림에 의한 흡수', data:54, predictData: 316, gapData:0},
                {img:require('@/assets/previewDetail/8.png'),name:'전력 사용', data:21, predictData: 254, gapData:0},
                {img:require('@/assets/previewDetail/9.png'),name:'열 사용', data:34, predictData: 268, gapData:0},
                {img:require('@/assets/previewDetail/10.png'),name:'수도 사용', data:51, predictData: 270, gapData:0},
                {img:require('@/assets/previewDetail/11.png'),name:'폐기물', data:180, predictData: 240, gapData:0},
                {img:require('@/assets/previewDetail/12.png'),name:'통근/통학', data:53, predictData: 53, gapData:0},
                {img:require('@/assets/previewDetail/13.png'),name:'출장', data:547, predictData: 352, gapData:0},
                {img:require('@/assets/previewDetail/14.png'),name:'위탁운영 차량', data:71, predictData: 346, gapData:0},
            ]
            var sortCategory = ref(sort(category,14))

            const sortReverse=()=> {
                sortCategory.value=sortCategory.value.reverse()
            }
            
            function gap(arr,size){
                for (var i=0; i<size; i++){
                    arr[i].gapData = arr[i].predictData - arr[i].data
                }
                return arr
            }

            function sort(arr,size){
                arr = gap(arr,size)

                var key
                var img_key
                var name_key
                var data_key
                var predict_key
                
                for(var i=1; i<size; i++){
                    key=arr[i].gapData
                    data_key = arr[i].data
                    img_key = arr[i].img
                    predict_key = arr[i].predictData
                    name_key = arr[i].name
                    for(var j=i-1; j>=0; j--){
                        if(arr[j].gapData >key){
                            arr[j+1].gapData = arr[j].gapData
                            arr[j+1].data = arr[j].data
                            arr[j+1].gapData = arr[j].gapData
                            arr[j+1].predictData = arr[j].predictData
                            arr[j+1].name = arr[j].name
                        }
                        else{
                            break
                        }
                    }   
                    arr[j+1].gapData=key
                    arr[j+1].data = data_key
                    arr[j+1].predictData = predict_key
                    arr[j+1].img = img_key
                    arr[j+1].name = name_key
                }
                console.log(arr)
                return arr
            }
               
            return{category,sortCategory,sortReverse}
        },
        components:{
        
        }
    }
</script>