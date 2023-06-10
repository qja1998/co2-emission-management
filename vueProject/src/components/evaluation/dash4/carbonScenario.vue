<template>
    <div style="float:left; ">
      <div class="dash_title">탄소 중립 시나리오 추천</div>
      <div class="dashboard" id="evaluation-dash4" onclick="location.href='/scenario';" >
            <img style="margin: 5vh 0 0 6.5vw; width: 50%;" src="@/assets/carbonScenario.png" alt="탄소 중립 시나리오 추천">
            <div>
                <img class="check" src="@/assets/check.png" alt="check">
                <span id="contents">탄소 중립 시나리오 추천</span>
            </div>
      </div>
    </div>
</template>

<style>
#evaluation-dash4{
    width: 25vw;
    height: 40vh;
    cursor: pointer;
}
.check{
    margin: 1.5vh 0 0 4.5vw;
    width: 1.5vw;
}
#contents{
    font-size: 1vw;
    font-weight: bold;
    margin-left: 1vw;
}
</style>

<script>


export default {
    name: "carbonNeutral",
    components: {
        
    }
}
</script>