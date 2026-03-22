<template>
  <div class="checkout-page">
    <div class="container py-5">
      <h1 class="checkout-title mb-5">
        <v-icon size="26" class="mr-2">mdi-package-variant-closed</v-icon>
        Finaliser la commande
      </h1>

      <div class="checkout-layout">
        <!-- Formulaire livraison -->
        <div class="checkout-form-col">
          <div class="checkout-card">
            <h2 class="checkout-card-title">
              <v-icon size="20" class="mr-2">mdi-truck-delivery-outline</v-icon>
              Informations de livraison
            </h2>
            <form @submit.prevent="submitForm" class="checkout-form">
              <div class="field-group" v-if="savedAddresses.length">
                <label>Choisir une adresse enregistrée</label>
                <select class="field-input" v-model="selectedAddressId" @change="applySelectedAddress">
                  <option value="">-- Sélectionner --</option>
                  <option
                    v-for="address in savedAddresses"
                    :key="address.id"
                    :value="String(address.id)"
                  >
                    {{ address.fullName }} — {{ address.address }}
                  </option>
                </select>
              </div>

              <div class="form-row-grid">
                <div class="field-group">
                  <label>Nom <span class="req">*</span></label>
                  <input type="text" class="field-input" v-model="deliveryInfo.name" placeholder="Dupont" required />
                </div>
                <div class="field-group">
                  <label>Prénom <span class="req">*</span></label>
                  <input type="text" class="field-input" v-model="deliveryInfo.prenom" placeholder="Marie" required />
                </div>
              </div>
              <div class="form-row-grid">
                <div class="field-group">
                  <label>Email <span class="req">*</span></label>
                  <input type="email" class="field-input" v-model="deliveryInfo.email" placeholder="marie@email.com" required />
                </div>
                <div class="field-group">
                  <label>Téléphone <span class="req">*</span></label>
                  <input type="tel" class="field-input" v-model="deliveryInfo.phone" placeholder="+33627379360" required />
                </div>
              </div>
              <div class="field-group">
                <label>Pays <span class="req">*</span></label>
                <input type="text" class="field-input" v-model="deliveryInfo.country" placeholder="France" required />
              </div>
              <div class="form-row-grid">
                <div class="field-group">
                  <label>Département</label>
                  <input type="text" class="field-input" v-model="deliveryInfo.department" placeholder="Ille-et-Vilaine" />
                </div>
                <div class="field-group">
                  <label>Ville <span class="req">*</span></label>
                  <input type="text" class="field-input" v-model="deliveryInfo.city" placeholder="Rennes" required />
                </div>
              </div>
              <div class="field-group">
                <label>Adresse complète <span class="req">*</span></label>
                <input type="text" class="field-input" v-model="deliveryInfo.address" placeholder="123 rue de la Paix" required />
              </div>
              <div class="field-group">
                <label>Commentaires</label>
                <textarea class="field-input" rows="3" v-model="deliveryInfo.comments" placeholder="Instructions spéciales..."></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="btn btn-back" @click="goBack">
                  <v-icon size="16" class="mr-1">mdi-arrow-left</v-icon> Retour
                </button>
                <button type="submit" class="btn btn-modern">
                  <v-icon size="16" class="mr-1">mdi-check-circle-outline</v-icon> Valider
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Récapitulatif -->
        <div class="checkout-summary-col">
          <div class="checkout-card sticky-card">
            <h2 class="checkout-card-title">
              <v-icon size="20" class="mr-2">mdi-receipt-outline</v-icon>
              Récapitulatif
            </h2>
            <div v-if="errorMessage" class="alert-inline mb-3">{{ errorMessage }}</div>
            <div v-if="cartItems.length === 0" class="empty-cart-msg">Votre panier est vide.</div>
            <div v-else class="summary-items">
              <div v-for="(item, index) in cartItems" :key="index" class="summary-item">
                <img :src="item.image" class="summary-item-img" :alt="item.name" />
                <div class="summary-item-info">
                  <p class="summary-item-name">{{ item.name }}</p>
                  <p class="summary-item-price">{{ item.price }} € × {{ item.quantity }}</p>
                </div>
              </div>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-total-row">
              <span>Total</span>
              <strong class="summary-total-amount">{{ getTotalPrice() }} €</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAddressId: '',
      savedAddresses: [],
      deliveryInfo: {
        name: '',
        prenom:'',
        country:'',
        department:'',
        city:'',
        address: '',
        phone: '',
        email: '',
        comments: ''
      },
      cartItems: [] ,
      errorMessage:"",
      taxRate: 0.2, 
      shippingCost: 0
    };
  },
  mounted() {
    // Récupérez les articles du panier depuis le backend JSON lors du montage du composant
    this.fetchCartItems();
    this.prefillDeliveryFromAccount();
  },
  methods: {
    async fetchCartItems() {
      try {
        await this.$store.dispatch('fetchPanier')
        const items = this.$store.getters.panier
        this.cartItems = Array.isArray(items) ? items : []
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération des articles du panier: ' + error.message
        console.error('Erreur lors de la récupération des articles du panier:', error)
      }
    },
    getTotalPrice() {
      // Calcul du sous-total
      const subtotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Calcul de la taxe
      const tax = subtotal * this.taxRate;
      
      // Calcul du coût total avec taxe et livraison
      const totalPrice = subtotal + tax + this.shippingCost;
      
      // Retourner le prix total arrondi à deux décimales
      return totalPrice.toFixed(2);
    },
    prefillDeliveryFromAccount() {
      const user = this.$store.getters.user || {}
      const addresses = Array.isArray(user.addresses) ? user.addresses : []
      this.savedAddresses = addresses
      const primaryAddress = addresses[0] || {}

      if (primaryAddress?.id != null) {
        this.selectedAddressId = String(primaryAddress.id)
      }

      this.deliveryInfo = {
        ...this.deliveryInfo,
        name: this.deliveryInfo.name || user.nom || (primaryAddress.fullName || '').split(' ')[0] || '',
        prenom: this.deliveryInfo.prenom || user.prenom || (primaryAddress.fullName || '').split(' ').slice(1).join(' ') || '',
        country: this.deliveryInfo.country || user.country || 'France',
        department: this.deliveryInfo.department || primaryAddress.department || '',
        city: this.deliveryInfo.city || primaryAddress.city || '',
        address: this.deliveryInfo.address || primaryAddress.address || '',
        phone: this.deliveryInfo.phone || primaryAddress.phoneNumber || user.phone || '',
        email: this.deliveryInfo.email || primaryAddress.email || user.email || '',
        comments: this.deliveryInfo.comments || ''
      }
    },
    applySelectedAddress() {
      if (!this.selectedAddressId) return
      const selected = this.savedAddresses.find(
        (address) => String(address.id) === String(this.selectedAddressId)
      )
      if (!selected) return

      const [firstName = '', ...rest] = String(selected.fullName || '').split(' ')
      const lastName = rest.join(' ')

      this.deliveryInfo = {
        ...this.deliveryInfo,
        name: firstName || this.deliveryInfo.name,
        prenom: lastName || this.deliveryInfo.prenom,
        city: selected.city || this.deliveryInfo.city,
        address: selected.address || this.deliveryInfo.address,
        phone: selected.phoneNumber || this.deliveryInfo.phone,
        email: selected.email || this.deliveryInfo.email
      }
    },
    goBack() {
      this.$router.push('/shoppingcart')
    },
    submitForm() {
      if (!this.cartItems.length) {
        this.errorMessage = 'Votre panier est vide. Ajoutez des articles avant de continuer.'
        return
      }

      const payload = {
        deliveryInfo: { ...this.deliveryInfo },
        items: this.cartItems,
        price: Number(this.getTotalPrice()),
        subtotal: Number(this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)),
        tax: Number((this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * this.taxRate).toFixed(2)),
        shippingCost: Number(this.shippingCost)
      }

      this.$store.dispatch('updatePaymentData', payload)
      this.$router.push('/paiement')
    }
  }
};
</script>


