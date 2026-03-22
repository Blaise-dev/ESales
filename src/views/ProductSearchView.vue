<template>
  <section class="search-page">
    <span class="search-orb orb-left"></span>
    <span class="search-orb orb-right"></span>

    <div class="container-fluid px-3 px-md-4 px-lg-5">
      <div class="search-hero">
        <div class="hero-main">
          <p class="hero-kicker">Résultats</p>
          <h1 class="hero-title">{{ searchTitle }}</h1>
          <p class="hero-subtitle">
            <template v-if="!isLoading && !error">
              {{ filteredResults.length }} produit{{ filteredResults.length > 1 ? 's' : '' }} trouvé{{ filteredResults.length > 1 ? 's' : '' }}
            </template>
            <template v-else-if="isLoading">Chargement des résultats...</template>
            <template v-else>{{ errorMessage }}</template>
          </p>

          <div class="hero-metrics" v-if="!isLoading && !error && filteredResults.length">
            <span class="metric-pill">Prix moyen : <strong>{{ averagePrice }} €</strong></span>
            <span class="metric-pill">Note max : <strong>{{ bestRating }}★</strong></span>
          </div>
        </div>

        <div class="hero-actions">
          <button class="btn btn-primary hero-btn" @click="resetFilters">Réinitialiser</button>
        </div>
      </div>

      <div class="search-layout">
        <aside class="filters-panel">
          <div class="filters-card surface-card">
            <div class="filters-head">
              <h2 class="filters-title">Filtres</h2>
              <span class="filters-badge" v-if="activeFiltersCount">{{ activeFiltersCount }}</span>
            </div>

            <div class="filter-group">
              <label class="filter-label">Prix max</label>
              <v-slider
                v-model="filters.maxPrice"
                :max="maxAvailablePrice"
                :min="0"
                :step="5"
                thumb-label
                color="primary"
                hide-details
              ></v-slider>
              <div class="filter-hint">Jusqu'à {{ filters.maxPrice }} €</div>
            </div>

            <div class="filter-group">
              <label class="filter-label">Tri</label>
              <v-select
                v-model="filters.sortBy"
                :items="sortOptions"
                item-title="label"
                item-value="value"
                variant="outlined"
                density="comfortable"
                hide-details
              ></v-select>
            </div>

            <div class="filter-group">
              <label class="filter-label">Note minimale</label>
              <div class="rating-choice">
                <button
                  v-for="rating in [0, 3, 4, 5]"
                  :key="rating"
                  type="button"
                  class="rating-pill"
                  :class="{ active: filters.minRating === rating }"
                  @click="filters.minRating = rating"
                >
                  {{ rating === 0 ? 'Toutes' : rating + '★ et +' }}
                </button>
              </div>
            </div>

            <div class="filter-group" v-if="hasActiveFilters">
              <label class="filter-label">Actifs</label>
              <div class="active-filter-chips">
                <span class="filter-chip" v-if="selectedCategoryLabel">{{ selectedCategoryLabel }}</span>
                <span class="filter-chip" v-if="filters.minRating > 0">{{ filters.minRating }}★ et +</span>
                <span class="filter-chip" v-if="filters.maxPrice < maxAvailablePrice">≤ {{ filters.maxPrice }} €</span>
                <span class="filter-chip" v-if="filters.sortBy !== 'relevance'">{{ currentSortLabel }}</span>
              </div>
            </div>
          </div>
        </aside>

        <main class="results-panel">
          <div class="results-toolbar" v-if="!isLoading && !error && filteredResults.length">
            <span class="toolbar-text">
              {{ filteredResults.length }} produit{{ filteredResults.length > 1 ? 's' : '' }} affiché{{ filteredResults.length > 1 ? 's' : '' }}
            </span>
            <button class="btn btn-light toolbar-reset" v-if="hasActiveFilters" @click="resetFilters">
              Effacer les filtres
            </button>
          </div>

          <div v-if="isLoading" class="state-card surface-card">
            <v-progress-circular indeterminate color="primary" size="28" class="me-2" />
            Chargement des résultats...
          </div>

          <div v-else-if="error" class="state-card surface-card state-error">
            <v-icon size="20" class="me-2">mdi-alert-circle-outline</v-icon>
            {{ errorMessage }}
          </div>

          <div v-else-if="filteredResults.length === 0" class="state-card surface-card state-empty">
            <v-icon size="20" class="me-2">mdi-magnify-close</v-icon>
            Aucun résultat pour votre recherche.
          </div>

          <transition-group
            v-else
            name="result-fade"
            tag="div"
            class="results-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 g-md-4"
          >
            <ProductCard
              v-for="result in filteredResults"
              :key="result.id"
              :imageSrc="result.image"
              :productId="result.id"
              :productTitle="result.name"
              :productPrice="result.price"
              :productRating="result.rating"
              :productReviews="result.reviews"
            />
          </transition-group>
        </main>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import apiClient from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductSearchView',
  components: {
    ProductCard
  },
  data() {
    return {
      rawResults: [],
      isLoading: false,
      error: false,
      errorMessage: '',
      filters: {
        maxPrice: 1000,
        sortBy: 'relevance',
        minRating: 0
      },
      sortOptions: [
        { label: 'Pertinence', value: 'relevance' },
        { label: 'Prix croissant', value: 'price-asc' },
        { label: 'Prix décroissant', value: 'price-desc' },
        { label: 'Nom A → Z', value: 'name-asc' }
      ]
    }
  },
  computed: {
    ...mapGetters(['productSearch']),

    effectiveSearchTerm() {
      const routeTerm = (this.$route.query.q || '').toString().trim()
      const routeCategory = (this.$route.query.category || '').toString().trim()
      const storeTerm = (this.productSearch || '').toString().trim()
      const cachedTerm = (localStorage.getItem('esales-last-search') || '').toString().trim()

      if (routeTerm) return routeTerm
      if (routeCategory) return ''
      return storeTerm || cachedTerm
    },

    selectedCategoryKey() {
      return (this.$route.query.category || '').toString().trim().toLowerCase()
    },

    selectedCategoryLabel() {
      const labels = {
        technologie: 'Catégorie : Technologie',
        cosmetique: 'Catégorie : Cosmétique',
        vestimentaire: 'Catégorie : Vestimentaire',
        alimentaire: 'Catégorie : Alimentaire'
      }
      return labels[this.selectedCategoryKey] || ''
    },

    searchTitle() {
      if (this.effectiveSearchTerm) {
        return `Recherche : « ${this.effectiveSearchTerm} »`
      }
      if (this.selectedCategoryLabel) {
        return this.selectedCategoryLabel
      }
      return 'Recherche : « Tous les produits »'
    },

    maxAvailablePrice() {
      if (!this.rawResults.length) return 1000
      const highest = Math.max(...this.rawResults.map((item) => Number(item.price) || 0))
      return Math.max(50, Math.ceil(highest / 10) * 10)
    },

    normalizedResults() {
      return this.rawResults.map((product) => ({
        id: product.id,
        name: product.name || 'Produit',
        image: this.resolveProductImage(product),
        price: Number(product.price) || 0,
        rating: Number(product.rating) || 4,
        reviews: Number(product.comments?.length) || 0,
        category: this.inferProductCategory(product),
        searchText: this.normalizeText(
          `${product?.name || ''} ${product?.description || ''} ${product?.category || ''} ${product?.namecategorie || ''}`
        )
      }))
    },

    filteredResults() {
      let list = [...this.normalizedResults]

      const normalizedTerm = this.normalizeText(this.effectiveSearchTerm)
      if (normalizedTerm) {
        list = list.filter((item) => item.searchText.includes(normalizedTerm))
      }

      if (this.selectedCategoryKey) {
        list = list.filter((item) => item.category === this.selectedCategoryKey)
      }

      list = list.filter((item) => item.price <= this.filters.maxPrice)
      list = list.filter((item) => item.rating >= this.filters.minRating)

      if (this.filters.sortBy === 'price-asc') {
        list.sort((a, b) => a.price - b.price)
      } else if (this.filters.sortBy === 'price-desc') {
        list.sort((a, b) => b.price - a.price)
      } else if (this.filters.sortBy === 'name-asc') {
        list.sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }))
      }

      return list
    },

    hasActiveFilters() {
      return (
        Boolean(this.selectedCategoryKey) ||
        this.filters.minRating > 0 ||
        this.filters.maxPrice < this.maxAvailablePrice ||
        this.filters.sortBy !== 'relevance'
      )
    },

    activeFiltersCount() {
      let count = 0
      if (this.selectedCategoryKey) count++
      if (this.filters.minRating > 0) count++
      if (this.filters.maxPrice < this.maxAvailablePrice) count++
      if (this.filters.sortBy !== 'relevance') count++
      return count
    },

    currentSortLabel() {
      return this.sortOptions.find((option) => option.value === this.filters.sortBy)?.label || 'Tri'
    },

    averagePrice() {
      if (!this.filteredResults.length) return 0
      const total = this.filteredResults.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
      return Math.round(total / this.filteredResults.length)
    },

    bestRating() {
      if (!this.filteredResults.length) return 0
      return Math.max(...this.filteredResults.map((item) => Number(item.rating) || 0)).toFixed(1)
    }
  },
  watch: {
    '$route.query': {
      handler() {
        this.fetchSearchResults()
      },
      deep: true,
      immediate: true
    },
    productSearch() {
      if (!this.$route.query.q) {
        this.fetchSearchResults()
      }
    }
  },
  mounted() {
    window.addEventListener('esales-search-refresh', this.fetchSearchResults)
  },
  beforeUnmount() {
    window.removeEventListener('esales-search-refresh', this.fetchSearchResults)
  },
  methods: {
    normalizeText(value) {
      return (value || '')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    },

    inferProductCategory(product) {
      const explicit = this.normalizeText(
        `${product?.category || ''} ${product?.namecategorie || ''} ${product?.categorie || ''}`
      )
      if (explicit.includes('tech') || explicit.includes('electro')) return 'technologie'
      if (explicit.includes('cosmet')) return 'cosmetique'
      if (explicit.includes('aliment')) return 'alimentaire'
      if (explicit.includes('vet') || explicit.includes('mode') || explicit.includes('textile')) return 'vestimentaire'

      const text = this.normalizeText(`${product?.name || ''} ${product?.description || ''}`)

      const technologyKeywords = ['montre', 'watch', 'smart', 'phone', 'telephone', 'casque', 'headphone', 'bluetooth', 'cpu']
      const cosmeticsKeywords = ['cosmetique', 'beaute', 'maquillage', 'parfum', 'creme', 'shampoo', 'gel']
      const foodKeywords = ['aliment', 'snack', 'boisson', 'fruit', 'chocolat', 'cafe', 'the', 'sucre']
      const clothingKeywords = [
        't-shirt',
        'tee shirt',
        'chemise',
        'polo',
        'debardeur',
        'sweat',
        'robe',
        'jean',
        'pantalon',
        'cargo',
        'sandale',
        'chaussure',
        'denim'
      ]

      const hasKeyword = (keywords) => keywords.some((keyword) => text.includes(keyword))

      if (hasKeyword(technologyKeywords)) return 'technologie'
      if (hasKeyword(cosmeticsKeywords)) return 'cosmetique'
      if (hasKeyword(foodKeywords)) return 'alimentaire'
      if (hasKeyword(clothingKeywords)) return 'vestimentaire'

      return 'vestimentaire'
    },

    resolveProductImage(product) {
      const fallback = '/uploads/1719579105590-vuejs_original_wordmark_logo_icon_146305.png'

      const extractValue = (value) => {
        if (!value) return ''
        if (typeof value === 'string') return value
        if (Array.isArray(value)) {
          for (const item of value) {
            const found = extractValue(item)
            if (found) return found
          }
          return ''
        }
        if (typeof value === 'object') {
          return (
            extractValue(value.src) ||
            extractValue(value.url) ||
            extractValue(value.image) ||
            extractValue(value.photo) ||
            ''
          )
        }
        return ''
      }

      const rawImage =
        extractValue(product?.image) ||
        extractValue(product?.photo) ||
        extractValue(product?.imageUrl) ||
        extractValue(product?.image_url) ||
        extractValue(product?.photos) ||
        ''

      if (!rawImage || typeof rawImage !== 'string') return fallback

      const image = rawImage
        .trim()
        .replace(/\\/g, '/')
        .replace(/^https?:\/\/(localhost|127\.0\.0\.1):3000\/uploads\//i, '/uploads/')
        .replace(/^\.?\/?public\//i, '/')
        .replace(/^\/?uploads\//i, '/uploads/')

      if (!image) return fallback

      const isAbsolute = /^(https?:\/\/|data:|blob:|\/)/i.test(image)
      return isAbsolute ? image : `/${image}`
    },

    resetFilters() {
      this.filters.maxPrice = this.maxAvailablePrice
      this.filters.sortBy = 'relevance'
      this.filters.minRating = 0

      if (this.$route.query.category) {
        this.$router
          .replace({
            query: {
              ...this.$route.query,
              category: undefined
            }
          })
          .catch(() => {})
      }
    },

    async fetchSearchResults() {
      const term = this.effectiveSearchTerm
      this.isLoading = true
      this.error = false
      this.errorMessage = ''
      this.rawResults = []

      try {
        const response = await apiClient.get('/produits')
        this.rawResults = Array.isArray(response.data) ? response.data : []

        if (term) {
          localStorage.setItem('esales-last-search', term)
        }

        this.filters.maxPrice = this.maxAvailablePrice
      } catch (error) {
        this.rawResults = []
        this.error = true
        this.errorMessage = "Une erreur est survenue lors du chargement des résultats."
        console.error('Erreur recherche produits:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.search-page {
  min-height: calc(100vh - 180px);
  padding: 1.2rem 0 2rem;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

.search-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(46px);
  opacity: .24;
  pointer-events: none;
  animation: orbFloat 10s ease-in-out infinite;
}

.orb-left {
  width: 260px;
  height: 260px;
  top: 8%;
  left: -46px;
  background: color-mix(in srgb, var(--primary) 46%, transparent);
}

.orb-right {
  width: 220px;
  height: 220px;
  bottom: 7%;
  right: -38px;
  background: color-mix(in srgb, var(--accent) 38%, transparent);
  animation-delay: 1.25s;
}

.search-hero {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1.3rem;
  border-radius: calc(var(--radius-md) + 2px);
  border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border));
  background: linear-gradient(155deg, var(--surface), color-mix(in srgb, var(--surface-muted) 78%, var(--primary) 8%));
  box-shadow: var(--shadow-sm);
  animation: sectionIn .5s var(--ease);
}

.hero-main {
  display: grid;
  gap: .5rem;
}

.hero-kicker {
  margin: 0 0 .25rem;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--primary);
}

.hero-title {
  margin: 0;
  font-size: clamp(1.2rem, 2.2vw, 1.9rem);
  color: var(--text);
  overflow-wrap: anywhere;
}

.hero-subtitle {
  margin: .35rem 0 0;
  color: var(--text-soft);
  font-size: .92rem;
}

.hero-metrics {
  margin-top: .2rem;
  display: flex;
  flex-wrap: wrap;
  gap: .45rem;
}

.metric-pill {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 86%, var(--primary) 8%);
  color: var(--text-soft);
  padding: .28rem .62rem;
  font-size: .78rem;
}

.metric-pill strong {
  color: var(--text);
}

.hero-btn {
  border-radius: 999px;
  padding: .45rem .95rem;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--primary) 22%, transparent);
  min-height: 42px;
}

