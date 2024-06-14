<template>
  <!-- Carousel Section -->
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="1"></li>
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <CarouselItem
        v-for="carousselProduct in carousselProducts"
        :imageSrc="carousselProduct.imageSrc"
        :altText="carousselProduct.altText"
        :isActive="carousselProduct.isActive"
        :topText="carousselProduct.topText"
        :mainText="carousselProduct.mainText"
        :bottomText="carousselProduct.bottomText"
      />
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleSlidesOnly"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleSlidesOnly"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

  <br />
  <!--première partie -->
  <div class="container-fluid">
    <div class="row no-gutters">
      <div class="col-12 col-md-4">
        <ProductCard2
          title="T-Shirt Tunic Tops Blouse"
          description=""
          imageSrc="/src/assets/Trico.png"
          link="#"
        />
      </div>
      <div class="col-12 col-md-4">
        <ProductCard2
          title="Satchel Tote Crossbody Bags"
          description=""
          imageSrc="src/assets/SAC.png"
          link="#"
        />
      </div>
      <div class="col-12 col-md-4">
        <ProductCard2
          title="Men's Tennis Walking Shoes"
          description=""
          imageSrc="src/assets/spadrine.png"
          link="#"
        />
      </div>
    </div>
  </div>

  <br />
  <br />
  <!-- New Product Category Section with Carousel -->
  <h2 class="text-center"><strong>Nouvelles catégories</strong></h2>

  <div id="product-category-section" class="container mt-5">
    <div id="productCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(chunk, chunkIndex) in categoryChunks"
          :key="chunkIndex"
          :class="['carousel-item', { active: chunkIndex === 0 }]"
        >
          <div class="row justify-content-center">
            <ProductCategoryCard
              v-for="(category, index) in chunk"
              :key="index"
              :imageSrc="category.imageSrc"
              :categoryTitle="category.categoryTitle"
              :productCount="category.productCount"
              :linkUrl="category.linkUrl"
            />
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#productCarousel" role="button" data-slide="prev">
        <span
          class="carousel-control-prev-icon custom-carousel-control-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next custom-carousel-control-icon"
        href="#productCarousel"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
  <br />
  <br />
  <br />
  <br />
  <!-- New Arrivals Section -->
  <div id="new-arrivals-section" class="container mt-5">
    <h2 class="text-center"><strong>Nouvelles arrivées</strong></h2>
    <div class="row">
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :imageSrc="product.imageSrc"
        :productTitle="product.productTitle"
        :productPrice="product.productPrice"
        :productRating="product.productRating"
        :productReviews="product.productReviews"
      />
    </div>

    <div class="text-center mt-4">
      <a href="#" class="btn btn-link" @click="loadMoreProducts" v-if="!isLoading">Voir plus</a>
    </div>
    <div v-if="isLoading" class="text-center mt-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import ProductCategoryCard from '@/components/ProductCategoryCard.vue'
import ProductCard2 from '@/components/ProductCard2.vue'
import CarouselItem from '@/components/CarouselItem.vue'
import apiClient from '@/api'

