// Stylesheets are bundled from node_modules so they stay on the installed
// versions; the order matches the old CDN links, with app styles last.
import 'minireset.css/minireset.css';
import 'primevue/resources/themes/nova/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'font-awesome/css/font-awesome.css';
import './index.styl';
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Textarea from 'primevue/textarea';
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
  .component('InputText', InputText)
  .component('Slider', Slider)
  .component('TabPanel', TabPanel)
  .component('TabView', TabView)
  .component('Textarea', Textarea)
  .component('Toast', Toast)
  .mount('app');
