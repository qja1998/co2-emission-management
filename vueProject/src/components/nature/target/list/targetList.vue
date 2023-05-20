<template>
    <div> 
        <div class="frame" id="target-list">
            <div class="list-box">
                전환
                <img src="@/assets/addBtn2.png" class="icon add-icon" @click="addList(0)">
                <div class="list-content-group">
                    <div id="default-translist" v-if="transListNum ==0 && add[1]!=0">
                        <img src="@/assets/exclamationMark.png" style="width:7vh; margin: 13vh 15.5vw 2vh 15.5vw">
                        <div style="text-align: center;">데이터를 추가해주세요</div>
                    </div>
                    <div class='list-content' v-for = "trans in targetList" v-on:mouseover="hoverTarget(trans)" v-on:mouseleave="leaveTarget()"> 
                        <span v-if="trans.listkind==0">
                            <span class="direction-icon">▶</span>
                            <!-- 리스트 내용 -->
                            <span class="list-content-text" v-if="edit[0]==false||edit[1]!=trans.index">{{ trans.category }}의 {{ trans.percentage}}%를 {{ trans.target }}로 전환</span>
                            <!-- hover시 -->
                            <div class="target-icon" v-if="select==trans.index && trans.listkind==0">
                                <img src="@/assets/editBtn.png" v-if="edit[0]==false||edit[1]!=trans.index" @click="clickEditTarget(trans)">
                                <img style="margin:0vh 1vw" src="@/assets/deleteBtn.png" v-if="edit[0]==false||edit[1]!=trans.index" @click="clickDeleteTarget(trans)">
                            </div>
                        </span>
                        <!-- 리스트 수정 -->
                        <span class="list-content-text" v-if="edit[0]==true && edit[1]==trans.index &&trans.listkind==0" v-on:keyup.enter="submitEdit(trans)">
                            <select v-model="category" class="box drop-box" >
                                <option :value="cate" v-for="cate in categoryList">{{ cate }}</option>
                            </select> 의 <input class="box input-box" id="transPercent" placeholder='30'> %를
                            <select v-model="transEnargy" class="box drop-box" >
                                <option :value=trans v-for="trans in transEnargyList">{{trans}}</option >
                            </select> 로 전환
                        </span> 
                    </div>
                    <!-- 리스트 추가 -->
                    <div class='list-content' v-if="add[0]==true && add[1]==0">
                        <span class="list-content-text" v-on:keyup.enter="submitAdd()">
                            <select v-model="category" class="box drop-box" >
                                <option :value="cate" v-for="cate in categoryList">{{ cate }}</option>
                            </select> 의 <input class="box input-box " id="transPercent" placeholder='30'> %를
                            <select v-model="transEnargy" class="box drop-box" >
                                <option :value=trans v-for="trans in transEnargyList">{{trans}}</option >
                            </select> 로 전환
                        </span> 
                    </div>
                </div>
            </div>
            <div class = "line"></div>
            <div class="list-box increse-box">
                감축
                <img src="@/assets/addBtn2.png" class="icon add-icon" @click="addList(1)">
                <div class="list-content-group">
                    <div id="default-increaslist" v-if="increasListNum ==0 && add[1]!=1">
                        <img src="@/assets/exclamationMark.png" style="width:7vh; margin: 13vh 13vw 2vh 13vw">
                        <div style="text-align: center;">데이터를 추가해주세요</div>
                    </div>
                    <div class ="list-content" v-for = "increas in targetList" v-on:mouseover="hoverTarget(increas)" v-on:mouseleave="leaveTarget()">
                        <span v-if="increas.listkind==1">
                            <span class="direction-icon">▶</span>
                            <!-- 리스트 내용 -->
                            <span class="list-content-text" v-if="edit[0]==false||edit[1]!=increas.index">{{increas.category}}의 {{increas.percentage}}%를 감축</span>
                            <div class="target-icon" v-if = "select==increas.index && increas.listkind==1">
                                <img src="@/assets/editBtn.png" v-if="edit[0]==false||edit[1]!=increas.index" @click="clickEditTarget(increas)">
                                <img  style="margin:0vh 1vw" src="@/assets/deleteBtn.png" v-if="edit[0]==false||edit[1]!=increas.index" @click="clickDeleteTarget(increas)">
                            </div>
                        </span>
                        
                        <!-- 리스트 수정 -->
                        <span class="list-content-text" v-if="edit[0]==true && edit[1]==increas.index && increas.listkind==1" v-on:keyup.enter="submitEdit(increas)">
                            <select v-model="category" class="box drop-box" >
                                <option :value="cate" v-for="cate in categoryList">{{ cate }}</option>
                            </select> 의 <input class="box input-box" id="increasPercent" placeholder='30'> %를 감축
                        </span> 
                    </div>
                    <!-- 리스트 추가 -->
                    <div class='list-content' v-if="add[0]==true && add[1]==1">
                        <span class="list-content-text" v-on:keyup.enter="submitAdd('감축')">
                            <select v-model="category" class="box drop-box" >
                                <option :value="cate" v-for="cate in categoryList">{{ cate }}</option>
                            </select> 의 <input class="box input-box" id="increasPercent" placeholder='30'> %를 감축
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
            var editContent = ref(false); //리스트 변경사항이 있는지 확인하는 변수

            var edit = ref([false, -1]); 
            var del = ref([false, -1]);
            var add = ref([false,-1])

            //수정과 추가시 선택하는데 필요한 리스트
            var categoryList= computed(() => store.state.CarbonCategories)
            var transEnargyList = [
                '태양열 에너지',
                '풍력 에너지',
                '태양광 에너지'
            ]
            var category =ref('고정연소')
            var transEnargy =ref('태양열 에너지')

            //사용자의 전환, 감축 목표 리스트
            var targetList=[
                    {
                        listkind:1, 
                        index:0, 
                        id:'',
                        category:'고정연소', 
                        percentage:30, 
                        target: null,
                        
                    },
                    {
                        listkind:0, 
                        index:1, 
                        id:'',
                        category:'고정연소', 
                        percentage: 20, 
                        target: '태양열 에너지',
                    },
                    {
                        listkind:0, 
                        index:2, 
                        id:'',
                        category:'고정연소', 
                        percentage: 20, 
                        target: '태양열 에너지',
                    },
            ]

            //각각의 리스트 내용의 개수를 나타내는 변수
            var transListNum = ref(targetList.filter(list => list.listkind === 0).length) 
            var increasListNum = ref(targetList.filter(list => list.listkind === 1).length)

            console.log(targetList)
            // 내용 추가 팝업창 여는 함수
            // const clickOpenAddTarget = () => {
            //     store.commit('openAddTarget')
            //     console.log('open')
            // }

            var select =ref(-1) // 마우스가 가리키고있는 리스트 내용

            //마우스 오버시 수정, 삭제 기능 옵션 on
            const hoverTarget=(value)=>{
                select.value = value.index
            }

            //마우스 오버시 수정, 삭제 기능 옵션 off
            const leaveTarget=()=>{
                select.value = -1
            }

            //추가하기 버튼 클릭시 추가 폼 여는 함수
            function addList(kind_){
                add.value[0]=true
                add.value[1]=kind_   
            }

            //수정하기 버튼 클릭시 수정 폼 여는 함수
            function clickEditTarget(list){
                edit.value[0] = true
                edit.value[1] = list.index
            }

            //추가 완료후 리스트 업
            function submitAdd(){
                var addIndex = targetList.length
                console.log('엔터')
                if(add.value[1]==0){
                    targetList.push({
                        listkind:0, 
                        index:addIndex, 
                        category:category.value, 
                        percentage: document.getElementById('transPercent').value,
                        target: transEnargy.value
                    })
                    
                    editContent.value = true
                    transListNum.value = targetList.filter(list => list.listkind === 0).length
                }
                else{
                    targetList.push({
                        listkind:1, 
                        index:addIndex, 
                        category:category.value, 
                        percentage: document.getElementById('increasPercent').value, 
                        target: null
                    })
                    editContent.value = true
                    increasListNum.value = targetList.filter(list => list.listkind === 1).length
                }
                
                console.log(targetList)
                add.value[0]=false
                add.value[1]=-1  
                
            }

            //수정 완료후 리스트 업
            function submitEdit(list){
                console.log('수정엔터')
                if(list.listkind==0){
                    targetList[list.index] = {
                        listkind:list.listkind, 
                        index:list.index, 
                        category:category.value, 
                        percentage: document.getElementById('transPercent').value,
                        target: transEnargy.value
                    }
                }
                else{
                    targetList[list.index] = {
                        listkind:list.listkind, 
                        index:list.index, 
                        category:category.value, 
                        percentage: document.getElementById('increasPercent').value,
                        target: null
                    }
                }
                
                edit.value[0]=false
                edit.value[1]=-1
                editContent.value = true
            }

            //리스트 삭제 함수
            function clickDeleteTarget(list){
                targetList.splice(list.index, 1);
                editContent.value=true

                for(var i=list.index; i<targetList.length; i++){
                    targetList[i].index=targetList[i].index-1
                }
                transListNum.value = targetList.filter(list => list.listkind === 0).length
                increasListNum.value = targetList.filter(list => list.listkind === 1).length
                console.log(transListNum.value)
            }

            //서버에 저장
            function clickSaveTarget(){
                console.log('저장')
                editContent.value=false
            }

            return{
                targetList,
                // clickOpenAddTarget,
 
                hoverTarget,
                leaveTarget,
                clickSaveTarget,
                clickEditTarget,
                select,
                categoryList,
                category,
                edit,
                add,
                submitEdit,
                submitAdd,
                addList,
                clickDeleteTarget,
                editContent,
                transEnargy,
                transEnargyList,
                transListNum,
                increasListNum

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
.long-drop-box{
    width:10vw
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
.target-icon{
    display:inline-block; 
    float: right; 
    margin-top:2.7vh
}
.target-icon> img{
    height:4vh;
}
.target-icon> img:hover{
    cursor: pointer;
}
#default-translist{
    width:inherit; 
    height:40vh; 
    border:1px solid #d5d5d5; 
    border-radius: 2vh;
}
#default-increaslist{
    width:inherit; 
    height:40vh; 
    border:1px solid #d5d5d5; 
    border-radius: 2vh;
}
</style>