<template>
    <div> 
        <div class="title-border">탄소 감축 목표 설정</div>
        <carbonLastBarGraph :key="re"/>
        <targetList :key="re"/>
    </div>
        

</template>


<script>
import carbonLastBarGraph from './carbonLastBarGraph.vue';
import targetList from './targetList.vue';
import {useStore} from 'vuex'
import {computed} from 'vue'
    export default {
        name :"target_dash3",
        components:{
            carbonLastBarGraph,
            targetList
        
        },
        setup(){    
            var store = useStore()
            var re = computed(()=>store.state.reload)
            return{re}
        }
    }
</script>

<style>

</style>

