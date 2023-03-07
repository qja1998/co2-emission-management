<template>
    <div style="padding:30vh 70vh; background:#ffffff; height:40vh;">
        <div>
            <h1 class="login" id="title_signup">이메일을 확인해주세요.</h1>
        </div>
        <div id="title_signup" style="color: #9B9B9B; font-size: 2vh; margin-top:4vh">
            인증 요청 메일을 
            <span style="color: #595959;">{{ email }}</span>로 보냈어요.<br>
            혹시 이메일이 오지 않았나요? 스팸함을 확인해보세요.
        </div>
        <div id="title_signup" style="color: #9B9B9B; font-size: 2vh; margin-top:5vh; font-weight:900">
            다른 메일 주소로 보내기
        </div>

        <button style="margin-top:10vh; width:60px; height:60px; border-radius:10vh; border:none; float:right" onclick="location.href='/signup/signcheck';">></button>
    </div>
</template>

<style>

    .agree_check{
        margin-top:1vh;
        font-size: 2vh;
    }
    .start_btn{
        margin-top:10vh; 
        background:#3DC984; 
        height:6vh; 
        width:23.5vw; 
        border:none; 
        border-radius:1.5vh; 
        color:#ffffff;
        font-size:2vh; 
        font-weight:900;
    }
</style>
<script>
import {ref} from 'vue'
export default {
    setup(){
        var email = ref('gpal6072@naver.com')
        return{
            email
        }
    }
}
</script>