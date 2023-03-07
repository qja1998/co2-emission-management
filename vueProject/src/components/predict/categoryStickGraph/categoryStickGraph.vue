<template>
    <div>
        <div>
            <div class="title-border">고정연소</div>
            <div class="frame" id="frame-categoryChart">
                <predict_StickChart1 class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">이동연소</div>
            <div class="frame" id="frame-categoryChart">
                <predict_StickChart2 class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">임직원 출퇴근</div>
            <div class="frame" id="frame-categoryChart">
                <predict_StickChart3 class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">수도 사용</div>
            <div class="frame" id="frame-categoryChart">
                <predict_StickChart4 class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">전력 사용</div>
            <div class="frame" id="frame-categoryChart">
                <predict_StickChart5 class="bar-graph"/>
            </div>
        </div>
    </div>
</template>

<style>

.dash-bar{
    margin-top:5vh;
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
    import predict_StickChart1 from './predictCategoryStick1.ts'
    import predict_StickChart2 from './predictCategoryStick2.ts'
    import predict_StickChart3 from './predictCategoryStick3.ts'
    import predict_StickChart4 from './predictCategoryStick4.ts'
    import predict_StickChart5 from './predictCategoryStick5.ts'

export default {
    name: "predict_category2",
    components: {
        predict_StickChart1,
        predict_StickChart2,
        predict_StickChart3,
        predict_StickChart4,
        predict_StickChart5
    }
}

</script>