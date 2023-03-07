<template>
    <div class ="active" id="addpopup" v-if="GroupEditBtn==true">
        <div class="Addpopup">조직 수정하기
            <span id="del_btn" @click="offpopup()">x</span><br>
            <div style="font-size:1.1rem; margin-left:2vw; margin-top:5vh; color:#505050">
                <div style="float:left; margin-left:1vw">
                    선택한 조직명<br>
                    <p style="margin-top:1.6vh; font-weight: 200; font-size: 2vh; width: 8vw;">{{group_name}}</p>
                </div>
                <p style="float:left; margin-left:3vw">→</p>
                <div style="margin-left:5vw; float:left;">
                    수정할 조직명<br>
                    <input id = "input_Groupname_edit">
                </div>
                <div style="float:left; margin-left:1vw">
                    관리자
                    <input id = "input_chiefname_edit">
                </div>
                
            </div>
            <button class="save_add_group" @click="editGroup()">저장하기</button>
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
#input_Groupname_edit{
    margin-top: 2vh;
    width:10vw;
    height: 3vh;
    background: #F7F8F8;
    border: 1px solid #DDE2E6;
    border-radius: 5px;
}
#input_chiefname_edit{
    margin-top:4vh;
    margin-left:2vw;
    width:22vw;
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
            var GroupEditBtn = computed(()=> store.state.GroupEditBtn);
            console.log('수정 팝업창 클릭', GroupEditBtn)
            var group_name = computed(()=> store.state.group_name);
            var depth = computed(()=> store.state.depth);
            function offpopup(){
                store.commit("OffGroupEditPopup");
            }

            function editGroup(){
                var group_list={
                    ComName:document.getElementById("input_Groupname_edit").value,
                    Scope1:null,
                    Scope2:null,
                    Scope3:null,
                    Classification:"",
                    Description:"",
                    Location:"",
                    Chief:document.getElementById("input_chiefname_edit").value,
                    Admin:document.getElementById("input_chiefname_edit").value,
                }
                console.log("수정하기",group_list)
                edit_group_server(group_list)
                // store.commit("InsightAddY",-1);
                store.commit("OffGroupEditPopup");
            }
            async function edit_group_server(group_list){
                var config = {
                    headers:{
                    "Authorization":"Bearer"+" "+store.state.accessToken
                    }
                }
                console.log("수정하기",group_list)
                await axios.put("Company/PreviewInfo/"+group_name.value, group_list, config).then(res => {
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
            return {GroupEditBtn,offpopup,group_name,editGroup,depth,edit_group_server}
        },
        mounted(){
        },
        destroyed(){
        }
    };
</script>