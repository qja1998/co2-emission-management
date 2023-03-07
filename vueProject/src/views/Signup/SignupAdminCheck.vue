<template>
    <div style="padding:10vh 75vh; background:#ffffff; height:80vh">
        <div>
            <h1 class="login" id="title_signup">탄소 중립 지원 플랫폼</h1>
        </div>
        <div style="margin-top:15vh;" >
            <div class="agree_check">
                <input type="checkbox"/>모두 동의합니다
            </div>
            <div style="height:1px; width:inherit; background: #DFDFDF; margin-top:1vh"></div>
            <div class="agree_check">
                <input type="checkbox"/>
                <span style="color:#414141">만 14세 이상입니다</span>
            </div>

            <div class="agree_check">
                <input type="checkbox"/>
                <span style="color:#414141">[필수] </span>
                <span style="color:#3F88C6">서비스 이용 약관 </span>
                <span style="color:#414141">동의</span>
            </div>

            <div class="agree_check">
                <input type="checkbox"/>
                <span style="color:#414141">[필수] </span>
                <span style="color:#3F88C6">개인정보 수집 및 이용 </span>
                <span style="color:#414141">동의</span>
            </div>
            <button class="start_btn" style="width:100% " onclick="location.href='/';">시작하기</button>
        </div>
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
export default {

}
</script>