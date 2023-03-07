import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store  from "./store";
import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';
// import VueTreeList from 'vue-tree-list'



const app = createApp(App)

//axios 설정 
//axios.defaults.baseURL= "localhost:8001";
//app.config.globalProperties.axios = axios; 

//그룹 트리 사용
let defaultoptions = {treeName:'blocks-tree'}
app.use(VueBlocksTree)

app.use(store)
app.use(router)
app.mount('#app')
