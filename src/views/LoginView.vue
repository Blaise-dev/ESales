<template>
  <div class="auth-page">
    <div class="auth-layout">

      <!-- ── Panel visuel (grands écrans) ─────────────────── -->
      <section class="auth-visual d-none d-lg-flex">
        <!-- Fond gradient animé -->
        <div class="av-bg"></div>
        <!-- Grille décorative -->
        <div class="av-grid"></div>
        <!-- Orbes flottants -->
        <div class="av-orb av-orb-a"></div>
        <div class="av-orb av-orb-b"></div>
        <div class="av-orb av-orb-c"></div>
        <!-- Anneaux décoratifs -->
        <div class="av-ring av-ring-a"></div>
        <div class="av-ring av-ring-b"></div>

        <div class="av-inner">
          <!-- Brand -->
          <div class="av-brand">
            <img src="@/assets/logo.png" alt="E-Sales" class="av-logo" />
            <span class="av-brand-name">E-Sales</span>
          </div>

          <!-- Titre principal -->
          <div class="av-headline">
            <span class="av-badge">E-Commerce Premium</span>
            <h2>Votre shopping,<br /><em>réinventé.</em></h2>
            <p>Connexion simple, livraisons rapides et offres exclusives — tout au même endroit.</p>
          </div>

          <!-- Cartes statistiques glassmorphism -->
          <div class="av-feats">
            <div class="av-feat" style="--fd:0">
              <div class="av-feat-icon">
                <v-icon size="22" color="white">mdi-account-group</v-icon>
              </div>
              <div>
                <div class="av-feat-val">50 000+</div>
                <div class="av-feat-lbl">Clients satisfaits</div>
              </div>
            </div>
            <div class="av-feat" style="--fd:1">
              <div class="av-feat-icon">
                <v-icon size="22" color="white">mdi-lightning-bolt</v-icon>
              </div>
              <div>
                <div class="av-feat-val">Express</div>
                <div class="av-feat-lbl">Livraison 24h</div>
              </div>
            </div>
            <div class="av-feat" style="--fd:2">
              <div class="av-feat-icon">
                <v-icon size="22" color="white">mdi-shield-check</v-icon>
              </div>
              <div>
                <div class="av-feat-val">100%</div>
                <div class="av-feat-lbl">Paiements sécurisés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Panneau formulaire ────────────────────────────── -->
      <section class="auth-panel">
        <div class="auth-card">
          <img src="@/assets/logo.png" class="auth-logo" alt="logo" />

          <div class="auth-header">
            <h1>Bon retour <span class="wave">👋</span></h1>
            <p>Connectez-vous pour accéder à votre espace personnel.</p>
          </div>

          <form class="auth-form" @submit.prevent="login">
            <div class="field-wrap" style="--fi:0">
              <label class="field-label" for="email">Email <span class="req">*</span></label>
              <v-text-field
                v-model="email"
                type="email"
                id="email"
                name="email"
                placeholder="vous@exemple.com"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :error-messages="errorEmail"
                required
              />
            </div>

            <div class="forgot-row" style="--fi:1">
              <RouterLink to="/restaurePassword" class="auth-link">Mot de passe oublié ?</RouterLink>
            </div>

            <div class="field-wrap" style="--fi:2">
              <label class="field-label" for="password">Mot de passe <span class="req">*</span></label>
              <v-text-field
                v-model="password"
                id="password"
                name="password"
                placeholder="••••••••••••"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                :error-messages="errorPwd"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                required
              />
            </div>

            <div class="remember-row" style="--fi:3">
              <label class="check-label">
                <input type="checkbox" class="check-native" id="rememberMe" checked />
                <span>Se souvenir de moi</span>
              </label>
              <span v-if="error" class="err-msg">{{ error }}</span>
            </div>

            <button class="auth-btn auth-btn-primary" type="submit" style="--fi:4">
              <v-icon size="18">mdi-login-variant</v-icon>
              Se connecter
              <span class="btn-shine"></span>
            </button>

            <RouterLink to="/register" class="auth-btn auth-btn-outline" style="--fi:5">
              <v-icon size="18">mdi-account-plus-outline</v-icon>
              Créer un compte
            </RouterLink>

            <div class="auth-divider" style="--fi:6">
              <span>ou continuer avec</span>
            </div>

            <button type="button" class="auth-btn-social" disabled aria-disabled="true" style="--fi:7">
              <img src="@/assets/google-logo.png" class="social-logo" alt="Google" />
              Continuer avec Google
            </button>
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
/* ═══════════════════════════════════════════════════════
   PAGE WRAPPER
═══════════════════════════════════════════════════════ */
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
  grid-template-columns: 1.15fr 0.85fr;
  box-shadow: 0 30px 80px rgba(0, 0, 0, .18);
}

/* ═══════════════════════════════════════════════════════
   PANNEAU VISUEL (gauche)
═══════════════════════════════════════════════════════ */
.auth-visual {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  flex-direction: column;
}

