<script setup>
import { RouterView } from 'vue-router'

import Base from '@/components/Base.vue'
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <v-app class="flex-grow-1">
      <Base>
        <!-- Contenu de la page -->
        <v-main>
          <!-- Vous pouvez ajouter d'autres éléments ici, comme une barre de navigation, si nécessaire -->
          <RouterView />
        </v-main>
      </Base>
    </v-app>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

v-app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

v-main {
  flex: 1;
}

footer {
  flex-shrink: 0;
}
</style>
