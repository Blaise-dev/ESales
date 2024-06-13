<script setup>
import Logo from '../components/Logo.vue'
import { mapGetters } from 'vuex'
</script>

<template>
  <header class="p-3 mb-3 border-bottom bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-around justify-content-around justify-content-lg-around"
      >
        <button @click="toggleTheme" class="btn btn-outline-light theme-toggle me-4">
          <v-icon>{{ darkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </button>

        <div class="dropdown text-end">
          <a
            href="#"
            class="d-block text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              :src="
                user && user.photo
                  ? user.photo
                  : 'https://img.freepik.com/vecteurs-premium/icone-compte-icone-utilisateur-graphiques-vectoriels_292645-552.jpg'
              "
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
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
              <RouterLink class="dropdown-item text-dark" to="/orders">
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
  <div class="py-3 border-bottom">
    <div class="container d-flex flex-wrap justify-content-between align-items-center">
      <RouterLink to="/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto">
        <Logo style="height: 50px; width: 50px" />
      </RouterLink>
      <form class="w-50 col-lg-auto mb-3 mb-lg-0" role="search">
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
          @click:append-inner="onClick"
        ></v-text-field>
      </form>
      <div class="d-flex align-items-center ms-5">
        <!-- ms-3 adds margin-left -->
        <button class="btn position-relative me-2" @click="showWishesList = !showWishesList">
          <v-icon class="display-6 text-secondary">mdi-heart-outline</v-icon>
          <span
            v-if="wishesListItemsCount > 0"
            class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle"
            >{{ wishesListItemsCount }}</span
          >
        </button>

        <button class="btn position-relative me-2" @click="showCart = !showCart">
          <v-icon class="display-6 text-secondary">mdi-cart-outline</v-icon>
          <span
            v-if="cartItemsCount > 0"
            class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle"
            >{{ cartItemsCount }}</span
          >
        </button>
      </div>
    </div>
  </div>
  <div class="d-flex justify-center align-center" style="height: 64px; background-color: white">
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn
          color="blue"
          class="mx-auto text-white"
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
import store from '@/stores'
export default {
  name: 'Header',
  data() {
    return {
      loaded: false,
      loading: false,
      darkTheme: true, // Initial theme set to dark
      showWishesList: false,
      showCart: false,
      wishesListItemsCount: 2, // Example count of notifications
      cartItemsCount: 3, // Example count of cart items
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
    toggleMenu() {
      this.menu = !this.menu
    },
    selectCategory(category) {
      this.search = category // Vous pouvez ajuster ce comportement selon vos besoins
      this.menu = false // Fermer le menu après avoir sélectionné une catégorie
    },
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 5000)
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login') // nous renvoie à la page de connexion
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.header {
  background-color: #343a40; /* Dark background color */
}

.text-white a {
  color: white !important;
}

.btn-outline-light {
  border-color: white;
  color: white;
}

.theme-toggle i {
  font-size: 1rem;
}
.theme-toggle:hover {
  /* Ajoutez ici les styles que vous souhaitez désactiver lors du survol */
  /* Par exemple, si vous voulez désactiver le changement de couleur du texte, vous pouvez spécifier 'color' à 'inherit' */
  color: black; /* Cela maintiendra la couleur du texte inchangée lors du survol */
}

.dropdown-menu .dropdown-item {
  color: black !important;
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