<style scoped>
.checkout-page { background: var(--bg); color: var(--text); min-height: 60vh; }
.checkout-title { font-size: clamp(1.4rem,3vw,2rem); font-weight: 800; color: var(--text); display: flex; align-items: center; }
.checkout-layout { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; align-items: start; }
@media (max-width: 991px) { .checkout-layout { grid-template-columns: 1fr; } }
.checkout-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-sm); }
.sticky-card { position: sticky; top: 90px; }
.checkout-card-title { font-size: 1.05rem; font-weight: 700; color: var(--text); display: flex; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
.checkout-form { display: flex; flex-direction: column; gap: 1rem; }
.form-row-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 575px) { .form-row-grid { grid-template-columns: 1fr; } }
.field-group { display: flex; flex-direction: column; gap: 5px; }
.field-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-soft); }
.req { color: #ef4444; }
.field-input { width: 100%; padding: 0.65rem 1rem; background: var(--bg-alt); border: 1.5px solid var(--border); border-radius: 10px; color: var(--text); font-size: 0.92rem; transition: border-color var(--ease); outline: none; resize: vertical; }
.field-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
.form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; flex-wrap: wrap; margin-top: 0.5rem; }
.btn-back { background: var(--surface-muted); border: 1.5px solid var(--border); border-radius: 999px; padding: 0.6rem 1.4rem; color: var(--text-soft); font-weight: 600; display: flex; align-items: center; transition: border-color var(--ease), color var(--ease); cursor: pointer; }
.btn-back:hover { border-color: var(--primary); color: var(--primary); }
.alert-inline { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); border-radius: 8px; padding: 0.75rem 1rem; color: #dc2626; font-size: 0.88rem; }
.empty-cart-msg { color: var(--text-soft); font-style: italic; text-align: center; padding: 1.5rem 0; }
.summary-items { display: flex; flex-direction: column; gap: 0.85rem; max-height: 340px; overflow-y: auto; }
.summary-item { display: flex; gap: 0.75rem; align-items: center; }
.summary-item-img { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border); flex-shrink: 0; }
.summary-item-info { flex: 1; }
.summary-item-name { font-size: 0.88rem; font-weight: 600; color: var(--text); margin: 0; }
.summary-item-price { font-size: 0.82rem; color: var(--text-soft); margin: 2px 0 0; }
.summary-divider { height: 1px; background: var(--border); margin: 1rem 0; }
.summary-total-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.95rem; color: var(--text-soft); }
.summary-total-amount { font-size: 1.35rem; font-weight: 800; color: var(--primary); }
</style>
