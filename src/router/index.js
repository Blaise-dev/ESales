import { createRouter, createWebHistory } from 'vue-router'
import store from '@/stores'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 96,
        behavior: 'smooth'
      }
    }

    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { public: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { public: true }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { public: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/restaurePassword',
      name: 'restaurePassword',
      component: () => import('../views/RestaureView.vue'),
      meta: { public: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/paiement',
      name: 'paiement',
      component: () => import('../views/PaiementView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/products/:id',
      name: 'products',
      component: () => import('../views/ProductDetailsView.vue'),
      meta: { public: true }
    },
    {
      path: '/Cpaiement',
      name: 'Cpaiement',
      component: () => import('../views/check_paiement.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('../views/ShoppingCartView.vue'),
      meta: { public: true }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { public: true }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/ProductSearchView.vue'),
      meta: { public: true }
    },

    {
      path: '/AjoutCateg',
      name: 'AjoutCateg',
      component: () => import('../views/AjoutCateg.vue')
    },
    {
      path: '/AjoutProduit',
      name: 'AjoutProduit',
      component: () => import('../views/AjoutProduit.vue')
    },
    {
      path: '/AjoutRole',
      name: 'AjoutRole',
      component: () => import('../views/AjouterRole.vue')
    },
    {
      path: '/ProfilPasswrd',
      name: 'ProfilPasswrd',
      component: () => import('../views/ProfilPasswrd.vue')
    },
    {
      path: '/Categorie',
      name: 'Categorie',
      component: () => import('../views/CategorieView.vue')
    },
    {
      path: '/Produit',
      name: 'Produit',
      component: () => import('../views/ProduitView.vue')
    },
    {
      path: '/Role',
      name: 'Role',
      component: () => import('../views/RoleView.vue')
    },
    {
      path: '/Profil',
      name: 'Profil',
      component: () => import('../views/ProfilView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Guard de navigation global
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const guestOnly = to.matched.some((record) => record.meta.guestOnly)

  if (requiresAuth && !isAuthenticated) {
    return next({
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    })
  }

  if (guestOnly && isAuthenticated) {
    return next({ name: 'home' })
  }

  return next()
})

export default router
