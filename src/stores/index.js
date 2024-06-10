// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import apiClient from '../api.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const response = await apiClient.get('/users');
        commit('setUsers', response.data);
      } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des utilisateurs:', error);
      }
    },
  },
  getters: {
    allUsers: (state) => state.users,
  },
});
