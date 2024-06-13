<script setup>
import ProductCard from '@/components/ProductCard.vue'
</script>

<template>
  <v-row class="mt-5">
    <v-col cols="9">
      <h2 class="mb-4 pl-5 ml-3">Résultats de recherche pour « t-shirts{{ search }}»</h2>
      <v-col class="p-4 d-flex justify-content-start flex-wrap">
        <ProductCard
          class="m-1"
          v-for="(result, index) in results"
          :key="index"
          :imageSrc="result.imageSrc"
          :productTitle="result.productTitle"
          :productPrice="result.productPrice"
          :productRating="result.productRating"
          :productReviews="result.productReviews"
        />
      </v-col>
    </v-col>
    <v-col cols="3">
      <v-row>
        <!-- Section de la description du produit -->
        <v-col cols="10">
          <!-- Filtre par Catégorie -->
          <div class="mt-4">
            <v-expansion-panels class="m-5 p-3">
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <v-select
                    v-model="filters.categories"
                    :items="categories"
                    multiple
                    label="Catégories"
                    @change="handleChange"
                    variant="solo"
                    chips
                  ></v-select>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <!-- Filtre par Prix -->
          <div>
            <v-expansion-panels class="m-5 p-3">
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <v-slider
                    v-model="filters.price"
                    :max="1000"
                    :step="10"
                    label="Prix"
                    ticks
                    thumb-label
                  ></v-slider>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <!-- Filtre par Marque -->
          <div>
            <v-expansion-panels class="m-5 p-3">
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <v-select
                    v-model="filters.brands"
                    :items="brands"
                    multiple
                    label="Marques"
                    variant="solo"
                    chips
                  ></v-select>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <!-- Filtre par Note -->
          <div>
            <v-expansion-panels class="m-5 p-3">
              <v-expansion-panel>
                <v-expansion-panel-content class="p-3">
                  <v-row class="p-3">
                    <v-checkbox v-model="filters.rating" :value="1" :key="1"></v-checkbox>

                    <v-rating v-model="nratings[0]" readonly color="yellow"></v-rating>
                  </v-row>
                  <v-row class="p-3">
                    <v-checkbox v-model="filters.rating" :value="2" :key="2"></v-checkbox>

                    <v-rating v-model="nratings[1]" readonly color="yellow"></v-rating>
                  </v-row>
                  <v-row class="p-3">
                    <v-checkbox v-model="filters.rating" :value="3" :key="3"></v-checkbox>

                    <v-rating v-model="nratings[2]" readonly color="yellow"></v-rating>
                  </v-row>
                  <v-row class="p-3">
                    <v-checkbox v-model="filters.rating" :value="4" :key="4"></v-checkbox>

                    <v-rating v-model="nratings[3]" readonly color="yellow"></v-rating>
                  </v-row>
                  <v-row class="p-3">
                    <v-checkbox v-model="filters.rating" :value="5" :key="5"></v-checkbox>

                    <v-rating v-model="nratings[4]" readonly color="yellow"></v-rating>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <v-divider></v-divider>

          <v-btn @click="applyFilters" color="primary" block> Appliquer les Filtres </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProductSearchView',
  data() {
    return {
      search: '',
      results: [
        {
          imageSrc: '/src/assets/SAC.png',
          productTitle: 'Sonos Beam Gen 2 Soundbar',
          productPrice: '$930.00',
          productRating: 3,
          productReviews: 9
        },
        {
          imageSrc: '/src/assets/SAC.png',
          productTitle: 'Bose Smart Soundbar 900',
          productPrice: '$689.00',
          productRating: 3,
          productReviews: 9
        },
        {
          imageSrc: '/src/assets/SAC.png',
          productTitle: 'Sennheiser Ambeo Soundbar',
          productPrice: '$1,679.00',
          productRating: 4,
          productReviews: 10
        },
        {
          imageSrc: '/src/assets/SAC.png',
          productTitle: 'Microsoft Surface Pro 8',
          productPrice: '$606.00',
          productRating: 4,
          productReviews: 10
        },
        {
          imageSrc: '/src/assets/SAC.png',
          productTitle: 'Microsoft Surface Pro 8',
          productPrice: '$606.00',
          productRating: 4,
          productReviews: 10
        },
        {
          imageSrc: '/src/assets/SAC.png',
          productTitle: 'Microsoft Surface Pro 8',
          productPrice: '$606.00',
          productRating: 4,
          productReviews: 10
        },
        {
          imageSrc: '/src/assets/SAC.png',
          productTitle: 'Microsoft Surface Pro 8',
          productPrice: '$606.00',
          productRating: 4,
          productReviews: 10
        }
      ],
      categoryOpen: true,
      priceOpen: false,
      brandOpen: false,
      ratingOpen: false,
      categories: ['Vêtements', 'Chaussures', 'Accessoires'],
      brands: ['Nike', 'Adidas', 'Puma'],
      filters: {
        categories: [],
        price: [0, 1000],
        brands: [],
        rating: []
      },
      nratings: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    applyFilters() {
      // Code pour appliquer les filtres, par exemple émettre un événement ou appeler une méthode API
      console.log(this.filters)
    },
    handleChange(event) {
      alert('OK')
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer {
  background-color: #f9f9f9;
  padding: 20px;
}
</style>
