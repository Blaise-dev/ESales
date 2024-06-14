<template>
  <div class="card mb-3 cart-item">
    <div class="row no-gutters">
      <div class="col-md-4 image-container">
        <img :src="item.image" class="card-img-top centered-image" alt="Image de l'article">
      </div>
      <div class="col-md-8 text-container">
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text">{{ item.description }}</p> 
          <p class="card-text"><strong>{{ item.price * item.quantity }} €</strong></p>
          <div class="quantity-controls">
            <div class="oval-button-group">
              <button @click="decrementQuantity" class="btn-simple">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button @click="incrementQuantity" class="btn-simple">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: Object // Propriété pour recevoir les données de l'article
  },
  methods: {
    incrementQuantity() {
      this.item.quantity++;
      this.$emit('updateQuantity', this.item.quantity);
    },
    decrementQuantity() {
      if (this.item.quantity > 1) {
        this.item.quantity--;
        this.$emit('updateQuantity', this.item.quantity);
      }
    }
  }
};
</script>

<style scoped>
.cart-item {
  max-width: 100%;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls button {
  margin: 0 5px;
  border-radius: 20px; /* Rendre les boutons ovales */
}

.quantity {
  margin: 0 10px;
}

.card-img {
  width: 100%;
}

.btn-simple {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.oval-button-group {
  border-radius: 20px;
  background-color: #f0f0f0; 
  padding: 5px; 
}

/* Ajout de styles pour centrer l'image */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Maintient les proportions de l'image */
}

/* Ajouter du padding à gauche pour décaler le texte vers la droite */
.text-container {
  padding-left: 20px; 
}
</style>
