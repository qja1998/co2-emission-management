<template>
  <div>
      <div v-if="this.rows.length==0" class="table_not">
          <img style="margin-top:10%; width: 5%;" src="@/assets/exclamationMark.png" alt=""/>
          <div style="margin-top:30px">데이터가 존재하지 않습니다.</div>
      </div>
      <div v-else-if="this.rows.length>0">
        <div style="margin-bottom:3vh">
          <button class= "measure_btn" id="btn_del_input2" @click="click_del_btn()">선택 삭제</button> 
          <button class= "measure_btn" id="btn_edit_input2" @click="click_edit_btn()" style="margin-right:1vw; margin-top:1vh;">수정하기</button>
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
        </vue-good-table>
      </div>
      
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
import popUp from './pop-up.vue';
import { VueGoodTable } from 'vue-good-table-next';
import { useStore } from "vuex"
import { computed,ref } from 'vue';

export default {
  name: 'my-component',
  setup(){
      var text = ref('')
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
        text.value = params.selectedRows

        //선택된 행들을 리스트 형태로 반환 {0: Proxy, 1: Proxy, 2: Proxy}
      }

      const store = useStore();
      
      function click_del_btn(){
        store.commit('DelTableContent',text.value);
      }

      function click_edit_btn(){
        console.log(text.value.length)
        if(text.value.length == 1){
          
          store.commit('SetTableKind','table')
          store.commit('SetEditOpen',text.value)
        } 
        //수정 팝업창, 수정 정보후 store를 이용해서 저장
      }

      return{
        text,
        columns,
        rows,
        popUp,
        click_del_btn,
        selectionChanged,
        click_edit_btn
      }
  },
  components: {
      VueGoodTable,
  },
  created(){
    const store = useStore();
    this.rows = computed(()=>store.state.table);
    console.log(this.rows)
  },
};
</script>