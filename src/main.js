import { createApp } from 'vue'
import { createPinia } from "pinia"
import { storagePlugin } from './stores/storagePlugin';
import App from './App.vue'
import router from "./router";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia);
pinia.use(storagePlugin)
app.use(router).mount('#app')
