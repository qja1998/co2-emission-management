<!-- 탄소 배출 측정 첫 화면 -->
<template>
    <div class ="body"> 
        <div class="board" >   
            <!-- 조직목록, 조직도 화면 -->
            <div class="left-bar" style="float: left; height: inherit; width:27vw; overflow: auto;">
                <!-- 조직목록, 조직도 버튼 -->
                <div class="title" style="position:">
                    <button :class="{list_title : titleclick  ,'non_click_title' : chartclick}" @click="clickList">조직 목록</button>
                    <button :class="{list_title : chartclick , 'non_click_title' : titleclick}" @click="clickChart">조직도</button>
                </div>
                <!-- 버튼 이벤트에 따른 조직목록, 조직도 화면 -->
                <div :class="{list : titleclick}" v-if="titleclick == true">
                    <!-- 조직 목록 표시 -->
                    <ul class="list-list" style="list-style:none; font-weight:600 ; margin-right: 2vw;">
                        <li style=" margin-bottom:5vh; font-size: 0.8vw; color: #3D3E3F;" v-for="number in list_number">{{number.category_title}}
                            <div v-for="category in list_category">
                            <li class="category_content" v-if="number.index == category.category" @click="select_category(category)">
                                <img style="margin-right:1.3vw; width: 3vw; vertical-align: middle;" src="@/assets/building.png" alt="" v-if="number.index==1">
                                <h class ="category_image2" v-if="number.index!=1">{{category.image}}</h>{{category.name}}
                                <img src="@/assets/check.png" alt="" style="width:1.5vw; margin: 1vw; float: right;" v-if="category.check==true">
                            </li> 
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div :class="{list : chartclick}" v-if="chartclick == true">
                    <treeList style="margin-left:2vw; font-weight: 700;"></treeList>
                </div>
            </div>
            <div style ="border-left : 2px solid #d5d5d5; height : inherit; float: left;">
            <!-- 체크한 조직 보여지는 화면 -->
            </div>
            <div class="right-bar" style = "float: left; position:relative; padding: 3%; height:66vh; width:47.146vw; overflow: auto;">
                <ul calss="select_group" style="list-style: none; position: absolute;">
                   <li class="select-list" v-for="group in select_group">
                    <img style="margin-left:1vw; margin-right:2vw; width: 3vw; vertical-align: middle; " src="@/assets/building.png" alt="" v-if="group.category==1">
                    <h class="category_image2" id="right_bar_icon" v-if="group.category!=1">{{group.image}}</h>{{group.name}}
                    <button class="select-btn"  onclick="location.href='/measure/input1';" @click="click_regi_page(group.name)">+　입력하기</button></li>
                </ul>
            </div>

        </div>
    </div>
</template>

<style>

.body{
    padding:3%;
    position:relative;
    background: #F8F8F8;;
    width: 85vw;
    height: 75.5vh;
}

.board{
    position: absolute;
    background: #FFFFFF;
    width: 80vw;
    height: 75vh;
    border-radius: 10px;
    border:2px solid #d5d5d5;
}

.title{
    width:21vw;
    height: auto;
    background: #F0F2F5;
    opacity: 0.5;
    border-radius: 12px;
    margin: 2vw 3vw 1vw;
    padding: 1%;
}
.category_image2{
    margin-right:1.3vw; 
    width: 3vw;
    height: 3vw;
    background: #3DC984;
    line-height: 3vw;
    text-align: center;
    color: #FFFFFF;
    border-radius: 0.6vw;
    display: inline-block;
}

