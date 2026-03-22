<template>
  <div class="custom-container">
    <RouterLink :to="{ name: 'products', params: { id: this.id } }" class="link_product">
      <div class="card h-100 text-center custom-card surface-card">
        <div class="card-body d-flex justify-content-between align-items-start">
          <div class="text-container">
            <br />
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-text">{{ description }}</p>
            <br />
            <button @click.stop.prevent="goToPaymentPage" class="btn custom-btn btn-modern">
              Acheter maintenant <span class="arrow">→</span>
            </button>
          </div>
          <img :src="imageSrc" class="custom-image" alt="Product image" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'ProductCard2',
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  },
  methods: {
    goToPaymentPage() {
      this.$store.dispatch('updatePaymentData', {
        id: this.id,
        title: this.title,
        price: this.price
      })
      this.$router.push('/paiement')
    }
  }
}
</script>

<style scoped>
.custom-container {
  padding: 10px;
  flex: 1 1 0;
}

.custom-card {
  background-color: transparent;
  border: none;
  width: 100%;
  border-radius: var(--radius-md);
  margin: 0;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 100%;
  gap: 14px;
}

.custom-image {
  width: 125px;
  height: 200px;
  max-height: 100%;
  margin-left: 12px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  transition: transform var(--ease);
}

.custom-btn {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.custom-btn .arrow {
  margin-left: 10px;
  font-size: 1.2em;
}

.custom-btn:hover {
  text-decoration: none;
}

.link_product {
  text-decoration: none;
}

.text-container {
  text-align: left;
}

.text-container .card-title {
  font-weight: 800;
  color: #0f172a;
}

.text-container .card-text {
  color: #475569;
}

.custom-card:hover .custom-image {
  transform: translateY(-4px) scale(1.02);
}
</style>
