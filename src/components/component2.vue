<template>
  <div class="col-md-2">
    <div class="product-category-card">
      <a :href="linkUrl">
        <img :src="imageSrc" :alt="categoryTitle" class="category-image">
      </a>
      <h4>{{ categoryTitle }}</h4>
      <p>{{ productCount }} produits</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCategoryCard',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    categoryTitle: {
      type: String,
      required: true,
    },
    productCount: {
      type: Number,
      required: true,
    },
    linkUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.product-category-card {
  text-align: center;
}

.category-image {
  width: 130px; /* Assurez-vous que la largeur et la hauteur soient les mêmes */
  height: 130px; /* pour que l'image soit un carré parfait */
  border-radius: 50%; /* Applique la forme circulaire */
  object-fit: cover; /* Assure que l'image couvre entièrement le conteneur circulaire */
}
</style>
