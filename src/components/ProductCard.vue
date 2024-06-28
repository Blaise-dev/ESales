<!-- ProductCard.vue -->
<template>
  <div class="col-md-3">
    <RouterLink :to="{ name: 'products', params: { id: productId } }" class="link_product">
      <div class="card">
        <img :src="imageSrc" class="card-img-top size" :alt="productTitle" />
        <div class="card-body">
          <h5 class="card-title">{{ productTitle }}</h5>
          <p class="card-text">{{ productPrice }} €</p>
          <div class="card-reviews">
            <span
              v-for="star in 5"
              :key="star"
              class="fa fa-star"
              :class="{ checked: star <= productRating }"
            ></span>
            <p>({{ productReviews }} commentaire(s))</p>
          </div>
          <button @click.prevent="addToCart" class="btn btn-primary">
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
  color: orange;
}
.link_product {
  text-decoration: none;
}
.size {
  height: 350px;
  width: 100%;
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
</style>
