import { createStore } from 'vuex';
import { store as user } from './user';

export const store = createStore({
  modules: {user}
});
