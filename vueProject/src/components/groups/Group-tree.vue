<template>
    <div class="group-tree">
         <!-- 임시 -->
        <div v-if="IfTreeNull"><!-- 그룹이 없으면 보여줌 -->
          <img src="@/assets/LockGroup.png" alt="권한 따라 잠금" class="lock-group">
          <span class="group-lock-guide">회사 조직을 설계하세요</span>
          <button class="add-group-button-Intree" @click="OnEditGroup" type="button">+ 추가하기</button>
        </div>
        <div v-else><!-- 그룹이 있으면 그룹 보여줌 -->
          <blocks-tree  id="tree" :data="treeData" :horizontal="treeOrientation=='1'" :collapsable="true" :props="{label: 'label', expand: 'expand', children: 'Children',  key:'id'}">
            <template #node="{data}" id="tree2" >
                <GroupTreeNode :Scope1=data.Scope1 :Scope2=data.Scope2 :Scope3=data.Scope3 :manager=data.Chief :level=data.id :GroupName=data.label></GroupTreeNode>
            </template>
         </blocks-tree>
        </div>
    </div>
</template>

<style>
.group-tree{
    min-height: 86vh;   /*header랑 합쳐서 100이 되어야 함*/
    height: inherit;
    position: relative;
    /* 점 배경 */
    background-image: linear-gradient(to bottom, transparent, transparent 10%, #F7F9FB 10%),
      linear-gradient(to right, rgba(0, 0, 0, 0.342), rgba(0, 0, 0, 0.103) 3%, #F7F9FB 10%);
    background-size: 20px 20px;

    text-align: center;
    max-width: 85vw;
  }
  .lock-group{
    width: 150px;
    position: absolute;
    left: 50%;
    bottom: 40%;
    transform: translate(-50%,-50%);
  }
  .group-lock-guide{
    position: absolute;
    left: 50%;
    bottom: 42%;
    transform: translate(-50%,-50%);
  }
  .add-group-button-Intree{
    width: 110px;
    height: 3.5vh;
    background: #3DC984;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 13px;
    
    color: #FFFFFF;
    position: absolute;
    left: 50%;
    bottom: 30%;
    transform: translate(-50%,-50%);
  }
  #tree{
    background: none;
    margin-top: 4vh;
  }
  .org-tree-node-label-inner{
    box-shadow:none !important ;
    padding: 0 !important;
  }
</style>


<script>
import { useStore } from "vuex";
import { defineComponent,ref,reactive,onMounted} from 'vue';
import GroupTreeNode from "./GroupTreeNode.vue"
import axios from "axios";
import { useRouter } from "vue-router";
    export default defineComponent({
       async setup(){
          const store = useStore(); //vuex 사용
          const router = useRouter();
          
          const OnEditGroup = () => store.commit("OnEdit", );
          var IfTreeNull=ref(false);
          function change(){
            console.log(this.IfTreeNull)
            this.IfTreeNull = !this.IfTreeNull
          }

          let selected = ref([]);
          let treeOrientation = ref("0"); //수직 or수평
          var treeData = ref({}) 
          let testtree = ref({
              label: 'root',
              expand: true,
              some_id: 1,
              Chief:'하하',
              Scope1:1,
              Children: [
                  { label: '상경대학', some_id: 2, Chief:'히히',something:'ㅇㅈㅁㅇㅁㅈㅇ'},
                  { label: '자연대학', some_id: 3, Chief:'호호',},
                  { 
                      label: '공과대학', 
                      some_id: 4, 
                      expand: false, 
                      Children: [
                          { label: '항공소프트웨어공학과', some_id: 5 },
                          {  
                              label: '기계공학과', 
                              some_id: 6, 
                              expand: false, 
                              Children: [
                                  { label: 'subchild 11', some_id: 7 },
                                  { label: 'subchild 22', some_id: 8 },
                              ]
                          },
                      ]
                  },
              ],
          });
          
          const config = {
            headers:{
              Authorization:"Bearer"+" "+store.state.accessToken,
              "Content-Type": "text/html; charset=utf-8",
            }
          }
          async function get_tree(){
              await axios.get("/Company/Organization/samsung",config).then(res => {
                    console.log(res.data)
                    treeData = res.data
                    store.commit("SetGroupTree",res.data);

                })
                .catch(error => {
                  alert("로그인 시간이 만료되었습니다.")
                  console.log(error)
                  router.push('/');
                })
                .finally(() => {
                  console.log("lender1")
                  //treeData = testtree
                })
            }

            await get_tree()

        return {
          get_tree,
          treeData,
          selected,
          treeOrientation,
          OnEditGroup,
          IfTreeNull,change,testtree
          }
        },
        name :"Group-tree",
        components:{
            GroupTreeNode
        },
        created(){     
       },   
    })
</script>