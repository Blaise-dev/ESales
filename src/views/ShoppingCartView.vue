<template>
  <div class="container">
    <h1 class="mt-5">Panier d'achat</h1>
    <div class="row mt-3">
      <div class="col-lg-8 col-md-12">
        <!-- Message d'erreur en cas de problème -->
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <!-- Affichage des articles du panier avec CartItem -->
        <div class="card-deck" v-if="cartItems.length > 0">
          <cart-item
            v-for="(item, index) in cartItems"
            :key="item.id"
            :item="item"
            @updateQuantity="updateQuantity(index, $event)"
            @removeItem="removeItem(item.id)"
          ></cart-item>
        </div>
        <div v-else class="alert alert-info" role="alert">
          Votre panier est vide.
        </div>
      </div>
      <div class="col-lg-4 col-md-12 mt-3 mt-lg-0">
        <!-- Résumé du panier -->
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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; 
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import apiClient from '@/api';
import CartItem from '@/components/CartItem.vue';

export default {
  components: {
    CartItem
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const cartItems = computed(() => store.getters.panier);
    console.log(cartItems)

    const errorMessage = ref(""); // Message d'erreur en cas de problème de chargement

    // Méthode pour récupérer les articles du panier depuis le backend
    const fetchCartItems = async () => {
      try {
        await store.dispatch('fetchPanier');
      } catch (error) {
        errorMessage.value = 'Erreur lors de la récupération des articles du panier: ' + error.message;
        console.error('Erreur lors de la récupération des articles du panier:', error);
      }
    };

    // Méthode pour mettre à jour la quantité d'un article dans le panier
    const updateQuantity = async (index, newQuantity) => {
      const item = cartItems.value[index];
      const updatedItem = { ...item, quantity: newQuantity };

      try {
        await store.dispatch('updatePanierItem', updatedItem);
      } catch (error) {
        errorMessage.value = 'Erreur lors de la mise à jour de la quantité de l\'article: ' + error.message;
        console.error('Erreur lors de la mise à jour de la quantité de l\'article:', error);
      }
    };

      // Méthode pour supprimer un article du panier
    const removeItem = async (itemId) => {
      try {
        await store.dispatch('removeFromPanier', itemId);
      } catch (error) {
        errorMessage.value = 'Erreur lors de la suppression de l\'article du panier: ' + error.message;
        console.error('Erreur lors de la suppression de l\'article du panier:', error);
      }
    };

    // Méthode pour rediriger vers la page de paiement
    const proceedToCheckout = () => {
      router.push('/checkout') 
      console.log('Procéder à la caisse');
    };

    // Méthode pour rediriger vers la page d'accueil 
    const continueShopping = () => {
      router.push('/') 
      console.log('Continuer vos achats');
    };

    // Appeler fetchCartItems() au chargement du composant pour charger les articles du panier
    onMounted(fetchCartItems);

    // Calcul du sous-total du panier
    const getSubtotal = computed(() => {
      return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    });

    // Calcul de la taxe (20%)
    const getTax = computed(() => {
      return getSubtotal.value * 0.20;
    });

    // Coût fixe de la livraison
    const getShipping = 0; 

    // Calcul du total
    const getTotalPrice = computed(() => {
      let totalPrice = getSubtotal.value + getTax.value + getShipping;
      return totalPrice.toFixed(2);
    });

    return {
      cartItems,
      removeItem,
      errorMessage,
      updateQuantity,
      getSubtotal,
      getTax,
      getShipping,
      getTotalPrice,
      proceedToCheckout,
      continueShopping
    };
  }
};
</script>

<style scoped></style>
