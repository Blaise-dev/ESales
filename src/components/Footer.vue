<script setup>
import Logo from '../components/Logo.vue'
</script>

<template>
  <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top m-5">
    <div class="col mb-3"></div>
    <div class="col mb-3">
      <Logo class="d-block w-25 h-25" />
      <p class="text-body-secondary ml-5">&copy; 2024</p>
    </div>

    <div class="col mb-3">
      <h5>ESALES</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <RouterLink to="/" class="nav-link p-0 text-body-secondary">Accueil</RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink to="/" class="nav-link p-0 text-body-secondary">Boutique</RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink to="/about" class="nav-link p-0 text-body-secondary"
            >Qui sommes nous</RouterLink
          >
        </li>
        <li class="nav-item mb-2">
          <RouterLink to="/faq" class="nav-link p-0 text-body-secondary">FAQs</RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink to="/contact" class="nav-link p-0 text-body-secondary">Contact</RouterLink>
        </li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Mon Compte</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <RouterLink to="/account" class="nav-link p-0 text-body-secondary"
            >Mes paramètres</RouterLink
          >
        </li>
        <li class="nav-item mb-2">
          <RouterLink to="/wishlist" class="nav-link p-0 text-body-secondary"
            >Vos souhaits</RouterLink
          >
        </li>
        <li class="nav-item mb-2">
          <RouterLink to="/orders" class="nav-link p-0 text-body-secondary">Commande</RouterLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
