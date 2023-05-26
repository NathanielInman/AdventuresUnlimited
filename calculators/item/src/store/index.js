import Vue from 'vue';
import Vuex from 'vuex';
import {store as user} from './user';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {user}
});
