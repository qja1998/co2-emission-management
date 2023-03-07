<template>

    <Suspense>
      <template #default>
        <div class="dashboard" id="dashboard2">
          <chart2 :key=re style="width:inherit; height: inherit; "></chart2>
        </div>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
</template>
<style>
    #dashboard2{
        background-color:transparent;
        float: left;
        width: 76vw;
        height: 55vh;
        padding: 2%;
        margin-top:3vh;
        border: none;
    }
</style>
<script>
import chart2 from './chart2';
  export default {
      name :"dashboard_3",
      components:{
        chart2
      },
      data() {
        return{
          re:0
        }

      },
      mounted(){
        
      }
  }
</script>