import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

// Hydrate the state from localStorage
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
const tokenFromLocalStorage = localStorage.getItem('token')
const panierFromLocalStorage = localStorage.getItem('panier')

const store = createStore({
  state: {
    user: userFromLocalStorage || null,
    token: tokenFromLocalStorage || null,
    productSearch: null,
    panier: panierFromLocalStorage || null,
    paymentData: null
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
    setProductSearch(state, search) {
      state.productSearch = search
    },
    setPanier(state, panier) {
      state.panier = panier
      localStorage.setItem('panier', JSON.stringify(panier))
    },
    addToPanier(state, produit) {
      state.panier.push(produit)
      localStorage.setItem('panier', JSON.stringify(panier))
    },
    removeFromPanier(state, idProduit) {
      state.panier = state.panier.filter((item) => item.id !== idProduit)
      localStorage.setItem('panier', JSON.stringify(panier))
    },
    clearPanier(state) {
      state.panier = null
      localStorage.removeItem('panier')
    },
    setPaymentData(state, data) {
      state.paymentData = data
    },
    clearPaymentData(state) {
      state.paymentData = null
    },
    clearAuthData(state) {
      state.user = null
      state.token = null
      state.panier = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('panier')
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
    setProductSearch({ commit }, search) {
      commit('setProductSearch', search)
    },
    setPanier({ commit }, panier) {
      commit('setPanier', panier)
    },
    addToPanier({ commit }, produit) {
      commit('addToPanier', produit)
    },
    removeFromPanier({ commit }, idProduit) {
      commit('removeFromPanier', idProduit)
    },
    clearPanier({ commit }) {
      commit('clearPanier')
    },
    updatePaymentData({ commit }, data) {
      commit('setPaymentData', data)
    },
    clearPaymentData({ commit }) {
      commit('clearPaymentData')
    },
    logout({ commit }) {
      commit('clearAuthData')
      Cookies.remove('token')
    }
  },
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
    productSearch: (state) => state.productSearch,
    panier: (state) => state.panier,
    paymentData: (state) => state.paymentData,
    isAuthenticated: (state) => !!state.token
  }
})

export default store
