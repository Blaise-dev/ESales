<template>
  <div v-if="!isAuthenticated" class="container mt-3">
    <div class="guest-banner surface-card">
      <div>
        <p class="guest-kicker">Mode invité</p>
        <h2 class="guest-title">Vous pouvez parcourir la boutique sans connexion.</h2>
        <p class="guest-subtitle">
          Pour commander, gérer vos adresses et suivre vos commandes, connectez-vous.
        </p>
      </div>
      <div class="guest-actions">
        <RouterLink class="btn btn-modern" to="/login">Se connecter</RouterLink>
        <RouterLink class="btn btn-outline-primary" to="/register">Créer un compte</RouterLink>
      </div>
    </div>
  </div>

  <div v-else class="container mt-3">
    <div class="member-banner surface-card">
      <p class="member-kicker">Espace membre</p>
      <p class="member-text">Bienvenue {{ user?.prenom || '' }}. Votre expérience complète est active.</p>
    </div>
  </div>

  <!-- Carousel Section -->
  <!-- Bannière masquée sur mobile -->
  <div id="carouselExampleSlidesOnly" class="carousel slide home-hero d-none d-md-block" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="1"></li>
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <CarouselItem
        v-for="carousselProduct in carousselProducts"
        :imageSrc="carousselProduct.imageSrc"
        :altText="carousselProduct.altText"
        :isActive="carousselProduct.isActive"
        :topText="carousselProduct.topText"
        :mainText="carousselProduct.mainText"
        :bottomText="carousselProduct.bottomText"
      />
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleSlidesOnly"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleSlidesOnly"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

  <!-- Bande vedettes -->
  <div class="container-fluid featured-strips">
    <div class="row g-0">
      <div v-for="product2 in products2" :key="product2.id" class="col-12 col-md-4">
        <ProductCard2
          :id="product2.id"
          :title="product2.title"
          :description="product2.description"
          :imageSrc="product2.imageSrc"
          :price="product2.price"
        />
      </div>
    </div>
  </div>

  <!-- Section catégories -->
  <div class="home-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Nouvelles catégories</h2>
        <p class="section-subtitle">Explore les tendances du moment par univers.</p>
      </div>

      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 justify-content-center">
        <ProductCategoryCard
          v-for="(category, index) in categories"
          :key="index"
          :imageSrc="category.imageSrc"
          :categoryTitle="category.categoryTitle"
          :productCount="category.productCount"
          :linkUrl="category.linkUrl || buildCategorySearchLink(category?.categoryTitle)"
        />
      </div>
    </div>
  </div>

  <!-- Section nouvelles arrivées -->
  <div class="home-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Nouvelles arrivées</h2>
        <p class="section-subtitle">Sélection fraîchement ajoutée, prête à shopper.</p>
      </div>
      <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <ProductCard
          v-for="(product, index) in products"
          :key="index"
          :imageSrc="product.imageSrc"
          :productId="product.id"
          :productTitle="product.name"
          :productPrice="product.price"
          :productRating="4"
          :productReviews="product.commentsCount"
        />
      </div>

      <div class="text-center mt-5">
        <button type="button" class="btn btn-modern btn-lg px-5" @click="loadMoreProducts" v-if="!isLoading">
          <v-icon left class="mr-2">mdi-plus-circle-outline</v-icon> Voir plus
        </button>
        <div v-if="isLoading" class="d-flex justify-content-center mt-4">
          <div class="spinner-border" style="color: var(--primary)" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import ProductCategoryCard from '@/components/ProductCategoryCard.vue'
