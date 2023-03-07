<template>
    <div class="active">
        <EditPower_usage class="edit-category-popup"  v-if="category == '7'"></EditPower_usage>
        <EditSteam_usage class="edit-category-popup" v-if="category == '8'"></EditSteam_usage>
        <EditWater_usage class="edit-category-popup" v-else-if="category == '9'"></EditWater_usage>
        <EditWaste_usage class="edit-category-popup" v-else-if="category == '10'"></EditWaste_usage>
        <EditStationary class="edit-category-popup" v-else-if="category == '0'"></EditStationary>
        <EditMobile class="edit-category-popup" v-else-if="category == '1'"></EditMobile>
        <EditFugitive class="edit-category-popup" v-else-if="category == '2'"></EditFugitive>
        <EditFertilizer class="edit-category-popup" v-else-if="category == '4'"></EditFertilizer>
        <EditAnimal_possession class="edit-category-popup" v-else-if="this.category == '5'"></EditAnimal_possession>
        <EditForest_absorption class="edit-category-popup" v-else-if="this.category == '6'"></EditForest_absorption>
        <EditWaste_filling class="edit-category-popup" v-else-if="this.category == '14'"></EditWaste_filling>
        <EditWaste_incineration class="edit-category-popup" v-else-if="this.category == '15'"></EditWaste_incineration>
        <EditWaste_sewage class="edit-category-popup" v-else-if="this.category == '16'"></EditWaste_sewage>
        <EditWaste_biological class="edit-category-popup" v-else-if="this.category == '17'"></EditWaste_biological>
        <EditWaste_wastewater class="edit-category-popup" v-else-if="this.category == '18'"></EditWaste_wastewater>
    </div>
</template>

<script>

import EditPower_usage from './EditDivide-carbon/EditPower_usage.vue';
import EditSteam_usage from './EditDivide-carbon/EditSteam_usage.vue';
import EditWater_usage from './EditDivide-carbon/EditWater_useage.vue';
import EditWaste_usage from './EditDivide-carbon/EditWaste_usage.vue';
import EditStationary from './EditDivide-carbon/EditStationary_combustion.vue';
import EditMobile from './EditDivide-carbon/EditMobile_combustion.vue';
import EditFugitive from './EditDivide-carbon/EditFugitive_emissions.vue';
import EditFertilizer from './EditDivide-carbon/EditFertilizer_use.vue';
import EditAnimal_possession from './EditDivide-carbon/EditAnimal_possession.vue';
import EditForest_absorption from './EditDivide-carbon/EditForest_absorption.vue';
import EditWaste_filling from './EditDivide-carbon/EditWaste_disposal(filling).vue';
import EditWaste_incineration from './EditDivide-carbon/EditWaste_disposal(incineration).vue';
import EditWaste_sewage from './EditDivide-carbon/EditWaste_disposal(sewage_treatment).vue';
import EditWaste_biological from './EditDivide-carbon/EditWaste_disposal(biological).vue';
import EditWaste_wastewater from './EditDivide-carbon/EditWaste_disposal(Wastewater).vue';
import {useStore} from 'vuex'
import {ref,computed} from 'vue'

export default {
    setup(){
        const store = useStore()
        var category = computed(() => store.state.selected_row[0].Type)

        return{
            category
        }
    },
    components: { 
        EditPower_usage,
        EditSteam_usage,
        EditWater_usage,
        EditWaste_usage,
        EditStationary,
        EditMobile,
        EditFugitive,
        EditFertilizer,
        EditAnimal_possession,
        EditForest_absorption,
        EditWaste_filling,
        EditWaste_incineration,
        EditWaste_sewage,
        EditWaste_biological,
        EditWaste_wastewater 
    }
}
</script>

<style>
    .active{
        opacity: 2;
        background: rgba(43, 42, 42, 0.3);
        width: 100vw;
        height: 100vh;
    }
    .edit-category-popup{
        float:right;
        margin-top:2vh;
        margin-right:1.5vw;
        height: 10px;
    }
</style>