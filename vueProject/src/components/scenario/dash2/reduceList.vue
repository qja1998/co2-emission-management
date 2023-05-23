<template>
    <div> 
        <div class="title-border-scenario">감축 목표</div>
        <router-link to="/nature/target" style="text-decoration: none;"><div class="scenario-title">현재 설정한 감축 목표</div></router-link>
        <div class="scenario-frame">
            <div>
                <div style="padding-top: 3vh; font-size: 2.5vh; font-weight: bold; color: #163945;">전환</div>
                <div v-for="(list, i) in targetList" :key="i" style="padding-top: 1vh; font-size: 2vh;">
                    <span v-if="list.listkind == 0">
                        <li>{{ list.category }}의 {{ list.percentage }}%를 {{ list.target }}로 전환</li>
                    </span>
                </div>
                <div style="padding-top: 3vh; font-size: 2.5vh; font-weight: bold; color: #163945;">감축</div>
                <div v-for="(list, i) in targetList" :key="i" style="padding-top: 1vh; font-size: 2vh;">
                    <span v-if="list.listkind == 1">
                        <li>{{ list.category }}의 {{ list.percentage }}%를 감축</li>
                    </span>
                </div>
            </div>
        </div>
    </div>

        

</template>

<style>
li {
    padding: 1vh 0 1vh 2vw;
    list-style: none;
    background-image: url('@/assets/check.png');
    background-position: left center;
    background-repeat: no-repeat;
    background-size: 2.5vh;
}
</style>


<script>
    export default {
        name :"predict_dash1",
        components:{
        
        },
        setup(){

            // 서버
            var targetList = [
                {
                    listkind: 1,
                    index: 0,
                    id: '',
                    category: '고정연소',
                    percentage: 30,
                    target: null,
                },
                {
                    listkind: 0,
                    index: 1,
                    id: '',
                    category: '전력 사용',
                    percentage: 20,
                    target: '태양열 에너지',
                },
                {
                    listkind: 0,
                    index: 0,
                    id: '',
                    category: '고정연소',
                    percentage: 40,
                    target: '풍력 에너지',
                },
            ]
            return{
                targetList
            }
        }
    }
</script>