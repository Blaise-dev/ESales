<script setup></script>

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