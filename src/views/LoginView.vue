<template>
  <div class="container-fluid vh-100">
    <div class="row flex-grow-1 w-100 h-100 m-0">
      <!-- Partie gauche: Slider -->
      <div class="col-md-7 p-0">
        <div
          id="carouselExample"
          class="carousel slide h-100"
          data-bs-ride="carousel"
          data-bs-interval="10000"
        >
          <div class="carousel-inner h-100">
            <div class="carousel-item active h-100">
              <img
                src="@/assets/jeune-femme-excitee-montrant-banniere-pointant-du-doigt-vers-gauche-souriant-camera-debout-etonnee-par-mur-blanc.jpg"
                class="d-block w-100 h-100"
              />
            </div>
            <div class="carousel-item h-100">
              <img src="@/assets/2149074076.jpg" class="d-block w-100 h-100" />
            </div>
            <div class="carousel-item h-100">
              <img src="@/assets/amies-font-du-shopping-ensemble.jpg" class="d-block w-100 h-100" />
            </div>
            <div class="carousel-item h-100">
              <img
                src="@/assets/back-view-couple-holding-shopping-bags.jpg"
                class="d-block w-100 h-100"
              />
            </div>
            <div class="carousel-item h-100">
              <img
                src="@/assets/full-length-portrait-happy-family.jpg"
                class="d-block w-100 h-100"
              />
            </div>
          </div>
          <div class="position-absolute bottom-0 start-0 m-3">
            <span class="badge bg-dark fw-normal"
              ><span class="fw-bold fs-6">E-Sales</span><br /><br />Copyright 2024 © E-Sales.
            </span>
          </div>
        </div>
      </div>

      <!-- Colonne de droite avec le formulaire -->
      <div class="col-md-5 d-flex flex-column align-items-center justify-content-center bg-light">
        <img src="@/assets/logo.png" class="d-block w-25 h-25" />
        <form class="w-100" @submit.prevent="login">
          <h2 class="mb-4">S'authentifier</h2>

          <div class="mb-3">
            <div class="text-subtitle-1 text-medium-emphasis">
              Email <span class="text-danger">*</span>
            </div>

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

          <div class="d-flex justify-content-end">
            <RouterLink to="/restaurePassword" class="green">Mot de passe oublié ?</RouterLink>
          </div>
          <br />

          <div class="mb-3">
            <div class="text-subtitle-1 text-medium-emphasis">
              Mot de passe <span class="text-danger">*</span>
            </div>

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

          <div class="d-flex justify-content-start mb-4">
            <!-- Checkbox -->
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
              <label class="form-check-label" for="form1Example3"> Souviens-toi de moi ? </label>
              <span v-if="error" class="text-danger ms-3">{{ error }}</span>
            </div>
          </div>

          <!-- Submit button -->
          <div class="d-flex flex-column align-items-center">
            <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="mb-3 w-50 btn btn-primary btn-lg btn-block"
            >
              <i class="bi bi-box-arrow-in-right"></i>
              Se connecter
            </button>
            <br />
            <br />
            <RouterLink
              to="/register"
              data-mdb-button-init
              data-mdb-ripple-init
              class="w-50 btn btn-primary btn-lg btn-block"
              ><i class="bi bi-person-fill"></i> Créer un compte</RouterLink
            >
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
      try {
        // On vérifie si l'email existe dans la base de données
        const response = await apiClient.get(`/users?email=${this.email}&password=${this.password}`)
        let user = response.data

        if (user.length == 0) {
          this.errorEmail = 'Email incorrect'
          this.errorPwd = 'Mot de passe incorrect'
          return
        } else {
          user = user[0]
          localStorage.setItem('token', user.token) // on enregistre le token dans le localStorage

          this.$store.dispatch('setUser', user)
          this.$store.dispatch('setToken', user.token)
          this.$router.push('/') // nous renvoie à la page d'accueil
        }
      } catch (error) {
        // Gérer les erreurs de requête
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
      }
    },
    async fetchPanier(){
      try {
        const response = await apiClient.get(`/panier`)
        let panier = response.data

        this.$store.dispatch('setPanier', panier)

      }
      catch (error) {
        // Gérer les erreurs de requête
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
      }
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
</style>
