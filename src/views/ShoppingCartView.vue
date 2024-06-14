<!-- ShoppingCart.vue -->

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
          <cart-item v-for="(item, index) in cartItems" :key="index" :item="item" @updateQuantity="updateQuantity(index, $event)"></cart-item>
        </div>
      </div>
      <div class="col-lg-4 col-md-12 mt-3 mt-lg-0">
        <div class="card custom-card">
          <div class="card-body">
            <div class="d-flex justify-content-between price-item my-2">
              <strong>Sous-total</strong>
              <strong>{{ getSubtotal() }} €</strong>
            </div>
            <div class="d-flex justify-content-between price-item my-2">
              <span>Taxe (20%)</span>
              <span>{{ getTax() }} €</span>
            </div>
            <div class="d-flex justify-content-between price-item my-2">
              <span>Livraison</span>
              <span>{{ getShipping() }} €</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between price-item my-2">
              <strong>Total</strong>
              <strong>{{ getTotalPrice() }} €</strong>
            </div>
            <div class="d-flex flex-column align-items-center mt-3">
              <button class="btn btn-primary btn-block mb-2 custom-btn" @click="proceedToCheckout">Procéder à la caisse</button>
              <button class="btn btn-secondary btn-block custom-btn" @click="continueShopping">Continuer vos achats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Passer les information au Checkout-->
  </div>
</template>

<script>
import apiClient from '@/api'
import CartItem from '@/components/CartItem.vue'; 

export default {
  components: {
    CartItem
  },
  data() {
    return {
      cartItems: [],
      errorMessage:"",
      taxRate: 0.20, // Taux de taxe (20%)
      shippingCost: 5 // Coût de livraison
    };
  },
  mounted() {
    // Récupérer les articles du panier depuis le backend JSON 
    this.fetchCartItems();
  },
  methods: {
    async fetchCartItems() {
      try {
        // Effectuer une requête GET à l'URL de notre backend JSON pour récupérer les articles du panier
        const response = await apiClient.get('/cartItems');
        this.cartItems = response.data;
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération des articles du panier: ' + error.message;
        console.error('Erreur lors de la récupération des articles du panier:', error);
      }
    },
    getSubtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    getTax() {
      return this.getSubtotal() * this.taxRate;
    },
    getShipping() {
      return this.shippingCost;
    },
    getTotalPrice() {
      return this.getSubtotal() + this.getTax() + this.getShipping();
    },
    updateQuantity(index, newQuantity) {
      this.cartItems[index].quantity = newQuantity;
    },
    proceedToCheckout() {
      // rediriger l'utilisateur vers la page de paiement ou de commande
      console.log('Procéder à la caisse');
    },
    continueShopping() {
      //  rediriger l'utilisateur vers la page d'accueil ou de shopping
      console.log('Continuer vos achats');
    }
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
