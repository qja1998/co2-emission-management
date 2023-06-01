//vuex 설정 파일 
import { createStore } from "vuex";
import axios from "axios";
import VueCookies from 'vue-cookies';
import createPersistedState from 'vuex-persistedstate';

var today = new Date(); 

export default createStore({
    plugins: [
        createPersistedState({
          storage: window.sessionStorage, // store를 session storage에 유지
        })
    ],
    state: {
       
        EditGroups : false,
        GroupPreview : false,
        EditTable : false,
        Group_tree :[],
        GroupAddBtn : false,
        GroupEditBtn : false,
        group_list:[],
        depth:0,
        CheckedNode : "", //그룹 구조에 수정,삭제, 추가 기준 노드
        group_tree_selected_company :"",

        insight_month : today.getMonth(),
        insight_year : today.getFullYear(),
        insight_selected_company :"", 
        detail_emission: [0,0,0,0,0,0,0,0,0,0,0,0,0],
        table:[],    //로컬 저장소 
        total_table:[], //저장 필요
        table_category:[],
        selected_row:"",
        table_kind:"",
        group_name: "", //저장 필요
        user_group:"", //로그인 한 유저의 조직명
        //토큰 관련 
        accessToken: null,
        refreshToken: null,
        infopage:false,
        scopes:[0,0,0],

        //카테고리
        CarbonCategories : [
            "고정연소",
            "이동연소",
            "탈루배출",
            "폐기물처리시설",
            "비료사용",
            "대학소유동물",
            "산림에의한흡수",
            "전력",
            "열",
            "수도",
            "폐기물",
            "통근_통학",
            "출장",
            "위탁운영차량",
            "폐기물처리시설(매립)",
            "폐기물처리시설(소각)",
            "폐기물처리시설(하수처리)",
            "폐기물처리시설(생물학적)",
            "폐기물처리시설(폐수)"
        ],
        //탄소 중립
        targetPopup:false,
        lastTotalEmissions: 0,
        baseYear : 0,
        baseData : 0,
        getTotalLastData:0,
        getTotalLastDataList:[],
        getTotalCategoryDataList: [],
        getTotalCategoryData: []
    }
    //state 데이터 호출후 상태 가공하여 전달 
    ,getters:{
        getToken (state) {
            let ac = VueCookies.get('accessToken');
            let rf = VueCookies.get('refreshToken');
            return {        
              access: ac,
              refresh: rf
            };
        }
    } 
    //상태 접근 (변경)
    ,mutations:{

        //로그인 한 유저의 그룹명
        setGroupName(state,name){
            state.user_group = name
        },

        set_scopes(state,arr){
            state.scopes=arr
        },
        
        OnGroupPreview(state,corrent,com){
            state.GroupPreview = corrent;
            state.group_tree_selected_company = com;
            
        },
        OffGroupPreview(state){
            state.GroupPreview = false;
        },
        OnGroupInfo(state){
            state.infopage = true
        },
        OffGroupInfo(state){
            state.infopage = false
        },
        SetGroupTree(state,arr){
          state.Group_tree = arr  
        },
        group_tree_selected_company(state,item){
            state.group_tree_selected_company=(item) 
            
        },
        SetGroupDepth(state,depth){
            state.depth = depth
        },
        OnGroupAddPopup(state,group_name){
            state.GroupAddBtn = true
            state.group_name=group_name
        },
        OffGroupAddPopup(state){
            state.GroupAddBtn = false
        },
        OnGroupEditPopup(state, group_name){
            state.GroupEditBtn = true
            state.group_name=group_name
        },
        OffGroupEditPopup(state){
            state.GroupEditBtn = false
        },
        OnEdit(state){
            state.EditGroups = true;
        },
        OffEdit(state){
            state.EditGroups = false;
        },
        AddGroupList(state,item){
            if(item==1){
                state.group_list=[]  //누적으로 추가 방지를 위한 초기화
            }else{
                state.group_list.push(item) 
            }
        },
        insight_select_company(state,item){
            state.insight_selected_company=(item)  
        },

        SetCheckedNode(state,node){
            state.CheckedNode = node
        },

        InsightAddM(state,change){
            state.insight_month =state.insight_month+change;
            if(state.insight_month == -1){
                state.insight_month=11
                state.insight_year=state.insight_year-1
            }else if(state.insight_month == 12){
                state.insight_month=0
                state.insight_year=state.insight_year+1
            }
        },
        InsightAddY(state,change){
            state.insight_year =state.insight_year+change;
        },
        SetDetailEmission(state,arr){
            state.detail_emission = arr
        },
        //테이블 관련
        SetTableKind(state,change){
            state.table_kind = change
        },
        SetTableContent(state,arr){
            state.table.unshift(arr)
        },
        DelTableContent(state,remove){
            for(let i=0; i<remove.length; i++){
                console.log('삭제',remove[i].data)
                state.table = state.table.filter((element) =>
                                                element.CarbonActivity != remove[i].CarbonActivity ||
                                                element.data != remove[i].data ||
                                                element.emissions != remove[i].emissions ||
                                                element.StartDate != remove[i].StartDate ||
                                                element.EndDate != remove[i].EndDate ||
                                                element.scope != remove[i].scope
                                            )
            }    
            
            // console.log(remove)
        },
        
        //total_ta
        SetTotalTableContent(state,arr){
            state.total_table.unshift(arr)
        },
        DelTotalTableContent(state,remove){
            for(let i=0; i<remove.length; i++){
                console.log('삭제',remove[i].data)
                state.total_table = state.total_table.filter((element) =>
                                                element.CarbonActivity != remove[i].CarbonActivity ||
                                                element.data != remove[i].data ||
                                                element.emissions != remove[i].emissions ||
                                                element.StartDate != remove[i].StartDate ||
                                                element.EndDate != remove[i].EndDate ||
                                                element.scope != remove[i].scope
                                            )
            }
        },
        
        ResetTable(state){
            state.table=[]
        },
        SetEditDelet(state){
            console.log('수정창 닫힘')
            state.EditTable = false
        },
        SetEditOpen(state,selected){
            console.log('수정창 열림')
            state.EditTable = true
            state.selected_row = selected
        },
        SetName(state,change){
            state.group_name = change
        },
        //토큰 관련 
        loginToken (state, payload){
            state.accessToken = payload;
            state.refreshToken = payload;
        },
        refreshToken(state, payload) { //accessToken 재셋팅
          VueCookies.set('accessToken', payload.accessToken, '60s');
          VueCookies.set('refreshToken', payload.refreshToken, '1h');
          state.accessToken = payload;
        },
        removeToken () {
          VueCookies.remove('accessToken');
          VueCookies.remove('refreshToken');
        },

        //탄소 중립
        openAddTarget(state){
            state.targetPopup = true
        },
        closeAddTarget(state){
            state.targetPopup = false
        },

        //탄소 배출량 평가
        getTotalLastData(state, data){
            state.getTotalLastData = data
        },
        getTotalLastDataList(state, data){
            state.getTotalLastDataList = data
        },
        getBaseYear(state,year){
            state.baseYear = year
        },
        getBaseData(state,data){
            state.baseData = data
        },
        getCategoryTotalData(state,datas){
            state.getTotalCategoryData = datas
        },
        getCategoryTotalData(state,data){
            state.getTotalCategoryData = data
        },
        getCategoryTotalList(state,datas){
            state.getTotalCategoryDataList = datas
        }
        

    },
    //전처리 후 Mutations에 데이터 전달
    actions:{
        login: ({commit}, params) => {
            return axios.post('/User/Login', params).then(res => {
                    commit('loginToken', res.data.auth_info);
                })
                .catch(err => {
                    console.log(err.message);

                });
        },

        refreshToken: ({commit}) => { // accessToken 재요청
        //accessToken 만료로 재발급 후 재요청시 비동기처리로는 제대로 처리가 안되서 promise로 처리함
        return new Promise((resolve, reject) => {
            axios.post('/v1/auth/certify').then(res => {
                commit('refreshToken', res.data.auth_info);
                resolve(res.data.auth_info);
                }).catch(err => {
                console.log('refreshToken error : ', err.config);
                reject(err.config.data);
            })
        })
        },
        logout: ({commit}) => { // 로그아웃
            commit('removeToken');
            location.reload();
        },
        // set_group_list: function (origin_json_list) {
        //     var temp_list = []   
            
        //     while(origin_json_list != null){
        //         temp_list.push(origin_json_list.lable)
        //         origin_json_list = origin_json_list.Children
        //     } 
        //     console.log((temp_list)+"액션리스트")
        //     return 
        //   },
    },
    //상태 모듈화
    modules:{

    }
});


// 참고 링크
//https://velog.io/@latte_h/Vue3-Guide-12-Vuex