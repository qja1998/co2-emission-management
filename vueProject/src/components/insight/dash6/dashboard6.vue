<template>
    <div class="dashboard" id="dashboard6">
        <chart6 style=" height: 27vh; width: 17.5vw;"></chart6>
    </div>
</template>

<style>
    #dashboard6{
        float: left;
        width: 17.6vw;
        height: 35vh;
        padding: 2%;
        margin-left:1vw;
    }

</style>

<script>
import chart6 from './chart6';
  export default {
      name :"dashboard_6",
      components:{
        chart6
      },
      data() {
        return{
          
          
        }

      }
  }
</script>