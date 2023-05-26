import { createWebHistory, createRouter } from 'vue-router';
import Dashboard from './routes/Dashboard.vue';
import Help from './routes/Help.vue';

export const routes = [
  { path: '/', name: 'DashboardIndex', component: Dashboard },
  { path: '/help', name: 'HelpIndex', component: Help },
  { path: '/:catchAll(.*)', redirect: '/' }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
