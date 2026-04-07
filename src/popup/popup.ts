import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PopupView from './PopupView.vue';
import '../sidepanel/assets/styles/tailwind.css';

const app = createApp(PopupView);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
