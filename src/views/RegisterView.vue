<template>
  <div class="register-page">
    <div class="register-layout">

      <!-- ── Panneau visuel gauche (grands écrans) ─────────── -->
      <section class="rv-visual d-none d-lg-flex">
        <div class="rv-bg"></div>
        <div class="rv-grid"></div>
        <div class="rv-orb rv-orb-a"></div>
        <div class="rv-orb rv-orb-b"></div>
        <div class="rv-orb rv-orb-c"></div>
        <div class="rv-ring rv-ring-a"></div>
        <div class="rv-ring rv-ring-b"></div>

        <div class="rv-inner">
          <div class="rv-topbar">
            <div class="rv-brand">
              <img src="@/assets/logo.png" alt="E-Sales" class="rv-logo" />
              <span class="rv-brand-name">E-Sales</span>
            </div>
            <select name="language" id="language" class="rv-lang-select" required>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          <div class="rv-headline">
            <span class="rv-badge">Nouveau sur E-Sales ?</span>
            <h2>Créez votre compte<br /><em>gratuitement.</em></h2>
            <p>Profitez d'un espace personnalisé, d'un suivi de commandes fluide et d'offres exclusives.</p>
          </div>

          <div class="rv-benefs">
            <div class="rv-benef" style="--bd:0">
              <div class="rv-benef-icon"><v-icon size="20" color="white">mdi-tag-heart</v-icon></div>
              <span>Offres exclusives membres</span>
            </div>
            <div class="rv-benef" style="--bd:1">
              <div class="rv-benef-icon"><v-icon size="20" color="white">mdi-truck-fast-outline</v-icon></div>
              <span>Suivi de commandes en temps réel</span>
            </div>
            <div class="rv-benef" style="--bd:2">
              <div class="rv-benef-icon"><v-icon size="20" color="white">mdi-heart-outline</v-icon></div>
              <span>Liste de souhaits personnalisée</span>
            </div>
            <div class="rv-benef" style="--bd:3">
              <div class="rv-benef-icon"><v-icon size="20" color="white">mdi-shield-lock-outline</v-icon></div>
              <span>Données 100% sécurisées</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Panneau formulaire ────────────────────────────── -->
      <section class="rv-panel">
        <div class="rv-card">
          <div class="rv-header">
            <h1>Créer un compte ✨</h1>
            <p>Renseignez vos informations pour rejoindre E-Sales.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="rv-form">
            <div class="field-wrap" style="--fi:0">
              <label class="field-label" for="email">Email <span class="req">*</span></label>
              <v-text-field
                v-model="email"
                type="email"
                id="email"
                name="email"
                density="compact"
                placeholder="vous@exemple.com"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                required
              />
            </div>

            <div class="field-row" style="--fi:1">
              <div class="field-wrap">
                <label class="field-label" for="nom">Nom <span class="req">*</span></label>
                <input v-model="nom" type="text" id="nom" name="nom" class="field-native" placeholder="Dupont" required />
              </div>
              <div class="field-wrap">
                <label class="field-label" for="prenom">Prénom <span class="req">*</span></label>
                <input v-model="prenom" type="text" id="prenom" name="prenom" class="field-native" placeholder="Marie" required />
              </div>
            </div>

            <div class="field-wrap" style="--fi:2">
              <label class="field-label" for="phone">Téléphone <span class="req">*</span></label>
              <v-text-field
                v-model="tel"
                type="tel"
                id="phone"
                name="phone"
                density="compact"
                placeholder="+33 6 12 34 56 78"
                prepend-inner-icon="mdi-phone-outline"
                variant="outlined"
                required
              />
            </div>

            <div class="field-wrap" style="--fi:3">
              <label class="field-label" for="password">Mot de passe <span class="req">*</span></label>
              <v-text-field
                v-model="password"
                id="password"
                name="password"
                placeholder="••••••••••••"
                :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visiblePassword ? 'text' : 'password'"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visiblePassword = !visiblePassword"
                required
              />
            </div>

            <div class="field-wrap" style="--fi:4">
              <label class="field-label" for="password_confirm">Confirmation <span class="req">*</span></label>
              <v-text-field
                id="password_confirm"
                name="password_confirm"
                placeholder="••••••••••••"
                :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleConfirmPassword ? 'text' : 'password'"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
                required
              />
            </div>

            <div class="field-wrap" style="--fi:5">
              <label class="field-label" for="profilePhoto">Photo de profil</label>
              <v-file-input
                id="profilePhoto"
                name="profilePhoto"
                density="compact"
                placeholder="Importer une photo"
                prepend-inner-icon="mdi-camera-outline"
                variant="outlined"
                accept="image/*"
                required
                @change="onFileChange"
              />
              <v-img v-if="profilePhotoUrl" :src="profilePhotoUrl" alt="Aperçu" max-width="110" class="profile-preview" />
            </div>

            <button class="rv-btn rv-btn-primary" type="submit" style="--fi:6">
              <v-icon size="18">mdi-check-circle-outline</v-icon>
              S'inscrire
              <span class="btn-shine"></span>
            </button>

            <div class="switch-auth" style="--fi:7">
              Déjà un compte ?
              <RouterLink to="/login" class="auth-link">Se connecter</RouterLink>
            </div>

            <div class="auth-divider" style="--fi:8">
              <span>ou continuer avec</span>
            </div>

            <button type="button" class="auth-btn-social" disabled aria-disabled="true" style="--fi:9">
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
import { copyGuestWishlistToUser } from '@/utils/wishlist'

