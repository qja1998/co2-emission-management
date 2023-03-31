<template>
    <div style="padding:15vh">
        <div style="font-size:4vh;">엑셀 파일로 일괄 등록
          <div style="font-size:2vh; font-weight:normal; margin-top:4vh">엑셀파일을 이용하여 전력 사용에 대한 데이터를 한번에 등록할 수 있습니다.<br>
            정해진 엑셀 양식을 다운로드 받아 양식에 따라 데이터를 작성 후 엑셀 파일을 업로드하면 전력 사용 내역이 일괄 등록됩니다.
          </div>

            <section>
                <xlsx-workbook>
                  <xlsx-sheet
                      :collection="sheet.data"
                      v-for="sheet in sheets"
                      :key="sheet.name"
                      :sheet-name="sheet.name"
                  />
                  <xlsx-download>
                      <button class="excel-down-btn">엑셀 양식 다운로드</button>
                  </xlsx-download>
                </xlsx-workbook>
            </section>

            <div style="border:1px solid #D4D4D4; padding:3vh 2vw 2vw 5vh; margin-top:5vh; border-radius: 1vh;">
              <span style="font-size:2vh; font-weight:bold; margin-right:2vw"> 파일 선택 </span>
              <input type="file" @change="onChange" />
              <xlsx-read :file="file">
                <xlsx-sheets>
                  <template #default="{sheets}">
                    <select v-model="selectedSheet">
                      <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                        {{ sheet }}
                      </option>
                    </select>
                  </template>
                </xlsx-sheets>
                <xlsx-json :sheet="selectedSheet">
                  <template #default="{collection}">
                    <button class ="clickbtn" style="float:right; margin-top:5vh" @click="registerExcel(collection)">엑셀 등록하기</button>
                  </template>
                </xlsx-json>
              </xlsx-read>
            </div>
            
        </div>
      


      
    </div>
  </template>
  
  <script>
  import { XlsxRead, XlsxTable, XlsxSheets, XlsxJson, XlsxWorkbook, XlsxSheet, XlsxDownload } from "/home/hyemi/carbon/co2-emission-management/vueProject/node_modules/vue3-xlsx"
  import {useStore} from 'vuex'
  import {ref} from 'vue'
  export default {
    components: {
      XlsxRead,
      XlsxTable,
      XlsxSheets,
      XlsxJson,
      XlsxWorkbook,
      XlsxSheet,
      XlsxDownload
    },

    setup(){
      var file= ref(null)
      var selectedSheet=ref(null)
      var sheetName=ref(null)
      var sheets=ref([
        { name: "전력사용양식", 
          data: [
            { 탄소배출내용: String, 시작날짜: Date, 종료날짜:Date, 배출시설명:null, 운영주체:null,공급처:null,전력사용량:Number}
          ] 
        }
      ])
      var collection=ref([{a:1, b:2}])
      var store = useStore()

      function onChange(event){
        file.value = event.target.files ? event.target.files[0] : null;
      }

      function addSheet(){
        sheets.push({ name: this.sheetName, data: [...this.collection] });
        sheetName.value = '전력사용양식';
      }
      function registerExcel(sheets){
        var i
        for(i=0; i<sheets.length; i++){
          console.log(i)
          var info_list={
            Type:"7",
            DetailType:"전력",
            StartDate: sheets[i].시작날짜,
            EndDate:sheets[i].종료날짜,
            Location:"",
            scope:2,
            data:sheets[i].전력사용량,
            emissions:sheets[i].전력사용량+4,
            Carbonunit:"kg",
            CarbonActivity:sheets[i].탄소배출내용,
            kind:"",
            Division:{건물명:"",운영주체:"",공급처:""}
          }
          console.log(info_list)
          
          store.commit("SetTableContent",info_list)
        }
      }
      return{
        file,
        selectedSheet,
        sheetName,
        sheets,
        collection,
        onChange,
        addSheet,
        registerExcel
      }
    },
    methods: {

      
    }
  };
  </script>

<style>
  .excel-down-btn{
    margin-top:3vh; 
    background: none; 
    border:none; 
    font-size:2vh; 
    color:#4FB0DA;
    text-decoration: underline;
  }
  .excel-down-btn:hover{
    cursor: pointer;
  }
</style>