import ProductCard2 from '@/components/ProductCard2.vue'
import CarouselItem from '@/components/CarouselItem.vue'
import apiClient from '@/api'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProductCard,
    ProductCategoryCard,
    ProductCard2,
    CarouselItem
  },
  data() {
    return {
      carousselProducts: [],
      products: [],
      categories: [],
      isLoading: false,
      products2: [],
      error: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
    categoryChunks() {
      return this.chunkArray(this.categories, 5)
    },
    carouProducts() {
      return this.chunkArray(this.carousselProducts, 5)
    },
    products2Chunks() {
      return this.chunkArray(this.products2, 5)
    }
  },
  created() {
    this.fetchCarousselProducts()
    this.fetchNewProducts()
    this.fetchCategories()
    this.fetchProducts2()
  },
  methods: {
    resolveMediaSource(value) {
      const fallback = '/uploads/1719579105590-vuejs_original_wordmark_logo_icon_146305.png'

      const dig = (entry) => {
        if (!entry) return ''
        if (typeof entry === 'string') return entry
        if (Array.isArray(entry)) {
          for (const item of entry) {
            const candidate = dig(item)
            if (candidate) return candidate
          }
          return ''
        }
        if (typeof entry === 'object') {
          return dig(entry.src) || dig(entry.image) || dig(entry.url) || ''
        }
        return ''
      }

      const raw = dig(value)
      if (!raw) return fallback

      if (/^(https?:\/\/|data:|blob:|\/)/i.test(raw)) return raw
      return `/${raw}`
    },
    normalizeFeaturedProduct(item) {
      return {
        ...item,
        imageSrc: this.resolveMediaSource(item?.photos || item?.image || item?.imageSrc)
      }
    },
    normalizeNewProduct(item) {
      return {
        ...item,
        imageSrc: this.resolveMediaSource(item?.photos || item?.image || item?.imageSrc),
        commentsCount: Array.isArray(item?.comments) ? item.comments.length : 0
      }
    },
    normalizeCategory(category) {
      return {
        ...category,
        imageSrc: this.resolveMediaSource(category?.imageSrc || category?.image || category?.photos),
        productCount: Number(category?.productCount) || 0,
        linkUrl: category?.linkUrl || this.buildCategorySearchLink(category?.categoryTitle)
      }
    },
    async fetchCarousselProducts() {
      try {
        const response = await apiClient.get('/carousselProducts')
        const raw = Array.isArray(response.data) ? response.data : []
        this.carousselProducts = raw.map((entry) => ({
          ...entry,
          imageSrc: this.resolveMediaSource(entry?.imageSrc || entry?.image || entry?.photos)
        }))
      } catch (error) {
        this.error = "Une erreur s'est produite lors du chargement du carrousel."
        console.error('Erreur de connexion:', error)
      }
    },
    async fetchProducts2() {
      try {
        const response = await apiClient.get('/products2')
        const raw = Array.isArray(response.data) ? response.data : []
        this.products2 = raw.map((item) => this.normalizeFeaturedProduct(item))
      } catch (error) {
        this.error = "Une erreur s'est produite lors du chargement des produits vedettes."
        console.error('Erreur de connexion:', error)
      }
    },
    async fetchNewProducts() {
      try {
        const response = await apiClient.get('/products4')
        const raw = Array.isArray(response.data) ? response.data : []
        this.products = raw.map((item) => this.normalizeNewProduct(item))
      } catch (error) {
        this.error = "Une erreur s'est produite lors du chargement des nouveautés."
        console.error('Erreur de connexion:', error)
      }
    },
    async fetchCategories() {
      try {
        const response = await apiClient.get('/categories3')
        const rawCategories = Array.isArray(response.data) ? response.data : []
        this.categories = rawCategories.map((category) => this.normalizeCategory(category))
      } catch (error) {
        this.error = "Une erreur s'est produite lors du chargement des catégories."
        console.error('Erreur de connexion:', error)
      }
    },
    normalizeText(value) {
      return (value || '')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    },
    inferCategoryKey(label) {
      const normalized = this.normalizeText(label)

      if (
        normalized.includes('headphone') ||
        normalized.includes('bluetooth') ||
        normalized.includes('mobile') ||
        normalized.includes('cpu') ||
        normalized.includes('watch') ||
        normalized.includes('smart')
      ) {
        return 'technologie'
      }

      if (
        normalized.includes('cosmet') ||
        normalized.includes('beaute') ||
        normalized.includes('parfum')
      ) {
        return 'cosmetique'
      }

      if (
        normalized.includes('aliment') ||
        normalized.includes('food') ||
        normalized.includes('snack')
      ) {
        return 'alimentaire'
      }

      return 'vestimentaire'
    },
    buildCategorySearchLink(categoryTitle) {
      const categoryKey = this.inferCategoryKey(categoryTitle)
      return `/search?category=${encodeURIComponent(categoryKey)}`
    },
    loadMoreProducts() {
      this.isLoading = true
      apiClient
        .get('/produits')
        .then((response) => {
          const allProducts = Array.isArray(response.data) ? response.data : []
          const existingIds = new Set(this.products.map((product) => String(product.id)))
          const moreProducts = allProducts
            .filter((product) => !existingIds.has(String(product.id)))
            .slice(0, 6)
            .map((item) => this.normalizeNewProduct(item))

          if (moreProducts.length) {
            this.products.push(...moreProducts)
          }
        })
        .catch((error) => {
          this.error = "Impossible de charger plus d'articles pour le moment."
          console.error('Erreur de chargement supplémentaire:', error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    chunkArray(arr, size) {
      const result = []
      if (arr != null) {
        for (let i = 0; i < arr.length; i += size) {
          result.push(arr.slice(i, i + size))
        }
      }
      return result
    }
  }
}
</script>

<style scoped>
/* ── Bannière hero ── */
.home-hero {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: 1rem;
  box-shadow: var(--shadow-md);
}

.guest-banner,
.member-banner {
  padding: 1rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.guest-kicker,
.member-kicker {
  margin: 0 0 .2rem;
  font-size: .75rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--primary);
}

.guest-title {
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.35rem);
  color: var(--text);
}

.guest-subtitle,
.member-text {
  margin: .35rem 0 0;
  color: var(--text-soft);
}

.guest-actions {
  display: inline-flex;
  gap: .55rem;
  flex-wrap: wrap;
}

/* ── Bande vedettes ── */
.featured-strips {
  animation: fade-slide-up 560ms var(--ease) both;
}

/* ── Sections génériques ── */
.home-section {
  padding: 4rem 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

/* ── Image carousel ── */
.custom-carousel-img {
  max-height: 500px;
  object-fit: cover;
}

@media (max-width: 575px) {
  .home-section {
    padding: 2.5rem 0 1rem;
  }
}
</style>