export default {
  data() {
    return {
      email: '',
      nom: '',
      prenom: '',
      tel: '',
      password: '',
      profilePhotoUrl: null,
      isLoading: false,
      loaded: false,
      visiblePassword: false,
      visibleConfirmPassword: false
    }
  },
  methods: {
    async registerUser() {
      try {
        const response = await apiClient.post('/users', {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password,
          photo: this.profilePhotoUrl,
          token: 'ADAFZEJHDJQSD111--'
        })

        return response?.data || null
      } catch (error) {
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
        return null
      }
    },
    async handleSubmit() {
      this.isLoading = true

      setTimeout(async () => {
        this.isLoading = false
        this.loaded = true

        const createdUser = await this.registerUser()
        const createdUserId = createdUser?.id

        if (createdUserId) {
          copyGuestWishlistToUser(createdUserId)
          this.$store.dispatch('copyGuestCartOnRegister', createdUserId)
        }

        this.$router.push('/login')
      }, 2000)
    },
    onFileChange(event) {
      const file = event.target.files[0]
      if (file && file.size > 0) {
        apiClient
          .post(
            '/upload',
            { profilePhoto: file },
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          .then((response) => {
            this.profilePhotoUrl = response.data.filePath
          })
          .catch((error) => {
            console.error("Erreur lors du téléchargement de l'image :", error)
          })
      } else {
        this.profilePhotoUrl = null
      }
    }
  }
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   PAGE WRAPPER
═══════════════════════════════════════════════════════ */
.register-page {
  min-height: 100vh;
  padding: 1rem;
  background: var(--bg);
}

.register-layout {
  min-height: calc(100vh - 2rem);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  box-shadow: 0 30px 80px rgba(0, 0, 0, .18);
}

/* ═══════════════════════════════════════════════════════
   PANNEAU VISUEL (gauche) — même langage que Login
═══════════════════════════════════════════════════════ */
.rv-visual {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  flex-direction: column;
}

.rv-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, #050c1a 0%, #0b2254 40%, #093a48 100%);
  z-index: 0;
}

.rv-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, .032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .032) 1px, transparent 1px);
  background-size: 44px 44px;
  z-index: 1;
}

.rv-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(65px);
  z-index: 1;
  pointer-events: none;
}

