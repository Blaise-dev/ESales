<template>
  <header class="header-top p-3 mb-3 border-bottom text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-around justify-content-around justify-content-lg-around"
      >
        <button @click="toggleTheme" class="btn theme-toggle me-4 elevate-hover" type="button">
          <v-icon>{{ darkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </button>

        <div class="dropdown text-end">
          <button type="button" class="d-block text-white text-decoration-none dropdown-toggle header-profile-trigger" data-bs-toggle="dropdown" aria-expanded="false">
            <img
              :src="
                user && user.photo
                  ? user.photo
                  : 'https://img.freepik.com/vecteurs-premium/icone-compte-icone-utilisateur-graphiques-vectoriels_292645-552.jpg'
              "
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle profile-avatar"
            />
          </button>

          <ul v-if="user" class="dropdown-menu dropdown-menu-end text-small">
            <li>
              <RouterLink class="dropdown-item" to="/account">
                <v-icon class="me-2">mdi-cog</v-icon>
                Compte
              </RouterLink>
            </li>
            <li>
              <RouterLink class="dropdown-item" :to="{ path: '/account', hash: '#orders' }">
                <v-icon class="me-2">mdi-package-variant-closed</v-icon>
                Commandes
              </RouterLink>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <button @click="handleLogout" class="dropdown-item" type="button">
                <v-icon class="me-2">mdi-logout</v-icon>
                Déconnecter
              </button>
            </li>
          </ul>

          <ul v-else class="dropdown-menu dropdown-menu-end text-small">
            <li>
              <RouterLink class="dropdown-item" to="/login">
                <v-icon class="me-2">mdi-login</v-icon>
                Se connecter
              </RouterLink>
            </li>
            <li>
              <RouterLink class="dropdown-item" to="/register">
                <v-icon class="me-2">mdi-account-plus</v-icon>
                S'inscrire
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <div class="header-middle py-3 border-bottom">
    <div class="container d-flex flex-wrap justify-content-between align-items-center">
      <RouterLink to="/" class="home-link d-flex align-items-center mb-3 mb-lg-0 me-lg-auto">
        <span class="logo-wrapper">
          <Logo class="site-logo" style="height: 50px; width: 50px" />
        </span>
      </RouterLink>
      <form @submit.prevent="handleSubmit" class="w-50 col-lg-auto mb-3 mb-lg-0 search-form" role="search">
        <v-text-field
          v-model="search"
          label="Recherche"
          placeholder="Recherche..."
          :loading="loading"
          append-inner-icon="mdi-magnify"
          dense
          variant="solo"
          solo-inverted
          hide-details
          single-line
          @click:append-inner="handleSubmit"
          required
        ></v-text-field>
      </form>
      <div class="d-flex align-items-center ms-5">
        <v-menu
          v-model="showWishesList"
          :close-on-content-click="false"
          location="end"
          content-class="esales-menu-overlay"
        >
          <template v-slot:activator="{ props }">
            <button
              :class="[
                'btn position-relative me-2 action-icon-btn',
                { 'action-icon-btn-dark': darkTheme }
              ]"
              :style="iconButtonStyle"
              @click="showWishesList = !showWishesList"
              v-bind="props"
            >
              <v-icon class="display-6" :style="iconStyle">{{ wishlistIcon }}</v-icon>
              <span
                v-if="wishesListItemsCount > 0"
                class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle"
                >{{ wishesListItemsCount }}</span
              >
            </button>
          </template>

          <v-card min-width="300">
            <v-card-title>Liste de souhaits</v-card-title>
            <v-divider></v-divider>

            <v-list>
              <router-link
                v-for="item in wishesList"
                :key="item.id"
                :to="`/products/${item.id}`"
                class="text-decoration-none"
              >
                <v-list-item :title="item.name" :subtitle="item.price" :prepend-avatar="item.image">
                  <template v-slot:append>
                    <v-btn
                      class="text-red"
                      icon="mdi-heart"
                      variant="text"
                      title="Retirer de la liste"
                      @click.stop="toggleFav(item)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      @click.stop.prevent="removeFromWishesList(item.id)"
                    ></v-btn>
                  </template>
                </v-list-item>
              </router-link>
              <v-list-item v-if="wishesListItemsCount === 0">
                <v-list-item-content>
                  <v-list-item-title>Votre liste de souhaits est vide.</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-btn
                color="red"
                variant="text"
                @click="clearWishesList"
                v-if="wishesListItemsCount > 0"
                >Vider la liste</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn variant="text" @click="showWishesList = false">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-menu
          v-model="showCart"
          :close-on-content-click="false"
          location="end"
          :disabled="isMobile"
          content-class="esales-menu-overlay"
        >
          <template v-slot:activator="{ props }">
            <button
              :class="[
                'btn position-relative me-2 action-icon-btn',
                { 'action-icon-btn-dark': darkTheme }
              ]"
              :style="iconButtonStyle"
              @click="onCartButtonClick"
              v-bind="props"
            >
              <v-icon class="display-6" :style="iconStyle">mdi-cart-outline</v-icon>
              <span
                v-if="cartItemsCount > 0"
                class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle"
                >{{ cartItemsCount }}</span
              >
            </button>
          </template>

          <v-card min-width="300">
            <v-card-title>Panier</v-card-title>
            <v-divider></v-divider>

            <v-list v-if="Array.isArray(panier)">
              <v-list-item
                v-for="item in panier"
                :key="item.id"
                :title="item.name"
                :subtitle="item.price"
                :prepend-avatar="item.image"
                @click="goToProduct(item.id)"
              >
                <template v-slot:append>
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    @click.stop.prevent="removeFromCart(item.id)"
                  ></v-btn>
                </template>
              </v-list-item>
              <v-list-item v-if="cartItemsCount === 0">
                <v-list-item-content>
                  <v-list-item-title>Votre panier est vide.</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-list v-else>
              <v-list-item>
                <v-list-item-content class="d-flex flex-column align-items-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    class="mb-3"
                  ></v-progress-circular>
                  <v-list-item-title>Chargement du panier...</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn block color="blue" variant="text" @click="viewCart">Voir le panier</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </div>
  </div>
  <div class="header-bottom d-flex justify-center align-center" style="height: 64px">
    <v-spacer></v-spacer>
    <v-menu offset-y content-class="esales-categories-overlay">
      <template v-slot:activator="{ props }">
        <button type="button" class="mx-auto category-btn category-trigger" v-bind="props">
          <v-icon left class="mr-4">mdi-menu</v-icon>
          Nos catégories
          <v-icon right class="ml-4">mdi-chevron-down</v-icon>
        </button>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in categories"
          :key="index"
          :value="index"
          role="button"
          @click="handleCategoryClick(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import apiClient from '@/api'
