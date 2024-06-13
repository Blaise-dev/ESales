<script setup>
import apiClient from '../api.js'
import { mapGetters } from 'vuex'
</script>

<template>
  <div class="container d-flex align-items-center mt-5">
    <v-row>
      <v-col
        class="d-none d-md-block"
        cols="12"
        md="2"
        style="max-height: 60%; overflow-y: auto; overflow-x: hidden"
      >
        <img
          v-for="(item, index) in produit.photos"
          :key="index"
          :src="item.src"
          :alt="'Image ' + (index + 1)"
          class="mr-md-5 mb-2 img-fluid"
          :style="{ border: index === currentSlide ? '2px solid gray' : 'none' }"
        />
        <!-- Ajoutez de nouvelles images ici -->
      </v-col>

      <v-col md="12" lg="5" class="mb-5">
        <v-carousel v-model="currentSlide" cycle hide-delimiters>
          <v-carousel-item v-for="(item, index) in produit.photos" :key="index">
            <v-img :src="item.src" class="m-4" height="100%" width="90%"
              ><span
                class="position-absolute start-0 bottom-0 mb-5 text-muted"
                style="transform: rotate(-90deg)"
                >ESales</span
              ></v-img
            >
          </v-carousel-item>
        </v-carousel>
        <v-row justify="center" class="mt-3">
          <v-btn @click="prevSlide" class="mr-2"><v-icon>mdi-chevron-left</v-icon></v-btn>
          <v-btn @click="nextSlide"><v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
      </v-col>

      <v-col cols="12" md="5">
        <v-card class="pa-5">
          <v-card-title>{{ produit.name }}</v-card-title>
          <v-card-text>
            <p class="display-6">{{ produit.price }} €</p>
            <p class="text-secondary">TVA incluse</p>
            <p>
              <strong>Taille </strong>
              <v-row justify="center" class="m-5">
                <v-chip class="pa-2 ml-5" color="grey lighten-3" label>
                  <v-row align="center" no-gutters>
                    <v-col>
                      <span>standard</span>
                    </v-col>
                    <v-divider vertical class="mx-2"></v-divider>
                    <v-col>
                      <span>FR</span>
                    </v-col>
                  </v-row>
                </v-chip>
              </v-row>
              <v-row justify="center" class="m-4">
                <v-btn-toggle v-model="selectedSize" mandatory>
                  <v-btn
                    v-for="size in produit.sizes"
                    :key="size"
                    @click="selectSize(size)"
                    :class="{ 'selected-btn': selectedSize === size }"
                  >
                    {{ size }}
                  </v-btn>
                </v-btn-toggle>
              </v-row>
            </p>
            <p>
              <strong>Quantité </strong>
              <v-row justify="center" class="mt-5">
                <v-col cols="12" md="6" class="d-flex justify-center">
                  <div class="quantity-selector">
                    <v-btn icon @click="decreaseQuantity" class="mb-3">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-text-field
                      v-model="quantity"
                      class="mx-2"
                      style="max-width: 60px; text-align: center"
                      readonly
                      solo
                    ></v-text-field>
                    <v-btn icon @click="increaseQuantity" class="mb-3">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-row class="mt-5">
        <v-col cols="6">
          <h1 class="mb-4 font-weight-bold">Commentaires des Clients</h1>
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-divider class="mb-4"></v-divider>
                <!-- Barre de séparation -->
                <v-list-item v-for="(comment, index) in produit.comments" :key="index">
                  <!-- Espacement entre les commentaires -->
                  <template v-slot:default>
                    <v-list-item-avatar>
                      <v-avatar size="40">
                        <img width="40" :src="comment.avatar" alt="Avatar" />
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-row align="center">
                        <v-col cols="auto">
                          <v-list-item-title class="font-weight-bold">{{
                            comment.author
                          }}</v-list-item-title>
                          <v-list-item-subtitle class="text-muted">{{
                            formatDate(comment.date)
                          }}</v-list-item-subtitle>
                        </v-col>
                        <v-col cols="auto">
                          <v-rating v-model="comment.rating" readonly color="yellow"></v-rating>
                        </v-col>
                      </v-row>
                      <v-list-item-subtitle class="mb-5">{{ comment.text }}</v-list-item-subtitle>
                      <v-divider class="mb-4"></v-divider>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
            <!-- Champ pour ajouter un commentaire -->
            <v-col cols="12" class="my-4">
              <v-card>
                <v-card-title
                  ><v-icon class="mr-2" color="grey">mdi-comment</v-icon> Votre commentaire au
                  produit</v-card-title
                >
                <v-card-text>
                  <v-textarea v-model="newComment.text" label="Commentaire" required></v-textarea>
                  <v-rating
                    v-model="newComment.rating"
                    color="yellow"
                    dense
                    background-color="grey"
                  ></v-rating>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="addComment">Soumettre</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-btn color="primary" block x-large @click="addToCart" class="mb-5">
            <v-icon left>mdi-cart-plus</v-icon>
            Ajouter au panier
          </v-btn>
          <!-- Premier bloc -->
          <v-row class="mb-4" style="background-color: #f9f9f9; padding: 20px; border-radius: 8px">
            <v-col cols="12" class="d-flex align-items-center">
              <v-icon left class="mr-3" color="green">mdi-truck</v-icon>
              <v-flex>
                <p class="text-success mb-0">Livraison gratuite (Commandes ≥ 39,00 €)</p>
              </v-flex>
            </v-col>
          </v-row>

          <!-- Deuxième bloc -->
          <v-row class="mb-4" style="background-color: #f9f9f9; padding: 20px; border-radius: 8px">
            <v-col cols="12" class="d-flex align-items-start">
              <v-icon left class="mr-3" color="green">mdi-shield-lock</v-icon>
              <v-flex>
                <p class="text-success mb-2">Sécurité des achats</p>
                <v-row class="text-success">
                  <v-chip class="ml-3"
                    ><v-icon left class="mr-3" color="green">mdi-check-circle</v-icon>Paiement
                    sécurisé</v-chip
                  >
                  <v-chip class="ml-3"
                    ><v-icon left class="mr-3" color="green">mdi-check-circle</v-icon>Logistique
                    sécurisée</v-chip
                  >
                  <v-chip class="ml-3"
                    ><v-icon left class="mr-3" color="green">mdi-check-circle</v-icon>Service
                    client</v-chip
                  >
                </v-row>
              </v-flex>
            </v-col>
          </v-row>
          <v-row>
            <!-- Section de la description du produit -->
            <v-col cols="12">
              <h2 class="mb-4">Description du Produit</h2>

              <!-- Liste des éléments de description -->
              <v-list>
                <v-list-item>
                  <!-- Icône de couleur -->
                  <v-list-item-title class="mb-1"
                    ><v-icon size="18" class="mr-2">mdi-palette-outline</v-icon> Couleur
                  </v-list-item-title>
                  <v-list-item-subtitle>Blue</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <!-- Icône de style -->
                  <v-list-item-title class="mb-1"
                    ><v-icon size="18" class="mr-2">mdi-format-list-bulleted-square</v-icon> Style
                  </v-list-item-title>
                  <v-list-item-subtitle>Casual</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <!-- Icône de motif -->
                  <v-list-item-title class="mb-1"
                    ><v-icon size="18" class="mr-2">mdi-vector-square</v-icon> Type de motif
                  </v-list-item-title>
                  <v-list-item-subtitle>Striped</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <!-- Icône de type de col -->
                  <v-list-item-title class="mb-1"
                    ><v-icon size="18" class="mr-2">mdi-alpha-r</v-icon> Type du
                    col</v-list-item-title
                  >
                  <v-list-item-subtitle>Round Neck</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <!-- Icône de longueur des manches -->
                  <v-list-item-title class="mb-1"
                    ><v-icon size="18" class="mr-2">mdi-ruler</v-icon> Longueur des manches
                  </v-list-item-title>
                  <v-list-item-subtitle>Short</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <!-- Icône de type de manches -->
                  <v-list-item-title class="mb-1"
                    ><v-icon size="18" class="mr-2">mdi-alpha-m</v-icon> Type de
                    manches</v-list-item-title
                  >
                  <v-list-item-subtitle>Raglan Sleeves</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailsView',
  data() {
    return {
      quantity: 1,
      selectedSize: 'L',
      produit: {},
      newComment: {
        author: this.$store.state.user.nom + ' ' + this.$store.state.user.prenom,
        text: '',
        rating: 0
      },
      currentSlide: 0
    }
  },
  created() {
    this.fetchProductDetails()
  },
  methods: {
    async fetchProductDetails() {
      try {
        // On vérifie si l'email existe dans la base de données
        const response = await apiClient.get(`/produits/1`)
        const data = response.data
        this.produit = data
      } catch (error) {
        // Gérer les erreurs de requête
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
      }
    },
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    selectSize(size) {
      this.selectedSize = size
    },

    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      } else {
        this.currentSlide = this.produit.photos.length - 1
      }
    },
    nextSlide() {
      if (this.currentSlide < this.produit.photos.length - 1) {
        this.currentSlide++
      } else {
        this.currentSlide = 0
      }
    },
    addToCart() {
      // Logique pour ajouter au panier
    },
    addComment() {
      const user = this.$store.state.user
      const newComment = {
        ...this.newComment,
        date: new Date().toISOString().split('T')[0],
        avatar: user.photo
      }
      this.produit.comments.push(newComment)
      this.newComment = {
        author: user.nom + ' ' + user.prenom,
        text: '',
        rating: 0
      }
    },
    formatDate(date) {
      const options = { day: '2-digit', month: 'long', year: 'numeric' }
      return new Date(date).toLocaleDateString('fr-FR', options)
    }
  }
}
</script>

<style>
.vertical-images {
  display: flex;
  flex-direction: column;
}

.image {
  width: 200px; /* Set the width you want */
  height: 200px; /* Set the height you want */
  margin-bottom: 20px; /* Space between vertical images */
}

.vertical-images .image:last-child {
  margin-bottom: 0; /* Remove margin for the last image */
}

.side-image {
  display: flex;
  align-items: center;
}

.side-image .image {
  width: 500px; /* Same width as the vertical images */
  height: 620px; /* Adjust height to match the combined height of 3 vertical images + margins */
}
.selected-btn {
  background-color: #42b983 !important;
  color: white !important;
  font-weight: bold;
}

.quantity-selector {
  display: flex;
  align-items: center;
}
.quantity-selector v-btn {
  margin-bottom: 0;
}
.quantity-selector v-text-field {
  text-align: center;
}
</style>
