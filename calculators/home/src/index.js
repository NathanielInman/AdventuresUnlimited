import 'core-js/stable';
import './index.styl';
import 'primeflex/primeflex.css';
import 'buefy/dist/buefy.min.css';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import Slider from 'primevue/slider';
import { router } from './routes';
import { store } from './store/';
import App from './App.vue';

// initialize the application
createApp(App)
  .use(PrimeVue)
  .use(store)
  .use(router)
  .component('Button', Button)
  .component('Checkbox', Checkbox)
  .component('Dropdown', Dropdown)
  .component('InputNumber', InputNumber)
  .component('InputSwitch', InputSwitch)
  .component('Slider', Slider)
  .mount('app');
