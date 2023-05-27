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
            <div class="title-border">탈루배출</div>
            <div class="frame bar-frame">
                <fugitiveEmission_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">폐기물 처리시설</div>
            <div class="frame bar-frame">
                <wasteFacility_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">비료 사용</div>
            <div class="frame bar-frame">
                <fertiilzer_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">대학 동물 소유</div>
            <div class="frame bar-frame">
                <animal_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">산림에 의한 흡수</div>
            <div class="frame bar-frame">
                <absorptionByForest_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">전력 사용</div>
            <div class="frame bar-frame">
                <power_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">스팀</div>
            <div class="frame bar-frame">
                <steam_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">수도 사용</div>
            <div class="frame bar-frame">
                <water_bargraph class="bar-graph"/>
            </div>
        </div>
        <div class="dash-bar">
            <div class="title-border">폐기물</div>
            <div class="frame bar-frame">
                <waste_bargraph class="bar-graph"/>
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
    import stain_bargraph from './predictCategoryBargraph/stain-bargraph.ts'
    import mobile_bargraph from './predictCategoryBargraph/mobile-bargraph.ts'
    import fugitiveEmission_bargraph from './predictCategoryBargraph/fugitiveEmission-bargraph.ts'
    import wasteFacility_bargraph from './predictCategoryBargraph/wasteFacility-bargraph.ts'
    import fertiilzer_bargraph from './predictCategoryBargraph/fertiilzer-bargraph.ts'
    import animal_bargraph from './predictCategoryBargraph/animal-bargraph.ts'
    import absorptionByForest_bargraph from './predictCategoryBargraph/absorptionByForest-bargraph.ts'
    import power_bargraph from './predictCategoryBargraph/power-bargraph.ts'
    import steam_bargraph from './predictCategoryBargraph/steam-bargraph.ts'
    import water_bargraph from './predictCategoryBargraph/water-bargraph.ts'
    import waste_bargraph from './predictCategoryBargraph/waste-bargraph.ts'
    
export default {
    name: "predict_category2",
    components: {
        stain_bargraph,
        mobile_bargraph,
        fugitiveEmission_bargraph,
        wasteFacility_bargraph,
        fertiilzer_bargraph,
        animal_bargraph,
        absorptionByForest_bargraph,
        power_bargraph,
        steam_bargraph,
        water_bargraph,
        waste_bargraph
    },
}

</script>