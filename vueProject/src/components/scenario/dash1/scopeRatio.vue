<template>
    <div> 
      <router-link to="/insight" style="text-decoration: none;"><div class="scenario-title">총 탄소 배출량 대비 Scope 비율</div></router-link>
        <div class="scenario-frame" id="dashboard1_scopeRatio">
            <div style="width:20vw; background-color:aquamarine; position:relative;">
            <Suspense>
                <template #default>
                  <scopeChart :key="scope1" style="height: 20vh; width: 18vw; position:absolute;"  ></scopeChart>
                </template>
                <template #fallback>
                  <div>Loading...</div>
                </template>
              </Suspense>
              </div>
        </div>
    </div>
        

</template>

<style>
#dashboard1_scopeRatio{
    height: 18vh;
    width: 22vw;
    padding: 4vh 1.5vw 7vh;
}
</style>


<script>
import scopeChart from '@/components/insight/dash1/chart1.ts'
    export default {
        name :"predict_dash1",
        components:{
            scopeChart
        },
        props:{
        scope1:Number,
        scope2:Number,
        scope3:Number
      },
      created(){
      }
    }
</script>