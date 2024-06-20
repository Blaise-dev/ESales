<template>
  <div class="container">
    <div class="row">
      <!-- Formulaire de livraison -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Information de livraison</h5>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" class="form-control" id="name" v-model="deliveryInfo.name" required>
              </div>
              <div class="form-group">
                <label for="name">Prenom</label>
                <input type="text" class="form-control" id="prenom" v-model="deliveryInfo.prenom" required>
              </div>
              <div class="form-row">
              <div class="form-group col-md-6">
                <label for="department">Email</label>
                <input type="email" class="form-control" id="email" v-model="deliveryInfo.email" required>
              </div>
              <div class="form-group col-md-6">
                <label for="phone">Téléphone</label>
                <input type="tel" class="form-control" id="phone" v-model="deliveryInfo.phone" required>
              </div>
            </div>
              <div class="form-group">
                <label for="phone">Pays</label>
                <input type="tel" class="form-control" id="country" v-model="deliveryInfo.country" required>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="department">Département</label>
                  <input type="text" class="form-control" id="department" v-model="deliveryInfo.department" required>
               </div>
              <div class="form-group col-md-6">
                   <label for="city">Ville</label>
                   <input type="text" class="form-control" id="city" v-model="deliveryInfo.city" required>
              </div>
            </div>
              <div class="form-group">
                <label for="address">Adresse</label>
                <input type="text" class="form-control" id="address" v-model="deliveryInfo.address" required>
              </div>
              <div class="form-group">
                <label for="comments">Commentaires</label>
                <textarea class="form-control" id="comments" rows="3" v-model="deliveryInfo.comments"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" @click="proceedPaiement">Valider la commande</button>
              <button type="button" class="btn btn-secondary ml-2" @click="goBack">Retour au panier</button>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Liste des articles du panier -->
      <div class="col-md-6 text-container">
        <div class="card summary-card">
          <div class="card-body">
            <h5 class="card-title">Récapitulatif de commande</h5>
            <hr>
             <!-- Ajout du message d'erreur -->
             <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
            </div>
             <!-- Affichage des articles du panier -->
             <div v-if="cartItems.length === 0" class="alert alert-info" role="alert">
              Votre panier est vide.
            </div>
            <div v-else>
            <div v-for="(item, index) in cartItems" :key="index" class="media mb-3">
              <img :src="item.image" class="mr-3" alt="Image de l'article" style="max-width: 100px;">
              <div class="media-body">
                  <h5 class="mt-0">{{ item.name }}</h5>
                  <p>{{ item.price }} € x {{ item.quantity }}</p>
                </div>
              </div>
            </div>
            <!-- Total -->
            <hr>
            <div class="d-flex justify-content-between mt-3 mb-3"> 
              <div class="total-price">
                <strong>Total:</strong>
              </div>
              <div class="item-price">
              <strong>{{ getTotalPrice() }} €</strong>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import apiClient from '@/api';

export default {
  data() {
    return {
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
  },
  methods: {
    async fetchCartItems() {
      try {
        // Effectuez une requête GET à l'URL de votre backend JSON pour récupérer les articles du panier
        const response = await apiClient.get('/panier');
        this.cartItems = response.data;
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération des articles du panier: ' + error.message;
        console.error('Erreur lors de la récupération des articles du panier:', error);
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
    proceedPaiement(){
      this.$router.push('/Cpaiement') 
      console.log('Procéder à la caisse')
    }
  }
};
</script>


<style scoped>
  label {
    text-align: left;
    display: block;
    margin-bottom: 5px;
  }

  .media-body h5, 
  .media-body p {
    text-align: left;
    margin-bottom: 0; 
  }

  .summary-card {
    max-width: 500px; /* Limite la largeur de la carte de récapitulatif */
    margin-left: auto;
    margin-right: auto;
  }

  .total-price {
    margin-left: 10px; /* Ajuste la marge en haut du conteneur total-price */
  }

  .item-price {
    margin-right: 10px; /* Ajuste la marge en haut du conteneur total-price */
  }
</style>
