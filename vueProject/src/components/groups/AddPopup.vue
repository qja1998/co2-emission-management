<template>
    <div class ="active" id="addpopup" v-if="GroupAddBtn==true">
        <div class="Addpopup">조직 추가하기
            <span id="del_btn" @click="offpopup()">x</span><br>
            <div style="font-size:1.1rem; margin-left:2vw; margin-top:4vh; color:#505050">
                상위조직
                <span style="margin-left:1.5vw; font-weight: 400;">{{group_name}}</span><br>
                조직명
                <input id = "input_Groupname"><br>
                관리자
                <input id = "input_chiefname">
            </div>
            <button class="save_add_group" @click="addGroup()">저장하기</button>
        </div>

    </div>
</template>

<style>
#addpopup{
    position:fixed;
    z-index:1;
    padding:30vh 20vw;
}
.Addpopup{
    width:40vw;
    height:41vh;
    background: #ffffff;
    box-sizing: border-box;
    padding:4vh 6vh 3vw 3vw;
    font-size: 1.5rem;
    font-weight: 900;
}
#del_btn{
    float:right; 
    font-size: 1.5rem;
}
#del_btn:hover{
    cursor: pointer;
}
#input_Groupname{
    margin-top:4vh;
    margin-left:2vw;
    width:20vw;
    height: 2.5vh;
    background: #F7F8F8;
    border: 1px solid #DDE2E6;
    border-radius: 5px;
}
#input_chiefname{
    margin-top:4vh;
    margin-left:2vw;
    width:20vw;
    height: 2.5vh;
    background: #F7F8F8;
    border: 1px solid #DDE2E6;
    border-radius: 5px;
}
.save_add_group{
    float: right;
    margin-top:5.5vh;
    width: 7vw;
    height: 3.5vh;
    background: #ffffff;
    border:1px solid #C3B7B7;
    border-radius: 8px;
    font-weight: 600;
    font-size: 13px;
    color: #505050;
}
.save_add_group:hover{
    cursor: pointer;
}
</style>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { RouterLink,useRouter } from "vue-router";
import axios from "axios";
    export default {
        name :"AddPopup",
        components:{
        },
        setup(){
            const router = useRouter();
            const store = useStore(); //vuex 사용
            var GroupAddBtn = computed(()=> store.state.GroupAddBtn);
            var group_name = computed(()=> store.state.group_name);
            var depth = computed(()=> store.state.depth);
            function offpopup(){
                store.commit("OffGroupAddPopup");
            }

            function addGroup(){
                var group_list={
                    ComName:document.getElementById("input_Groupname").value,
                    Scope1:0,
                    Scope2:0,
                    Scope3:0,
                    Chief:document.getElementById("input_chiefname").value,
                    Admin:"",
                    Classification:"",
                    Description:"",
                    Location:"",
                    DepartmentName:document.getElementById("input_Groupname").value,
                    Depth:Number(depth.value)
                }
                console.log("추가하기",group_list)
                add_group_server(group_list)
                // store.commit("InsightAddY",-1);
                store.commit("OffGroupAddPopup");
            }
            async function add_group_server(group_list){
                var config = {
                    headers:{
                    "Authorization":"Bearer"+" "+store.state.accessToken
                    }
                }
                console.log("추가하기",group_list)
                await axios.post("Company/PreviewInfo/"+group_name.value, group_list, config).then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    alert("로그인 시간이 만료되었습니다.")
                    console.log(error)
                    router.push('/');
                })
                .finally(() => {})
                location.reload();
            }
            return {GroupAddBtn,offpopup,group_name,addGroup,depth,add_group_server}
        },
        mounted(){
        },
        destroyed(){
            add_group_server
        }
    };
</script>