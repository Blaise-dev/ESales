<script setup></script>

<template>
  <div class="container d-flex align-items-start mt-5">
    <v-row>
      <v-col
        class="d-none d-md-block"
        cols="12"
        md="2"
        style="max-height: 600px; overflow-y: auto; overflow-x: hidden"
      >
        <img
          v-for="(item, index) in carouselItems"
          :key="index"
          :src="item.src"
          :alt="'Image ' + (index + 1)"
          class="mr-md-5 mb-2 img-fluid"
          :class="{ border: index === currentSlide }"
        />
        <!-- Ajoutez de nouvelles images ici -->
      </v-col>

      <v-col md="12" lg="5" class="mb-5">
        <v-carousel cycle hide-delimiters>
          <v-carousel-item v-for="(item, index) in carouselItems" :key="index">
            <v-img :src="item.src" class="m-4" height="100%" width="90%"></v-img>
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
            <p>TVA incluse</p>
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
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailsView',
  data() {
    return {
      quantity: 1,
      selectedSize: '',
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
      currentSlide: 0
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
    }
  }
}
</script>

<style>
.container {
  display: flex;
}

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
