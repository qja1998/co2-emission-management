<template>
<div>
    <div class="addGroup">
        <span class="edit-group-title">조직도 편집</span>
        <button class="edit-group-title" id="addGroup_del" @click="OffEditGroup">X</button>

        <Suspense>
        <template #default>
            <div class="add-group-input">  
                <Tree/>
            </div>
        </template>
        <template #fallback>
            <div>Loading...</div>
        </template>
        </Suspense>
        <button class="add-group-commit" @click="OffEditGroup">저장하기</button>
    </div>

    
</div>


</template>
<style>
.addGroup{
    height: 92vh;
    width: 32vw;
    background-color: rgb(255, 255, 255);
    border-color:rgba(228, 228, 228, 0.26) ;
    border-style: groove  ;
    padding:4vh;
}
#addGroup_del{
    float:right;
    background:none;
    border: none;
    font-weight: bold;
}
.edit-group-title{
    font-size:2.5vh;
    font-weight: 900;
}
.add-group-commit{
    float: left;
    margin:1.3vh;
    width: 16VW;
    height: 3.5vh;
    background: #3DC984;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 13px;
    color: #FFFFFF;

    margin-bottom: 0;
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%,-50%);
}


</style>


<script>
import { useStore } from "vuex";
import TreeListVue from "../measure/Tree-list.vue";
//import Tree from "vue3-treeview";
import Tree from './AddGroupTree2.vue'

export default{ 
    name:'',
    components:{
        TreeListVue,
        Tree
    },
    setup(){
        const store = useStore(); //vuex 사용
        const OffEditGroup = () => store.commit("OffEdit", );
        
        return {OffEditGroup}
    },
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>