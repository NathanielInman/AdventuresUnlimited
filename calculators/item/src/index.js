import '@babel/polyfill';
import './index.styl';
import 'buefy/dist/buefy.min.css'
import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import {routes} from './routes';
import {store} from './store/';
import App from './App.vue';

// Ensure production gets no vue messages and dev gets correct ones
Vue.config.devtools = false;
if(process.env.NODE_ENV==='production'){
  Vue.config.silent = true;
  Vue.config.productionTip = false;
} //end if

// Ensure that we're using the official vue router
Vue.use(VueRouter);
Vue.use(Buefy);

// initialize the routes
const router = new VueRouter({routes});

// initialize the application
new Vue({
  el: 'app',
  router, store,
  render: h=> h(App)
});
