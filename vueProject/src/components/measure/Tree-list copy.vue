<template>
  <div>
    <div class="addGroup_treelist">
      <span class="addGroup_tree_text">전체</span> <span class="addGroup_tree_text" style="color:#3DC984">{{ num }}</span>
      <button class="addGroup_tree_btnAdd"  @click="addNode()">+　추가하기</button>
    </div>
    <Tree style="color:black; font-size:2vh;margin-top:5vh"
    :nodes="data"
    :use-icon="true"
    :use-checkbox="true"
    :use-expandable="true"
    use-row-delete
    @nodeClick="onNodeClick"
    />
    <div class="addGroup_initInput">
      <input class="addGroup_initInput_check" type="checkbox"/>
      <input @keyup.enter="addNode(group_name)" v-model="group_name" class="addGroup_initInput_input" placeholder="조직이름을 설정해주세요"/>
      <button class="addGroup_initInput_enter" @click="addNode(group_name)">↲　입력</button>
    </div>
    
  </div>
  
  
</template>
<style>
.addGroup_treelist{
  margin-top:5vh;
}

.addGroup_tree_text{
  font-size:2.2vh; 
  font-weight:900;
}
.addGroup_tree_btnAdd{
  width:6.5vw;
  height: 4vh;
  float:right;
  background: #3DC984;
  border-radius: 6px;
  border:none;
  color:#ffffff;
  font-weight: bolder;
  font-size:1.4vh;
}
.addGroup_initInput{
  margin-top:2vh;
  height: 8vh;
}
.addGroup_initInput_input{
  width:25vw;
  height:4vh;
  margin-left:1vw;
  background: #F7F8F8;
  border: 1px solid #DDE2E6;
  border-radius: 8px 0px 0px 8px;
}
.addGroup_initInput_check{
  width: 2vh;
  height: 2vh;
  vertical-align: middle;
}
.addGroup_initInput_enter{
  width:7vh;
  height:4.4vh;
  background: #ffffff;
  border: 1px solid #E9E9EA;
  border-radius: 0px 8px 8px 0px;
}

</style>
<script>
import { ref } from "vue";
import Tree from "vue3-tree";
import "vue3-tree/dist/style.css";

export default {
  components: {
    Tree,
  },
  setup() {
    
    const data = ref([
      {
        id: 1,
        label: "경상대",
        nodes: [
          {
            id: 2,
            label: "상경대학",
            nodes:[
              {
                id: 3,
                label:"경영학과"
              }
            ],
          },
          {
            id: 4,
            label: "공과대학",
            nodes: [
              {
                id: 5,
                label: "항공우주 및 소프트웨어 학과",
              },
              {
                id: 6,
                label: "건축공학과",
              },
            ],
          },
        ],
      },
    ]);
    var selected = ref("");
    const searchText = ref("");
    const onNodeExpanded = (node, state) => {
      console.log("state: ", state);
      console.log("node: ", node);
    };

    const onUpdate = (nodes) => {
      console.log("nodes:", nodes);
    };
    const onNodeClick = (node) => {
      selected.value = node
      console.log("클릭된 노드",selected.value);
      
    }
    var num = data.value.length
    console.log(num)
    
    function showEnter(){
      
      enter_btn.value = true
    }
    function closeEnter(){
      enter_btn.value = false
    }
    function addNode(name){
      var list = {id:num,label:name,nodes:""}
      data.value.push(list)
      console.log(data.value)
    }
    return {
      data,
      searchText,
      onNodeExpanded,
      onUpdate,
      onNodeClick,
      showEnter,
      closeEnter,
      addNode,
      num,
    };
  },
};
</script>

<style lang="scss">
</style>