<script setup>
import Logo from '@/components/Logo.vue'
import { mapGetters } from 'vuex'
import apiClient from '@/api'
</script>

<template>
  <header class="header-top p-3 mb-3 border-bottom text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-around justify-content-around justify-content-lg-around"
      >
        <button @click="toggleTheme" class="btn btn-outline-light theme-toggle me-4 elevate-hover">
          <v-icon>{{ darkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </button>

        <div class="dropdown text-end">
          <a href="#" class="d-block text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
          </a>

          <ul v-if="user" class="dropdown-menu dropdown-menu-end text-small text-dark">
            <li>
              <RouterLink class="dropdown-item text-dark" to="/account">
                <v-icon class="me-2">mdi-cog</v-icon>
                Compte
              </RouterLink>
            </li>
            <li>
              <RouterLink class="dropdown-item text-dark" to="/account#orders">
                <v-icon class="me-2">mdi-package-variant-closed</v-icon>
                Commandes
              </RouterLink>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <RouterLink @click="logout" class="dropdown-item text-dark" to="#">
                <v-icon class="me-2">mdi-logout</v-icon>
                Déconnecter
              </RouterLink>
            </li>
          </ul>

          <ul v-else class="dropdown-menu dropdown-menu-end text-small text-dark">
            <li>
              <RouterLink class="dropdown-item text-dark" to="/login">
                <v-icon class="me-2" @click="login">mdi-login</v-icon>
                Se connecter
              </RouterLink>
            </li>
            <li>
              <RouterLink class="dropdown-item text-dark" to="/register">
                <v-icon class="me-2" @click="register">mdi-account-plus</v-icon>
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
      <RouterLink to="/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto">
        <Logo class="site-logo" style="height: 50px; width: 50px" />
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
        <!-- ms-3 adds margin-left -->

        <v-menu v-model="showWishesList" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <button
              class="btn position-relative me-2 action-icon-btn"
              @click="showWishesList = !showWishesList"
              v-bind="props"
            >
              <v-icon class="display-6 text-secondary">mdi-heart-outline</v-icon>
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
                :to="`/produits/${item.id}`"
                class="text-decoration-none"
              >
                <v-list-item :title="item.name" :subtitle="item.price" :prepend-avatar="item.image">
                  <template v-slot:append>
                    <v-btn
                      :class="item.fav ? 'text-red' : ''"
                      icon="mdi-heart"
                      variant="text"
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

        <v-menu v-model="showCart" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <button class="btn position-relative me-2 action-icon-btn" @click="showCart = !showCart" v-bind="props">
              <v-icon class="display-6 text-secondary">mdi-cart-outline</v-icon>
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

            <v-list v-if="this.panier != null">
              <v-list-item
                v-for="item in this.panier"
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
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn
          color="blue"
          class="mx-auto text-white category-btn"
          v-bind="props"
          style="white-space: nowrap; height: 100%"
        >
          <v-icon left class="mr-4">mdi-menu</v-icon>
          Nos catégories
          <v-icon right class="ml-4">mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in categories" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      loaded: false,
      loading: false,
      darkTheme: true, // Initial theme set to dark
      showWishesList: false,
      showCart: false,

      wishesList: [
        {
          id: 1,
          image: 'https://m.media-amazon.com/images/I/61fls6A2anL._AC_UY1000_.jpg',
          name: 'Produit 1',
          price: '10 €',
          fav: true
        },
        {
          id: 2,
          image: 'https://p.globalsources.com/IMAGES/PDT/B5765148862/Vetements-de-sport.png',
          name: 'Produit 2',
          price: '20 €',
          fav: false
        }
        // Ajoutez autant de produits que nécessaire
      ],
      search: '',
      menu: false,
      categories: [
        { title: 'Technologie' },
        { title: 'Cosmétique' },
        { title: 'Vestimentaire' },
        { title: 'Alimentaire' }
      ]
    }
  },
  methods: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme
      document.body.classList.toggle('theme-dark', this.darkTheme)
    },
    toggleFav(item) {
      item.fav = !item.fav
    },
    clearWishesList() {
      this.wishesList = []
    },
    removeFromWishesList(id) {
      this.wishesList = this.wishesList.filter((item) => item.id !== id)
    },

    removeFromCart(id) {
      this.$store.dispatch('removeFromPanier', id)
    },
    viewCart() {
      // Logique pour voir le panier
      this.$router.push('/shoppingcart')
      this.showCart = false
    },
    goToProduct(id) {
      this.$router.push(`/products/${id}`)
      this.showCart = false
    },
    toggleMenu() {
      this.menu = !this.menu
    },
    selectCategory(category) {
      this.search = category // Vous pouvez ajuster ce comportement selon vos besoins
      this.menu = false // Fermer le menu après avoir sélectionné une catégorie
    },
    handleSubmit() {
      this.$store.dispatch('setProductSearch', this.search)
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
        if (this.$router.currentRoute.path !== '/search') this.$router.push('/search')
      }, 2000)
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login') // nous renvoie à la page de connexion
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['panier']),

    wishesListItemsCount() {
      return this.wishesList ? this.wishesList.length : 0
    },

    cartItemsCount() {
      return this.panier ? this.panier.length : 0
    }
  }
}
</script>

<style scoped>
.header-top {
  background: linear-gradient(115deg, #0f172a 0%, #1e293b 52%, #334155 100%);
  border-color: rgba(148, 163, 184, 0.28) !important;
  box-shadow: 0 14px 30px rgba(2, 6, 23, 0.28);
}

.text-white a {
  color: white !important;
}

.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.7);
  color: white;
  border-radius: 999px;
  transition:
    transform var(--ease),
    background-color var(--ease);
}

.theme-toggle i {
  font-size: 1rem;
}

.theme-toggle:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.dropdown-menu .dropdown-item {
  color: black !important;
}

.header-middle {
  background: rgba(255, 255, 255, 0.88);
  border-color: var(--border) !important;
  backdrop-filter: blur(12px);
}

.header-bottom {
  background: rgba(255, 255, 255, 0.94);
  border-bottom: 1px solid var(--border);
}

.site-logo {
  filter: drop-shadow(0 8px 20px rgba(37, 99, 235, 0.26));
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

.category-btn {
  min-width: 220px;
  border-radius: 0 !important;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(120deg, var(--primary) 0%, #60a5fa 100%) !important;
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
</style>