import { mapGetters } from 'vuex'
import {
  WISHLIST_EVENT,
  clearWishlist,
  getWishlistIds,
  removeFromWishlist
} from '@/utils/wishlist'

export default {
  name: 'Header',
  components: {
    Logo
  },
  data() {
    return {
      loading: false,
      darkTheme: false,
      showWishesList: false,
      showCart: false,
      isMobile: false,

      wishesList: [],
      search: '',
      categories: [
        { key: 'technologie', title: 'Technologie' },
        { key: 'cosmetique', title: 'Cosmétique' },
        { key: 'vestimentaire', title: 'Vestimentaire' },
        { key: 'alimentaire', title: 'Alimentaire' }
      ]
    }
  },
  created() {
    this.initializeTheme()
  },
  mounted() {
    this.updateViewportMode()
    window.addEventListener('resize', this.updateViewportMode)
    window.addEventListener(WISHLIST_EVENT, this.initializeWishesList)
    window.addEventListener('storage', this.handleStorageUpdate)
    this.$store.dispatch('fetchPanier')
    this.initializeWishesList()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateViewportMode)
    window.removeEventListener(WISHLIST_EVENT, this.initializeWishesList)
    window.removeEventListener('storage', this.handleStorageUpdate)
  },
  methods: {
    handleStorageUpdate(event) {
      if (!event?.key || event.key.startsWith('esales-wishlist')) {
        this.initializeWishesList()
      }
    },
    updateViewportMode() {
      this.isMobile = window.innerWidth < 992
    },
    initializeTheme() {
      const storedTheme = localStorage.getItem('esales-theme')
      if (storedTheme) {
        this.darkTheme = storedTheme === 'dark'
      } else {
        this.darkTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches || false
      }

      document.body.classList.toggle('theme-dark', this.darkTheme)
    },
    toggleTheme() {
      this.darkTheme = !this.darkTheme
      document.body.classList.toggle('theme-dark', this.darkTheme)
      localStorage.setItem('esales-theme', this.darkTheme ? 'dark' : 'light')
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
    formatWishFromProduct(product, isFav = true) {
      const image = this.resolveProductImage(product)
      const price = Number(product?.price)
      return {
        id: product?.id,
        image,
        name: product?.name || 'Produit',
        price: Number.isFinite(price) ? `${price.toFixed(2)} €` : '0.00 €',
        fav: isFav
      }
    },
    async initializeWishesList() {
      try {
        const storedIds = getWishlistIds()
        if (!storedIds.length) {
          this.wishesList = []
          return
        }

        const response = await apiClient.get('/produits')
        const products = Array.isArray(response.data) ? response.data : []
        const productsById = new Map(products.map((product) => [String(product.id), product]))

        this.wishesList = storedIds
          .map((id) => {
            const source = productsById.get(String(id))
            if (!source) return null
            return this.formatWishFromProduct(source, true)
          })
          .filter(Boolean)
      } catch (error) {
        this.wishesList = []
        console.error('Erreur lors du chargement de la liste de souhaits:', error)
      }
    },
    toggleFav(item) {
      this.removeFromWishesList(item.id)
    },
    clearWishesList() {
      clearWishlist()
      this.wishesList = []
    },
    removeFromWishesList(id) {
      removeFromWishlist(id)
      this.wishesList = this.wishesList.filter((item) => String(item.id) !== String(id))
    },

    removeFromCart(id) {
      this.$store.dispatch('removeFromPanier', id)
    },
    onCartButtonClick() {
      if (this.isMobile) {
        this.viewCart()
      }
    },
    viewCart() {
      this.$router.push('/shoppingcart')
      this.showCart = false
    },
    goToProduct(id) {
      this.$router.push(`/products/${id}`)
      this.showCart = false
    },
    handleCategoryClick(category) {
      const categoryKey = (category?.key || '').toString().trim().toLowerCase()
      if (!categoryKey) return

      this.$router
        .push({
          name: 'search',
          query: {
            ...(this.search?.trim() ? { q: this.search.trim() } : {}),
            category: categoryKey
          }
        })
        .catch(() => {})
      window.dispatchEvent(new Event('esales-search-refresh'))
    },
    handleSubmit() {
      const query = (this.search || '').trim()
      this.$store.dispatch('setProductSearch', query)
      localStorage.setItem('esales-last-search', query)
      this.loading = true
      this.$router
        .push({ name: 'search', query: { q: query } })
        .catch(() => {})
      window.dispatchEvent(new Event('esales-search-refresh'))
      this.loading = false
    },
    handleLogout() {
      this.$store.dispatch('logout')
      window.location.href = '/'
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['panier']),

    wishesListItemsCount() {
      return this.wishesList ? this.wishesList.length : 0
    },

    wishlistIcon() {
      return this.wishesListItemsCount > 0 ? 'mdi-heart' : 'mdi-heart-outline'
    },

    cartItemsCount() {
      return this.panier ? this.panier.length : 0
    },

    iconButtonStyle() {
      return this.darkTheme
        ? {
            backgroundColor: 'var(--dark-base)',
            border: 'none',
            boxShadow: 'none'
          }
        : {
            backgroundColor: '#ffffff',
            borderColor: 'var(--border)',
            boxShadow: 'none'
          }
    },

    iconStyle() {
      return this.darkTheme ? { color: 'var(--text)' } : { color: 'var(--text-soft)' }
    }
  }
}
</script>

