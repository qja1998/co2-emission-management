<template>
    <div style="float:left; ">
      <div class="dash_title">탄소 배출량 감축 목표 설정</div>
      <div class="dashboard" id="evaluation-dash4" onclick="location.href='/evaluation';" >
            <img style="margin: 5vh 0 0 6.5vw; width: 50%;" src="@/assets/carbonDecreaseList.png" alt="탄소 배출량 감축 목표 설정">
            <div>
                <img style="margin: 1.5vh 0 0 4.5vw; width: 1.5vw;" src="@/assets/check.png" alt="check">
                <span style="font-size: 2vh; font-weight: bold; margin-left: 1vw;">탄소 배출량 감축 방안</span>
            </div>
            <div>
                <img style="margin: 1.5vh 0 0 4.5vw; width: 1.5vw;" src="@/assets/check.png" alt="check">
                <span style="font-size: 2vh; font-weight: bold; margin-left: 1vw;">탄소 배출량 감축 목표 설정</span>
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
</style>

<script>


export default {
    name: "carbonNeutral",
    components: {
        
    }
}
</script>