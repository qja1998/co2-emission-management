<template>
    <div>
        <h1 class="login" id="title_login">탄소 중립 지원 플랫폼</h1>
        <div class="login">
          <form  @submit.prevent="Confirm()" >
            <input placeholder="ID" class="in"  v-model="ID" style="margin-top:13vh" ><br>
            <input type="password" placeholder="passward" class="in" v-model="PW"><br>
            <button id="login_btn" type="submit" autocomplete="off">로그인하기</button><br>
            <p class="login" id="foget_login_text">비밀번호를 잊으셨나요?</p>
            
        </form>
        <button class="login" id="foget_login_text" style="background:none; border:none" onclick="location.href='/signup';">회원가입하기</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useStore} from "vuex";
import { useRouter } from 'vue-router'

export default{ 
    name:'',
    components:{},
    setup(){
      const store = useStore();
      const router = useRouter();

      var ID = 'test@naver.com'
      var PW = '1234';
      async function Confirm(){
        await axios.post("User/Login",{'Email':this.ID,'password':this.PW})
          .then((res) => {
            alert("로그인에 성공했습니다.");
            store.commit("loginToken",res.data.AccessToken)
            store.commit("setGroupName",res.data.RootCom)
            console.log(res.data.RootCom)
            console.log(JSON.stringify(res.data))
            router.push('/group');
          })
          .catch(() => {
            alert("로그인에 실패했습니다. 계정 정보를 확인해주세요.");
            router.push('/');
          }) .finally(() => {
          });
      }
      return{Confirm,ID,PW}
  }
}
</script>

<style>
  .login{
    font-size: 3.5vh;
    color: #3DC984;
  }
  #title_login{
    text-align: center;
    margin-top: 18vh;
  }
  .login_input{
    margin-top: 8vh;
  }
  .in{
    width: 20vw;
    min-width: 150px;
    height: 5vh;
    margin: auto;
    margin-top: -3vh;
    display: block;
    border-radius: 1.5vh;
    border: 1px solid #DFDFDF;
  }
  #login_btn{
    width: 20.5vw;
    min-width: 150px;
    height: 5vh;
    margin: auto;
    margin-top: 2vh;
    display: block;
    border-radius: 1.5vh;
    border: none;
    background: linear-gradient(90deg, #3DC984 0%, #3DC984 100%);
    color:#ffffff;
    font-weight: bold;
    font-size: 1.8vh;

  }
  #foget_login_text{
    color: #3DC984;
    margin: auto;
    display: block;
    text-align: center;
    font-size: 1.5vh;
  }
  #foget_login_text:hover{
    cursor: pointer;
    color: #39ba79;
  }
  #login_btn:hover{
    cursor: pointer;
    background: #39ba79;
  }

  </style>