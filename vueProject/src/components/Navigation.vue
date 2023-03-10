<template>
    <div class="nav">
        <div class="who">
            <img src="@/assets/livit.png" alt="icon" id="icon" onclick="location.href='/';">
            <span>livit</span>
        </div>
        <div class="menu" style=" cursor: pointer;" onclick="location.href='/group';">
            <img src="@/assets/group.png" alt="" class="menu-icon">
            <a>조직 설계</a>
        </div>
        <div class="menu" style=" cursor: pointer;" onclick="location.href='/measure';">
            <img src="@/assets/co2.png" alt="" class="menu-icon">
            <a>탄소 측정</a>
        </div>
        <div class="menu" style=" cursor: pointer;" onclick="location.href='/insight';">
            <img src="@/assets/insight.png" alt="" class="menu-icon">
            <a>인사이트</a>
        </div>
        <div class="menu" style=" cursor: pointer;" onclick="location.href='/predict';">
            <img src="@/assets/carbonPredict.png" alt="" class="menu-icon">
            <a>탄소 예측</a>
        </div>
        <div class="menu" style=" cursor: pointer;" onclick="location.href='/survey';">
            <img src="@/assets/carbonNatural.png" alt="" class="menu-icon">
            <a>탄소 중립</a>
        </div>
        <div class="menu" style=" cursor: pointer;" onclick="location.href='/survey';">
            <img src="@/assets/survey.png" alt="" class="menu-icon">
            <a>서베이 요청</a>
        </div>
        <div class="menu" style=" cursor: pointer;" onclick="location.href='/setting';">
            <img src="@/assets/setting.png" alt="" class="menu-icon">
            <a>설정</a>
        </div>
        
    </div>
</template>

<style scoped>
span{
    padding-top:13% ;
    font-size: 1.5vw;
    margin-left: 1vw;
    font-weight: 550;
}

.nav{
    width: 15vw;
    height: 100vh; 
    align-items: center;
    background-color:#163945 ;
    text-align: center;
    
    color: whitesmoke;
    flex-direction: column;  /*아이콘 제외 값 세로로*/
}
.who{            
    margin: 4vw;
    display: flex;
    justify-content: space-around;
}
#icon{
    max-width: 4vw;
    max-height: 4vw;
}

.menu{
    float: left;
    display: flex;
}
.menu:hover{
    width: 100%;
    float: left;
    display: flex;
    background-color:#3DC984 ;
}
.menu-icon{
    padding: 0.5vw 2vw;
    max-width: 4vw;
    max-height: 2vw;
}
a{
    padding-top:7%;
    font-size: 1vw;
    font-weight: 700;
}

</style>


<script>
    export default {
        name :"navigation",
        components:{
        }
    }
</script>