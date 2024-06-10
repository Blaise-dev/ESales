<!-- ProductCard.vue -->
<template>
    <div class="col-md-3">
      <div class="card">
        <img :src="imageSrc" class="card-img-top" :alt="productTitle">
        <div class="card-body">
          <h5 class="card-title">{{ productTitle }}</h5>
          <p class="card-text">{{ productPrice }}</p>
          <div class="card-reviews">
            <span
              v-for="star in 5"
              :key="star"
              class="fa fa-star"
              :class="{ checked: star <= productRating }"
            ></span>
            <p>({{ productReviews }} commentaires)</p>
          </div>
          <a href="#" class="btn btn-primary">Ajouter au panier</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    props: {
      imageSrc: {
        type: String,
        required: true,
      },
      productTitle: {
        type: String,
        required: true,
      },
      productPrice: {
        type: String,
        required: true,
      },
      productRating: {
        type: Number,
        required: true,
      },
      productReviews: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .checked {
    color: orange;
  }
  </style>
  