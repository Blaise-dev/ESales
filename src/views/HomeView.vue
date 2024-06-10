<template>
    <h1>HFFFFFFFFFFF</h1>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div class="carousel-inner">
        <div class="carousel-item" :class="{ active: index === 0 }" v-for="(ad, index) in ads" :key="index">
          <img :src="ad.image" class="d-block w-100" :alt="ad.alt">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  // Définir les publicités
  const ads = reactive([
    {
      image: require('@/assets/ad1.jpg'),
      alt: 'Publicité 1'
    },
    {
      image: require('@/assets/ad2.jpg'),
      alt: 'Publicité 2'
    },
    {
      image: require('@/assets/ad3.jpg'),
      alt: 'Publicité 3'
    }
  ]);
  </script>
  
  <style>
  .carousel-item img {
    width: 100%;
    height: auto;
  }
  </style>
  