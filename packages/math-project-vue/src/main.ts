import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "virtual:uno.css";
import router from './router'
import i18nPlugin from './plugins/i18n';

const app = createApp(App)
app.use(i18nPlugin)
app.use(router).mount('#app')