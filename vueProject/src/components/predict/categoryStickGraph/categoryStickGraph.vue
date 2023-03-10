<template>
    <div>
        <div>
            <div class="title-border">고정연소</div>
            <div class="frame" id="frame-categoryChart">
                <stain_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">이동연소</div>
            <div class="frame" id="frame-categoryChart">
                <mobile_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">임직원 출퇴근</div>
            <div class="frame" id="frame-categoryChart">
                <commute_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">수도 사용</div>
            <div class="frame" id="frame-categoryChart">
                <water_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">전력 사용</div>
            <div class="frame" id="frame-categoryChart">
                <power_bargraph class="bar-graph"/>
            </div>
        </div>
    </div>
</template>

<style>

.dash-bar{
    margin-top:5vh;
    margin-bottom: 1vh;
}
.bar-graph{
    width:90%;
    margin-left:3.5vw;
}
#frame-categoryChart {
    width: 95%;
    height: 20vh;
}


</style>

<script>
    import stain_bargraph from './stain-bargraph.ts'
    import mobile_bargraph from './mobile-bargraph.ts'
    import commute_bargraph from './commute-bargraph.ts'
    import water_bargraph from './water-bargraph.ts'
    import power_bargraph from './power-bargraph.ts'

export default {
    name: "predict_category2",
    components: {
        stain_bargraph,
        mobile_bargraph,
        commute_bargraph,
        water_bargraph,
        power_bargraph
    },
}

</script>