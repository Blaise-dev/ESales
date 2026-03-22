<template>
  <div class="custom-container">
    <div class="card-shell">
      <button
        type="button"
        class="wishlist-btn"
        :class="{ active: isWishlisted }"
        :aria-label="isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        @click.stop="handleWishlistToggle"
      >
        <v-icon size="18">{{ isWishlisted ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </button>
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
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { WISHLIST_EVENT, isInWishlist, toggleWishlist } from '@/utils/wishlist'

export default {
  name: 'ProductCard2',
  props: {
    id: {
      type: [Number, String],
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
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      isWishlisted: false
    }
  },
  mounted() {
    this.syncWishlistState()
    window.addEventListener(WISHLIST_EVENT, this.syncWishlistState)
    window.addEventListener('storage', this.syncWishlistState)
  },
  beforeUnmount() {
    window.removeEventListener(WISHLIST_EVENT, this.syncWishlistState)
    window.removeEventListener('storage', this.syncWishlistState)
  },
  watch: {
    id() {
      this.syncWishlistState()
    }
  },
  methods: {
    syncWishlistState() {
      this.isWishlisted = isInWishlist(this.id)
    },
    handleWishlistToggle() {
      this.isWishlisted = toggleWishlist(this.id)
    },
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

.card-shell {
  position: relative;
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
  color: var(--text);
}

.text-container .card-text {
  color: var(--text-soft);
}

:global(body.theme-dark) .custom-card,
:global(body.theme-dark) .custom-card .card-body {
  background-color: var(--surface) !important;
}

.custom-card:hover .custom-image {
  transform: translateY(-4px) scale(1.02);
}

.wishlist-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  background: color-mix(in srgb, var(--surface) 84%, transparent);
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: transform var(--ease), color var(--ease), background-color var(--ease), border-color var(--ease);
}

.wishlist-btn:hover {
  transform: translateY(-2px);
  color: #dc2626;
}

.wishlist-btn.active {
  color: #dc2626;
  background: color-mix(in srgb, #dc2626 12%, var(--surface));
  border-color: color-mix(in srgb, #dc2626 40%, var(--border));
}
</style>
