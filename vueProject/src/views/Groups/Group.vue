<template>
    <div class="group-main">
        
        <navigation class="navigation"/>
        <div class="contents">
            <AddPopup></AddPopup>
            <EditPopup></EditPopup>
            <GroupHeader/>
            <!--  <PinchScrollZoom  ref="zoomer"       :translate-x="150"
      :translate-y="150" :width="1400" :height="800" :scale="scale"       @scaling="(e) => onEvent('scaling', e)"
      @startDrag="(e) => onEvent('startDrag', e)"
      @stopDrag="(e) => onEvent('stopDrag', e)"
      @dragging="(e) => onEvent('dragging', e)" style="border: 1px solid black">
               
            </PinchScrollZoom>     줌 기능 -->
           
            <Suspense>
                <template #default>
                    <GroupTree>  </GroupTree>
                </template>
                <template #fallback>
                    <div>Loading...</div>
                </template>
            </Suspense>
            <GroupAdd class="add-group" v-if="AddisView"/>
            <GroupPreview class="group-preview" v-if="Preview=='total'"/>
            <GroupPreviewDetail class="group-preview" v-if="Preview=='detail'"/>
            <GroupPreviewInfo class="group-preview" v-if="Preview=='info'"/>
        </div>
        
    </div>
</template>

<style>
body{
    margin:0;
}
.group-main{
    display: flex;
}
.navigation{
    position:fixed;
    z-index: 1;
}
.contents{
    padding-left: 15vw;
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    overflow: scroll;
    -ms-overflow-style: none;
}
.contents::-webkit-scrollbar { 
    display: none;
    width: 0 !important;
}

.add-group{
    position: fixed; top: 0; right: 0;
}
.group-preview{
    position: fixed; top: 0; right: 0;
}
</style>


<script>
import { computed } from "vue";
import { useStore } from "vuex";
import navigation from "@/components/Navigation.vue"
import GroupHeader from "@/components/groups/Header.vue"
import GroupTree from "@/components/groups/Group-tree.vue"
import GroupAdd from "@/components/groups/AddGroup.vue"
import GroupPreview from "@/components/groups/PreviewEmission"
import GroupPreviewDetail from "@/components/groups/PreviewDetailEmission.vue"
import GroupPreviewInfo from   "@/components/groups/PreviewInfo.vue"
import AddPopup from "@/components/groups/AddPopup.vue"
import EditPopup from "@/components/groups/EditPopup.vue";
import PinchScrollZoom, { PinchScrollZoomEmitData } from "@coddicat/vue3-pinch-scroll-zoom";
//import EditGroup from  "@/components/groups/Date.vue"

    export default {
        name :"groups",
        components:{
            navigation,
            GroupHeader,
            GroupTree,
            GroupAdd,PinchScrollZoom,
            GroupPreview,
            GroupPreviewDetail,
            GroupPreviewInfo,
            AddPopup,
            EditPopup,
        },
        setup(){
            const store = useStore(); //vuex 사용
            var AddisView = computed(() => store.state.EditGroups);
            var Preview = computed(() => store.state.GroupPreview);
            var GroupAddBtn = computed(()=> store.state.GroupAddBtn);

            function init_list(){
                store.commit("AddGroupList",1);
          }

            var zoomer ={
                scale: 1,
                originX: 0,
                originY: 0,
                translateX: 0,
                translateY: 0 
            }
            return {AddisView,zoomer,Preview,init_list,GroupAddBtn}
        },
        mounted(){
            this.init_list()
        }
    };
</script>