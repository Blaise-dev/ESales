<template>
  <div class="card">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="item.imageUrl" class="card-img" alt="Image de l'article">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text">{{ item.description }}</p> 
          <p class="card-text">{{ item.price }} €</p>
          <div class="quantity-controls">
            <div class="oval-button-group">
              <button @click="decrementQuantity" class="btn-simple">-</button>
              <span class="quantity">{{ quantity }}</span>
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
  props: {
    item: Object // Propriété pour recevoir les données de l'article
  },
  data() {
    return {
      quantity: 1 
    };
  },
  methods: {
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
  }
};
</script>

<style scoped>
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


</style>
