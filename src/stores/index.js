import { createStore } from 'vuex'
import Cookies from 'js-cookie'
import apiClient from '@/api'
import {
  addToCurrentCart,
  clearCurrentCart,
  copyGuestCartToUser,
  getCartForUser,
  getCurrentCart,
  mergeGuestCartIntoUser,
  removeFromCurrentCart,
  setCartForUser,
  updateCurrentCartItem
} from '@/utils/cartStorage'

// Hydrate the state from localStorage
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
const tokenFromLocalStorage = localStorage.getItem('token')
const panierFromLocalStorage = getCartForUser(userFromLocalStorage?.id || null)

const store = createStore({
  state: {
    user: userFromLocalStorage || null,
    token: tokenFromLocalStorage || null,
    productSearch: null,
    panier: panierFromLocalStorage || [],
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
      state.panier = Array.isArray(panier) ? panier : []
      setCartForUser(state.user?.id || null, state.panier)
    },
    addToPanier(state, produit) {
      if (!Array.isArray(state.panier)) {
        state.panier = []
      }
      state.panier.push(produit)
      setCartForUser(state.user?.id || null, state.panier)
    },
    updatePanierItem(state, produit) {
      if (!Array.isArray(state.panier)) {
        state.panier = []
      }

      const index = state.panier.findIndex((item) => item.id === produit.id)
      if (index !== -1) {
        state.panier[index] = produit
      }
      setCartForUser(state.user?.id || null, state.panier)
    },
    removeFromPanier(state, idProduit) {
      state.panier = state.panier.filter((item) => item.id !== idProduit)
      setCartForUser(state.user?.id || null, state.panier)
    },
    clearPanier(state) {
      state.panier = []
      setCartForUser(state.user?.id || null, state.panier)
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
      state.panier = getCartForUser(null)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
      commit('setPanier', getCartForUser(user?.id || null))
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

    migrateGuestCartOnLogin({ commit }, userId) {
      const merged = mergeGuestCartIntoUser(userId)
      commit('setPanier', merged)
      return merged
    },

    copyGuestCartOnRegister({ commit }, userId) {
      const copied = copyGuestCartToUser(userId)
      commit('setPanier', copied)
      return copied
    },

    async addToPanier({ commit }, produit) {
      try {
        const updated = addToCurrentCart(produit)
        commit('setPanier', updated)
      } catch (error) {
        console.error("Erreur lors de l'ajout dans le panier:", error)
      }
    },
    async updatePanierItem({ commit }, produit) {
      try {
        const updated = updateCurrentCartItem(produit)
        commit('setPanier', updated)
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'article du panier:", error)
      }
    },
    async removeFromPanier({ commit }, idProduit) {
      try {
        const updated = removeFromCurrentCart(idProduit)
        commit('setPanier', updated)
      } catch (error) {
        console.error("Erreur lors de l'ajout dans le panier:", error)
      }
    },
    async fetchPanier({ commit }) {
      try {
        commit('setPanier', getCurrentCart())
      } catch (error) {
        console.error('Erreur lors de la récupération des articles du panier:', error)
        commit('setPanier', [])
      }
    },
    async clearPanier({ commit }) {
      try {
        const cleared = clearCurrentCart()
        commit('setPanier', cleared)
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
