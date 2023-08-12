<template>
    <div style="float:left; ">
      <div class="dash_title">탄소 감축 진행상황</div>
      <div class="dashboard" id="evaluation-dash4" onclick="location.href='/nature/progress';">
            <img style="margin: 5vh 0 0 6.5vw; width: 50%;" src="@/assets/carbonProgress.png" alt="탄소 배출량 감축 진행상황">
            <div>
                <img class="check" src="@/assets/check.png" alt="check">
                <span id="contents">목표 대비 현재 탄소 배출량 비교</span>
            </div>
            <div>
                <img class="check" src="@/assets/check.png" alt="check">
                <span id="contents">탄소 배출권에 의한 기대효과</span>
            </div>
      </div>
    </div>
</template>

<style>

</style>

<script>


export default {
    name: "carbonNeutral",
    components: {
        
    }
}
</script>