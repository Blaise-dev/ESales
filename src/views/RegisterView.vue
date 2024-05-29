<script setup></script>

<template>
  <div class="container-fluid vh-100">
    <div class="row flex-grow-1 w-100 h-100 m-0">
      <!-- Partie gauche: Slider -->
      <div class="col-md-5 p-0">
        <div class="d-flex justify-content-start align-items-end mt-5">
          <img src="@/assets/logo.png" class="d-block w-25 h-25 m-5" />

          <div class="mt-5">
            <select name="language" id="language" class="form-select" required>
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Colonne de droite avec le formulaire -->
      <div class="col-md-7 d-flex flex-column align-items-center justify-content-center bg-light">
        <form class="w-100">
          <h2 class="mb-4">Créer un compte</h2>
          <div class="mb-3">
            <label for="country" class="form-label">Pays <span class="text-danger">*</span></label>
            <select name="country" class="form-select" id="country" required>
              <option value="France">France</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div class="d-flex justify-content-between">
            <p>Nom complet <span class="text-danger">*</span></p>
            <div class="mb-3">
              <input
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
            <label for="phone" class="form-label"
              >Téléphone <span class="text-danger">*</span></label
            >
            <input
              type="tel"
              name="phone"
              class="form-control"
              id="phone"
              placeholder="(+33) 6 45 23 83 64"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label"
              >Mot de passe <span class="text-danger">*</span></label
            >
            <input
              type="password"
              name="password"
              class="form-control"
              id="password"
              placeholder="**********************"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label"
              >Confirmation de mot de passe <span class="text-danger">*</span></label
            >
            <input
              type="password"
              name="password"
              class="form-control"
              id="password"
              placeholder="**********************"
              required
            />
          </div>

          <!-- Submit button -->
          <div class="d-flex flex-column align-items-center">
            <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="mb-3 w-50 btn btn-primary btn-lg btn-block"
            >
              <i class="bi bi-check-circle me-2"></i>
              S'inscrire
            </button>
            <br />
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
