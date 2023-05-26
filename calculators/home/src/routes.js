import { createWebHistory, createRouter } from 'vue-router';
import { helpRoute } from './routes/help/';
import Dashboard from './routes/Dashboard';

const routes = [
  ...helpRoute,
  {path: '/', name: 'Dashboard', component: Dashboard},
  {path: '/:catchAll(.*)', redirect: '/'}
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
