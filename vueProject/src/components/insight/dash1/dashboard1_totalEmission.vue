<template>
    <div style="float:left; margin-left:3.5vw">
        <div class="dash_title" >전체 배출량</div>
        <div class="dashboard" id="dashboard1_total">
            <div style ="font-size: 2vh; font-weight: bolder; color: #595959; text-align: center;">
                <!-- 회사명(ex:경상대학교) -->
                <span>총배출량</span><br>
                <span style ="color:#163945;; font-weight:bold; font-size: 4.8vh; margin-top: 0.5vh; margin-bottom:0.5vh">{{total_emssion}}</span><br>
                <span style="font-size:1.5vh; color:black">kg CO2eq</span>
            </div>
        </div>
    </div>
    
</template>

<style>
    #dashboard1_total{
        height: 12vh;
        width: 19vw;
        padding: 7%;
    }
</style>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
  export default {
      name :"dashboard1",
      components:{
      },
      setup(props) {
        const store = useStore();
        var total_emssion = ref(store.state.scopes[0]+store.state.scopes[1]+store.state.scopes[2]).value.toPrecision(8)
        console.log("3suscl222")
        return{total_emssion
        }
      },
      props:{
        scope1:Number,
        scope2:Number,
        scope3:Number
      }
  }
</script>
  