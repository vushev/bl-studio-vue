import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App);

app.config.globalProperties.$baseUrl = process.env.VUE_APP_BASE_URL;

app.use(router);
app.use(store);

app.mount('#app');