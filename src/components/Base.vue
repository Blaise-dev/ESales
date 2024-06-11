<template>
  <div>
    <Header v-if="showHeaderAndFooter" />
    <slot></slot>
    <!-- Contenu de la page défini ici -->
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
