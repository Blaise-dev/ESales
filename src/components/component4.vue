<template>
  <div class="carousel-item" :class="{ active: isActive }">
    <img class="d-block w-100 custom-carousel-img" :src="imageSrc" :alt="altText">
    <div class="carousel-caption d-none d-md-block custom-caption">
     
        <p class="custom-caption-top">{{ topText }}</p>
        <h5>{{ mainText }}</h5>
        <p>{{ bottomText }}</p>
    
   </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselItem',
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    topText: {
      type: String,
      default: ''
    },
    mainText: {
      type: String,
      default: ''
    },
    bottomText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.custom-caption {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
}

.custom-caption-top {
  font-size: 2rem;
  margin-right: 10px
  

}
.custom-caption-container {
  display: flex;
  align-items: center;
}

h5 {
  font-size: 2rem;
}

p {
  font-size: 1.2rem;
}
</style>
