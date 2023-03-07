<template>
    <div class="group-header">
        <p class="group-name">조직 설계</p>
        <div class="group-setting">
            <router-link to="/group" class="group-header-move">회사 조직</router-link>
            <router-link to="/group/employee" class="group-header-move" >구성원 등록하기</router-link>
            <button class="period">기간 설정하기</button>
            <img class="re" src="@/assets/re.png" alt="">
            <div>
                <img class="pm-button" src="@/assets/minus.png" alt="">
                <img class="pm-button" src="@/assets/plus.png" alt="">
                <button class="add-group-button" @click="OnEditGroup" type="button">+ 추가하기</button> 
            </div>
        </div>        
    </div>
</template>

<style>
.group-header{
    width: 85vw;
    height: 14vh;
    background-color: white;
    overflow: hidden
}
.group-name{
    color: black;
    font-size:1.7vw;
    font-weight: 600;
    margin: 3vh 4vw 1vh;
}
.group-setting{
    display: flex;
    margin-top: 0;
}
.group-header-move{
    margin: 1.5vh 4vw;
    color:#504f4f ;
    font-weight: 600;
    text-decoration: none;
}
.period{
    float: left;
    max-height: 3vh;
    width: 10vw;
    margin-top: 1.5vh;
    margin-left: 28vw;
    text-align: left;
    background-color: white;
    border-radius: 5px;
    color:#8a8a8a;
    border:1px solid #cacaca;
}
.re{
    float: left;
    max-height: 3.5vh;
    max-width: 3vw;
    margin:1.2vh;
}
.pm-button{
    float: left;
    max-height: 3.5vh;
    max-width: 3vw;
    margin:1.3vh;
    border-radius: 5px;
    background-color:#ededed;
    border-radius: 5px;
}
.add-group-button{
    float: left;
    margin:1.3vh;
    width: 6vw;
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
            const store = useStore(); //vuex 사용
            const OnEditGroup = () => store.commit("OnEdit", );
            return {OnEditGroup}
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