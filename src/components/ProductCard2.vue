<template>
  <div class="custom-container">
    <RouterLink :to="{ name: 'products', params: { id: this.id } }" class="link_product">
      <div class="card h-100 text-center custom-card">
        <div class="card-body d-flex justify-content-between align-items-start">
          <div class="text-container">
            <br />
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-text">{{ description }}</p>
            <br />
            <button @click.stop.prevent="goToPaymentPage" class="btn custom-btn">
              Acheter maintenant <span class="arrow">→</span>
            </button>
          </div>
          <img :src="imageSrc" class="custom-image" alt="Product image" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'ProductCard2',
  props: {
    id: {
      type: Number,
      required: true
    },
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
    price: {
      type: String,
      required: true
    }
  },
  methods: {
    goToPaymentPage() {
      this.$store.dispatch('updatePaymentData', {
        id: this.id,
        title: this.title,
        price: this.price
      })
      this.$router.push('/paiement')
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
  margin: 10 10px; /* Marges latérales réduites pour espacer les cartes */
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
.link_product {
  text-decoration: none;
}
</style>
