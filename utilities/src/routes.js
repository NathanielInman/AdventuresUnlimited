import { createWebHistory, createRouter } from 'vue-router';
import Dashboard from './routes/Dashboard.vue';
import DamageStrings from './routes/DamageStrings.vue';
import Help from './routes/Help.vue';
import Home from './routes/Home.vue';
import Items from './routes/Items.vue';
import Territory from './routes/Territory.vue';

export const routes = [
  { path: '/', name: 'DashboardIndex', component: Dashboard },
  { path: '/damageStrings', name: 'DamageStringsIndex', component: DamageStrings },
  { path: '/help', name: 'HelpIndex', component: Help },
  { path: '/home', name: 'Home', component: Home },
  { path: '/items', name: 'Items', component: Items },
  { path: '/territory', name: 'TerritoryIndex', component: Territory },
  { path: '/:catchAll(.*)', redirect: '/' }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