.search-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.filters-panel,
.results-panel {
  min-width: 0;
}

.filters-card {
  position: sticky;
  top: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
  animation: sectionIn .58s var(--ease);
}

.filters-title {
  margin: 0 0 .8rem;
  font-size: 1rem;
  color: var(--text);
}

.filters-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .6rem;
}

.filters-badge {
  min-width: 24px;
  height: 24px;
  border-radius: 999px;
  background: var(--primary);
  color: #fff;
  font-size: .75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-label {
  display: block;
  margin-bottom: .4rem;
  font-size: .85rem;
  font-weight: 600;
  color: var(--text-soft);
}

.filter-hint {
  margin-top: .35rem;
  font-size: .82rem;
  color: var(--text-soft);
}

.rating-choice {
  display: flex;
  flex-wrap: wrap;
  gap: .45rem;
}

.active-filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
}

.filter-chip {
  font-size: .74rem;
  padding: .25rem .55rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-soft);
  background: var(--surface);
}

.rating-pill {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-soft);
  border-radius: 999px;
  padding: .35rem .7rem;
  font-size: .78rem;
  cursor: pointer;
  transition: all var(--ease);
  min-height: 40px;
}

.rating-pill.active,
.rating-pill:hover {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
  transform: translateY(-1px);
}

