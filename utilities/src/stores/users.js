import { defineStore } from 'pinia';

export const usersStore = defineStore('users', {
  state () {
    return {
      name: 'Nathaniel Inman'
    };
  },
  getters: {},
  actions: {}
});