.rv-orb-a {
  width: 360px; height: 360px;
  background: radial-gradient(circle, rgba(20, 184, 166, .6), transparent 68%);
  top: -12%; right: -12%;
  animation: orbFloat 11s ease-in-out infinite;
}

.rv-orb-b {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(37, 99, 235, .5), transparent 68%);
  bottom: -5%; left: -10%;
  animation: orbFloat 9s ease-in-out infinite reverse;
}

.rv-orb-c {
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(167, 139, 250, .45), transparent 68%);
  top: 48%; left: 14%;
  animation: orbFloat 7s ease-in-out infinite 1.5s;
}

.rv-ring {
  position: absolute;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, .07);
  z-index: 1;
  pointer-events: none;
  animation: ringPulse 9s ease-in-out infinite;
}

.rv-ring-a { width: 440px; height: 440px; top: -140px; right: -140px; }
.rv-ring-b { width: 280px; height: 280px; bottom: -80px; left: -80px; animation-delay: 3s; }

/* Conteneur intérieur */
.rv-inner {
  position: relative;
  z-index: 2;
  padding: 2rem 2.2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 1.5rem;
}

/* Top bar */
.rv-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  animation: fadeInLeft .6s var(--ease) both;
}

.rv-brand {
  display: flex;
  align-items: center;
  gap: .6rem;
}

.rv-logo {
  width: 44px; height: auto;
  filter: drop-shadow(0 2px 12px rgba(255, 255, 255, .28));
}

.rv-brand-name {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -.02em;
  color: #fff;
}

.rv-lang-select {
  appearance: none;
  background: rgba(255, 255, 255, .12);
  border: 1px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(10px);
  border-radius: 999px;
  color: #fff;
  font-size: .82rem;
  font-weight: 600;
  padding: .35rem .9rem;
  cursor: pointer;
  outline: none;
  transition: background .2s;
}
.rv-lang-select:hover { background: rgba(255, 255, 255, .18); }
.rv-lang-select option { background: #1e3a8a; color: #fff; }

/* Headline */
.rv-headline {
  animation: fadeInLeft .7s var(--ease) 100ms both;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rv-badge {
  display: inline-flex;
  align-items: center;
  padding: .28rem .9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, .13);
  border: 1px solid rgba(255, 255, 255, .22);
  backdrop-filter: blur(10px);
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .92);
  margin-bottom: .9rem;
  width: fit-content;
}

.rv-headline h2 {
  font-size: clamp(1.8rem, 2.3vw, 2.7rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 .7rem;
  line-height: 1.14;
  letter-spacing: -.03em;
}

.rv-headline h2 em {
  font-style: normal;
  background: linear-gradient(90deg, #34d399 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.rv-headline p {
  color: rgba(255, 255, 255, .65);
  font-size: .95rem;
  max-width: 380px;
  margin: 0;
  line-height: 1.65;
}

/* Cartes avantages */
.rv-benefs {
  display: flex;
  flex-direction: column;
  gap: .6rem;
  animation: fadeInLeft .7s var(--ease) 200ms both;
}

.rv-benef {
  display: flex;
  align-items: center;
  gap: .85rem;
  padding: .65rem 1rem;
  background: rgba(255, 255, 255, .09);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, .15);
  border-radius: 12px;
  color: rgba(255, 255, 255, .9);
  font-size: .88rem;
  font-weight: 500;
  animation: slideInFeat .55s var(--ease) both;
  animation-delay: calc(.3s + var(--bd, 0) * .1s);
  transition: background .25s;
}

.rv-benef:hover {
  background: rgba(255, 255, 255, .14);
}

.rv-benef-icon {
  width: 34px; height: 34px;
  border-radius: 9px;
  background: rgba(255, 255, 255, .14);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════════════════
   PANNEAU FORMULAIRE (droite)
═══════════════════════════════════════════════════════ */
.rv-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 1.2rem;
  background: var(--bg);
  overflow-y: auto;
}

.rv-card {
  width: min(520px, 100%);
  animation: fadeInUp .65s var(--ease) both;
}

.rv-header {
  text-align: center;
  margin-bottom: 1.4rem;
}

.rv-header h1 {
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: -.03em;
  margin: 0 0 .4rem;
  color: var(--text);
}

.rv-header p {
  color: var(--text-soft);
  margin: 0;
  font-size: .92rem;
  line-height: 1.55;
}

/* Formulaire */
.rv-form {
  display: flex;
  flex-direction: column;
}

.field-wrap,
.field-row,
.switch-auth,
.rv-btn,
.auth-divider,
.auth-btn-social {
  animation: fieldIn .5s var(--ease) both;
  animation-delay: calc(var(--fi, 0) * 60ms + 160ms);
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .65rem;
}

.field-wrap { margin-bottom: .25rem; }

.field-label {
  font-size: .875rem;
  font-weight: 600;
  color: var(--text-soft);
  margin-bottom: .28rem;
  display: block;
}

.req { color: #ef4444; margin-left: .1rem; }

.field-native {
  width: 100%;
  border: 1.5px solid var(--border);
  background: var(--bg-alt);
  color: var(--text);
  border-radius: 12px;
  padding: .68rem .9rem;
  font-size: .94rem;
  font-family: inherit;
  transition: border-color .2s, box-shadow .2s;
  outline: none;
}

.field-native:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent);
}

