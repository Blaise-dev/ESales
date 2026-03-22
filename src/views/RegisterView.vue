<template>
  <div class="register-page">
    <div class="register-layout">
      <section class="register-left d-none d-lg-flex">
        <div class="left-topbar">
          <img src="@/assets/logo.png" class="left-logo" alt="logo" />
          <select name="language" id="language" class="form-select language-select" required>
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>
        </div>

        <div class="left-copy">
          <span class="left-badge">Nouveau sur E-Sales ?</span>
          <h2>Créez votre compte en moins d’une minute.</h2>
          <p>Profitez d’un espace personnalisé, d’un suivi de commandes fluide et d’offres exclusives.</p>
        </div>

        <div class="left-orb orb-one"></div>
        <div class="left-orb orb-two"></div>
      </section>

      <section class="register-right">
        <div class="register-card surface-card">
          <div class="register-header">
            <h1>Créer un compte</h1>
            <p>Renseignez vos informations pour rejoindre E-Sales.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="w-100">
            <div class="field-wrap">
              <div class="field-label">Email <span class="text-danger">*</span></div>
              <v-text-field
                v-model="email"
                type="email"
                name="email"
                id="email"
                density="compact"
                placeholder="example@gmail.com"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                required
              ></v-text-field>
            </div>

            <div class="field-row">
              <div class="field-wrap">
                <div class="field-label">Nom <span class="text-danger">*</span></div>
                <input
                  v-model="nom"
                  type="text"
                  name="nom"
                  class="form-control field-native"
                  id="nom"
                  placeholder="Nom"
                  required
                />
              </div>
              <div class="field-wrap">
                <div class="field-label">Prénom <span class="text-danger">*</span></div>
                <input
                  v-model="prenom"
                  type="text"
                  name="prenom"
                  class="form-control field-native"
                  id="prenom"
                  placeholder="Prénom"
                  required
                />
              </div>
            </div>

            <div class="field-wrap">
              <div class="field-label">Téléphone <span class="text-danger">*</span></div>
              <v-text-field
                v-model="tel"
                type="tel"
                name="phone"
                id="phone"
                density="compact"
                placeholder="+33627379360"
                prepend-inner-icon="mdi-phone-outline"
                variant="outlined"
                required
              ></v-text-field>
            </div>

            <div class="field-wrap">
              <div class="field-label">Mot de passe <span class="text-danger">*</span></div>
              <v-text-field
                v-model="password"
                name="password"
                id="password"
                placeholder="**********************"
                :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visiblePassword ? 'text' : 'password'"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visiblePassword = !visiblePassword"
                required
              ></v-text-field>
            </div>

            <div class="field-wrap">
              <div class="field-label">Confirmation mot de passe <span class="text-danger">*</span></div>
              <v-text-field
                name="password_confirm"
                id="password_confirm"
                placeholder="**********************"
                :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleConfirmPassword ? 'text' : 'password'"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
                required
              ></v-text-field>
            </div>

            <div class="field-wrap">
              <div class="field-label">Photo de profil</div>
              <v-file-input
                name="profilePhoto"
                id="profilePhoto"
                density="compact"
                placeholder="Importer une photo de profil"
                prepend-inner-icon="mdi-camera"
                variant="outlined"
                accept="image/*"
                required
                @change="onFileChange"
              ></v-file-input>
              <v-img
                v-if="profilePhotoUrl"
                :src="profilePhotoUrl"
                alt="Photo de profil"
                max-width="130"
                class="profile-preview"
              ></v-img>
            </div>

            <div class="actions-col">
              <button class="btn btn-modern btn-lg register-btn-primary" type="submit">
                <i class="bi bi-check-circle me-2"></i>
                S'inscrire
              </button>
            </div>

            <div class="switch-auth">
              Déjà un compte ?
              <RouterLink to="/login" class="auth-link">Se connecter</RouterLink>
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
        await apiClient.post('/users', {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password,
          photo: this.profilePhotoUrl,
          token: 'ADAFZEJHDJQSD111--'
        })
      } catch (error) {
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
      }
    },
    handleSubmit() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.loaded = true
        this.registerUser()
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
  grid-template-columns: 0.95fr 1.05fr;
  border: 1px solid var(--border);
  background: var(--surface-muted);
}

.register-left {
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.4rem;
  background: linear-gradient(145deg, var(--surface-muted) 0%, var(--bg-alt) 100%);
  border-right: 1px solid var(--border);
  isolation: isolate;
}

.left-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.left-logo {
  width: 88px;
  height: auto;
}

.language-select {
  max-width: 170px;
  border-radius: 999px;
  border-color: var(--border);
  background: var(--surface);
  color: var(--text);
}

.left-copy {
  position: relative;
  z-index: 2;
  max-width: 520px;
  padding: 1rem;
  animation: slideUp .8s var(--ease);
}

.left-badge {
  display: inline-flex;
  padding: .35rem .8rem;
  border-radius: 999px;
  font-size: .78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  background: color-mix(in srgb, var(--primary) 14%, var(--surface));
  color: var(--primary-strong);
  margin-bottom: .8rem;
}

.left-copy h2 {
  font-size: clamp(1.4rem, 2.2vw, 2.2rem);
  margin-bottom: .5rem;
  color: var(--text);
}

.left-copy p {
  color: var(--text-soft);
  margin: 0;
}

.left-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(22px);
  opacity: .45;
  z-index: 1;
  animation: floaty 7s ease-in-out infinite;
}

.orb-one {
  width: 200px;
  height: 200px;
  top: 9%;
  right: 10%;
  background: color-mix(in srgb, var(--primary) 30%, transparent);
}

.orb-two {
  width: 240px;
  height: 240px;
  bottom: 10%;
  left: 12%;
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  animation-delay: 1.2s;
}

.register-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.1rem;
  background: linear-gradient(180deg, var(--surface-muted), var(--bg));
}

.register-card {
  width: min(680px, 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.45rem;
  box-shadow: var(--shadow-md);
  animation: fadeUp .7s var(--ease);
}

.register-header {
  margin-bottom: .9rem;
  text-align: center;
}

.register-header h1 {
  margin: 0 0 .35rem;
  font-size: 1.6rem;
}

.register-header p {
  margin: 0;
  color: var(--text-soft);
  font-size: .92rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
}

.field-wrap {
  margin-bottom: .45rem;
}

.field-label {
  font-size: .9rem;
  color: var(--text-soft);
  margin-bottom: .2rem;
}

.field-native {
  border: 1px solid var(--border);
  background: var(--bg-alt);
  color: var(--text);
  border-radius: 12px;
  min-height: 44px;
}

.field-native:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
}

.profile-preview {
  margin-top: .5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.actions-col {
  display: grid;
  gap: .75rem;
  margin-top: .6rem;
}

.register-btn-primary {
  width: 100%;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--ease), box-shadow var(--ease);
}

.register-btn-primary:hover {
  transform: translateY(-2px);
}

.switch-auth {
  margin-top: .9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .45rem;
  color: var(--text-soft);
}

.auth-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}
.auth-link:hover { text-decoration: underline; }

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
  50% { transform: translateY(-11px); }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1199.98px) {
  .register-layout {
    grid-template-columns: 1fr;
  }

  .register-right {
    background: transparent;
  }
}

@media (max-width: 767.98px) {
  .register-page {
    padding: .55rem;
  }

  .register-layout {
    min-height: calc(100vh - 1.1rem);
    border-radius: var(--radius-md);
  }

  .register-card {
    padding: 1.1rem .95rem;
  }

  .field-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
