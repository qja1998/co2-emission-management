<template>
    <div class="measure-main">
        <popUp v-if="this.edit == true" style="position:fixed; z-index:1;"></popUp>
        <navigation class="navigation"/>
        <div class="contents">
            <MeasureHeader/>
            <input2/>
        </div>
    </div>
</template>


<style>
body{
    margin:0;
}
.masure-main{
    display: flex;
}
.navigation{
    position:fixed;

}

</style>


<script>
import navigation from "@/components/Navigation.vue"
import input2 from "@/components/measure/input2.vue"
import MeasureHeader from "@/components/measure/Header.vue"
import popUp from "../../components/measure/pop-up.vue"
import {useStore} from 'vuex'
import {computed} from 'vue'

    export default {
        name :"measure",
        components:{
            navigation,
            MeasureHeader,
            input2,
            popUp,
        },
        setup(){
            const store = useStore()
            var edit = computed(() => store.state.EditTable)
            return {edit}
        }
    }
</script>
