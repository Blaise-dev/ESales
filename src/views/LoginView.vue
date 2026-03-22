<template>
  <div class="auth-page">
    <div class="auth-layout">
      <section class="auth-visual d-none d-lg-flex">
        <div id="carouselExample" class="carousel slide h-100 w-100" data-bs-ride="carousel" data-bs-interval="9000">
          <div class="carousel-inner h-100">
            <div class="carousel-item active h-100">
              <img
                src="@/assets/jeune-femme-excitee-montrant-banniere-pointant-du-doigt-vers-gauche-souriant-camera-debout-etonnee-par-mur-blanc.jpg"
                class="d-block w-100 h-100 auth-visual-img"
                alt="shopping"
              />
            </div>
            <div class="carousel-item h-100">
              <img src="@/assets/2149074076.jpg" class="d-block w-100 h-100 auth-visual-img" alt="fashion" />
            </div>
            <div class="carousel-item h-100">
              <img src="@/assets/amies-font-du-shopping-ensemble.jpg" class="d-block w-100 h-100 auth-visual-img" alt="friends shopping" />
            </div>
            <div class="carousel-item h-100">
              <img src="@/assets/back-view-couple-holding-shopping-bags.jpg" class="d-block w-100 h-100 auth-visual-img" alt="couple shopping" />
            </div>
            <div class="carousel-item h-100">
              <img src="@/assets/full-length-portrait-happy-family.jpg" class="d-block w-100 h-100 auth-visual-img" alt="family" />
            </div>
          </div>
        </div>

        <div class="visual-overlay"></div>
        <div class="visual-glow glow-one"></div>
        <div class="visual-glow glow-two"></div>

        <div class="visual-caption">
          <span class="caption-badge">E-Sales</span>
          <h2>Bienvenue, votre shopping commence ici.</h2>
          <p>Connexion rapide, interface fluide, expérience premium sur tous vos écrans.</p>
        </div>
      </section>

      <section class="auth-panel">
        <div class="auth-card surface-card">
          <img src="@/assets/logo.png" class="auth-logo" alt="logo" />

          <div class="auth-header">
            <h1>S'authentifier</h1>
            <p>Ravi de vous revoir. Connectez-vous pour accéder à votre espace.</p>
          </div>

          <form class="w-100" @submit.prevent="login">
            <div class="field-wrap">
              <div class="field-label">Email <span class="text-danger">*</span></div>
              <v-text-field
                v-model="email"
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :error-messages="errorEmail"
                required
              />
            </div>

            <div class="d-flex justify-content-end mb-2">
              <RouterLink to="/restaurePassword" class="auth-link">Mot de passe oublié ?</RouterLink>
            </div>

            <div class="field-wrap">
              <div class="field-label">Mot de passe <span class="text-danger">*</span></div>
              <v-text-field
                v-model="password"
                name="password"
                id="password"
                placeholder="**********************"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                :error-messages="errorPwd"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                required
              />
            </div>

            <div class="remember-row mb-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="rememberMe" checked />
                <label class="form-check-label" for="rememberMe"> Souviens-toi de moi </label>
              </div>
              <span v-if="error" class="text-danger small">{{ error }}</span>
            </div>

            <div class="actions-col">
              <button class="btn btn-modern btn-lg auth-btn-primary" type="submit">
                <i class="bi bi-box-arrow-in-right"></i>
                Se connecter
              </button>

              <RouterLink to="/register" class="btn btn-outline-primary btn-lg auth-btn-secondary">
                <i class="bi bi-person-fill"></i>
                Créer un compte
              </RouterLink>
            </div>

            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0 text-muted">AUTRE</p>
            </div>

            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-light btn-lg social-btn" disabled aria-disabled="true">
                <img src="@/assets/google-logo.png" class="social-logo" alt="Google" />
                Connectez-vous avec Google
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import apiClient from '@/api'
import { mergeGuestWishlistIntoUser } from '@/utils/wishlist'

