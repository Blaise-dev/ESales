<script setup>
import Logo from '../components/Logo.vue'
</script>

<template>
  <header class="p-3 mb-3 border-bottom bg-body-tertiary">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <a
          href="/"
          class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
        >
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap" />
          </svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 link-secondary">Overview</a></li>
          <li><a href="#" class="nav-link px-2 link-body-emphasis">Inventory</a></li>
          <li><a href="#" class="nav-link px-2 link-body-emphasis">Customers</a></li>
          <li><a href="#" class="nav-link px-2 link-body-emphasis">Products</a></li>
        </ul>

        <div class="dropdown text-end">
          <a
            href="#"
            class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">Compte</a></li>
            <li><a class="dropdown-item" href="#">Commandes</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Déconnecter</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <div class="py-3 mb-4 border-bottom">
    <div class="container d-flex flex-wrap justify-content-between">
      <RouterLink to="/" class="col-5 d-flex align-items-center mb-lg-0 me-lg-auto">
        <Logo style="height: 10%; width: 10%" />
      </RouterLink>
      <form class="col-3 w-25 col-lg-auto mb-3 mb-lg-0 w-50" role="search">
        <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
      </form>
      <div class="col-2 w-25 d-flex align-items-around">
        <v-icon class="display-6 text-secondary m-2" color="black">mdi-heart-outline</v-icon>
        <v-icon class="display-6 text-secondary m-2" color="black">mdi-cart-outline</v-icon>
      </div>
    </div>
  </div>
</template>
