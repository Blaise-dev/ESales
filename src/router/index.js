import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/products',
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
      path: '/search',
      name: 'search',
      component: () => import('../views/ProductSearchView.vue')
    }
  ]
})

//On utilise ce guard pour protéger certaines parties de notre application qui nécessitent une authentification

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
