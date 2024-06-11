<template>
  <div class="container-fluid">
    <div class="row no-gutters">
      <div class="col-12 col-md-4">
        <ProductCard
          title="T-Shirt Tunic Tops Blouse"
          description=""
          imageSrc="/src/assets/Trico.png"
          link="#"
        />
      </div>
      <div class="col-12 col-md-4">
        <ProductCard
          title="Satchel Tote Crossbody Bags"
          description=""
          imageSrc="src/assets/SAC.png"
          link="#"
        />
      </div>
      <div class="col-12 col-md-4">
        <ProductCard
          title="Men's Tennis Walking Shoes"
          description=""
          imageSrc="src/assets/spadrine.png"
          link="#"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '/src/components/component3.vue'

export default {
  name: 'accView',
  components: {
    ProductCard
  }
}
</script>

<style scoped>
.container-fluid {
  padding: 3;
}

.row.no-gutters {
  margin-right: 0;
  margin-left: 0;
}
</style>
