import {  createRouter, createWebHistory } from "vue-router"
import login from "./views/Login"
import group from "./views/Groups/Group"
import employee from "./views/Groups/Employee"
import measure from "./views/measureVue/Measure"
import input1 from "./views/measureVue/Input1Measure"
import register from "./views/measureVue/Register"
import insight from "./views/Insight"
import predict from "./views/Predict/predictCarbonPreview"
import predictCategory from "./views/Predict/predictCategoryDetailLine"
import assesment from "./views/Nature/carbonNatureAssessment"
import target from "./views/Nature/carbonNatureTarget"
import setting from "./views/Setting/Setting"
import groupinfo from "./views/Setting/GroupInfo.vue"
import survey from "./views/Survey"
import signup from "./views/Signup/SignupAdmin"
import idinfo from "./views/Signup/SignupAdminIdInfo"
import signOK from "./views/Signup/SignupAdminOK"
import signcheck from "./views/Signup/SignupAdminCheck"
import signupSub from "./views/Signup/SignupSub"

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: "/",
      name: "login",
      component: login,
    },
    {
      path: "/group/employee",
      name: "employee",
      component: employee,
    },
    {
      path: "/group",
      name: "group",
      component: group,
      
    },
    {
      path: "/measure",
      name: "measure",
      component: measure,
    },
    {
      path: "/measure/input1",
      name: "input1",
      component: input1 ,
      props: true
    },
    {
      path: "/measure/register",
      name: "register",
      component: register,
    },
    {
      path: "/insight",
      name: "insight",
      component: insight,
    },
    {
      path: "/predict",
      name: "predict",
      component: predict,
    },
    {
      path: "/predict/predictCategory",
      name: "predictCategory",
      component: predictCategory,
    },
    {
      path: "/nature",
      name: "assesment",
      component: assesment,
    },
    {
      path: "/nature/target",
      name: "target",
      component: target,
    },
    {
      path: "/setting",
      name: "setting",
      component: setting,
    },
    {
      path: "/setting/groupinfo",
      name: "groupinfo",
      component: groupinfo,
    },
    {
      path: "/survey",
      name: "survey",
      component: survey,
    },
    {
      path: "/signup",
      name: "signup",
      component: signup,
    },
    {
      path: "/signup/idinfo",
      name: "idinfo",
      component: idinfo,
    },
    {
      path: "/signup/signcheck",
      name: "signcheck",
      component: signcheck,
    },
    {
      path: "/signup/signOK",
      name: "signOK",
      component: signOK,
    },
    {
      path: "/signup/signSub",
      name: "signSub",
      component: signupSub,
    },
    
    
    ]
})

import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();

router.beforeEach(function (to, from, next) {

  // to : 이동할 url
  // from : 현재 url
  // next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
  if(computed(() => store.state.accessToken===null)){
    //refreshToken은 있고 accessToken이 없을 경우 토큰 재발급 요청
    //store.dispatch('refreshToken');
    return next();
  }
  else{
    //accessToken이 있을 경우 진행
    alert("로그인 토큰 확인.");
    return next("/group");
  }
});

export default router