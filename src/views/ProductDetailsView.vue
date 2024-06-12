<script setup></script>

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
          v-for="(item, index) in carouselItems"
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
          <v-carousel-item v-for="(item, index) in carouselItems" :key="index">
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
          <v-card-title>T-shirt à manches courtes et col en V dégradé pour l'été</v-card-title>
          <v-card-text>
            <p class="display-6">5,99 €</p>
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
                    v-for="size in sizes"
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
                <v-list-item v-for="(comment, index) in comments" :key="index">
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
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      carouselItems: [
        {
          src: 'https://img.ltwebstatic.com/images3_pi/2024/04/12/3a/1712889276a136a33dda04c49933d4a8a01b886cf7_thumbnail_720x.webp'
        },
        {
          src: 'https://img.ltwebstatic.com/images3_pi/2024/04/12/9b/1712889279b2965a099e5c5fbf8eb79c1673d98e0f_thumbnail_720x.webp'
        },
        {
          src: 'https://img.ltwebstatic.com/images3_pi/2024/03/08/ae/17098677316355fc3e634a6a7df817dd995b599a66_thumbnail_405x552.jpg'
        }
        // Ajoutez d'autres objets pour chaque image du carrousel
      ],
      currentSlide: 0,

      comments: [
        {
          author: 'Marc Johnson',
          date: '2024-05-20',
          rating: 5,
          text: 'Un peu déçu de cet article je ne recommande pas.',
          avatar:
            'data:image/jpeg;base64,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'
        },
        {
          author: 'Anna Veroe',
          date: '2024-05-08',
          rating: 5,
          text: "Pas d'odeur T-shirt sympa et confortable. Mais n'est pas du tout adapté aux journées chaudes (matière).",
          avatar:
            'data:image/jpeg;base64,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'
        }
        // Ajoutez d'autres commentaires ici
      ],
      newComment: {
        author: 'Théo Backbwell',
        text: '',
        rating: 0
      }
    }
  },
  methods: {
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
        this.currentSlide = this.carouselItems.length - 1
      }
    },
    nextSlide() {
      if (this.currentSlide < this.carouselItems.length - 1) {
        this.currentSlide++
      } else {
        this.currentSlide = 0
      }
    },
    addToCart() {
      // Logique pour ajouter au panier
    },
    addComment() {
      const newComment = {
        ...this.newComment,
        date: new Date().toISOString().split('T')[0],
        avatar:
          'data:image/jpeg;base64,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'
      }
      this.comments.push(newComment)
      this.newComment = {
        name: 'Théo Backbwell',
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
