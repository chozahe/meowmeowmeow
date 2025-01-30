import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);


app.use(store);
app.use(router);

store.dispatch('loadToken');


app.mount('#app');
