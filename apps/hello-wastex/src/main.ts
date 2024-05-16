import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './app/App.vue';
import './styles.scss';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.mount('#root');
