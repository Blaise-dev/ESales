<template>
  <div class="col-md-2 mb-4">
    <div class="product-category-card surface-card">
      <a :href="linkUrl">
        <img :src="imageSrc" :alt="categoryTitle" class="category-image" />
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
      required: true
    },
    categoryTitle: {
      type: String,
      required: true
    },
    productCount: {
      type: Number,
      required: true
    },
    linkUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.product-category-card {
  text-align: center;
  padding: 16px 10px;
}

.category-image {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 12px;
  border: 4px solid rgba(37, 99, 235, 0.16);
  transition: transform var(--ease);
}

.product-category-card:hover .category-image {
  transform: scale(1.06);
}

h4 {
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
}

p {
  margin-bottom: 0;
  color: #64748b;
}
</style>
