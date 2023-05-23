<template>
    <div style="">
        <div class="title-border" id="dash5-title-border">카테고리별 탄소 배출량 예측
            <button onclick="location.href='predict/predictCategory';">전체보기</button>
        </div>  
        <div class="frame" id="frame-dash5">
            <div class="predict-column">
                <div>탄소 배출원</div>
                <div>이번달</div>
                <div>다음달</div>
            </div>

            <div style="overflow: auto; height: 44vh; width:inherit; margin-top:3vh;">
                <div v-for="(cate, i) in sortCategory">
                    <div id="predict-category" v-if="i>0">
                        <img :src="cate.img">
                        <span style="width:6vw;">{{ cate.name }}</span>
                        <span>{{ cate.data }}kg</span>
                        <span style="color:#FF0000" v-if="cate.data<cate.predictData">{{ cate.predictData }}kg▲</span>
                        <span style="color:#3DC984" v-if="cate.data>cate.predictData">{{ cate.predictData }}kg▼</span>
                        <span style="color:#5F5F5F"  v-if="cate.data==cate.predictData">{{ cate.predictData }}kg-</span>
                        <br>
                    </div>
                    <div id="predict-category" style="margin-top:0" v-else-if="i==0">
                        <img :src="cate.img">
                        <span style="width:6vw;">{{cate.name}}</span>
                        <span>{{ cate.data }}kg</span>
                        <span style="color:#FF0000" v-if="cate.data<cate.predictData">{{ cate.predictData }}kg▲</span>
                        <span style="color:#3DC984" v-if="cate.data>cate.predictData">{{ cate.predictData }}kg▼</span>
                        <span style="color:#5F5F5F" v-if="cate.data==cate.predictData">{{ cate.predictData }}kg-</span>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
    #frame-dash5{
        width:20vw;
        height: 54vh;
    }
    .predict-column{
        border-bottom: 1px solid #e4e4e4;
    }
    .predict-column > div{
        color:#5A5A5A;
        display:inline-block;
        margin: 1vh 1.5vw;
        font-size:1.6vh;
    }
    #dash5-title-border > button {
        float: right;
        background: none;
        border: none;
    }
    #dash5-title-border > button:hover {
        cursor: pointer;
    }
    #predict-category{  
        margin-top:6vh;
        font-size:1.6vh;
        width:inherit;
    }
    #predict-category > img{
        width: 4vh;
    }
    #predict-category > span{
        height:4vh;
        width: 3vw;
        display: inline-block;
        line-height: 4vh; 
        margin-left:1vw;
    }
    #predict-category > *{
        float:left;
    }
</style>


<script>
import {ref,computed} from 'vue'
import {useStore} from 'vuex'

    export default {
        name :"predict_dash5",
        setup(){
            var store = useStore()
            //날짜 및 그룹명
            var selected_company = computed(()=> store.state.insight_selected_company)
            var user_group = computed(()=> store.state.user_group)
            var now = new Date();	// 현재 날짜 및 시간
            var year = ref(now.getFullYear())	// 년도
            //서버
            var server_category = [
                {name:'고정 연소',data:210, predictData: 304},
                {name:'이동 연소', data:130, predictData: 120},
                {name:'탈루 배출', data:20, predictData: 513},
                {name:'폐기물 처리시설', data:150, predictData: 150},
                {name:'비료 사용', data:170, predictData: 120},
                {name:'대학 소유 동물', data:130, predictData: 53},
                {name:'산림에 의한 흡수', data:54, predictData: 316,},
                {name:'전력 사용', data:21, predictData: 254},
                {name:'열 사용', data:34, predictData: 268},
                {name:'수도 사용', data:51, predictData: 270},
                {name:'폐기물', data:180, predictData: 240},
                {name:'통근/통학', data:53, predictData: 53},
                {name:'출장', data:547, predictData: 352},
                {name:'위탁운영 차량', data:71, predictData: 346},
            ]
            var category = [
                {img:require('@/assets/previewDetail/1.png'),name:'고정 연소',data:server_category[0].data, predictData: server_category[0].predictData},
                {img:require('@/assets/previewDetail/2.png'),name:'이동 연소', data:server_category[1].data, predictData: server_category[1].predictData},
                {img:require('@/assets/previewDetail/3.png'),name:'탈루 배출', data:server_category[2].data, predictData: server_category[2].predictData},
                {img:require('@/assets/previewDetail/4.png'),name:'폐기물 처리시설', data:server_category[3].data, predictData: server_category[3].predictData},
                {img:require('@/assets/previewDetail/5.png'),name:'비료 사용', data:server_category[4].data, predictData: server_category[4].predictData},
                {img:require('@/assets/previewDetail/6.png'),name:'대학 소유 동물', data:server_category[5].data, predictData: server_category[5].predictData},
                {img:require('@/assets/previewDetail/7.png'),name:'산림에 의한 흡수', data:server_category[6].data, predictData: server_category[6].predictData},
                {img:require('@/assets/previewDetail/8.png'),name:'전력 사용', data:server_category[7].data, predictData: server_category[7].predictData},
                {img:require('@/assets/previewDetail/9.png'),name:'열 사용', data:server_category[8].data, predictData: server_category[8].predictData},
                {img:require('@/assets/previewDetail/10.png'),name:'수도 사용', data:server_category[9].data, predictData: server_category[9].predictData},
                {img:require('@/assets/previewDetail/11.png'),name:'폐기물', data:server_category[10].data, predictData: server_category[10].predictData},
                {img:require('@/assets/previewDetail/12.png'),name:'통근/통학', data:server_category[11].data, predictData: server_category[11].predictData},
                {img:require('@/assets/previewDetail/13.png'),name:'출장', data:server_category[12].data, predictData: server_category[12].predictData},
                {img:require('@/assets/previewDetail/14.png'),name:'위탁운영 차량', data:server_category[13].data, predictData: server_category[13].predictData},
            ]
            var sortCategory = sort(category,14)

            function sort(arr,size){
                var key
                var img_key
                var name_key
                var data_key
                for(var i=1; i<size; i++){
                    key=arr[i].predictData
                    data_key = arr[i].data
                    img_key = arr[i].img
                    name_key = arr[i].name
                    for(var j=i-1; j>=0; j--){
                        if(arr[j].predictData >key){
                            arr[j+1].predictData = arr[j].predictData
                            arr[j+1].data = arr[j].data
                            arr[j+1].img = arr[j].img
                            arr[j+1].name = arr[j].name
                        }
                        else{
                            break
                        }
                    }   
                    arr[j+1].predictData=key
                    arr[j+1].data = data_key
                    arr[j+1].img = img_key
                    arr[j+1].name = name_key
                }
                return arr
            }
            
            var name = '헤미'
            return{category,name,sortCategory,sort}    
        },
        components:{
        }
    }
</script>