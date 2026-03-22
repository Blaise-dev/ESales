<script setup>
import Logo from '@/components/Logo.vue'
</script>

<template>
  <footer class="footer-shell row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 m-4 m-md-5">
    <div class="col mb-3"></div>
    <div class="col mb-3">
      <Logo class="d-block w-25 h-25 footer-logo" />
      <p class="text-body-secondary ml-5 mb-1">&copy; 2026 E‑Sales</p>
      <small class="footer-text">Expérience shopping moderne et fluide.</small>
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

<style scoped>
.footer-shell {
  border-top: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.95), rgba(245, 249, 255, 0.92));
  box-shadow: var(--shadow-sm);
}

.footer-logo {
  filter: drop-shadow(0 12px 18px rgba(37, 99, 235, 0.22));
}

.footer-text {
  color: var(--text-soft);
}

.nav-link {
  transition:
    transform var(--ease),
    color var(--ease);
}

.nav-link:hover {
  color: var(--primary) !important;
  transform: translateX(4px);
}
</style>
