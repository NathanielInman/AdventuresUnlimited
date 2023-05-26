import './index.styl';
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import { router } from './routes';
import { createPinia } from 'pinia';
import App from './App.vue';

// initialize the application
createApp(App)
  .use(PrimeVue)
  .use(createPinia())
  .use(router)
  .mount('app');