.group-chart{
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 18px;
    width: 150px;
    height: 35px;
    margin-left: 10px;
    background: #F0F2F5;
    border: 2px;
    border-radius: 10px;
}
.list{
    padding:1vw;
    width:25vw;
    height: 55vh;
    overflow: auto;
}
.category_content{
    margin-top:2.5vh; 
    font-size:1vw; 
    color: #000000
}
.category_content:hover{
    border-radius: 10px;
    background-color: #f6f6f6;
    
}
.select-list{ /*선택된 카테고리 리스트*/
    border:2px solid #d5d5d5; 
    border-radius: 0.8vw; 
    margin-bottom: 3vh;
    padding: 0.5%;
    line-height: 10vh;
    height: 10vh;
    width: 44vw;
    font-weight: 600;
    font-size: 1.1vw;
    color: #000000;
    
}
.select-btn{ /*입력하기 버튼*/
    background: #3DC984;
    color:#FFFFFF;
    float: right;
    margin:2.5vh ;
    border-radius: 7px;
    border: none; 
    height: 4.5vh;
    width: 7.4vw;
    font-size: 0.8vw;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
}
.select-btn:hover{
    background: #2cb570;
    cursor: pointer;
}
#right_bar_icon{
    margin-left: 1vw;
    margin-right: 2vw;
    margin-top: 1vh;
    height: 3vw;
    width: 3vw;
    line-height: 3vw;
    font-size: 1vw;
    font-weight: 800;
}

::-webkit-scrollbar{
    display:none;
}

</style>
    
<style scoped>
    .list_title{
        font-family: 'Open Sans';
        font-weight: 900;
        font-size: 1.2vw;
        line-height: auto;
        width: 10vw;
        height: 2vw;
        background: #ffffff;
        border: none;
        border-radius: 0.5vw;
        color: #3DC984;
     
    }

    .non_click_title{
        font-family: 'Open Sans';
        font-weight: 900;
        font-size: 1.2vw;
        line-height: 30px;
        width: 10vw;
        height: auto;
        margin-left: 0.5vw;
        background: #F0F2F5;
        border: none;   
    }
</style>
<script>
import axios from "axios";
import treeList from "@/components/measure/Tree-list.vue"
import { RouterLink,useRouter } from "vue-router";
import { useStore } from "vuex"
import { ref,computed } from "vue"

    export default {
        name :"group-list",
        setup(){
            const router = useRouter();
            
            var group_name = ref('')
            var titleclick = ref(true)
            var chartclick = ref(false)
            var check = ref(true)

            var list_number = ref([
                    {index:"1", category_title: "1차 카테고리"},
                    {index:"2",category_title: "2차 카테고리"},
                    {index:"3",category_title: "3차 카테고리"}
            ])
            var list_category = ref([
                          
            ])
            var select_group = ref([
                    //{category:"2" ,image:'상', name:"상경대학"},
                    //{category:"2" ,image:'공', name:"공과대학"},
            ])
            function clickList(){
                titleclick.value=true,
                chartclick.value=false
            }
            function clickChart(){
                titleclick.value=false,
                chartclick.value=true
            }
            function select_category(category){
                //select_group.add(name)
                if(category.check!=true){
                    select_group.value.push({category:category.category, image:category.image, name:category.name})
                    category.check=true
                }
                else{
                    select_group.value.pop({category:category.category, image:category.image, name:category.name})
                    category.check=false
                }  
            }
            const store = useStore()
            function click_regi_page(name){
                console.log(name)
                group_name.value=name
                store.commit("SetName", group_name.value)
            }

            const config = {
            headers:{
              Authorization:"Bearer"+" "+store.state.accessToken,
              "Content-Type": "text/html; charset=utf-8",
            }
        }
            
        var user_group = computed(()=> store.state.user_group)
        async function title_get_list_(){
            console.log("dawdaw")
            await axios.get("Company/Organization/Simple/" + user_group.value ,config).then(res => {
                console.log(res.data)
                this.list_category =  res.data
                for(let i=0;i<res.data.length;i++){
                    this.list_category[i].image =  this.list_category[i].name[0]
                }
            })
            .catch(error => {
                alert("로그인 시간이 만료되었습니다.")
                console.log(error)
                router.push('/');
            })
            .finally(() => {})
        }

            
            
            return{
                group_name,
                titleclick,
                chartclick,
                check,
                list_number,
                list_category,
                select_group,
                clickList,
                clickChart,
                select_category,
                click_regi_page,
                title_get_list_,
                
            }
        },
        created(){
            this.title_get_list_()
        },
        methods:{

        },
        components:{
            treeList,
            RouterLink
        },
    }
    
</script>