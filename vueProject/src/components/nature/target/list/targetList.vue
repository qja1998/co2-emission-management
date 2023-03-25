<template>
    <div> 
        <div class="frame" id="target-list" style="padding:5vh 4vw">
            <div style="font-size:1.5rem; font-weight: bold;float:left; width:35vw; min-height: 57vh;">
                전환
                <div style="margin-top:8vh; font-size:1.1rem; font-weight: 400 ;">
                    <span style="color:#3DC984; margin-right:1vw">▶</span><span style="margin-top">전력 사용의 30%를 태양열 에너지로 전환</span>
                </div>
            </div>
            <div style="min-height: 60vh; width:1px; background:#EEEEEF; float:left; margin:0 3vw"></div>
            <div style="font-size:1.5rem; font-weight: bold; float:left; width:29vw; min-height: 57vh;">
                감축
                <div style="margin-top:8vh; font-size:1.1rem; font-weight: 400 ;">
                    <span style="color:#3DC984; margin-right:1vw">▶</span><span style="margin-top">전력 사용의 30%를 태양열 에너지로 전환</span>
                </div>
            </div>
            <button style="float:right;" class="clickbtn">+ 추가하기</button>
        </div>
    </div>
        

</template>

<style>
.clickbtn{
    background: #3DC984;
    border: none;
    border-radius: 1vh;
    width:8vw;
    height: 5vh;
    color:white
}
#target-list{
    margin-top:1px;
    min-height:60vh;
    width:71vw;
}
</style>


<script>
    export default {
        name :"target_dash1",
        components:{
        
        }
    }
</script>