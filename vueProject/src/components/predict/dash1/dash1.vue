<template>
    <div> 
        <div class="title-border">조직명</div>
        <div class="frame">
            <h1 class="dash-text">경상대학교</h1>
            <!-- 기관종류(ex: 교육기관) -->
            <div class="group-info" style=" margin-top: 2vh; font-size: 2vh; color:black;">
                <img style="vertical-align: middle; width:2.2vh;" src="@/assets/share.png" alt="">
                교육기관
                <img style=" vertical-align: middle; width:2.2vh; margin-left:2vw;" src="@/assets/map.png" alt="">
                경남 진주시
            </div>
            
        </div>
    </div>
        

</template>

<style>
.title-border{
    color:#163945;
    font-size:1rem;
    font-weight:600;
    min-width:18vw;
}
.frame{
    background:#ffffff;
    border: 0.2vh solid #E4E5E6;
    border-radius:8px;
    padding:1vh 1.5vw;
    height:22vh;
    width:20vw;
    min-height: 15vh;
    min-width: 15vw;
    margin-top:1vh;
}
.dash-text{
    color:#5A5A5A; 
    font-weight:bold; 
    font-size: 3.7vh; 
    margin-top:1vh; 
    height:14vh; 
    line-height:16vh;
}
</style>


<script>
    export default {
        name :"predict_dash1",
        components:{
        
        }
    }
</script>