.field-native::placeholder {
  color: color-mix(in srgb, var(--text-soft) 60%, transparent);
}

.profile-preview {
  margin-top: .5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
}

/* Bouton principal */
.rv-btn {
  display: flex; align-items: center; justify-content: center;
  gap: .5rem; width: 100%; border: none; border-radius: 14px;
  font-weight: 700; font-size: .96rem; cursor: pointer;
  text-decoration: none;
  transition: transform .22s var(--ease), box-shadow .22s var(--ease);
  padding: .85rem 1.2rem;
  position: relative; overflow: hidden;
  margin-top: .4rem; margin-bottom: .7rem;
}
.rv-btn:hover { transform: translateY(-2px); }
.rv-btn:active { transform: translateY(0) scale(.99); }

.rv-btn-primary {
  background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
  color: #fff !important;
  box-shadow: 0 4px 20px rgba(13, 148, 136, .38);
}
.rv-btn-primary:hover {
  box-shadow: 0 8px 32px rgba(13, 148, 136, .52);
}

.btn-shine {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 25%, rgba(255, 255, 255, .28) 50%, transparent 75%);
  transform: translateX(-110%);
  transition: transform .55s ease;
  pointer-events: none;
}
.rv-btn-primary:hover .btn-shine { transform: translateX(110%); }

/* Lien retour connexion */
.switch-auth {
  display: flex; align-items: center; justify-content: center;
  gap: .45rem; font-size: .875rem;
  color: var(--text-soft); margin-bottom: .6rem;
}

.auth-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}
.auth-link:hover { text-decoration: underline; }

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
  animation: fieldIn .5s var(--ease) both;
  animation-delay: calc(var(--fi, 0) * 60ms + 160ms);
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
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-22px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes slideInFeat {
  from { opacity: 0; transform: translateX(-16px) scale(.97); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-18px) scale(1.05); }
}

@keyframes ringPulse {
  0%, 100% { transform: scale(1); opacity: .5; }
  50%       { transform: scale(1.07); opacity: .9; }
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════ */
@media (max-width: 1199.98px) {
  .register-layout { grid-template-columns: 1fr; }
  .rv-panel { background: var(--bg); }
}

@media (max-width: 767.98px) {
  .register-page { padding: .6rem; }
  .register-layout {
    min-height: calc(100vh - 1.2rem);
    border-radius: var(--radius-md);
  }
  .rv-card { width: 100%; }
  .rv-header h1 { font-size: 1.55rem; }
  .field-row { grid-template-columns: 1fr; gap: 0; }
}
</style>
