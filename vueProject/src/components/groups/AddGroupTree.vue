<template>
  <input v-model="searchText" type="text" />
  <Tree
    :key = "data"
    :nodes="data"
    :search-text="searchText"
    show-child-count
    :gap =14
    @nodeExpanded="onNodeExpanded"
    @update:nodes="onUpdate"
    @nodeClick="onNodeClick"
    @onToggleParentCheckbox="onToggleParentCheckbox"
    @onCheckboxToggle="onCheckboxToggle"
  />
</template>

<script>
import { ref,defineComponent,computed } from "vue";
import Tree from "vue3-tree";
import "vue3-tree/dist/style.css";
import { useStore } from "vuex";
import axios from "axios";
export default defineComponent({
  components: {
    Tree,
  },
  async setup() {
    const store = useStore();
    var data = ref([
      {
        id: "1",
        label: "a",
        something:"dawdaw",
        nodes: [
          {
            id: "4",
            label: "aa",
          },
          {
            id: "5",
            label: "ab",
          },
        ],
      },
      {
        id: "2",
        label: "b",
        nodes: [
          {
            id: "6",
            label: "ba",
            nodes: [
              {
                id: "11",
                label: "aaaa",
                nodes: [
                  {
                    id: "15",
                    label: "aaaa",
                  },
                  {
                    id: "16",
                    label: "bbbb",
                  },
                ],
              },
              {
                id: "12",
                label: "bbbb",
              },
            ],
          },
          {
            id: "7",
            label: "bb",
            nodes: [
              {
                id: "13",
                label: "cccc",
              },
              {
                id: "14",
                label: "dddd",
              },
            ],
          },
        ],
      },
      {
        id: "3",
        label: "c",
      },
    ]);
    const searchText = ref("");
    var onNodeExpanded = (node, state) => {
      //alert('state: ', state)
      //console.log('node: ', node)
    };
    const onCheckboxToggle = (node, state) => {
      console.log('checkbox state: ', state)
      console.log('checkbox node: ', node)
      console.log("체크함");
    };
    const onToggleParentCheckbox = (node, state) => {
      console.log('parent checkbox state: ', state)
      console.log('parent checkbox node: ', node)
      console.log("체크함p");
    };
    const onUpdate = (nodes) => {
      //console.log("nodes:", nodes);
      var CheckedNode = computed(() => store.state.CheckedNode);
      if(CheckedNode.value == null){
        store.commit("SetCheckedNode",nodes.ComName);
      }else if(CheckedNode.value){

      }
      console.log("체크체크");
    };

    const onNodeClick = (node) => {
      console.log(node);
      node.checked = true
    };

    var tree =[]//tore.state.Group_tree
    
    //tree.nodes = []
    console.log("rerender"+JSON.stringify(tree ))

    const config = {
            headers:{
              Authorization:"Bearer"+" "+store.state.accessToken,
              "Content-Type": "text/html; charset=utf-8",
            }
          }
    async function get_tree(){
        await axios.get("/Company/Organization/samsung",config).then(res => {
              //delete res.Children
              
              var arr = JSON.stringify(res.data);
              arr = arr.replace(/Children/g, 'nodes');
              arr = JSON.parse(arr);
              //arr.nodes = arr.Children;
              delete arr.indeterminate
              console.log(arr)
              tree.push(arr)
              data= ref(tree)
      
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
                  })
            }
    await get_tree()
    //
    return {
      data,
      searchText,
      onNodeExpanded,
      onCheckboxToggle,
      onToggleParentCheckbox,
      onNodeClick,
      onUpdate
    };
  },
  nodes: {
  type: Array,
  required: true,
},
props: {
  type: Object,
  default() {
    return {
      nodes: 'nodes',
      label: 'label',
    }
  },
},
indentSize: {
  type: Number,
  default: 10,
},
gap: {
  type: Number,
  default: 10,
},
searchText: {
  type: String,
  default: '',
},
expandRowByDefault: {
  type: Boolean,
  default: false,
},
expandAllRowsOnSearch: {
  type: Boolean,
  default: true,
},
});
</script>

