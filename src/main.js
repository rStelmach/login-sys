import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import store from './store';
import router from './router';
import './styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
