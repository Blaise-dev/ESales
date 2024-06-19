<script setup>
import CountrySelect from '@/components/CountrySelect.vue'
import Logo from '@/components/Logo.vue'
</script>

<template>
  <div class="container-fluid vh-100">
    <div class="row flex-grow-1 w-100 h-100 m-0">
      <!-- Partie gauche: Slider -->
      <div class="col-md-6 p-0 mb-2">
        <div class="d-flex justify-content-md-start justify-content-sm-around align-items-end mt-5">
          <img src="@/assets/logo.png" class="d-block w-25 h-25 m-5" />

          <div class="mt-5 mb-sm-5 col-sm-4">
            <select name="language" id="language" class="form-select" required>
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Colonne de droite avec le formulaire -->
      <div
        class="col-md-6 d-flex flex-column align-items-center justify-content-center bg-light custom-animation-form"
      >
        <form @submit.prevent="handleSubmit" class="w-100">
          <h2 class="mb-4">Créer un compte</h2>
          <div class="mb-3">
            <div class="text-subtitle-1 text-medium-emphasis">
              Email <span class="text-danger">*</span>
            </div>

            <v-text-field
              v-model="this.email"
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
          <div class="d-flex justify-content-between">
            <p class="d-none d-lg-block">Nom complet <span class="text-danger">*</span></p>
            <div class="mb-3">
              <input
                v-model="this.nom"
                type="text"
                name="nom"
                class="form-control"
                id="nom"
                placeholder="Nom"
                required
              />
            </div>
            <div class="mb-3">
              <input
                v-model="this.prenom"
                type="text"
                name="prenom"
                class="form-control"
                id="prenom"
                placeholder="Prénom"
                required
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="text-subtitle-1 text-medium-emphasis">
              Télephone <span class="text-danger">*</span>
            </div>
            <v-text-field
              v-model="this.tel"
              type="tel"
              name="phone"
              id="phone"
              density="compact"
              placeholder="(+33) 6 12 78 11 78"
              prepend-inner-icon="mdi-phone-outline"
              variant="outlined"
              required
            ></v-text-field>
          </div>

          <div class="mb-3">
            <div class="text-subtitle-1 text-medium-emphasis">
              Mot de passe <span class="text-danger">*</span>
            </div>

            <v-text-field
              v-model="this.password"
              name="password"
              id="password"
              placeholder="**********************"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              required
            ></v-text-field>
          </div>

          <div class="mb-3">
            <div class="text-subtitle-1 text-medium-emphasis">
              Confirmation de mot de passe <span class="text-danger">*</span>
            </div>

            <v-text-field
              name="password_confirm"
              id="password_confirm"
              placeholder="**********************"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              required
            ></v-text-field>
          </div>

          <!-- Submit button -->
          <div class="d-flex flex-column align-items-center">
            <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="mb-3 w-50 btn btn-primary btn-lg btn-block"
              @click="registerUser"
            >
              <i class="bi bi-check-circle me-2"></i>
              S'inscrire
            </button>
            <br />
          </div>

          <div class="d-flex justify-content-center align-items-center">
            Déjà un compte ?
            <RouterLink to="/login" class="green">Se connecter</RouterLink>
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>

          <div class="d-flex flex-column align-items-center">
            <RouterLink
              data-mdb-ripple-init
              class="btn btn-light btn-lg btn-block h-75 w-75 m-0"
              href="#!"
              role="button"
            >
              <img src="@/assets/google-logo.png" class="col-1 me-3" /> Connectez-vous avec
              Google</RouterLink
            >
          </div>
        </form>
      </div>
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
      photo: null,
      isLoading: false,
      loaded: false
    }
  },
  methods: {
    async registerUser() {
      try {
        // On vérifie si l'email existe dans la base de données
        const response = await apiClient.post('/users', {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password,
          photo: 'null',
          token: 'ADAFZEJHDJQSD111--'
        })
      } catch (error) {
        // Gérer les erreurs de requête
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
      }
    },
    handleSubmit() {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
        this.loaded = true
        this.$router.push('/login')
      }, 2000)
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .bg-image {
    background-image: url('@/assets/jeune-femme-excitee-montrant-banniere-pointant-du-doigt-vers-gauche-souriant-camera-debout-etonnee-par-mur-blanc.jpg'); /* Assurez-vous que le chemin de l'image est correct */
    background-size: cover; /* Couvrir tout le bloc */
    background-position: center; /* Centrer l'image */
    height: 999px; /* Vous pouvez ajuster la hauteur selon vos besoins */
    display: flex;
    align-items: center; /* Centrer verticalement le contenu */
    justify-content: center; /* Centrer horizontalement le contenu */
  }
  .divider:after,
  .divider:before {
    content: '';
    flex: 1;
    height: 1px;
    background: #eee;
  }

  .vh-100 {
    height: 100vh;
  }

  .p-0 {
    padding: 0 !important;
  }
  input::placeholder {
    color: rgb(122, 122, 122); /* Change la couleur du placeholder à gris */
  }
  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden; /* Masquer les parties de l'image qui dépassent */
  }
}
</style>
