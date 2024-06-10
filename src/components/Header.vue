<script setup>
import Logo from '../components/Logo.vue'
</script>

<template>
  <header class="p-3 mb-3 border-bottom bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-around justify-content-around justify-content-lg-around"
      >
        <RouterLink
          to="/"
          class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap" />
          </svg>
        </RouterLink>

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
              src="data:image/jpeg;base64,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"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>

          <ul class="dropdown-menu dropdown-menu-end text-small text-dark">
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
              <RouterLink class="dropdown-item text-dark" to="/logout">
                <v-icon class="me-2">mdi-logout</v-icon>
                Déconnecter
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
        <input
          type="search"
          class="form-control"
          placeholder="Search..."
          aria-label="Search"
          style="height: 50px"
        />
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
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
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
      darkTheme: true, // Initial theme set to dark
      showWishesList: false,
      showCart: false,
      wishesListItemsCount: 2, // Example count of notifications
      cartItemsCount: 3, // Example count of cart items
      menu: false,
      items: [
        { title: 'Technologie' },
        { title: 'Cosmétique' },
        { title: 'Vestimentaire' },
        { title: 'Alimentaire' }
      ]
    }
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