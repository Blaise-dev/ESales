import { createStore } from 'vuex'
import Cookies from 'js-cookie'
import apiClient from '@/api'

// Hydrate the state from localStorage
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
const tokenFromLocalStorage = localStorage.getItem('token')
const panierFromLocalStorage = JSON.parse(localStorage.getItem('panier'))

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
    updateUser(state, user) {
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
      localStorage.setItem('panier', JSON.stringify(state.panier))
    },
    removeFromPanier(state, idProduit) {
      state.panier = state.panier.filter((item) => item.id !== idProduit)
      localStorage.setItem('panier', JSON.stringify(state.panier))
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
    async updateUser({ commit, state }, formData) {
      const userString = formData.get('user') // Récupérer l'objet utilisateur sous forme de chaîne JSON
      const user = JSON.parse(userString) // Parser la chaîne JSON en objet JavaScript
      const file = formData.get('file')

      try {
        var profilePhotoUrl = null

        if (file && file.size > 0) {
          // Uploader le fichier
          const uploadResponse = await apiClient.post(
            '/upload',
            { profilePhoto: file },
            {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          )

          profilePhotoUrl = uploadResponse.data.filePath
          user.photo = profilePhotoUrl
        }

        // Mettre à jour l'utilisateur avec la nouvelle photo
        const updateUserResponse = await apiClient.put('/users/' + user.id, {
          ...user
        })

        commit('updateUser', user) // Mettre à jour l'utilisateur dans le store Vuex
      } catch (error) {
        console.error('Erreur lors de la mise à jour du compte utilisateur :', error)
      }
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

    async addToPanier({ commit }, produit) {
      try {
        const response = await apiClient.post('/panier', produit)
        commit('addToPanier', produit)
      } catch (error) {
        console.error("Erreur lors de l'ajout dans le panier:", error)
      }
    },
    async removeFromPanier({ commit }, idProduit) {
      try {
        const response = await apiClient.delete('/panier/' + idProduit)
        commit('removeFromPanier', idProduit)
      } catch (error) {
        console.error("Erreur lors de l'ajout dans le panier:", error)
      }
    },
    async fetchPanier({ commit }) {
      try {
        const response = await apiClient.get('/panier')
        commit('setPanier', response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des articles du panier:', error)
      }
    },
    async clearPanier({ commit }) {
      try {
        const response = await apiClient.delete('/panier/')
        commit('clearPanier')
      } catch (error) {
        console.error("Erreur lors de l'ajout dans le panier:", error)
      }
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
    },
    async deleteAccount({ commit }, idUser) {
      try {
        await apiClient.delete('/users/' + idUser) // Assurez-vous que l'URL est correcte
        commit('clearAuthData')
        Cookies.remove('token')
      } catch (error) {
        console.error('Erreur lors de la suppression du compte:', error)
        throw error
      }
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
