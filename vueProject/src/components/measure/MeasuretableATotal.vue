<template>
  
  <div>
      <div style=" margin-bottom : 3vh">
        <button class="measure_btn" id="btn_del" @click="click_del_btn()">선택삭제</button>
        <button class="measure_btn" id="btn_copy" @click="click_copy_btn()">복사하기</button>
        <button class="measure_btn" id="btn_edit"  @click="click_edit_btn()">수정하기</button>

        <button class="measure_btn" id="btn_regi"  onclick="location.href='/measure/register';">+　등록하기</button>
        <button class="measure_btn" id="btn_excle">엑셀 업로드</button>
        <img class="measure_btn"  id="btn_search" src="@/assets/search.png" alt=""/>
      </div>
      <vue-good-table
          v-on:selected-rows-change="selectionChanged"
          :columns="columns"
          :rows="rows" 
          :select-options="{ 
            enabled: true,
            disableSelectInfo: true,
            selectOnCheckboxOnly: true,
          }"
          :sort-options="{enabled: false}"
          :pagination-options="{
              enabled: true,
              mode: 'pages',
              perPage: 5
          }"
          >
          <!-- <template #table-actions>
            <button class= "measure_btn" id="btn_del_input2" @click="click_del_btn()">선택 삭제</button> 
            <button class= "measure_btn" id="btn_edit_input2" @click="click_edit_btn()" style="margin-right:1vw; margin-top:1vh; margin-bottom: 1vh;">수정하기</button>
          </template> -->
      </vue-good-table>
  </div>
</template>

<style>
.btn{
  width:20px;
  height: 10px;
}
</style>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
import { useStore } from "vuex"
import { computed, ref} from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router'

export default {
  name: 'my-component',
  setup(){
      var selected_id = ref([])
      var columns= [
        {
          label: '탄소 배출 내용',
          field: 'CarbonActivity',
        },
        {
          label: '활동 데이터',
          field: 'data',
          type: 'number',
        },
        {
          label: '탄소 배출량',
          field: 'emissions',
          type: 'number'
        },
        {
          label: '시작 날짜',
          field: 'StartDate',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'yyyy-MM-dd',
        },
        {
          label: '종료 날짜',
          field: 'EndDate',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'yyyy-MM-dd',
        },
        {
          label: '스코프',
          field: 'scope',
        }
      ]
      var rows = ref([])

      function selectionChanged(params){
        selected_id.value= (params.selectedRows)
        console.log("선택된 행",selected_id.value)
        //선택된 행들을 리스트 형태로 반환 {0: Proxy, 1: Proxy, 2: Proxy}
      }

      const store = useStore();
      const router = useRouter();

      function click_del_btn(){
        store.commit('DelTotalTableContent',selected_id.value); //삭제 버튼 - 한번에 보내도록 개선 필요 
        for(let key in selected_id.value){
          del_carbon_data(selected_id.value[key].id)
        }
        location.reload();
        
      }
      
      function click_copy_btn(){
                console.log("복사",selected_id.value)
                var config = {
                    headers:{
                    "Authorization":"Bearer"+" "+store.state.accessToken
                    }
                }
                for(var row in selected_id.value){
                    const data = (selected_id.value[row])
                    console.log("row = "+JSON.stringify(data))
                    var input_data = {
                        "CarbonData": {
                            "StartDate":(data.StartDate),
                            "EndDate":(data.EndDate),
                            "Location": (data.Location),
                            "Scope":  (data.scope),
                            "CarbonActivity": (data.CarbonActivity),
                            "CarbonUnit": (data.Carbonunit),
                            "usage": (data.data), //carbon data
                            "Chief": "jeong",
                            "Kind" :(data.kind),
                            "Division":""
                        },
                        "DetailType":store.state.CarbonCategories[Number(data.Type)],
                        //"RootCom":"samsung",
                        //"BelongCom":"",
                        "Type":store.state.CarbonCategories[Number(data.DetailType)]
                    }
                    console.log((input_data))
                    get_total_emission(input_data)
                }
                //{id:"",content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:""}
                async function get_total_emission(input_data){
                    await axios.post("/CarbonEmission/samsung",input_data,config).then(res => {
                        console.log(JSON.stringify(input_data))
                    })
                    .catch(error => {
                        console.log('send data'+JSON.stringify(input_data))
                        console.log(error)
                        
                    })
                    .finally(() => {
                    })
                }
                store.commit('ResetTable')
                location.reload();
            }

      function click_edit_btn(){
        if(selected_id.value.length == 1){
          console.log(JSON.stringify(selected_id.value)+"에딧 버튼")
          store.commit('SetTableKind','total_table')
          store.commit('SetEditOpen',selected_id.value)
        } 
        //수정 팝업창, 수정 정보후 store를 이용해서 저장
      }



      const config = {
            headers:{
              Authorization:"Bearer"+" "+store.state.accessToken,
              "Content-Type": "text/html; charset=utf-8",
            }
      }

      var group_name = store.state.group_name
      async function get_data(){
        await axios.get("/CarbonEmission/"+group_name,config).then(res => {
              console.log(res.data)
              
              for(var i=0;i<res.data.length;i++){
                var info_list={id:"",content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"", category:""}
                info_list.id = res.data[i].id
                info_list.CarbonActivity = res.data[i].CarbonActivity
                info_list.data =  res.data[i].CarbonData + res.data[i].CarbonUnit
                info_list.emissions = res.data[i].CarbonTrans + "kg"
                info_list.StartDate = res.data[i].CarbonInfo.StartDate   //api추가되면 수정 
                info_list.EndDate = res.data[i].CarbonInfo.EndDate 
                info_list.scope = res.data[i].CarbonInfo.Scope 
                console.log(res.data[i].CarbonInfo.Category )
                info_list.Type = res.data[i].CarbonInfo.Category 
                rows.value.unshift(info_list)
              }     
          })
          .catch(error => {
              alert("로그인 시간이 만료되었습니다.")
              console.log(error)
              router.push('/');
          })
          .finally(() => {
            console.log(rows.value)
          })
      }

      async function del_carbon_data(del_id){
        await axios.delete("/CarbonEmission/"+del_id).then(res => {
          })
          .catch(error => {
            console.log(error)
            alert("삭제에 실패했습니다.")
            router.push('/measure/input1');
          })
          .finally(() => {
          })
      }
      return{
        selected_id,
        columns,
        rows,
        click_del_btn,
        selectionChanged,
        click_edit_btn,
        click_copy_btn,
        get_data,
        del_carbon_data
      }
  },
  components: {
      VueGoodTable,
  },
  created(){
    const store = useStore();
    this.get_data()
  },
};
</script>