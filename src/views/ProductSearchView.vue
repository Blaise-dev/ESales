<script setup>
import ProductCard from '/src/components/component1.vue'
</script>

<template>
  <v-row class="mt-5">
    <v-col cols="8">
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
    <v-col cols="4">
      <v-row>
        <!-- Section de la description du produit -->
        <v-col cols="6">
          <v-list dense>
            <v-subheader>Filtres</v-subheader>

            <!-- Filtre par Catégorie -->
            <v-list-group v-model="categoryOpen" prepend-icon="mdi-tag" no-action>
              <template v-slot:activator>
                <v-list-item-title>Catégorie</v-list-item-title>
              </template>
              <v-list-item v-for="category in categories" :key="category">
                <v-list-item-content>
                  <v-checkbox
                    v-model="filters.categories"
                    :label="category"
                    :value="category"
                  ></v-checkbox>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <!-- Filtre par Prix -->
            <v-list-group v-model="priceOpen" prepend-icon="mdi-cash" no-action>
              <template v-slot:activator>
                <v-list-item-title>Prix</v-list-item-title>
              </template>
              <v-list-item>
                <v-list-item-content>
                  <v-slider
                    v-model="filters.price"
                    :max="1000"
                    :step="10"
                    label="Prix"
                    ticks
                    thumb-label
                  ></v-slider>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <!-- Filtre par Marque -->
            <v-list-group v-model="brandOpen" prepend-icon="mdi-label" no-action>
              <template v-slot:activator>
                <v-list-item-title>Marque</v-list-item-title>
              </template>
              <v-list-item v-for="brand in brands" :key="brand">
                <v-list-item-content>
                  <v-checkbox v-model="filters.brands" :label="brand" :value="brand"></v-checkbox>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <!-- Filtre par Note -->
            <v-list-group v-model="ratingOpen" prepend-icon="mdi-star" no-action>
              <template v-slot:activator>
                <v-list-item-title>Note</v-list-item-title>
              </template>
              <v-list-item v-for="n in 5" :key="n">
                <v-list-item-content>
                  <v-checkbox
                    v-model="filters.rating"
                    :label="`${n} étoiles et plus`"
                    :value="n"
                  ></v-checkbox>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>

          <v-divider></v-divider>

          <v-btn @click="applyFilters" color="primary" block> Appliquer les Filtres </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-list dense>
    <v-subheader>Filtres</v-subheader>

    <!-- Filtre par Catégorie -->
    <v-list-group v-model="categoryOpen" prepend-icon="mdi-tag" no-action>
      <template v-slot:activator>
        <v-list-item-title>Catégorie</v-list-item-title>
      </template>
      <v-list-item v-for="category in categories" :key="category">
        <v-list-item-content>
          <v-checkbox v-model="filters.categories" :label="category" :value="category"></v-checkbox>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>

    <!-- Filtre par Prix -->
    <v-list-group v-model="priceOpen" prepend-icon="mdi-cash" no-action>
      <template v-slot:activator>
        <v-list-item-title>Prix</v-list-item-title>
      </template>
      <v-list-item>
        <v-list-item-content>
          <v-slider
            v-model="filters.price"
            :max="1000"
            :step="10"
            label="Prix"
            ticks
            thumb-label
          ></v-slider>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>

    <!-- Filtre par Marque -->
    <v-list-group v-model="brandOpen" prepend-icon="mdi-label" no-action>
      <template v-slot:activator>
        <v-list-item-title>Marque</v-list-item-title>
      </template>
      <v-list-item v-for="brand in brands" :key="brand">
        <v-list-item-content>
          <v-checkbox v-model="filters.brands" :label="brand" :value="brand"></v-checkbox>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>

    <!-- Filtre par Note -->
    <v-list-group v-model="ratingOpen" prepend-icon="mdi-star" no-action>
      <template v-slot:activator>
        <v-list-item-title>Note</v-list-item-title>
      </template>
      <v-list-item v-for="n in 5" :key="n">
        <v-list-item-content>
          <v-checkbox
            v-model="filters.rating"
            :label="`${n} étoiles et plus`"
            :value="n"
          ></v-checkbox>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
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
      drawer: false,
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
      }
    }
  },
  methods: {
    applyFilters() {
      // Code pour appliquer les filtres, par exemple émettre un événement ou appeler une méthode API
      console.log(this.filters)
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