/* Fond gradient profond */
.av-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, #070d1f 0%, #0e2661 42%, #0a3d52 100%);
  z-index: 0;
}

/* Grille géométrique subtile */
.av-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 44px 44px;
  z-index: 1;
}

/* Orbes lumineux */
.av-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(65px);
  z-index: 1;
  pointer-events: none;
}

.av-orb-a {
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(37, 99, 235, .65), transparent 68%);
  top: -14%; left: -14%;
  animation: orbFloat 10s ease-in-out infinite;
}

.av-orb-b {
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(20, 184, 166, .55), transparent 68%);
  bottom: 0%; right: -10%;
  animation: orbFloat 12s ease-in-out infinite reverse;
}

.av-orb-c {
  width: 220px; height: 220px;
  background: radial-gradient(circle, rgba(139, 92, 246, .5), transparent 68%);
  top: 42%; right: 8%;
  animation: orbFloat 8s ease-in-out infinite 2.5s;
}

/* Anneaux décoratifs */
.av-ring {
  position: absolute;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, .07);
  z-index: 1;
  pointer-events: none;
  animation: ringPulse 9s ease-in-out infinite;
}

.av-ring-a { width: 480px; height: 480px; bottom: -160px; left: -160px; }
.av-ring-b { width: 300px; height: 300px; top: -90px; right: -90px; animation-delay: 2.5s; }

/* Conteneur intérieur */
.av-inner {
  position: relative;
  z-index: 2;
  padding: 2.4rem 2.4rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: 2.4rem;
}

/* Brand */
.av-brand {
  display: flex;
  align-items: center;
  gap: .75rem;
  animation: fadeInLeft .7s var(--ease) both;
}

.av-logo {
  width: 48px; height: auto;
  filter: drop-shadow(0 2px 14px rgba(255, 255, 255, .3));
}

.av-brand-name {
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -.025em;
  color: #fff;
}

/* Headline */
.av-headline {
  animation: fadeInLeft .7s var(--ease) 110ms both;
}

.av-badge {
  display: inline-flex;
  align-items: center;
  padding: .3rem .95rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, .13);
  border: 1px solid rgba(255, 255, 255, .22);
  backdrop-filter: blur(10px);
  font-size: .73rem;
  font-weight: 700;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .92);
  margin-bottom: 1.1rem;
}

.av-headline h2 {
  font-size: clamp(1.9rem, 2.5vw, 3rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 .75rem;
  line-height: 1.12;
  letter-spacing: -.032em;
}

.av-headline h2 em {
  font-style: normal;
  background: linear-gradient(90deg, #60a5fa 0%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.av-headline p {
  color: rgba(255, 255, 255, .68);
  font-size: .97rem;
  max-width: 400px;
  margin: 0;
  line-height: 1.68;
}

/* Cartes glassmorphism */
.av-feats {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  animation: fadeInLeft .7s var(--ease) 200ms both;
}

.av-feat {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .8rem 1.2rem;
  background: rgba(255, 255, 255, .09);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 16px;
  color: #fff;
  animation: slideInFeat .6s var(--ease) both;
  animation-delay: calc(.35s + var(--fd, 0) * .12s);
  transition: background .25s, border-color .25s;
}

.av-feat:hover {
  background: rgba(255, 255, 255, .14);
  border-color: rgba(255, 255, 255, .28);
}

.av-feat-icon {
  width: 42px; height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, .14);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.av-feat-val { font-weight: 800; font-size: 1.05rem; line-height: 1.2; }
.av-feat-lbl { font-size: .78rem; color: rgba(255, 255, 255, .68); margin-top: .05rem; }

/* ═══════════════════════════════════════════════════════
   PANNEAU FORMULAIRE (droite)
═══════════════════════════════════════════════════════ */
.auth-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.8rem 1.4rem;
  background: var(--bg);
}

.auth-card {
  width: min(480px, 100%);
  animation: fadeInUp .65s var(--ease) both;
}

.auth-logo {
  width: 72px; height: auto;
  display: block; margin: 0 auto .9rem;
  animation: logoPulse 3.2s ease-in-out infinite;
}

/* En-tête formulaire */
.auth-header {
  text-align: center;
  margin-bottom: 1.6rem;
}

.auth-header h1 {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -.03em;
  margin: 0 0 .45rem;
  color: var(--text);
}

.auth-header p {
  color: var(--text-soft);
  margin: 0;
  font-size: .93rem;
  line-height: 1.55;
}

.wave {
  display: inline-block;
  animation: waveHand .85s ease-in-out both;
  transform-origin: 70% 80%;
}

/* Champs */
.auth-form {
  display: flex;
  flex-direction: column;
}

.field-wrap,
.forgot-row,
.remember-row,
.auth-btn,
.auth-divider,
.auth-btn-social {
  animation: fieldIn .52s var(--ease) both;
  animation-delay: calc(var(--fi, 0) * 65ms + 180ms);
}

.field-wrap { margin-bottom: .2rem; }

.field-label {
  font-size: .875rem;
  font-weight: 600;
  color: var(--text-soft);
  margin-bottom: .28rem;
  display: block;
}

.req { color: #ef4444; margin-left: .1rem; }

.forgot-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: .6rem;
}

.auth-link {
  font-size: .875rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: color .2s;
}
.auth-link:hover { color: var(--primary-strong); text-decoration: underline; }

.remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  flex-wrap: wrap;
  margin-bottom: 1.1rem;
}