.results-panel {
  min-width: 0;
  animation: sectionIn .64s var(--ease);
}

.results-toolbar {
  border: 1px solid color-mix(in srgb, var(--primary) 18%, var(--border));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--surface) 82%, var(--primary) 6%);
  padding: .65rem .8rem;
  margin-bottom: .75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .6rem;
  flex-wrap: wrap;
}

.toolbar-text {
  color: var(--text-soft);
  font-size: .84rem;
}

.toolbar-reset {
  border-radius: 999px;
  border: 1px solid var(--border);
  font-size: .78rem;
  padding: .3rem .75rem;
  transition: all var(--ease);
}

.toolbar-reset:hover {
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
  color: var(--primary);
}

.state-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
  display: flex;
  align-items: center;
  color: var(--text-soft);
  background: var(--surface);
}

.state-error {
  border-color: rgba(220, 53, 69, 0.3);
  color: #c0392b;
}

.state-empty {
  color: var(--text-soft);
}

.results-grid {
  margin-top: .1rem;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.results-grid :deep(.product-card) {
  animation: searchCardIn .48s var(--ease) both;
}

.results-grid > :nth-child(2n) :deep(.product-card) {
  animation-delay: .05s;
}

.results-grid > :nth-child(3n) :deep(.product-card) {
  animation-delay: .1s;
}

@keyframes searchCardIn {
  from {
    transform: translateY(12px) scale(.988);
  }
  to {
    transform: translateY(0) scale(1);
  }
}

.result-fade-enter-active,
.result-fade-leave-active,
.result-fade-move {
  transition: all .32s ease;
}

.result-fade-enter-from,
.result-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(.985);
}

