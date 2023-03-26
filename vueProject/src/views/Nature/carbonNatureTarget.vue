<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents">
            <nature_header/>
            <div class="background">
                <div class="header-page">탄소 배출량 감축 목표 설정</div>
                <div class="dash">
                    <target_dash1 id = "target_dash1"></target_dash1>
                    <target_dash2 id = "target_dash2"></target_dash2>
                </div>
                <target_dash3 id = "target_dash3"></target_dash3>
            </div>
        </div>
        <addTargetPopup v-if="targetPopup==true" class="popup"></addTargetPopup>
    </div>
    
</template>

<script>
import navigation from "@/components/Navigation.vue"
import nature_header from "@/components/nature/Header.vue"
import target_dash1 from "@/components/nature/target/dash1/dash1.vue";
import target_dash2 from "@/components/nature/target/dash2/dash2.vue";
import target_dash3 from "@/components/nature/target/list/dash3.vue";
import addTargetPopup from "@/components/nature/target/list/addTargetPopup.vue";
import { computed , ref} from 'vue';
import { useStore } from 'vuex'

export default {
    name :"target",
    components:{
        navigation,
        nature_header,
        target_dash1,
        target_dash2,
        target_dash3,
        addTargetPopup
    },
    setup() {
        const store = useStore()
        var targetPopup = computed(() => store.state.targetPopup)

        return{
            targetPopup
        }
    }
}
</script>

<style>
 .dash{
    margin-top:5vh;
 }
#target_dash1{
    float:left;
    display:inline-block;
}
#target_dash2{
    display:inline-block;
    margin-left:2vw;
}
#target_dash3{
    margin-top:5vh;
}
.popup{
    position:fixed;
    margin-left:14.9vw;
}


</style>
