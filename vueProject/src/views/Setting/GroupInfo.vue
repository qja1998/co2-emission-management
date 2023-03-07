<template>
    <div class="active" style="float:right; width:85vw">
        <div style="float:right">
            <div class="edit_top " style="background:#F9F9F9; margin:0">
                <span class="edit_category" >회사기본 정보 입력</span>
                <button class="del_edit_btn" @click="click_del_groupinfo()">x</button>
            </div>
            <div style="background:#ffffff; padding:3vh; width:25vw; height:13vh; font-size:1.8vh;">
                <div>
                    <div style="font-size:2vh">
                        <div class="add_info_divide" style="font-size:1.5vh; margin-top:0px">회사명
                            <input class="addInfo_input" id="usage_input" style="width:17.5vw; height:3vh">
                        </div>
                        <div class="add_info_divide" style="font-size:1.5vh; margin-top:0px">대표자
                            <input class="addInfo_input" id="usage_input" style="width:17.5vw; height:3vh">
                        </div>
                    </div>
                </div>
                
            </div>
            <div style="background:#F9F9F9; width:28.2vw; height:1vh; font-size:1.8vh;"></div>
            <div style="background:#ffffff; padding:3vh; width:25vw; height:67.5vh; font-size:1.8vh;">
                <div>회사정보
                    <div style="font-size:2vh">
                        <div class="add_info_divide" style="font-size:1.5vh; margin-top:2vh">설립일
                            <input class="addInfo_input" id="usage_input" style="width:17.5vw; height:3vh">
                        </div>
                        <div class="add_info_divide" style="font-size:1.5vh; margin-top:0px">
                            <div style="margin-top:4vh"> 회사주소</div>
                            <input class="addInfo_input" style="width:24.7vw; height:3vh; background:#ffffff; border: 1px solid #DCD9D9;">
                        </div>
                        <div class="add_info_divide" style="font-size:1.5vh; margin-top:0px">
                            <div style="margin-top:4vh"> 사업자 등록번호</div>
                            <input class="addInfo_input" style="width:24.7vw; height:3vh; background:#ffffff; border: 1px solid #DCD9D9;">
                        </div>
                        <div class="add_info_divide" style="font-size:1.5vh; margin-top:0px">
                            <div style="margin-top:4vh"> 법인 등록번호</div>
                            <input class="addInfo_input" style="width:24.7vw; height:3vh; background:#ffffff; border: 1px solid #DCD9D9;">
                        </div>
                        <button style="background: #3DC984; border-radius: 1vh; width:100%; height:5vh; margin-top:20vh; border:none; color:white;" @click="click_del_groupinfo()">저장하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, ref} from 'vue'

export default {
    setup(){
        const store = useStore()
        function click_del_groupinfo(){
            store.commit('OffGroupInfo')
        }
        return{
            click_del_groupinfo
        }
    },
}
</script>

<style>

</style>