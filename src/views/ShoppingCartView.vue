<template>
  <div class="cart-page">
    <div class="container py-5">
      <div class="cart-header mb-4">
        <h1 class="cart-title">
          <v-icon size="28" class="mr-2">mdi-cart-outline</v-icon>
          Panier d'achat
        </h1>
        <span class="cart-count" v-if="safeCartItems.length">
          {{ safeCartItems.length }} article{{ safeCartItems.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div v-if="errorMessage" class="alert-modern alert-danger-modern mb-4">
        <v-icon size="18" class="mr-2">mdi-alert-circle-outline</v-icon>
        {{ errorMessage }}
      </div>

      <div class="cart-layout">
        <div class="cart-items-col">
          <div v-if="safeCartItems.length > 0">
            <cart-item
              v-for="(item, index) in safeCartItems"
              :key="item.id"
              :item="item"
              @updateQuantity="updateQuantity(index, $event)"
              @removeItem="removeItem"
            />
          </div>
          <div v-else class="cart-empty">
            <v-icon size="64" class="cart-empty-icon">mdi-cart-off</v-icon>
            <h3>Votre panier est vide</h3>
            <p>Ajoutez des articles pour continuer.</p>
            <RouterLink to="/" class="btn btn-modern mt-3">Parcourir la boutique</RouterLink>
          </div>
        </div>

        <div class="cart-summary-col" v-if="safeCartItems.length > 0">
          <div class="cart-summary-card">
            <h2 class="summary-title">Récapitulatif</h2>
            <div class="summary-row">
              <span>Sous-total</span>
              <strong>{{ getSubtotal.toFixed(2) }} €</strong>
            </div>
            <div class="summary-row">
              <span>Taxe (20%)</span>
              <span>{{ getTax.toFixed(2) }} €</span>
            </div>
            <div class="summary-row">
              <span>Livraison</span>
              <span class="text-success-green">Standard</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total">
              <strong>Total</strong>
              <strong class="total-amount">{{ getTotalPrice }} €</strong>
            </div>
            <button class="btn btn-modern w-100 mt-4" @click="proceedToCheckout">
              <v-icon left size="18" class="mr-1">mdi-lock-outline</v-icon>
              Passer la commande
            </button>
            <button class="btn btn-outline-cart w-100 mt-2" @click="continueShopping">
              Continuer mes achats
            </button>
            <div class="trust-badges">
              <span><v-icon size="14">mdi-shield-check-outline</v-icon> Sécurisé</span>
              <span><v-icon size="14">mdi-truck-fast-outline</v-icon> Livraison rapide</span>
              <span><v-icon size="14">mdi-refresh</v-icon> Retours faciles</span>
            </div>

            <div class="summary-note">
              Paiement protégé et confirmation instantanée après validation.
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
import CartItem from '@/components/CartItem.vue';

export default {
  components: {
    CartItem
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const safeCartItems = computed(() => {
      const items = store.getters.panier
      return Array.isArray(items) ? items : []
    })

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
      const item = safeCartItems.value[index];
      if (!item) return
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
      return safeCartItems.value.reduce((total, item) => total + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
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
      safeCartItems,
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

<style scoped>
.cart-page { min-height: 60vh; background: var(--bg); color: var(--text); }
.cart-header { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.cart-title { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 800; color: var(--text); display: flex; align-items: center; margin: 0; }
.cart-count { background: var(--primary); color: #fff; border-radius: 999px; padding: 3px 14px; font-size: 0.82rem; font-weight: 700; }
.alert-modern { display: flex; align-items: center; padding: 1rem 1.25rem; border-radius: var(--radius-sm); font-size: 0.9rem; }
.alert-danger-modern { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #dc2626; }
.cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: 2rem; align-items: start; }
@media (max-width: 991px) { .cart-layout { grid-template-columns: 1fr; } }
.cart-empty { text-align: center; padding: 4rem 2rem; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); }
.cart-empty-icon { color: var(--text-soft); opacity: 0.4; margin-bottom: 1rem; }
.cart-empty h3 { color: var(--text); font-weight: 700; margin-bottom: 0.5rem; }
.cart-empty p { color: var(--text-soft); }
.cart-summary-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-sm); position: sticky; top: 90px; }
.summary-title { font-size: 1.1rem; font-weight: 800; color: var(--text); margin-bottom: 1.25rem; }
.summary-row { display: flex; justify-content: space-between; align-items: center; padding: 0.55rem 0; font-size: 0.92rem; color: var(--text-soft); }
.summary-divider { height: 1px; background: var(--border); margin: 0.75rem 0; }
.summary-total { font-size: 1rem; color: var(--text); }
.total-amount { font-size: 1.4rem; color: var(--primary); font-weight: 800; }
.text-success-green { color: #10b981; font-weight: 600; }
.btn-outline-cart { background: transparent; border: 1.5px solid var(--border); border-radius: 999px; padding: 0.55rem 1.2rem; color: var(--text-soft); font-weight: 600; transition: border-color var(--ease), color var(--ease); }
.btn-outline-cart:hover { border-color: var(--primary); color: var(--primary); }
.trust-badges { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 0.75rem; color: var(--text-soft); }
.trust-badges span { display: flex; align-items: center; gap: 4px; }
.summary-note {
  margin-top: .75rem;
  font-size: .78rem;
  color: var(--text-soft);
  text-align: center;
}
</style>
