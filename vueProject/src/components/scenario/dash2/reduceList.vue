<template>
    <div> 
        <div class="title-border-scenario">감축 목표</div>
        <router-link to="/nature/target" style="text-decoration: none;"><div class="scenario-title">현재 설정한 감축 목표</div></router-link>
        <div class="scenario-frame">
            <div style="height:102.5vh">
                <div style="padding-top: 3vh; font-size: 2.5vh; font-weight: bold; color: #163945;">전환</div>
                <div class="target-block">
                    <div v-for="(list, i) in targetList" :key="i" style="padding-bottom: 2vh; font-size:  1.7vh;">
                        <span v-if="list.listkind == 0">
                            <li>{{ list.category }}의 {{ list.percentage }}%를 {{ list.target }}로 전환</li>
                        </span>
                    </div>
                </div>
                
                <div style="padding-top: 3vh; font-size: 2.5vh; font-weight: bold; color: #163945; margin-top:4vh">감축</div>
                <div class="target-block" style="margin-bottom:4vh">
                    <div v-for="(list, i) in targetList" :key="i" style="padding-bottom: 2vh; font-size: 1.7vh;">
                        <span v-if="list.listkind == 1">
                            <li id="scenario_li">{{ list.category }}의 {{ list.percentage }}%를 감축</li>
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

        

</template>



<script>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'
    export default {
        name :"predict_dash1",
        components:{
        
        },
        setup(){
            var store = useStore()
            //날짜 그룹명
            var user_group = computed(()=> store.state.user_group)
            var selected_company = computed(()=> store.state.insight_selected_company)

            var now = new Date();	// 현재 날짜 및 시간
            var year = now.getFullYear()	// 년도

            // 서버
            var targetList = computed(()=>store.state.getTargetList).value
            return{
                targetList
            }
        }
    }
</script>

<style>
    #scenario_li {
        padding: 1vh 0 1vh 2vw;
        list-style: none;
        background-image: url('@/assets/check.png');
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 2.5vh;
    }
    .target-block{
        min-height:20vh;
        height:32vh;
        margin-top:4vh;
        overflow: auto;

    }
</style>
