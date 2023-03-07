<template>
  <div style="margin-top:5vh;" >
    <div style="width:32vw; height:75vh;overflow: auto;">
      <ul class="list-list" style="list-style:none; font-weight:600 ; margin-right: 2vw; ">
        <li style=" margin-bottom:5vh; font-size: 0.8vw; color: #3D3E3F;" v-for="number in list_number">{{number.category_title}}
            <div v-for="category in list_category">
              <li class="category_content" v-if="number.index == category.category" @mouseover="select_category(category)" @mouseleave="leave_category(category)">
                  <img style="margin-right:1.3vw; width: 3vw; vertical-align: middle;" src="@/assets/building.png" alt="" v-if="number.index==1">
                  <h class ="category_image2" v-if="number.index!=1">{{category.image}}</h>{{category.name}}
                  <button  class="Group_btn" id="deleGroupbtn" v-if="category.check==true" @click="DellGroup(category.name)"><img  class="Group_btn_imge" src="@/assets/deleteBtn.png"> </button>      
                  <button  class="Group_btn" v-if="category.check==true" @click="AddGroup(category.name, number.index)"><img class="Group_btn_imge" src="@/assets/addBtn.png"></button>
                  <button class="Group_btn"  v-if="category.check==true" @click="EditGroup(category.name)"><img class="Group_btn_imge" src="@/assets/editBtn.png" ></button>
              </li>
            </div>    
        </li>
      </ul>
    </div>
    
  </div>

</template>

<style>
.Group_btn{
  height:3vh;
  width: 4.5vh;
  float:right;
  margin: 0.2vw;
  margin-top:1.5vh;
  border:none;
  background: none;
}
.Group_btn_imge{
  height:3vh;
  width: 3vh;
}
#deleGroupbtn{
  margin-right:1vw;
}
.Group_btn:hover{
  cursor:pointer
}


</style>

<script>
import "vue3-treeview/dist/style.css";
import axios from "axios";
import { RouterLink,useRouter } from "vue-router";
import { useStore } from "vuex"
import { ref,computed } from "vue"

export default {
  name :"group-list",
  setup(){

    const router = useRouter();
    var check = ref(true)
    var list_number = ref([
                    {index:"1", category_title: "1차 카테고리"},
                    {index:"2",category_title: "2차 카테고리"},
                    {index:"3",category_title: "3차 카테고리"}
            ])
    var list_category = ref([            
    ])
    var select_group = ref([
    ])
  
    function select_category(category){
        //select_group.add(name)
        select_group.value.push({category:category.category, image:category.image, name:category.name})
        category.check=true
    }
    function leave_category(category){
        select_group.value.pop({category:category.category, image:category.image, name:category.name})
        category.check=false
    }
    const store = useStore()
    const OffEditGroup = () => store.commit("OffEdit", );
    
    function AddGroup(name,index){
      console.log("추가하기")
      store.commit("OnGroupAddPopup", name);
      store.commit("SetGroupDepth", index);
      // store.commit("InsightAddY",-1);
    }
    function EditGroup(name){
      store.commit("OnGroupEditPopup", name);
      // store.commit("InsightAddY",-1);
    }
    function DellGroup(name){
      if (confirm(name+"을 정말 삭제하시겠습니까?") == true){ 
        del_group_server(name)
        location.reload();
      }else{
      }
    }

    const config = {
      
      headers:{
        Authorization:"Bearer"+" "+store.state.accessToken,
        "Content-Type": "text/html; charset=utf-8",
      }
    }
    async function del_group_server(name){
        console.log(name)
        await axios.delete("Company/PreviewInfo/"+name,config).then(res => {
        })
        .catch(error => {
            alert("로그인 시간이 만료되었습니다.")
            console.log(error)
            router.push('/');
        })
        .finally(() => {})
    }
    async function title_get_list(){
        await axios.get("Company/Organization/Simple/samsung",config).then(res => {
            console.log(res.data)
            this.list_category =  res.data
            for(let i=0;i<res.data.length;i++){
                this.list_category[i].image =  this.list_category[i].name[0]
            }
        })
        .catch(error => {
            alert("로그인 시간이 만료되었습니다.")
            console.log(error)
            router.push('/');
        })
        .finally(() => {})

    }
    return{
        check,
        list_number,
        list_category,
        select_group,
        select_category,
        leave_category,
        title_get_list,
        OffEditGroup,
        AddGroup,
        EditGroup,
        DellGroup
    }
  } ,
  created(){
      this.title_get_list()
  },
}
</script>

