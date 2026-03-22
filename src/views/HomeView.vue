<template>
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
          :imageSrc="product2.photos[0].src"
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
          :linkUrl="category.linkUrl"
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
          :imageSrc="product.photos[0].src"
          :productId="product.id"
          :productTitle="product.name"
          :productPrice="product.price"
          :productRating="4"
          :productReviews="product.comments.length"
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
    async fetchCarousselProducts() {
      try {
        const response = await apiClient.get('/carousselProducts')
        this.carousselProducts = Array.isArray(response.data) ? response.data : []
      } catch (error) {
        this.error = "Une erreur s'est produite lors du chargement du carrousel."
        console.error('Erreur de connexion:', error)
      }
    },
    async fetchProducts2() {
      try {
        const response = await apiClient.get('/products2')
        this.products2 = Array.isArray(response.data) ? response.data : []
      } catch (error) {
        this.error = "Une erreur s'est produite lors du chargement des produits vedettes."
        console.error('Erreur de connexion:', error)
      }
    },
    async fetchNewProducts() {
      try {
        const response = await apiClient.get('/products4')
        this.products = Array.isArray(response.data) ? response.data : []
      } catch (error) {
        this.error = "Une erreur s'est produite lors du chargement des nouveautés."
        console.error('Erreur de connexion:', error)
      }
    },
    async fetchCategories() {
      try {
        const response = await apiClient.get('/categories3')
        const rawCategories = Array.isArray(response.data) ? response.data : []
        this.categories = rawCategories.map((category) => ({
          ...category,
          linkUrl: this.buildCategorySearchLink(category?.categoryTitle)
        }))
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
