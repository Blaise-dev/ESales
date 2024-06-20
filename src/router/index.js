import { createRouter, createWebHistory } from 'vue-router'
import store from '@/stores'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/restaurePassword',
      name: 'restaurePassword',
      component: () => import('../views/RestaureView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/paiement',
      name: 'paiement',
      component: () => import('../views/PaiementView.vue')
    },

    {
      path: '/products/:id',
      name: 'products',
      component: () => import('../views/ProductDetailsView.vue')
    },
    {
      path: '/Cpaiement',
      name: 'Cpaiement',
      component: () => import('../views/check_paiement.vue')
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('../views/ShoppingCartView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/ProductSearchView.vue')
    }
  ]
})

// Guard de navigation global
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated // Vérifiez si le token existe dans le store

  if (isAuthenticated && to.name === 'login') {
    // Si l'utilisateur est authentifié et essaie d'accéder à la page de connexion, redirigez-le vers la page d'accueil
    next({ name: 'home' })
  } else if (isAuthenticated && to.name === 'register') {
    // Si l'utilisateur est authentifié et essaie d'accéder à la page de connexion, redirigez-le vers la page d'accueil
    next({ name: 'home' })
  } else {
    next() // Continue la navigation
  }
})

export default router