<style scoped>
.header-top {
  background: var(--header-top-bg);
  border-color: var(--header-top-border) !important;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.22);
}

.header-top,
.header-top .dropdown-toggle {
  color: var(--header-text) !important;
}

.theme-toggle .v-icon {
  color: var(--header-text) !important;
}

.theme-toggle {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
  color: var(--header-text) !important;
  border-radius: 999px;
  transition: transform var(--ease), background-color var(--ease);
}

.theme-toggle i,
.theme-toggle .v-icon {
  font-size: 1rem;
}

.theme-toggle:hover {
  color: var(--header-text);
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.theme-toggle:focus,
.theme-toggle:focus-visible,
.theme-toggle:active {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
  background-color: transparent !important;
}

.dropdown-menu {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  box-shadow: var(--shadow-sm);
}

.dropdown-menu .dropdown-item {
  color: var(--text) !important;
  background: transparent !important;
}

:global(.dropdown-menu .dropdown-item .v-icon),
:global(.dropdown-menu .dropdown-item i.v-icon) {
  color: var(--text-soft) !important;
  opacity: 1 !important;
}

.dropdown-menu .dropdown-item:hover,
.dropdown-menu .dropdown-item:focus {
  background: var(--surface-muted) !important;
  color: var(--text) !important;
}

.dropdown-menu .dropdown-divider {
  border-color: var(--border) !important;
}

.header-middle {
  background: var(--header-mid-bg);
  border-color: var(--border) !important;
  backdrop-filter: none;
}

.header-bottom {
  background: var(--header-bottom-bg);
  border-bottom: 1px solid var(--border);
}

.home-link {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  max-width: max-content;
  flex: 0 0 auto;
}

.logo-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.site-logo {
  filter: none;
}

.profile-avatar {
  width: 36px;
  height: 36px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.22);
  transition: transform var(--ease);
}

