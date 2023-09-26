import { createApp } from 'vue'
import { createPinia } from "pinia"
import { storagePlugin } from './stores/storagePlugin';
import App from './App.vue'
import router from "./router";

createApp(App).use(createPinia());
createPinia().use(storagePlugin)
createApp(App).use(router).mount('#app')
