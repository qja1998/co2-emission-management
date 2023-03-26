<template>
    <div> 
        <div class="frame" id="target-list">
            <div class="list-box">
                전환
                <div class="list-content-group">
                    <div class='list-content' v-for = "trans in transList" v-on:mouseover="hoverTarget(trans)" v-on:mouseleave="leaveTarget()">
                        <span class="direction-icon">▶</span>
                        <span class="list-content-text">{{ trans.category }}의 {{ trans.percentage}}%를 {{ trans.target }}로 전환</span>
                        <div style="display:inline-block; float: right; margin-top:2.7vh" v-if="select==trans.index && listKind=='trans'">
                            <img style="height:4vh;" src="@/assets/editBtn.png">
                            <img style="height:4vh; margin:0vh 1vw" src="@/assets/deleteBtn.png">
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class = "line"></div>
            <div class="list-box increse-box">
                감축
                <div class="list-content-group">
                    <div class ="list-content" v-for = "increas in increasList" v-on:mouseover="hoverTarget(increas)" v-on:mouseleave="leaveTarget()">
                        <span class="direction-icon">▶</span>
                        <span class="list-content-text">{{increas.category}}의 {{increas.percentage}}%를 감축</span>
                        <div style="display:inline-block; float: right; margin-top:2.7vh" v-if="select==increas.index && listKind=='increase'">
                            <img style="height:4vh;" src="@/assets/editBtn.png">
                            <img style="height:4vh; margin:0vh 1vw" src="@/assets/deleteBtn.png">
                        </div>
                    </div>  
                </div>
            </div>
            <button class="clickbtn" id="target-add-btn" @click="clickOpenAddTarget()">+ 추가하기</button>
        </div>
    </div>
        

</template>



<script>
import { useStore } from 'vuex'
import {ref} from 'vue'
    export default {
        name :"target_dash1",
        components:{
        },
        setup(){
            
            const store = useStore();
            var transList=[
                {index:0, category:'전력사용', percentage: 30, target: "태양열 에너지"},
                {index:1,category:'전력사용', percentage: 30, target: "태양열 에너지"},
                {index:2,category:'전력사용', percentage: 30, target: "태양열 에너지"},
                {index:3,category:'전력사용', percentage: 30, target: "태양열 에너지"},
            ]
            var increasList=[
                {index:0,category:'전력사용', percentage: 30},
                {index:1,category:'전력사용', percentage: 30},
                {index:12,category:'전력사용', percentage: 30}
            ]
            const clickOpenAddTarget = () => {
                store.commit('openAddTarget')
                console.log('open')
            }

            var select =ref(-1)
            var listKind = ref('')
            const hoverTarget=(value)=>{
                select.value = value.index
                if (value.target == null){
                    listKind.value = 'increase'
                }
                else{
                    listKind.value = 'trans'
                }
                console.log(listKind.value)
            }
            const leaveTarget=()=>{
                select.value = -1
            }
            
            return{
                transList,
                increasList,
                clickOpenAddTarget,
                select,
                listKind,
                hoverTarget,
                leaveTarget
            }
        }
    }
</script>

<style>
.clickbtn{
    background: #3DC984;
    border: none;
    border-radius: 1vh;
    width:8vw;
    height: 5vh;
    color:white
}
.clickbtn:hover{
    cursor: pointer;
}
#target-list{
    margin-top:1px;
    min-height:60vh;
    width:71vw;
    padding:5vh 4vw
}
.list-box{
    font-size:1.5rem; 
    font-weight: bold;
    float:left; 
    width:35vw; 
    min-height: 57vh;
}
.increse-box{
    width:29.9vw;
}
.line{
    min-height: 60vh; 
    width:1px;
    background:#EEEEEF; 
    float:left; 
    margin:0 3vw
}
.list-content-group{
    overflow: auto;
    height: 45.7vh;
    margin-top:8vh; 
    font-size:1.1rem; 
    font-weight: 400 ;
}
.direction-icon{
    display:inline-block;
    color:#3DC984; 
    margin:3.5vh 1vw;
}
.list-content-text{
   font-size:1.1rem
}
.list-content:hover{
    border-radius: 2vh;
    background: #f0f0f0;
}
#target-add-btn{
    float:right;
}
</style>
