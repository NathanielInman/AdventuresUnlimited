import {helpRoute} from './routes/help/';
import Dashboard from './routes/Dashboard';

export const routes = [
  ...helpRoute,
  {path: '/dashboard', component: Dashboard},
  {path: '*', redirect: '/dashboard'}
];