.profile-avatar:hover {
  transform: scale(1.06);
}

.header-profile-trigger {
  background: transparent;
  border: none;
  padding: 0;
}

.search-form {
  max-width: 560px;
}

.action-icon-btn {
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  transition:
    transform var(--ease),
    box-shadow var(--ease);
}

.action-icon-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.action-icon-btn-dark {
  background: var(--dark-base) !important;
  border: none !important;
  box-shadow: none;
}

.action-icon-btn-dark .v-icon {
  color: var(--text) !important;
}

:global(body.theme-dark) .header-top {
  background: var(--dark-base) !important;
  border-color: transparent !important;
  box-shadow: none;
}

:global(body.theme-dark) .header-middle,
:global(body.theme-dark) .header-bottom {
  background: var(--dark-base) !important;
  border-color: transparent !important;
}

:global(body.theme-dark) .header-top .container,
:global(body.theme-dark) .header-middle .container,
:global(body.theme-dark) .header-bottom .container,
:global(body.theme-dark) .header-top .container-fluid,
:global(body.theme-dark) .header-middle .container-fluid,
:global(body.theme-dark) .header-bottom .container-fluid {
  background: transparent !important;
}

/* header-middle et header-bottom héritent de --header-mid-bg / --header-bottom-bg = --dark-base */

:global(body.theme-dark) .dropdown-menu,
:global(body.theme-dark) .dropdown-item,
:global(body.theme-dark) .dropdown-divider {
  background-color: var(--surface) !important;
  color: var(--text) !important;
  border-color: var(--border) !important;
}

:global(body.theme-dark) .category-btn {
  background: linear-gradient(120deg, var(--primary) 0%, #60a5fa 100%) !important;
  border: none !important;
  color: #ffffff !important;
}

:global(body.theme-dark) .action-icon-btn {
  background: var(--dark-base) !important;
  border: none !important;
  box-shadow: none;
}

:global(body.theme-dark) .action-icon-btn .v-icon {
  color: var(--text) !important;
}

:global(body.theme-dark) .logo-wrapper {
  background: #ffffff;
  box-shadow: none;
}

.category-btn {
  white-space: nowrap;
  height: 100%;
  min-width: 220px;
  border-radius: 0;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(120deg, var(--primary) 0%, #60a5fa 100%);
  color: #ffffff;
  border: none;
}

.category-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px;
  cursor: pointer;
  outline: none;
}

.v-application--is-ltr .v-application--wrap {
  padding-left: 0;
}

.v-btn {
  white-space: nowrap;
}

.v-app-bar .v-btn {
  height: 100%;
}

@media (max-width: 991.98px) {
  .header-top .container > .d-flex,
  .header-middle .container {
    gap: 12px;
  }

  .header-middle .container {
    flex-direction: column;
    align-items: stretch !important;
  }

  .header-middle .home-link {
    align-self: flex-start;
    width: fit-content !important;
    max-width: max-content;
    margin-right: 0 !important;
  }

  .search-form,
  .header-middle form {
    width: 100% !important;
    max-width: 100%;
    margin-bottom: 0 !important;
  }

  .header-middle .ms-5 {
    margin-left: 0 !important;
    justify-content: space-between;
    width: 100%;
  }

  .header-bottom {
    height: auto !important;
    padding: 8px 12px;
  }

  .category-btn {
    min-width: 100%;
    height: 44px !important;
    border-radius: 10px !important;
  }
}
</style>