.check-label {
  display: flex; align-items: center; gap: .5rem;
  font-size: .875rem; color: var(--text-soft);
  cursor: pointer; user-select: none;
}

.check-native {
  width: 16px; height: 16px;
  accent-color: var(--primary);
  cursor: pointer;
}

.err-msg { font-size: .82rem; color: #ef4444; font-weight: 600; }

/* ── Boutons ── */
.auth-btn {
  display: flex; align-items: center; justify-content: center;
  gap: .5rem; width: 100%; border: none; border-radius: 14px;
  font-weight: 700; font-size: .96rem; cursor: pointer;
  text-decoration: none;
  transition: transform .22s var(--ease), box-shadow .22s var(--ease);
  padding: .85rem 1.2rem;
  position: relative; overflow: hidden;
  margin-bottom: .7rem;
}
.auth-btn:hover { transform: translateY(-2px); }
.auth-btn:active { transform: translateY(0) scale(.99); }

.auth-btn-primary {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #fff !important;
  box-shadow: 0 4px 20px rgba(37, 99, 235, .38);
}
.auth-btn-primary:hover {
  box-shadow: 0 8px 32px rgba(37, 99, 235, .52);
}

/* Effet shimmer au hover */
.btn-shine {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 25%, rgba(255, 255, 255, .28) 50%, transparent 75%);
  transform: translateX(-110%);
  transition: transform .55s ease;
  pointer-events: none;
}
.auth-btn-primary:hover .btn-shine { transform: translateX(110%); }

.auth-btn-outline {
  background: transparent;
  border: 1.5px solid var(--border);
  color: var(--text) !important;
}
.auth-btn-outline:hover {
  border-color: var(--primary);
  color: var(--primary) !important;
  background: color-mix(in srgb, var(--primary) 6%, transparent);
}

/* Séparateur */
.auth-divider {
  display: flex; align-items: center; gap: 1rem;
  margin: .1rem 0 .75rem;
}
.auth-divider::before,
.auth-divider::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}
.auth-divider span {
  font-size: .78rem; color: var(--text-soft);
  white-space: nowrap; font-weight: 500; letter-spacing: .04em;
  text-transform: uppercase;
}

/* Bouton social */
.auth-btn-social {
  display: flex; align-items: center; justify-content: center;
  gap: .6rem; width: 100%;
  border: 1.5px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
  color: var(--text); font-weight: 600; font-size: .93rem;
  padding: .78rem 1rem; cursor: not-allowed;
  opacity: .58;
  animation: fieldIn .52s var(--ease) both;
  animation-delay: calc(var(--fi, 0) * 65ms + 180ms);
}

.social-logo { width: 20px; height: 20px; flex-shrink: 0; }

/* ═══════════════════════════════════════════════════════
   OVERRIDES VUETIFY
═══════════════════════════════════════════════════════ */
:deep(.v-field__outline) { color: var(--border) !important; }
:deep(.v-field--focused .v-field__outline) { color: var(--primary) !important; }
:deep(.v-field input::placeholder) { color: color-mix(in srgb, var(--text-soft) 60%, transparent) !important; }
:deep(.v-field__input) { color: var(--text) !important; }
:deep(.v-field .v-icon) { color: var(--text-soft) !important; }
:deep(.v-field--focused .v-icon) { color: var(--primary) !important; }

/* ═══════════════════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════════════════ */
@keyframes fieldIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes slideInFeat {
  from { opacity: 0; transform: translateX(-20px) scale(.97); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-20px) scale(1.05); }
}

@keyframes ringPulse {
  0%, 100% { transform: scale(1); opacity: .5; }
  50%       { transform: scale(1.07); opacity: .9; }
}

@keyframes logoPulse {
  0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 0 rgba(37,99,235,0)); }
  50%       { transform: scale(1.07) rotate(1deg); filter: drop-shadow(0 0 16px rgba(37,99,235,.4)); }
}

@keyframes waveHand {
  0%   { transform: rotate(0deg); }
  20%  { transform: rotate(18deg); }
  50%  { transform: rotate(-6deg); }
  75%  { transform: rotate(14deg); }
  100% { transform: rotate(0deg); }
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════ */
@media (max-width: 1199.98px) {
  .auth-layout { grid-template-columns: 1fr; }
  .auth-panel { background: var(--bg); }
}

@media (max-width: 767.98px) {
  .auth-page { padding: .6rem; }
  .auth-layout {
    min-height: calc(100vh - 1.2rem);
    border-radius: var(--radius-md);
  }
  .auth-card { width: 100%; }
  .auth-header h1 { font-size: 1.55rem; }
}
</style>
