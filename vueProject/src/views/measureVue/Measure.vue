<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents">
            <MeasureHeader/>
            <GroupList/>
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
.contents{
    padding-left: 15vw;
}
</style>


<script>
import navigation from "@/components/Navigation.vue"
import MeasureHeader from "@/components/measure/Header.vue"
import GroupList from "@/components/measure/Group-list.vue"
    export default {
        name :"measure",
        components:{
            navigation,
            MeasureHeader,
            GroupList
        }
    }
</script>
