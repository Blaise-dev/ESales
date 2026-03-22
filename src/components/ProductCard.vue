<!-- ProductCard.vue -->
<template>
  <div class="col">
    <div class="product-card surface-card h-100">
      <button
        type="button"
        class="wishlist-btn"
        :class="{ active: isWishlisted }"
        :aria-label="isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        @click.stop="handleWishlistToggle"
      >
        <v-icon size="18">{{ isWishlisted ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </button>
      <RouterLink :to="{ name: 'products', params: { id: productId } }" class="link_product">
        <div class="product-img-wrap">
          <img :src="imageSrc" class="product-img" :alt="productTitle" />
          <div class="product-badge" v-if="productRating >= 4">
            <v-icon size="12">mdi-star</v-icon> Top
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ productTitle }}</h5>
          <p class="product-price">{{ productPrice }} €</p>
          <div class="card-reviews">
            <span
              v-for="star in 5"
              :key="star"
              class="fa fa-star"
              :class="{ checked: star <= productRating }"
            ></span>
            <span class="ms-1">({{ productReviews }})</span>
          </div>
        </div>
      </RouterLink>
      <div class="card-footer-action">
        <button @click="addToCart" class="btn btn-modern w-100">
          <v-icon left size="18" class="mr-1">mdi-cart-plus</v-icon> Ajouter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { WISHLIST_EVENT, isInWishlist, toggleWishlist } from '@/utils/wishlist'

export default {
  name: 'ProductCard',
  props: {
    productId: {
      type: [Number, String],
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
      type: [String, Number],
      required: true
    },
    productRating: {
      type: Number,
      required: true
    },
    productReviews: {
      type: Number,
      default: 0
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
    productId() {
      this.syncWishlistState()
    }
  },
  methods: {
    syncWishlistState() {
      this.isWishlisted = isInWishlist(this.productId)
    },
    handleWishlistToggle() {
      this.isWishlisted = toggleWishlist(this.productId)
    },
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
.product-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--ease), box-shadow var(--ease);
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

/* Image wrapper avec ratio fixe */
.product-img-wrap {
  position: relative;
  padding-bottom: 70%;
  overflow: hidden;
  background: var(--surface-muted);
}

.product-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.product-card:hover .product-img {
  transform: scale(1.04);
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--primary);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.wishlist-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 38px;
  height: 38px;
  border: 1px solid color-mix(in srgb, var(--border) 75%, transparent);
  border-radius: 999px;
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

.link_product {
  text-decoration: none;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.product-price {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--primary);
  margin: 0;
}

.card-reviews {
  color: var(--text-soft);
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 2px;
}

.checked {
  color: #f59e0b;
}

.card-footer-action {
  padding: 0 1rem 1rem;
}

.card-footer-action .btn-modern {
  font-size: 0.88rem;
  padding: 0.55rem 1rem;
}

@media (max-width: 575px) {
  .card-title { font-size: 0.88rem; }
  .product-price { font-size: 1rem; }
}
</style>
