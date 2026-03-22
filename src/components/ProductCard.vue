<!-- ProductCard.vue -->
<template>
  <div class="col-md-3 mb-4">
    <RouterLink :to="{ name: 'products', params: { id: productId } }" class="link_product">
      <div class="card product-card surface-card h-100">
        <img :src="imageSrc" class="card-img-top size" :alt="productTitle" />
        <div class="card-body">
          <h5 class="card-title">{{ productTitle }}</h5>
          <p class="card-text product-price">{{ productPrice }} €</p>
          <div class="card-reviews">
            <span
              v-for="star in 5"
              :key="star"
              class="fa fa-star"
              :class="{ checked: star <= productRating }"
            ></span>
            <p>({{ productReviews }} commentaire(s))</p>
          </div>
          <button @click.prevent="addToCart" class="btn btn-modern mt-2 w-100">
            <v-icon left>mdi-cart-plus</v-icon> Ajouter au panier
          </button>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'ProductCard',
  props: {
    productId: {
      type: Number,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    },
    productTitle: {
      type: String,
      required: true
    },
    productPrice: {
      type: String,
      required: true
    },
    productRating: {
      type: Number,
      required: true
    },
    productReviews: {
      type: Number,
      required: true
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToPanier', {
        id: this.productId,
        name: this.productTitle,
        price: this.productPrice,
        image: this.imageSrc,
        quantity: 1
      })
    }
  }
}
</script>

<style scoped>
.checked {
  color: #f59e0b;
}

.link_product {
  text-decoration: none;
}

.size {
  height: 300px;
  width: 100%;
  object-fit: cover;
}

.product-card {
  overflow: hidden;
}

.product-card .card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.card-title {
  height: 60px;
  font-size: 17px;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Nombre de lignes avant coupure */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
}

.card-reviews {
  color: #64748b;
  font-size: 0.9rem;
}
</style>