export default {
  components: {
    ProductCard,
    ProductCategoryCard,
    ProductCard2,
    CarouselItem
  },
  data() {
    return {
      carousselProducts: null,
      products: [
        {
          imageSrc:
            'https://image.made-in-china.com/202f0j00tknlfeUssLza/Wholesale-Fashion-New-Mon-Fit-Women-Fashion-Jean-Pants-Ripped-Denim-Light-Blue-Jeans-for-Women.webp',
          productTitle: 'Jean pantalon déchiré Denim Jeans bleu clair pour les femmes',
          productPrice: '7,63 €',
          productRating: 3,
          productReviews: 9
        },
        {
          imageSrc:
            'https://s.alicdn.com/@sc04/kf/Hdd38f5e36a7943c5bb758982a4ca7517W.jpg_720x720q50.jpg',
          productTitle: 'Jean Denim déchiré 3xl pour femme, Skinny, vente en gros',
          productPrice: '8,13 €',
          productRating: 3,
          productReviews: 9
        },
        {
          imageSrc:
            'https://www.cdiscount.com/pdt2/8/3/3/1/700x700/mp57929833/rw/jean-homme-jean-homme-slim-fit-stretch-jeans-car.jpg',
          productTitle:
            'Jean Homme Cargo Grandes Poches, Jean Homme Skinny Pantalon Denim Jogging Travail',
          productPrice: '36,06 €',
          productRating: 4,
          productReviews: 10
        },
        {
          imageSrc: 'https://m.media-amazon.com/images/I/71+Rfs3mkYL._AC_UY1000_.jpg',
          productTitle:
            'Pantalon Homme Jean Homme Casual Jean Homme Regular Pantalon Homme Jeans avec Poche',
          productPrice: '25,87 €',
          productRating: 4,
          productReviews: 10
        }
      ],
      categories: [
        {
          imageSrc: '/src/assets/A.png',
          categoryTitle: 'Headphones',
          productCount: 5,
          linkUrl: '/headphones'
        },
        {
          imageSrc: '/src/assets/A.png',
          categoryTitle: 'With Bluetooth',
          productCount: 7,
          linkUrl: '/soundbars'
        },
        {
          imageSrc: '/src/assets/A.png',
          categoryTitle: 'Mobile Phone',
          productCount: 5,
          linkUrl: '/soundbars'
        },
        {
          imageSrc: '/src/assets/A.png',
          categoryTitle: 'CPU Heat Pipes',
          productCount: 7,
          linkUrl: '/soundbars'
        },
        {
          imageSrc: '/src/assets/A.png',
          categoryTitle: 'Smart Watch',
          productCount: 6,
          linkUrl: '/soundbars'
        },
        {
          imageSrc: '/src/assets/A.png',
          categoryTitle: 'Smart Watch',
          productCount: 6,
          linkUrl: '/soundbars'
        },
        {
          imageSrc: '/src/assets/A.png',
          categoryTitle: 'Smart Watch',
          productCount: 6,
          linkUrl: '/soundbars'
        },
        {
          imageSrc: '/src/assets/A.png',
          categoryTitle: 'Smart Watch',
          productCount: 6,
          linkUrl: '/soundbars'
        }
      ],
      isLoading: false
    }
  },
  computed: {
    categoryChunks() {
      return this.chunkArray(this.categories, 5)
    }
  },
  created() {
    this.fetchCarousselProducts()
  },
  methods: {
    async fetchCarousselProducts() {
      try {
        // On vérifie si l'email existe dans la base de données
        const response = await apiClient.get('/carousselProducts')
        console.log(response.data)
        this.carousselProducts = response.data
      } catch (error) {
        // Gérer les erreurs de requête
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
      }
    },

    loadMoreProducts(event) {
      event.preventDefault()
      this.isLoading = true
      // Simuler un chargement asynchrone
      setTimeout(() => {
        const moreProducts = [
          {
            imageSrc: '/src/assets/SAC.png',
            productTitle: 'Apple AirPods Pro',
            productPrice: '$249.00',
            productRating: 5,
            productReviews: 120
          },
          {
            imageSrc: '/src/assets/SAC.png',
            productTitle: 'Samsung Galaxy Buds',
            productPrice: '$129.00',
            productRating: 4,
            productReviews: 95
          },
          {
            imageSrc: '/src/assets/SAC.png',
            productTitle: 'Sony WH-1000XM4',
            productPrice: '$349.00',
            productRating: 5,
            productReviews: 220
          }
        ]
        this.products.push(...moreProducts)
        this.isLoading = false
      }, 2000)
    },
    chunkArray(arr, size) {
      const result = []
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
      }
      return result
    }
  }
}
</script>

<style scoped>
#product-category-section {
  margin-top: 50px;
}

.product-category-card {
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  text-align: center;
}

.product-category-card img {
  max-width: 100%;
  height: auto;
}

.custom-title {
  text-transform: uppercase;
  font-weight: bold;
}

.custom-link {
  color: #333;
  text-decoration: underline;
}

.custom-carousel-img {
  max-height: 500px;
  object-fit: cover;
}
/* New CSS for Carousel Controls */
.custom-carousel-control-icon {
  filter: invert(1); /* Change the color of the icon to black */
}
.container-fluid {
  padding: 3;
}

.row.no-gutters {
  margin-right: 0;
  margin-left: 0;
}
</style>
