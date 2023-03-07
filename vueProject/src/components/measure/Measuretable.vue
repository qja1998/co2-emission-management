<template>
    <table class="tg" style="border-radius: 40px;table-layout: fixed; ">
        <colgroup>
            <col style="width: 35px">
            <col style="width: 200px">
            <col style="width: 150px">
            <col style="width: 150px">
            <col style="width: 150px">
            <col style="width: 150px">
            <col style="width: 150px">
            <col style="width: 172px">
        </colgroup>
        <thead>
            <tr>
                <th class="tg-j0i3"><span class="employee-check"><input type="checkbox"/></span></th>
                <th class="tg-r2fn">탄소 배출 내용</th>
                <th class="tg-r2fn">건물명</th>
                <th class="tg-r2fn">탄소 배출량</th>
                <th class="tg-r2fn">시작 날짜</th>
                <th class="tg-r2fn">종료 날짜</th>
                <th class="tg-r2fn">탄소 배출 소스</th>
                <th class="tg-r2fn">스코프</th>
                <th class="tg-r2fn">카테고리</th>
            </tr>
        </thead>
            <tbody>
                <tr v-for="emissionInfo in emssion_info_list" class="emssion-check-column">
                    <td class="tg-vcza"><span class="employee-check"><input type="checkbox" @click="check_btn(emissionInfo)"></span></td>
                    <td class="tg-s8v6">{{emissionInfo.content}}</td>
                    <td class="tg-s8v6">{{emissionInfo.building}}</td>
                    <td class="tg-s8v6">{{emissionInfo.emissions}} kg</td>
                    <td class="tg-s8v6">{{emissionInfo.start}}</td>
                    <td class="tg-s8v6">{{emissionInfo.end}}</td>
                    <td class="tg-s8v6">{{emissionInfo.source}}</td>
                    <td class="tg-s8v6">{{emissionInfo.scope}}</td>
                    <td class="tg-s8v6">{{emissionInfo.category}}</td>
                </tr>
            </tbody>
    </table>
</template>

<style>
    .tg .tg-vcza{
        justify-content: center;
        background-color:#ffffff;border-color:#d5d5d5;color:#b6b6b6;text-align:left;vertical-align:top
    }
</style>
<script>
    export default {
        name :"measuretable",
        data() {
            return{
                emssion_info_list:[],
            }
        },
        methods:{
            check_btn(data){
                data.checked = !data.checked
            }
        },
        components:{
        },
        props:[
            "emssion_info_list"
        ]
    }
</script>