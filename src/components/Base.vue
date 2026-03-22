<template>
  <div class="base-layout">
    <Header v-if="showHeaderAndFooter" />
    <main class="base-content">
      <slot></slot>
    </main>
    <Footer v-if="showHeaderAndFooter" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue' // Assurez-vous de corriger le chemin selon votre structure de fichiers
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    showHeaderAndFooter() {
      const noHeaderFooterRoutes = ['/login', '/register', '/about', '/faq', '/contact']
      let route = this.$route.path
      route = route.replace(/\/$/, '')
      return !noHeaderFooterRoutes.includes(route)
    }
  }
}
</script>

<style scoped>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.base-content {
  flex: 1;
  animation: fade-slide-up 420ms var(--ease) both;
}
</style>
