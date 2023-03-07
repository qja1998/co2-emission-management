<template>
    <div style="padding:10vh 40vh; background:#ffffff; height:80vh">
        <div>
            <h1 class="login" id="title_signup">탄소 중립 지원 플랫폼</h1>
        </div>
        <div class="login" id="title_signup" style="text-align:start; margin-top:10vh; color:black; font-weight:900; font-size:3vh"> 관리자 ID ＆ 정보</div>
        <div style="margin-top:5vh;" >
            <img class = "icon_direct" src = "@/assets/direct.png">
            <span class = "title_info_signup">
                관리자 ID 정보
            </span>
            <input type="checkbox"/>신청자 정보와 동일
            <div style="padding:1vw 2vw">
                <div class="input_content_signgup">
                    <span class="input_content_signgup_text">관리자 이메일</span>
                    <input  class="input_content_signgup_input" style="margin-left:3.5vw"/>
                    <span class="input_content_signgup_text" style="margin-left:4vw" >이름</span>
                    <input class="input_content_signgup_input" style="margin-left:5.7vw"/>
                </div>
                <div class="input_content_signgup">
                    <span class="input_content_signgup_text" >비밀번호</span>
                    <input  class="input_content_signgup_input" style="margin-left:5.9vw"/>

                    <span class="input_content_signgup_text" style="margin-left:4vw">비밀번호 확인</span>
                    <input  class="input_content_signgup_input" style="margin-left:1.2vw"/>
                </div>
                <div class="input_content_signgup">
                    <span class="input_content_signgup_text">회사 전화번호</span>
                    <input  class="input_content_signgup_input" style="margin-left:3.4vw;"/>
                    <span class="input_content_signgup_text" style="margin-left:4vw;">모바일 번호</span>
                    <input  class="input_content_signgup_input" style="margin-left:2.3vw;"/>
                </div>
            </div>
            <button style="margin-top:10vh; width:60px; height:60px; border-radius:10vh; border:none; float:right" onclick="location.href='/signup/signOK';">></button>
        </div>
    </div>
</template>

<style>

</style>
<script>
export default {

}
</script>