@keyframes sectionIn {
  from {
    transform: translateY(8px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@media (max-width: 991.98px) {
  .search-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: .8rem;
  }

  .filters-card {
    position: static;
  }

  .search-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-actions {
    width: 100%;
  }

  .hero-btn {
    width: 100%;
  }
}

@media (max-width: 767.98px) {
  .search-page {
    padding: .8rem 0 1.2rem;
  }

  .search-page .container-fluid {
    padding-left: .7rem !important;
    padding-right: .7rem !important;
  }

  .search-layout {
    gap: .65rem;
  }

  .search-orb {
    display: none;
  }

  .search-hero {
    padding: .9rem;
    margin-bottom: .75rem;
    gap: .7rem;
    border-radius: var(--radius-sm);
  }

  .hero-main {
    gap: .35rem;
  }

  .hero-title {
    font-size: 1.05rem;
    line-height: 1.35;
    word-break: break-word;
  }

  .hero-subtitle {
    font-size: .84rem;
    margin-top: .15rem;
  }

  .hero-metrics {
    width: 100%;
    gap: .35rem;
  }

  .metric-pill {
    font-size: .72rem;
    padding: .22rem .52rem;
  }

  .filters-card {
    padding: .85rem;
    border-radius: var(--radius-sm);
  }

  .filters-title {
    font-size: .95rem;
    margin-bottom: .55rem;
  }

  .filter-group {
    margin-bottom: .7rem;
    padding: .55rem;
    border: 1px solid var(--border);
    border-radius: .7rem;
    background: color-mix(in srgb, var(--surface) 84%, var(--surface-muted));
  }

  .filter-group:last-child {
    margin-bottom: 0;
  }

  .filter-label {
    margin-bottom: .3rem;
    font-size: .8rem;
  }

  .filter-hint {
    margin-top: .2rem;
    font-size: .76rem;
  }

  .rating-choice {
    gap: .35rem;
  }

  .rating-pill {
    flex: 1 1 calc(50% - .35rem);
    text-align: center;
    font-size: .74rem;
    padding: .36rem .5rem;
  }

  .active-filter-chips {
    gap: .3rem;
  }

  .filter-chip {
    font-size: .7rem;
    padding: .2rem .46rem;
  }

  .results-toolbar {
    padding: .58rem .65rem;
    margin-bottom: .62rem;
    gap: .45rem;
  }

  .toolbar-text {
    width: 100%;
    font-size: .78rem;
  }

  .toolbar-reset {
    width: 100%;
    font-size: .75rem;
    padding: .35rem .6rem;
  }

  .state-card {
    padding: .8rem .85rem;
    font-size: .84rem;
    line-height: 1.45;
    align-items: flex-start;
  }

  .hero-btn,
  .toolbar-reset,
  .rating-pill {
    min-height: 44px;
  }

  .results-grid {
    --bs-gutter-x: .6rem;
    --bs-gutter-y: .6rem;
  }

  .results-grid :deep(.col) {
    min-width: 0;
  }

  .results-grid :deep(.product-card) {
    border-radius: var(--radius-sm);
  }

  :deep(.v-input) {
    font-size: .88rem;
  }
}

@media (max-width: 575.98px) {
  .search-page {
    padding-top: .65rem;
  }

  .search-hero {
    padding: .82rem;
  }

  .hero-title {
    font-size: 1rem;
  }

  .hero-kicker {
    font-size: .68rem;
  }

  .metric-pill {
    width: 100%;
    justify-content: center;
  }

  .rating-pill {
    flex-basis: 100%;
  }

  .results-grid {
    --bs-gutter-x: .5rem;
    --bs-gutter-y: .5rem;
  }

  .search-page .container-fluid {
    padding-left: .55rem !important;
    padding-right: .55rem !important;
  }
}

@media (max-width: 359.98px) {
  .search-hero,
  .filters-card,
  .state-card {
    padding: .7rem;
  }

  .hero-title {
    font-size: .94rem;
  }

  .toolbar-reset,
  .hero-btn,
  .rating-pill {
    font-size: .72rem;
  }
}
</style>
