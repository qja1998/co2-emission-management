<template>
    <div  style="float:left; margin-left:1vw">
        <div class="dash_title" id="dash_title3">카테고리별 탄소 배출량 순위</div>
        <div class="dashboard" id="dashboard4" >
            <div style="width: 32.3vw; height: 28vh; overflow: auto;" >
                <chart4 style="height: 50vh;"></chart4>
            </div>
        </div>
        
    </div>
</template>

<style>
    #dashboard4{
        width: 36.6vw;
        height: 28vh;
        padding:2vw;
    }
</style>

<script>
import chart4 from '../dash4/chart4';
  export default {
      name :"dashboard_4",
      components:{
        chart4
      },
      data() {
        return{
          
        }

      }
  }
</script>