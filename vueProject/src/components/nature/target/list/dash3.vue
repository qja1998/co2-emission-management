<template>
    <div> 
        <div class="title-border">탄소 감축 목표 설정</div>
        <carbonLastBarGraph/>
        <targetList/>
    </div>
        

</template>


<script>
import carbonLastBarGraph from './carbonLastBarGraph.vue';
import targetList from './targetList.vue';
    export default {
        name :"target_dash3",
        components:{
            carbonLastBarGraph,
            targetList
        
        }
    }
</script>

<style>

</style>

