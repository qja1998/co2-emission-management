<template>
<div>
    <div class = "setting_board">
        <img src="@/assets/settingBuilding.png" class="setting_img"/>
        <span class="setting_text">회사 기본 정보</span>
        <button class="setting_btn" @click="click_groupInfo()">회사 기본 정보 입력</button>
    </div>
    <div class="setting_board"  >
        <img src="@/assets/settingemployee.png" class="setting_img"/>
        <span class="setting_text">임직원 기본 정보</span>
        <button class="setting_btn">임직원 정보 입력</button>
    </div>
    <div class = "setting_board">
        <img src="@/assets/chain.png" class="setting_img"/>
        <span class="setting_text">연동 및 권환 설정</span>
        <button class="setting_btn">연동 설정</button><br>
        <button class="setting_btn">권한 설정</button>
    </div>
    <div class = "setting_board">
        <img src="@/assets/card.png" class="setting_img"/>
        <span class="setting_text">결제 정보 입력</span>
        <button class="setting_btn">결제 설정</button>
    </div>
</div>
</template>

<style>
    .groupinfoVue{
        position:fixed;
    }
    .setting_board{
        width:16vw;
        height:15vh;
        background: #ffffff;
        border: 2px solid rgba(200, 195, 195, 0.5);
        border-radius: 1vh;
        float:left;
        margin-left:3vw;
        margin-top:3vw;
        font-size:2.4vh;
        font-weight: bolder;

        padding:4vh
    }
    .setting_img{
        width:3vh;
        height:3vh;
    }
    .setting_text{
        margin-left:1vw;
    }
    .setting_btn{
        color:#0832DE;
        background:none;
        border:none;
        font-size:2vh;
        margin-left:2vw;
        margin-top:1.5vh
    }
</style>
<script>
import GroupInfo from '../../views/Setting/GroupInfo.vue';
import {useStore} from 'vuex'
import {computed} from 'vue'
export default{ 
    
    name:'',
    components:{
        GroupInfo
    },
    setup(){
        const store = useStore()
        function click_groupInfo(){
            console.log('dd')
            store.commit('OnGroupInfo')
        }
        return{
            click_groupInfo
        }
    },
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>