import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

const store = createStore({
  state: {
    user: null,
    token: null,
    panier: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setPanier(state, panier) {
      state.panier = panier
      localStorage.setItem('panier', JSON.stringify(panier))
    },
    clearAuthData(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    setToken({ commit }, token) {
      commit('setToken', token)
      Cookies.set('token', token, { expires: 7 }) // Expire in 7 days
    },
    setPanier({ commit }, panier) {
      commit('setPanier', panier)
    },
    logout({ commit }) {
      commit('clearAuthData')
      Cookies.remove('token')
    }
  },
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
    panier: (state) => state.panier,
    isAuthenticated: (state) => !!state.token
  }
})

export default store
