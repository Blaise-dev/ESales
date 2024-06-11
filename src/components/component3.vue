<template>
  <div class="custom-container">
    <div class="card h-100 text-center custom-card">
      <div class="card-body d-flex justify-content-between align-items-start">
        <div class="text-container">
          <br>
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-text">{{ description }}</p>
          <br>
          <a :href="link" class="btn custom-btn">Acheter maintenant <span class="arrow">→</span></a>
        </div>
        <img :src="imageSrc" class="custom-image" alt="Product image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard2',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.custom-container {
  padding: 5px; /* Espacement autour de chaque carte */
  flex: 1 1 0;
}

.custom-card {
  background-color: #f0f0f0; /* Gris clair */
  border: none; /* Suppression des bordures */
  width: 100%;
  border-radius: 0;
  height: 300px;
  margin: 0 10px; /* Marges latérales réduites pour espacer les cartes */
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 100%; /* Prendre toute la hauteur disponible */
}

.custom-image {
  width: 125px; /* Ajustez la taille de l'image selon vos besoins */
  height: 200px;
  max-height: 100%; /* S'assure que l'image ne dépasse pas la hauteur du cadre */
  margin-left: 20px; /* Espacement entre l'image et le texte */
}

.custom-btn {
  background-color: #333333; /* Gris très foncé */
  border: none;
  color: #fff; /* Texte en blanc pour contraste */
  padding: 10px 20px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  white-space: nowrap; /* Empêche le texte de s'étendre sur plusieurs lignes */
}

.custom-btn .arrow {
  margin-left: 10px;
  font-size: 1.2em;
}

.custom-btn:hover {
  background-color: #000000; /* Noir au survol */
  text-decoration: none;
}
</style>
