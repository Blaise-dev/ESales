<template>
  <div class="container">
    <h1 class="mt-5">Panier d'achat</h1>
    <div class="row mt-3">
      <div class="col-lg-8 col-md-12">
        <!-- Ajout du message d'erreur -->
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <div class="card-deck">
          <cart-item 
            v-for="(item, index) in cartItems" 
            :key="item.id" 
            :item="item" 
             @updateQuantity="updateQuantity(index, $event)"
          ></cart-item>
      </div>
      </div>
      <div class="col-lg-4 col-md-12 mt-3 mt-lg-0">
        <div class="card custom-card">
          <div class="card-body">
            <div class="d-flex justify-content-between price-item my-2">
              <strong>Sous-total</strong>
              <strong>{{ getSubtotal }} €</strong>
            </div>
            <div class="d-flex justify-content-between price-item my-2">
              <span>Taxe (20%)</span>
              <span>{{ getTax }} €</span>
            </div>
            <div class="d-flex justify-content-between price-item my-2">
              <span>Livraison</span>
              <span>{{ getShipping }} €</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between price-item my-2">
              <strong>Total</strong>
              <strong>{{ getTotalPrice }} €</strong>
            </div>
            <div class="d-flex flex-column align-items-center mt-3">
              <button class="btn btn-primary btn-block mb-2 custom-btn" @click="proceedToCheckout">Procéder à la caisse</button>
              <button class="btn btn-secondary btn-block custom-btn" @click="continueShopping">Continuer vos achats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Passer les informations au Checkout-->
  </div>
</template>

<script>
import { ref } from 'vue'; 

import apiClient from '@/api';
import CartItem from '@/components/CartItem.vue'; 

export default {
  components: {
    CartItem
  },
  setup() {
    const cartItems = ref([]); // Utiliser ref pour créer une référence réactive

    const errorMessage = ref("");

    // Méthode pour récupérer les articles du panier
    const fetchCartItems = async () => {
      try {
        const response = await apiClient.get('/panier');
        cartItems.value = response.data; // Utiliser .value pour accéder à la valeur réelle
      } catch (error) {
        errorMessage.value = 'Erreur lors de la récupération des articles du panier: ' + error.message;
        console.error('Erreur lors de la récupération des articles du panier:', error);
      }
    };

    // Méthode pour mettre à jour la quantité d'un article
    const updateQuantity = async (index, newQuantity) => {
      const item = cartItems.value[index];
      const updatedItem = { ...item, quantity: newQuantity };

      try {
        // Envoyer une requête PUT à l'URL de notre backend JSON pour mettre à jour la quantité de l'article dans le panier
        await apiClient.put(`/panier/${item.id}`, updatedItem);
        cartItems.value[index] = updatedItem; // Mettre à jour l'article dans le tableau réactif
      } catch (error) {
        errorMessage.value = 'Erreur lors de la mise à jour de la quantité de l\'article: ' + error.message;
        console.error('Erreur lors de la mise à jour de la quantité de l\'article:', error);
      }
    };

    // Méthode pour supprimer un article du panier
    const removeItem = async (index) => {
      const item = cartItems.value[index];

      try {
        // Envoyer une requête DELETE à l'URL de notre backend JSON pour supprimer l'article du panier
        await apiClient.delete(`/panier/${item.id}`);
        cartItems.value.splice(index, 1); // Supprimer l'article du tableau réactif
      } catch (error) {
        errorMessage.value = 'Erreur lors de la suppression de l\'article du panier: ' + error.message;
        console.error('Erreur lors de la suppression de l\'article du panier:', error);
      }
    };

    // Méthode pour rediriger vers la page de paiement
    const proceedToCheckout = () => {
      // rediriger l'utilisateur vers la page de paiement ou de commande
      this.$router.push('/checkout') 
      console.log('Procéder à la caisse')
    };

    // Méthode pour rediriger vers la page d'accueil ou de shopping
    const continueShopping = () => {
      // rediriger l'utilisateur vers la page d'accueil ou de shopping
      this.$router.push('/') 
      console.log('Continuer vos achats');
    };

    return {
      cartItems,
      errorMessage,
      fetchCartItems,
      updateQuantity,
      removeItem,
      proceedToCheckout,
      continueShopping
    };
  }
};
</script>

<style scoped>
.custom-card {
  width: 80%; /* Ajuste la taille du cadre */
}

.custom-btn {
  width: 80%; /* Ajuste la taille des boutons */
}

.price-item > span:first-child {
  margin-right: 5px; /* Ajuste l'espace entre le texte et le montant */
}
</style>
