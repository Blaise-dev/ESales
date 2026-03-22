<script setup>
import Logo from '@/components/Logo.vue'
</script>

<template>
  <footer class="footer-root">
    <div class="footer-body container-fluid px-4 px-md-5">
      <div class="footer-grid">

        <!-- Colonne marque -->
        <div class="footer-brand">
          <div class="footer-logo-wrap">
            <Logo class="footer-logo" />
          </div>
          <p class="footer-tagline">Expérience shopping moderne et fluide.</p>
          <div class="footer-socials">
            <button type="button" aria-label="Facebook" class="social-btn" title="Bientôt disponible">
              <v-icon size="18">mdi-facebook</v-icon>
            </button>
            <button type="button" aria-label="Instagram" class="social-btn" title="Bientôt disponible">
              <v-icon size="18">mdi-instagram</v-icon>
            </button>
            <button type="button" aria-label="Twitter" class="social-btn" title="Bientôt disponible">
              <v-icon size="18">mdi-twitter</v-icon>
            </button>
          </div>
        </div>

        <!-- Colonne navigation -->
        <div class="footer-col">
          <h6 class="footer-heading">ESales</h6>
          <ul class="footer-links">
            <li><RouterLink to="/">Accueil</RouterLink></li>
            <li><RouterLink to="/search">Boutique</RouterLink></li>
            <li><RouterLink to="/about">À propos</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>

        <!-- Colonne compte -->
        <div class="footer-col">
          <h6 class="footer-heading">Mon Compte</h6>
          <ul class="footer-links">
            <li><RouterLink to="/account">Paramètres</RouterLink></li>
            <li><RouterLink to="/Profil">Profil</RouterLink></li>
            <li><RouterLink to="/shoppingcart">Panier</RouterLink></li>
            <li><RouterLink :to="{ path: '/account', hash: '#orders' }">Commandes</RouterLink></li>
          </ul>
        </div>

        <!-- Colonne contact -->
        <div class="footer-col">
          <h6 class="footer-heading">Contact</h6>
          <ul class="footer-links footer-contact">
            <li>
              <v-icon size="16" class="mr-1">mdi-map-marker-outline</v-icon>
              Rennes, France
            </li>
            <li>
              <v-icon size="16" class="mr-1">mdi-email-outline</v-icon>
              contact@esales.sn
            </li>
            <li>
              <v-icon size="16" class="mr-1">mdi-phone-outline</v-icon>
              +33627379360
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Barre bas -->
    <div class="footer-bar">
      <div class="container-fluid px-4 px-md-5 footer-bar-inner">
        <span>&copy; 2026 E‑Sales — Tous droits réservés</span>
        <span class="footer-bar-links">
          <button type="button">Confidentialité</button>
          <span class="footer-dot">·</span>
          <button type="button">CGU</button>
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ── Structure ── */
.footer-root {
  background: var(--surface-muted);
  border-top: 1px solid var(--border);
  color: var(--text);
  margin-top: 3rem;
  transition: background var(--ease), color var(--ease);
}

.footer-body {
  padding-top: 3rem;
  padding-bottom: 2.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 2.5rem;
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}

/* ── Marque ── */
.footer-logo {
  width: 78px;
  margin-bottom: 0;
  filter: drop-shadow(0 4px 10px rgba(37, 99, 235, 0.2));
}

.footer-logo-wrap {
  width: 112px;
  height: 112px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid var(--border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9rem;
  box-shadow: var(--shadow-sm);
}

.footer-tagline {
  font-size: 0.85rem;
  color: var(--text-soft);
  margin-bottom: 1.1rem;
  line-height: 1.5;
}

.footer-socials {
  display: flex;
  gap: 0.5rem;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--bg-alt);
  border: 1px solid var(--border);
  color: var(--text-soft);
  text-decoration: none;
  transition: background var(--ease), color var(--ease), border-color var(--ease), transform var(--ease);
}

.social-btn,
.footer-bar-links button {
  padding: 0;
  cursor: pointer;
}

.social-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
  transform: translateY(-2px);
}

/* ── Colonnes ── */
.footer-heading {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.footer-links a,
.footer-links li {
  font-size: 0.88rem;
  color: var(--text-soft);
  text-decoration: none;
  transition: color var(--ease), transform var(--ease);
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.footer-links a:hover {
  color: var(--primary);
  transform: translateX(4px);
}

.footer-contact li {
  color: var(--text-soft);
  font-size: 0.88rem;
}

/* ── Barre du bas ── */
.footer-bar {
  border-top: 1px solid var(--border);
  padding: 1rem 0;
  background: var(--surface);
  transition: background var(--ease);
}

.footer-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--text-soft);
}

.footer-bar-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-bar-links a,
.footer-bar-links button {
  color: var(--text-soft);
  text-decoration: none;
  transition: color var(--ease);
  background: transparent;
  border: none;
}

.footer-bar-links a:hover,
.footer-bar-links button:hover {
  color: var(--primary);
}

.footer-dot {
  opacity: 0.5;
}
</style>
