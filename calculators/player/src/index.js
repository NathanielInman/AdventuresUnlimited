import './index.styl';
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import Slider from 'primevue/slider';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import { router } from './routes';
import { createPinia } from 'pinia';
import App from './App.vue';

// initialize the application
createApp(App)
  .use(PrimeVue)
  .use(ToastService)
  .use(createPinia())
  .use(router)
  .component('Button', Button)
  .component('Checkbox', Checkbox)
  .component('Dropdown', Dropdown)
  .component('InputNumber', InputNumber)
  .component('InputSwitch', InputSwitch)
  .component('Slider', Slider)
  .component('Toast', Toast)
  .mount('app');
