<!-- ShoppingCart.vue -->

<template>
  <div class="container">
    <h1 class="mt-5">Panier d'achat</h1>
    <div class="row mt-3">
      <div class="col-md-8">
        <div class="card-deck">
          <cart-item v-for="(item, index) in cartItems" :key="index" :item="item" @updateQuantity="updateQuantity(index, $event)"></cart-item>
        </div>
      </div>
      <div class="col-md-4">
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
  </div>
</template>

<script>
import CartItem from '/src/components/CartItem.vue'; 

export default {
  components: {
    CartItem 
  },
  data() {
    return {
      cartItems: [
        { id: 1, name: 'Produit 1', description: 'Description du Produit 1', price: 10, imageUrl: '/src/assets/SAC.png', quantity: 1 },
        { id: 2, name: 'Produit 2', description: 'Description du Produit 2', price: 20, imageUrl: '/src/assets/Trico.png', quantity: 1 },
        // Ajoutez d'autres produits statiques ici...
      ],
      taxRate: 0.20, // Taux de taxe (20%)
      shippingCost: 5 // Coût de livraison
    };
  },
  methods: {
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
