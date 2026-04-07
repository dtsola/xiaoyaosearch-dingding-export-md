import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/styles/tailwind.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
