<template>
  <div>
    <input v-model="searchText" type="text" />
    <Tree :nodes="data"
      :search-text="searchText"
      :use-checkbox="true"
      :use-icon="false"
      use-row-delete
      show-child-count
      @nodeExpanded="onNodeExpanded"
      @update:nodes="onUpdate"
      @nodeClick="onNodeClick"
    />
  </div>
</template>
  
  <script>
  import { ref } from "vue";
  import Tree from "vue3-tree";
  import "vue3-tree/dist/style.css";
  
  export default {
    components: {
      Tree,
    },
    setup() {
      const data = ref([
        {
          id: 1,
          label: "Animal",
          nodes: [
            {
              id: 2,
              label: "Dog",
            },
            {
              id: 3,
              label: "Cat",
              nodes: [
                {
                  id: 4,
                  label: "Egyptian Mau Cat",
                },
                {
                  id: 5,
                  label: "Japanese Bobtail Cat",
                },
              ],
            },
          ],
        },
        {
          id: 6,
          label: "People",
        },
      ]);
      const searchText = ref("");
      const onNodeExpanded = (node, state) => {
        console.log("state: ", state);
        console.log("node: ", node);
      };
  
      const onUpdate = (nodes) => {
        console.log("nodes:", nodes);
      };
  
      const onNodeClick = (node) => {
        console.log(node);
      };
  
      return {
        data,
        searchText,
        onNodeExpanded,
        onUpdate,
        onNodeClick,
      };
    },
  };
  </script>
  
