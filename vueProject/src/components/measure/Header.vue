<template>
    <div class="measure-header">
        <p class="measure-name">탄소 배출 측정</p>
        <div class="measure-setting">
            <p style="margin-left:4vw" >탄소 측정</p>
            <p style="margin-left:4vw">탄소 배출 계수</p>
        </div>
    </div>
</template>

<style>
.measure-header{
    width: 85vw;
    height: 14vh;
    background-color: white;
    overflow: hidden
}
.measure-name{
    color: black;
    font-size:1.7vw;
    font-weight: 600;
    margin: 3vh 4vw 1vh;
}
.measure-setting{
    display: flex;
    margin-top: 0;
}
</style>


<script>
    export default {
        name :"measure-header",
        components:{
            

        }
    }
</script>