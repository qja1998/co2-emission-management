<template>
    <div>
        <div class="dash-bar">
            <div class="title-border">고정연소</div>
            <div class="frame bar-frame">
                <stain_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">이동연소</div>
            <div class="frame bar-frame">
                <mobile_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">임직원 출퇴근</div>
            <div class="frame bar-frame">
                <commute_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">수도 사용</div>
            <div class="frame bar-frame">
                <water_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">전력 사용</div>
            <div class="frame bar-frame">
                <power_bargraph class="bar-graph"/>
            </div>
        </div>
    </div>
</template>

<style>
.bar-frame{
    width:76.5vw;
}
.dash-bar{
    margin-bottom: 7vh;
}
.bar-graph{
    margin-top:3vh;
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