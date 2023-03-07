<template>
    <div class="group-header">
        <p class="group-name">조직 설계</p>
        <div class="group-setting">
            <router-link to="/group" class="group-header-move">회사 조직</router-link>
            <router-link to="/group/employee" class="group-header-move" >구성원 등록하기</router-link>
            <div class="em-head">
                <select name="조직" id="" class="choose-group">
                    <option value="">조직</option>
                    <option value="학생">경상대</option>
                    <option value="회사원">상경대</option>
                    <option value="기타">공과대학</option>
                </select>
                <button class="add-employee-button"  type="button">+ 추가하기</button> 
            </div>
        </div>        
    </div>
</template>

<style>
.choose-group{
    height: 35px;
    margin:1vh;
    width: 110px;
}
.em-head{
    margin-left: 32vw;
}
.add-employee-button{
    float: right;
    margin:1vh;
    width: 110px;
    height: 3.5vh;
    background: #3DC984;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 13px;
    color: #FFFFFF;
}
</style>


<script>
import { computed } from "vue";
import { useStore } from "vuex";

    export default {
        setup(){

            return {}
        },
        name :"group-header",
        components:{

        },
        data(){
            return{
            }
        },
        methods:{

        }
    }
</script>