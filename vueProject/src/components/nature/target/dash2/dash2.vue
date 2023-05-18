<template>
    <div> 
        <div class="title-border">카테고리별 탄소 감축 방안</div>
        <div class="frame" id="target_dash2_content">
            <div id="method-box">
                <img :src="methodImg">
                <div id= "method-box-title">{{methodCategory}}</div>
                <div id= "method-box-content">{{methodContent}}
                </div>
            </div>
            <div id="method-select-box">
                <img  v-for="cate in methodOfCategory" :src="cate.img" @click="clickMethod(cate)">
                
            </div>
        </div>
    </div>
        

</template>

<script>
import {ref} from 'vue'
    export default {
        name :"target_dash2",
        components:{
        
        },
        setup(){
            var methodOfCategory = [
                {
                    name: '고정연소', 
                    content: '(친환경차 보급) 사업용 우선 전환(50만대 이상), 노후차 교체 등 친환경차 보급 확산(전기‧수소차 450만대 등), 친환경차 전환 제도개선 및 인프라 확대(친환경차 보급) 사업용 우선 전환(50만대 이상), 노후차 교체 등 ',
                    img: require('@/assets/previewDetail/1.png')
                },
                {
                    name: '이동연소', 
                    content: '이동연소에 대한 탄소 감축 방안', 
                    img:require('@/assets/previewDetail/2.png')
                },
                {
                    name: '탈루배출', 
                    content: '탈루배출에 대한 탄소 감축 방안', 
                    img:require('@/assets/previewDetail/3.png')
                },
                {
                    name: '폐기물 처리시설', 
                    content: '', 
                    img:require('@/assets/previewDetail/4.png')
                },
                {
                    name: '비료사용', 
                    content: '', 
                    img:require('@/assets/previewDetail/5.png')
                },
                {
                    name: '대학동물소유', 
                    content: '', 
                    img:require('@/assets/previewDetail/6.png')
                },
                {
                    name: '산림에의한흡수', 
                    content: '', 
                    img:require('@/assets/previewDetail/7.png')
                },
                {
                    name: '전력', 
                    content: '', 
                    img:require('@/assets/previewDetail/8.png')
                },
                {
                    name: '열', 
                    content: '', 
                    img:require('@/assets/previewDetail/9.png')
                },
                {
                    name: '수도', 
                    content: '', 
                    img:require('@/assets/previewDetail/10.png')
                },
                {
                    name: '폐기물', 
                    content: '', 
                    img:require('@/assets/previewDetail/11.png')
                }
            ]

            var server_method = 
            [
                {
                    name:'수도',
                    content:'내용',
                    img:''
                },
                {
                    name:'열',
                    content:'내용',
                    img:''
                },
                {
                    name:'전력',
                    content:'내용',
                    img:''
                }
            ]

            var methodCategory = ref('고정연소')
            var methodContent = ref(methodOfCategory[0].content)
            var methodImg = ref(require('@/assets/previewDetail/1.png'))

            function clickMethod(cate){
                this.methodCategory = cate.name
                this.methodContent = cate.content
                this.methodImg = cate.img
            }
            return{
                methodOfCategory,
                methodCategory,
                methodContent,
                methodImg,
                clickMethod
            }
        }
    }
</script>

<style>
#target_dash2_content{
    height:50vh;
    width:31vw;
}
#method-box{
    padding:3vh 2.5vw; 
    border: 1px solid #d5d5d5; 
    border-radius: 2vh; 
    margin-top:2vh
}
#method-box > img {
    height:4vh; 
    float:left; 
    background: #ECECEC; 
    padding:1vh; 
    border-radius: 50%;
}
#method-box-title{
    display:inline-block; 
    font-size:1.3rem; 
    font-weight: bold; 
    margin-left:1vw; 
    height:5vh; 
    line-height: 5vh;
}
#method-box-content{
    height: 10vh; 
    overflow: auto; 
    padding:1vh; 
    font-size:1.8vh; 
    margin-top:2vh
}
#method-select-box{
    padding:0vh 2vw; 
    margin-top:3vh; 
    height: 16vh;
    overflow: auto;
}
#method-select-box  img {
    height:5vh; 
    margin-bottom: 2vh; 
    margin-left:1.5vw;
    margin-right:1.5vw; 
    background: #ECECEC; 
    padding:1vh; 
    border-radius: 50%;
}
#method-select-box  img:hover{
    cursor: pointer;
}
</style>