export default {
  name: 'LoginView',

  data: () => ({
    visible: false,
    email: '',
    password: '',
    errorEmail: '',
    errorPwd: '',
    error: ''
  }),

  methods: {
    async login() {
      this.error = ''
      this.errorEmail = ''
      this.errorPwd = ''

      try {
        let user = await this.getUserFromApi(this.email, this.password)

        if (!user) {
          user = await this.getUserFromDbFile(this.email, this.password)
        }

        if (!user) {
          this.errorEmail = 'Email incorrect'
          this.errorPwd = 'Mot de passe incorrect'
          return
        } else {
          localStorage.setItem('token', user.token || `token-${user.id}`)

          await this.$store.dispatch('setUser', user)
          await this.$store.dispatch('setToken', user.token || `token-${user.id}`)

          mergeGuestWishlistIntoUser(user.id)
          await this.$store.dispatch('migrateGuestCartOnLogin', user.id)

          const redirectTarget = (this.$route.query.redirect || '').toString().trim()
          this.$router.push(redirectTarget || '/')
        }
      } catch (error) {
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
      }
    },
    async getUserFromApi(email, password) {
      try {
        const response = await apiClient.get(`/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
        if (Array.isArray(response.data) && response.data.length > 0) {
          return response.data[0]
        }
      } catch (error) {
        console.warn('API users indisponible, fallback db.json activé')
      }

      return null
    },
    async getUserFromDbFile(email, password) {
      const response = await fetch('/db.json', { cache: 'no-store' })
      if (!response.ok) {
        return null
      }

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        return null
      }

      const db = await response.json()
      const users = Array.isArray(db.users) ? db.users : []

      return users.find(
        (user) =>
          user.email?.toLowerCase() === email.toLowerCase() && user.password === password
      ) || null
    },
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  padding: 1rem;
  background: var(--bg);
}

.auth-layout {
  min-height: calc(100vh - 2rem);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  border: 1px solid var(--border);
  background: var(--surface-muted);
}

.auth-visual {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.auth-visual-img {
  object-fit: cover;
  transform: scale(1.02);
}

.visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, transparent 10%, var(--bg) 180%);
  z-index: 1;
}

.visual-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(24px);
  z-index: 1;
  opacity: 0.45;
  animation: floaty 7s ease-in-out infinite;
}

.glow-one {
  width: 210px;
  height: 210px;
  background: color-mix(in srgb, var(--primary) 35%, transparent);
  top: 8%;
  left: 8%;
}

.glow-two {
  width: 260px;
  height: 260px;
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  bottom: 8%;
  right: 8%;
  animation-delay: 1.1s;
}

.visual-caption {
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;
  color: #fff;
  animation: slideUp .8s var(--ease);
}

.caption-badge {
  display: inline-flex;
  padding: .35rem .8rem;
  border-radius: 999px;
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  background: color-mix(in srgb, var(--primary) 55%, transparent);
  margin-bottom: .8rem;
}

.visual-caption h2 {
  font-size: clamp(1.4rem, 2.4vw, 2.2rem);
  margin-bottom: .45rem;
}

.visual-caption p {
  max-width: 520px;
  margin: 0;
  opacity: .92;
}

.auth-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  background: linear-gradient(180deg, var(--surface-muted), var(--bg));
}

.auth-card {
  width: min(560px, 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 2rem 1.6rem;
  box-shadow: var(--shadow-md);
  animation: fadeUp .7s var(--ease);
}

.auth-logo {
  width: 88px;
  height: auto;
  display: block;
  margin: 0 auto .8rem;
  animation: pulseGlow 2.8s ease-in-out infinite;
}

.auth-header {
  text-align: center;
  margin-bottom: 1rem;
}

.auth-header h1 {
  margin: 0 0 .4rem;
  font-size: 1.55rem;
}

.auth-header p {
  color: var(--text-soft);
  margin: 0;
  font-size: .92rem;
}

.field-wrap {
  margin-bottom: .55rem;
}

.field-label {
  font-size: .9rem;
  color: var(--text-soft);
  margin-bottom: .2rem;
}

.auth-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}
.auth-link:hover { text-decoration: underline; }

.remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  flex-wrap: wrap;
}

.actions-col {
  display: grid;
  gap: .75rem;
}

.auth-btn-primary,
.auth-btn-secondary {
  width: 100%;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .45rem;
  transition: transform var(--ease), box-shadow var(--ease);
}

.auth-btn-primary:hover,
.auth-btn-secondary:hover {
  transform: translateY(-2px);
}

.social-btn {
  border-radius: 999px !important;
  width: 100%;
  max-width: 360px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
}

.social-logo {
  width: 18px;
  height: 18px;
}

.divider:after,
.divider:before {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

:deep(.v-field__outline) {
  color: var(--border) !important;
}

:deep(.v-field--focused .v-field__outline) {
  color: var(--primary) !important;
}

:deep(.v-field input::placeholder) {
  color: color-mix(in srgb, var(--text-soft) 70%, transparent) !important;
}

@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes slideUp {
  from { transform: translateY(20px); }
  to   { transform: translateY(0); }
}

@keyframes fadeUp {
  from { transform: translateY(16px); }
  to   { transform: translateY(0); }
}

@keyframes pulseGlow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

@media (max-width: 1199.98px) {
  .auth-layout {
    grid-template-columns: 1fr;
  }

  .auth-panel {
    background: transparent;
  }
}

@media (max-width: 767.98px) {
  .auth-page {
    padding: .55rem;
  }

  .auth-layout {
    min-height: calc(100vh - 1.1rem);
    border-radius: var(--radius-md);
  }

  .auth-card {
    padding: 1.15rem .95rem;
  }

  .auth-logo {
    width: 74px;
  }
}
</style>
