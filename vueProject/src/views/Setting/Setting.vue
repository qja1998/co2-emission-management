<template>
<div class="setting-main">
    <navigation class="navigation"></navigation>
    <div class="contents">
        <GroupInfo style="position:fixed" v-if="this.groupInfo==true"></GroupInfo>
        <Header></Header>
        <settingInput></settingInput>

    </div>
</div>
</template>

<style>
.setting-main{
    display: flex;
}
</style>

<script>
import navigation from "@/components/Navigation.vue"
import Header from "../../components/setting/Header.vue"
import settingHeader from "@/components/setting/Header.vue"
import settingInput from "@/components/setting/SettingInput.vue"
import { useStore } from "vuex"
import {ref, computed} from "vue"
import GroupInfo from "./GroupInfo.vue"


export default{ 
    name:'',
    components:{
    navigation,
    settingHeader,
    settingInput,
    GroupInfo,
    Header
},
    setup(){
        const store = useStore()
        var groupInfo = computed(()=>store.state.infopage)
        return{
            groupInfo
        }
    },
    created(){},
    unmounted(){},
}
</script>
