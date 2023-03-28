<template>
    <div> 
        <div class="frame" id="target-list">
            <div class="list-box">
                전환
                <img src="@/assets/addBtn2.png" class="icon add-icon" @click="addList('전환')">
                <div class="list-content-group">
                    <div class='list-content' v-for = "trans in transList" v-on:mouseover="hoverTarget(trans)" v-on:mouseleave="leaveTarget()">
                        <span class="direction-icon">▶</span>
                        <!-- 리스트 내용 -->
                        <span class="list-content-text" v-if="edit[0]==false||edit[1]!=trans.index">{{ trans.category }}의 {{ trans.percentage}}%를 {{ trans.target }}로 전환</span>
                        <div style="display:inline-block; float: right; margin-top:2.7vh" v-if="select==trans.index && listKind=='trans'">
                            <img style="height:4vh;" src="@/assets/editBtn.png" v-if="edit[0]==false||edit[1]!=trans.index" @click="clickEditTarget(trans.index)">
                            <img style="height:4vh; margin:0vh 1vw" src="@/assets/deleteBtn.png" v-if="edit[0]==false||edit[1]!=trans.index" @click="clickDeleteTarget(trans.index)">
                        </div>
                        <!-- 리스트 수정 -->
                        <span class="list-content-text" v-if="edit[0]==true && edit[1]==trans.index" v-on:keyup.enter="submitEdit(trans.index)">
                            <select v-model="category" class="box drop-box" >
                                <option :value="cate" v-for="cate in categoryList">{{ cate }}</option>
                            </select> 의 <input class="box input-box"> %를
                            <select v-model="transEnargy" class="box drop-box" >
                                <option value="태양열에너지">태양열에너지</option>
                                <option value="태양광에너지">태양열에너지</option>
                                <option value="풍력에너지">풍력에너지</option>
                            </select> 로 <input class="box input-box"> 전환
                        </span> 
                    </div>
                    <!-- 리스트 추가 -->
                    <div class='list-content' v-if="add[0]==true && add[1]=='전환' ">
                        <span class="list-content-text" v-on:keyup.enter="submitAdd()">
                            <select v-model="category" class="box drop-box" >
                                <option :value="cate" v-for="cate in categoryList">{{ cate }}</option>
                            </select> 의 <input class="box input-box"> %를
                            <select v-model="transEnargy" class="box drop-box" >
                                <option value="태양열에너지">태양열에너지</option>
                                <option value="태양광에너지">태양열에너지</option>
                                <option value="풍력에너지">풍력에너지</option>
                            </select> 로 <input class="box input-box"> 전환
                        </span> 
                    </div>
                </div>
            </div>
            <div class = "line"></div>
            <div class="list-box increse-box">
                감축
                <img src="@/assets/addBtn2.png" class="icon add-icon" @click="addList('감축')">
                <div class="list-content-group">
                    <div class ="list-content" v-for = "increas in increasList" v-on:mouseover="hoverTarget(increas)" v-on:mouseleave="leaveTarget()">
                        <span class="direction-icon">▶</span>
                        <!-- 리스트 내용 -->
                        <span class="list-content-text" v-if="edit[0]==false||edit[1]!=increas.index">{{increas.category}}의 {{increas.percentage}}%를 감축</span>
                        <div style="display:inline-block; float: right; margin-top:2.7vh" v-if="select==increas.index && listKind=='increase'">
                            <img class="icon" src="@/assets/editBtn.png" v-if="edit[0]==false||edit[1]!=increas.index" @click="clickEditTarget(increas.index)">
                            <img class="icon" style="margin:0vh 1vw" src="@/assets/deleteBtn.png" v-if="edit[0]==false||edit[1]!=increas.index" @click="clickDeleteTarget(increas.index)">
                        </div>
                        <!-- 리스트 수정 -->
                        <span class="list-content-text" v-if="edit[0]==true && edit[1]==increas.index" v-on:keyup.enter="submitEdit(increas.index)">
                            <select v-model="category" class="box drop-box" >
                                <option :value="cate" v-for="cate in categoryList">{{ cate }}</option>
                            </select> 의 <input class="box input-box"> %를 감축
                        </span> 
                    </div>
                    <div class='list-content' v-if="add[0]==true && add[1]=='감축'">
                        <span class="list-content-text" v-on:keyup.enter="submitAdd('감축')">
                            <select v-model="category" class="box drop-box" >
                                <option :value="cate" v-for="cate in categoryList">{{ cate }}</option>
                            </select> 의 <input class="box input-box"> %를 감축
                        </span> 
                    </div>
                </div>
            </div>
            <button :class="{clickbtn: editContent, 'nonclickbtn': !editContent}" id="target-add-btn" @click="clickSaveTarget()">저장하기</button>
            <!-- <button class="clickbtn" id="target-add-btn" @click="clickOpenAddTarget()">+ 추가하기</button> -->
        </div>
    </div>
        

</template>



<script>
import { useStore } from 'vuex'
import {computed, ref} from 'vue'
    export default {
        name :"target_dash1",
        components:{
        },
        setup(){
            const store = useStore();
            var editContent = ref(false);
            var edit = ref([false, -1]);
            var del = ref([false, -1]);
            var add = ref([false,''])
            var categoryList= computed(() => store.state.CarbonCategories)
            var category ='고정연소'
            var transList=[
                {index:0,category:'전력사용', percentage: 30, target: "태양열 에너지"},
                {index:1,category:'전력사용', percentage: 30, target: "태양열 에너지"},
                {index:2,category:'전력사용', percentage: 30, target: "태양열 에너지"},
                {index:3,category:'전력사용', percentage: 30, target: "태양열 에너지"},
            ]
            var increasList=[
                {index:4,category:'전력사용', percentage: 30},
                {index:5,category:'전력사용', percentage: 30},
                {index:6,category:'전력사용', percentage: 30}
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
            function clickSaveTarget(){
                console.log('저장')
                editContent.value=false
            }
            function addList(kind){
                add.value[0]=true
                add.value[1]=kind   
                console.log(add.value)
            }
            function clickEditTarget(index){
                edit.value[0] = true
                edit.value[1] = index
                console.log(edit.value[1])
                
            }
            function submitAdd(){
                add.value[0]=false
                add.value[1]=''
                editContent.value = true
                
            }
            function submitEdit(index){
                console.log('수정엔터')
                edit.value[0]=false
                edit.value[1]=-1
                editContent.value = true
                
            }
            return{
                transList,
                increasList,
                clickOpenAddTarget,
                select,
                listKind,
                hoverTarget,
                leaveTarget,
                clickSaveTarget,
                clickEditTarget,
                categoryList,
                category,
                edit,
                add,
                submitEdit,
                submitAdd,
                addList,
                editContent
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
.nonclickbtn{
    background: #AEAEAE;
    border: none;
    border-radius: 1vh;
    width:8vw;
    height: 5vh;
    color:white
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
.box{
    height:4vh;
    width:7vw;
    font-size:1rem;
    border-radius: 0.7vh;
    border: 1px solid #D0D0D0;
}
.input-box{
    height: 3.7vh;
    width:3vw;
}
.drop-box{
    background: #EFF1F9;
    border: none;
}
#target-add-btn{
    float:right;
}
.icon{
    height:4vh;
}
.icon:hover{
    cursor: pointer;
}
.add-icon{
    float:right
}
</style>
