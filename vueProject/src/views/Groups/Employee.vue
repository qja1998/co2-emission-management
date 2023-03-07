<template>
    <div>
        <navigation class="navigation"></navigation>
        <div class="contents">
            <GroupHeader/>
            <div class="group-employee-registration">
                <div class="group-employee-registration-table">
                    <EmployeeTable></EmployeeTable>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style>
.navigation{
    position:fixed;
    z-index: 1;
}
.group-employee-registration{
    background-color: #F5F5F5;
    width: 85vw;
    height: 86vh;
}
.group-employee-registration-table{
    padding:1vw;
}

</style>


<script>
import navigation from "@/components/Navigation.vue"
import GroupHeader from "@/components/groups/EmployeeHeader.vue"
import EmployeeTable from "@/components/groups/EmployeeTable.vue"

export default{ 
    name:'',
    components:{
        navigation,
        GroupHeader,
        EmployeeTable
    },
    data(){
        return{
            sampleData:''
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>