<template>
  <section class="product-page">
    <div class="page-orb orb-a"></div>
    <div class="page-orb orb-b"></div>

    <div v-if="showAlert" class="alert alert-danger alert-dismissible fade show product-alert" role="alert">
      {{ errorMessage }}
      <button type="button" class="btn-close" @click="closeAlert" aria-label="Close"></button>
    </div>

    <div class="container-fluid px-3 px-md-4 px-lg-5">
      <div class="page-meta-row">
        <div class="meta-left">
          <span class="meta-pill">Détail produit</span>
          <span class="meta-sep">•</span>
          <span class="meta-label">Référence #{{ produit.id || '--' }}</span>
        </div>
        <div class="meta-right" v-if="!isLoading">
          <v-rating :model-value="averageRating" readonly density="compact" color="yellow"></v-rating>
          <span>{{ averageRating.toFixed(1) }} ({{ commentCount }} avis)</span>
        </div>
      </div>

      <div v-if="isLoading" class="state-card surface-card">
        <v-progress-circular indeterminate color="primary" size="26" class="me-2" />
        Chargement du produit...
      </div>

      <template v-else>
        <div class="product-layout reveal-stagger">
          <div class="gallery-card surface-card reveal-item reveal-item-1">
            <div class="gallery-main" @click="openLightbox(currentSlide)">
              <img :src="currentImage" :alt="produit.name" class="main-image" />
              <span class="image-tag">E-Sales</span>
              <span class="gallery-zoom-hint">
                <v-icon size="16" class="me-1">mdi-magnify-plus-outline</v-icon>
                Agrandir
              </span>
            </div>

            <div class="thumbs-wrap" v-if="produit.photos.length > 1">
              <button
                v-for="(item, index) in produit.photos"
                :key="index"
                type="button"
                class="thumb-btn"
                :class="{ active: index === currentSlide }"
                @click="currentSlide = index"
              >
                <img :src="item.src" :alt="`Aperçu ${index + 1}`" class="thumb-image" />
              </button>
            </div>

            <div class="gallery-controls" v-if="produit.photos.length > 1">
              <button type="button" class="gallery-nav-btn" @click="prevMainImage">
                <v-icon size="18">mdi-chevron-left</v-icon>
                Précédente
              </button>
              <span class="gallery-index">{{ currentSlide + 1 }} / {{ produit.photos.length }}</span>
              <button type="button" class="gallery-nav-btn" @click="nextMainImage">
                Suivante
                <v-icon size="18">mdi-chevron-right</v-icon>
              </button>
            </div>
          </div>

          <div class="product-info-col reveal-item reveal-item-2">
            <div class="product-info-card surface-card animated-card">
              <div class="product-heading-row">
                <h1 class="product-title">{{ produit.name }}</h1>
                <button
                  type="button"
                  class="wishlist-btn"
                  :class="{ active: isWishlisted }"
                  :aria-label="isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'"
                  @click="handleWishlistToggle"
                >
                  <v-icon size="20">{{ isWishlisted ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                  <span>{{ isWishlisted ? 'Dans vos souhaits' : 'Ajouter aux souhaits' }}</span>
                </button>
              </div>
              <p class="product-price">{{ formatPrice(produit.price) }} €</p>
              <p class="product-tax">TVA incluse</p>

              <div class="stats-strip">
                <span><v-icon size="16" class="me-1">mdi-star</v-icon>{{ averageRating.toFixed(1) }}/5</span>
                <span><v-icon size="16" class="me-1">mdi-comment-text-outline</v-icon>{{ commentCount }} avis</span>
                <span><v-icon size="16" class="me-1">mdi-shield-check-outline</v-icon>Paiement protégé</span>
              </div>

              <div class="info-block" v-if="produit.sizes.length">
                <h2 class="block-title">Taille</h2>
                <div class="sizes-grid">
                  <button
                    v-for="size in produit.sizes"
                    :key="size"
                    type="button"
                    class="size-pill"
                    :class="{ active: selectedSize === size }"
                    @click="selectSize(size)"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <div class="info-block">
                <h2 class="block-title">Quantité</h2>
                <div class="qty-wrap">
                  <button type="button" class="qty-btn" @click="decreaseQuantity">
                    <v-icon size="18">mdi-minus</v-icon>
                  </button>
                  <span class="qty-value">{{ quantity }}</span>
                  <button type="button" class="qty-btn" @click="increaseQuantity">
                    <v-icon size="18">mdi-plus</v-icon>
                  </button>
                </div>
              </div>

              <button color="primary" class="btn btn-modern add-cart-btn" @click="addToCart">
                <v-icon left>mdi-cart-plus</v-icon>
                Ajouter au panier
              </button>
            </div>

            <div class="service-card surface-card animated-card reveal-item reveal-item-3">
              <div class="service-item">
                <v-icon class="me-2" color="green">mdi-truck-fast-outline</v-icon>
                <div>
                  <strong>Livraison gratuite</strong>
                  <p>À partir de 39,00 € d'achat.</p>
                </div>
              </div>
              <div class="service-item">
                <v-icon class="me-2" color="green">mdi-shield-check-outline</v-icon>
                <div>
                  <strong>Achat sécurisé</strong>
                  <p>Paiement, logistique et service client protégés.</p>
                </div>
              </div>
              <div class="service-item">
                <v-icon class="me-2" color="green">mdi-refresh-auto</v-icon>
                <div>
                  <strong>Retour facile</strong>
                  <p>Retours simplifiés sous 14 jours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="details-layout reveal-stagger">
          <div class="description-card surface-card animated-card reveal-item reveal-item-1">
            <h2>Description du produit</h2>
            <p class="description-text">{{ produit.description }}</p>
            <ul class="spec-list">
              <li><v-icon size="18" class="me-2">mdi-palette-outline</v-icon>Couleur : Bleu</li>
              <li><v-icon size="18" class="me-2">mdi-format-list-bulleted-square</v-icon>Style : Casual</li>
              <li><v-icon size="18" class="me-2">mdi-vector-square</v-icon>Motif : Rayé</li>
              <li><v-icon size="18" class="me-2">mdi-ruler</v-icon>Longueur des manches : Courte</li>
            </ul>
          </div>

          <div class="comments-card surface-card animated-card reveal-item reveal-item-2">
            <h2>Commentaires des clients</h2>

            <div v-if="!produit.comments.length" class="empty-comments">
              Aucun commentaire pour le moment.
            </div>

            <TransitionGroup name="comment-fade" tag="div" class="comments-list">
              <article v-for="(comment, index) in produit.comments" :key="comment.date + '-' + index" class="comment-item">
                <img :src="comment.avatar" alt="avatar" class="comment-avatar" />
                <div class="comment-content">
                  <div class="comment-head">
                    <strong>{{ comment.author }}</strong>
                    <span>{{ formatDate(comment.date) }}</span>
                  </div>
                  <v-rating v-model="comment.rating" readonly density="compact" color="yellow"></v-rating>
                  <p>{{ comment.text }}</p>
                </div>
              </article>
            </TransitionGroup>

            <div class="comment-form" v-if="$store.state.token">
              <h3>Votre avis</h3>
              <v-textarea v-model="newComment.text" label="Commentaire" variant="outlined" required></v-textarea>
              <v-rating v-model="newComment.rating" color="yellow" density="compact" background-color="grey"></v-rating>
              <button class="btn btn-modern mt-3 comment-submit-btn" @click="addComment">Soumettre</button>
            </div>

            <div v-else class="comment-login-block">
              <p>Pour laisser un commentaire, veuillez vous connecter.</p>
              <RouterLink to="/login" class="btn btn-modern">Se connecter</RouterLink>
            </div>
          </div>
        </div>

        <Teleport to="body">
          <div
            v-if="lightboxOpen"
            class="lightbox-overlay"
            @click="closeLightbox"
            @touchmove.prevent
            @touchstart="onLightboxTouchStart"
            @touchend="onLightboxTouchEnd"
          >
            <div class="lightbox-content" @click.stop>
              <button type="button" class="lightbox-close" @click="closeLightbox" aria-label="Fermer">
                <v-icon size="22">mdi-close</v-icon>
              </button>

              <button
                v-if="produit.photos.length > 1"
                type="button"
                class="lightbox-nav prev"
                @click="prevLightbox"
                aria-label="Image précédente"
              >
                <v-icon size="24">mdi-chevron-left</v-icon>
              </button>

              <img :src="lightboxImage" :alt="produit.name" class="lightbox-image" />

              <button
                v-if="produit.photos.length > 1"
                type="button"
                class="lightbox-nav next"
                @click="nextLightbox"
                aria-label="Image suivante"
              >
                <v-icon size="24">mdi-chevron-right</v-icon>
              </button>

              <div class="lightbox-counter" v-if="produit.photos.length > 1">
                {{ lightboxIndex + 1 }} / {{ produit.photos.length }}
              </div>
            </div>
          </div>
        </Teleport>
      </template>
    </div>
  </section>
</template>

<script>
import apiClient from '@/api'
import { mapGetters } from 'vuex'
import { WISHLIST_EVENT, isInWishlist, toggleWishlist } from '@/utils/wishlist'

export default {
  name: 'ProductDetailsView',
  data() {
    return {
      isLoading: false,
      quantity: 1,
      selectedSize: null,
      produit: {
        id: null,
        name: '',
        price: 0,
        description: '',
        photos: [],
        sizes: [],
        comments: []
      },
      newComment: {
        author: '',
        text: '',
        rating: 0
      },
      currentSlide: 0,
      lightboxOpen: false,
      lightboxIndex: 0,
      lightboxTouchStartX: 0,
      errorMessage: '',
      showAlert: false,
      isWishlisted: false
    }
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
    productId() {
      return this.$route.params.id
    },
    currentImage() {
      return this.produit.photos[this.currentSlide]?.src || '/uploads/1719579105590-vuejs_original_wordmark_logo_icon_146305.png'
    },
    lightboxImage() {
      return this.produit.photos[this.lightboxIndex]?.src || this.currentImage
    },
    commentCount() {
      return Array.isArray(this.produit.comments) ? this.produit.comments.length : 0
    },
    averageRating() {
      if (!this.commentCount) return 4
      const total = this.produit.comments.reduce((sum, comment) => sum + (Number(comment.rating) || 0), 0)
      return Math.max(0, Math.min(5, total / this.commentCount))
    }
  },
  created() {
    this.newComment.author = this.isAuthenticated ? `${this.user.nom} ${this.user.prenom}` : ''
    this.fetchProductDetails()
  },
  mounted() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener(WISHLIST_EVENT, this.syncWishlistState)
    window.addEventListener('storage', this.syncWishlistState)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener(WISHLIST_EVENT, this.syncWishlistState)
    window.removeEventListener('storage', this.syncWishlistState)
  },
  watch: {
    productId() {
      this.fetchProductDetails()
      this.syncWishlistState()
    },
    isAuthenticated() {
      this.newComment.author = this.isAuthenticated ? `${this.user.nom} ${this.user.prenom}` : ''
    },
    currentSlide(value) {
      if (value < 0) this.currentSlide = 0
      if (value > this.produit.photos.length - 1) this.currentSlide = this.produit.photos.length - 1
    },
    lightboxOpen(isOpen) {
      if (isOpen) {
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overscrollBehavior = 'none'
        document.body.style.overscrollBehavior = 'none'
        document.addEventListener('touchmove', this.preventPageScroll, { passive: false })
        document.addEventListener('wheel', this.preventPageScroll, { passive: false })
      } else {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.documentElement.style.overscrollBehavior = ''
        document.body.style.overscrollBehavior = ''
        document.removeEventListener('touchmove', this.preventPageScroll)
        document.removeEventListener('wheel', this.preventPageScroll)
      }
    }
  },
  methods: {
    syncWishlistState() {
      this.isWishlisted = isInWishlist(this.productId)
    },
    handleWishlistToggle() {
      this.isWishlisted = toggleWishlist(this.produit.id || this.productId)
    },
    preventPageScroll(event) {
      if (this.lightboxOpen) {
        event.preventDefault()
      }
    },
    formatPrice(value) {
      return Number(value || 0).toFixed(2)
    },
    normalizeProduct(data) {
      const rawPhotos = Array.isArray(data?.photos) ? data.photos : []
      const photosFromImage = data?.image ? [{ src: data.image }] : []
      const photos = (rawPhotos.length ? rawPhotos : photosFromImage)
        .map((item) => {
          if (typeof item === 'string') return { src: item }
          return { src: item?.src || item?.image || data?.image || '' }
        })
        .filter((item) => item.src)

      const comments = Array.isArray(data?.comments)
        ? data.comments.map((comment) => ({
            author: comment.author || 'Client',
            text: comment.text || '',
            rating: Number(comment.rating) || 4,
            date: comment.date || new Date().toISOString().split('T')[0],
            avatar: comment.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
          }))
        : []

      return {
        id: data?.id || null,
        name: data?.name || 'Produit',
        price: Number(data?.price) || 0,
        description: data?.description || 'Découvrez ce produit sélectionné pour sa qualité et son style.',
        photos: photos.length ? photos : [{ src: '/uploads/1719579105590-vuejs_original_wordmark_logo_icon_146305.png' }],
        sizes: Array.isArray(data?.sizes) && data.sizes.length ? data.sizes : ['S', 'M', 'L', 'XL'],
        comments
      }
    },
    async fetchProductDetails() {
      this.isLoading = true
      this.currentSlide = 0

      try {
        let data = null

        const directResponse = await apiClient.get(`/produits/${this.productId}`)
        if (directResponse?.status >= 200 && directResponse?.status < 300 && directResponse.data) {
          data = directResponse.data
        }

        if (!data) {
          const listResponse = await apiClient.get('/produits')
          const list = Array.isArray(listResponse.data) ? listResponse.data : []
          data = list.find((item) => String(item.id) === String(this.productId))
        }

        if (!data) {
          const altResponse = await apiClient.get('/products4')
          const raw = Array.isArray(altResponse.data) ? altResponse.data : []
          const flattened = raw.flatMap((entry) => (Array.isArray(entry.produits) ? entry.produits : entry))
          data = flattened.find((item) => String(item.id) === String(this.productId))
        }

        if (!data) throw new Error('Produit introuvable')

        this.produit = this.normalizeProduct(data)
        this.syncWishlistState()
        this.selectedSize = this.produit.sizes[0] || null
        this.errorMessage = ''
        this.showAlert = false
      } catch (error) {
        this.errorMessage = "Le produit demandé n'a pas pu être chargé."
        this.triggerAlert()
        console.error('Erreur chargement produit:', error)
      } finally {
        this.isLoading = false
      }
    },
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--
    },
    selectSize(size) {
      this.selectedSize = size
    },
    prevMainImage() {
      if (!this.produit.photos.length) return
      this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.produit.photos.length - 1
    },
    nextMainImage() {
      if (!this.produit.photos.length) return
      this.currentSlide = this.currentSlide < this.produit.photos.length - 1 ? this.currentSlide + 1 : 0
    },
    openLightbox(index = 0) {
      this.lightboxIndex = index
      this.lightboxOpen = true
    },
    closeLightbox() {
      this.lightboxOpen = false
    },
    prevLightbox() {
      if (!this.produit.photos.length) return
      this.lightboxIndex =
        this.lightboxIndex > 0 ? this.lightboxIndex - 1 : this.produit.photos.length - 1
      this.currentSlide = this.lightboxIndex
    },
    nextLightbox() {
      if (!this.produit.photos.length) return
      this.lightboxIndex =
        this.lightboxIndex < this.produit.photos.length - 1 ? this.lightboxIndex + 1 : 0
      this.currentSlide = this.lightboxIndex
    },
    onLightboxTouchStart(event) {
      this.lightboxTouchStartX = event.changedTouches?.[0]?.clientX || 0
    },
    onLightboxTouchEnd(event) {
      const endX = event.changedTouches?.[0]?.clientX || 0
      const delta = endX - this.lightboxTouchStartX

      if (Math.abs(delta) < 40) return
      if (delta < 0) {
        this.nextLightbox()
      } else {
        this.prevLightbox()
      }
    },
    onKeyDown(event) {
      if (!this.lightboxOpen) return

      if (event.key === 'Escape') this.closeLightbox()
      if (event.key === 'ArrowLeft') this.prevLightbox()
      if (event.key === 'ArrowRight') this.nextLightbox()
    },
    addToCart() {
      this.$store.dispatch('addToPanier', {
        id: this.produit.id,
        name: this.produit.name,
        price: this.produit.price,
        image: this.currentImage,
        quantity: this.quantity
      })
    },
    addComment() {
      if (!this.newComment.text.trim()) return

      const user = this.$store.state.user
      const comment = {
        author: this.newComment.author || `${user?.nom || ''} ${user?.prenom || ''}`.trim() || 'Client',
        text: this.newComment.text,
        rating: this.newComment.rating || 4,
        date: new Date().toISOString().split('T')[0],
        avatar: user?.photo || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
      }

      this.produit.comments.unshift(comment)
      this.newComment.text = ''
      this.newComment.rating = 0
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    },
    triggerAlert() {
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 4500)
    },
    closeAlert() {
      this.showAlert = false
    }
  }
}
</script>

<style scoped>
.product-page {
  padding: 1rem 0 2rem;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

.page-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(44px);
  opacity: .26;
  pointer-events: none;
  animation: orbFloat 10s ease-in-out infinite;
}

.orb-a {
  width: 260px;
  height: 260px;
  top: 8%;
  left: -40px;
  background: rgba(37, 99, 235, .3);
}

.orb-b {
  width: 230px;
  height: 230px;
  bottom: 5%;
  right: -25px;
  background: rgba(20, 184, 166, .28);
  animation-delay: 1.5s;
}

.page-meta-row {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: .6rem;
  margin-bottom: .8rem;
}

.meta-left,
.meta-right {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
}

.meta-pill {
  padding: .22rem .58rem;
  border-radius: 999px;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 14%, var(--surface));
  border: 1px solid color-mix(in srgb, var(--primary) 25%, var(--border));
}

.meta-sep,
.meta-label,
.meta-right span {
  color: var(--text-soft);
  font-size: .84rem;
}

.reveal-stagger .reveal-item {
  animation: revealUp .55s var(--ease) both;
}

.reveal-item-1 { animation-delay: .03s; }
.reveal-item-2 { animation-delay: .11s; }
.reveal-item-3 { animation-delay: .18s; }

.product-alert {
  max-width: 860px;
  margin: 0 auto 1rem;
}

.state-card {
  margin-bottom: 1rem;
  padding: 1rem 1.2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  color: var(--text-soft);
}

.product-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 1rem;
  align-items: start;
}

.gallery-card,
.product-info-card,
.service-card,
.description-card,
.comments-card {
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  overflow: hidden;
}

.animated-card {
  position: relative;
}

.animated-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, rgba(37, 99, 235, 0.08), transparent 35%, rgba(20, 184, 166, 0.08));
  opacity: 0;
  transition: opacity var(--ease);
  pointer-events: none;
}

.animated-card:hover::before {
  opacity: 1;
}

.gallery-card {
  padding: .9rem;
}

.gallery-main {
  position: relative;
  width: 100%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--surface-muted);
  min-height: clamp(260px, 52vw, 580px);
  cursor: zoom-in;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--ease);
}

.gallery-main:hover .main-image {
  transform: scale(1.04);
}

.gallery-main::after {
  content: '';
  position: absolute;
  inset: auto -40% -55% -40%;
  height: 180px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.22), transparent 65%);
  pointer-events: none;
}

.image-tag {
  position: absolute;
  left: .75rem;
  bottom: .75rem;
  padding: .25rem .55rem;
  border-radius: 999px;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .06em;
  background: color-mix(in srgb, var(--surface) 78%, transparent);
  color: var(--text-soft);
}

.gallery-zoom-hint {
  position: absolute;
  right: .75rem;
  bottom: .75rem;
  padding: .3rem .6rem;
  border-radius: 999px;
  font-size: .74rem;
  font-weight: 600;
  background: color-mix(in srgb, var(--surface) 78%, transparent);
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
}

.thumbs-wrap {
  margin-top: .8rem;
  display: flex;
  gap: .55rem;
  overflow-x: auto;
  padding-bottom: .1rem;
}

.thumb-btn {
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  padding: .2rem;
  flex: 0 0 auto;
  width: 72px;
  height: 72px;
  cursor: pointer;
  transition: transform var(--ease), box-shadow var(--ease), border-color var(--ease);
}

.thumb-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.thumb-btn.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 24%, transparent);
}

.thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.gallery-controls {
  margin-top: .65rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .55rem;
}

.product-heading-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: .8rem;
}

.wishlist-btn {
  border: 1px solid color-mix(in srgb, var(--border) 75%, transparent);
  background: color-mix(in srgb, var(--surface-muted) 65%, transparent);
  color: var(--text-soft);
  border-radius: 999px;
  min-height: 44px;
  padding: .55rem .9rem;
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  font-size: .82rem;
  font-weight: 700;
  transition: transform var(--ease), color var(--ease), background-color var(--ease), border-color var(--ease);
}

.wishlist-btn:hover {
  transform: translateY(-2px);
  color: #dc2626;
}

.wishlist-btn.active {
  color: #dc2626;
  background: color-mix(in srgb, #dc2626 12%, var(--surface));
  border-color: color-mix(in srgb, #dc2626 40%, var(--border));
}

.gallery-nav-btn {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-soft);
  border-radius: 999px;
  padding: .32rem .62rem;
  display: inline-flex;
  align-items: center;
  gap: .24rem;
  font-size: .78rem;
  transition: all var(--ease);
}

.gallery-nav-btn:hover {
  background: var(--surface-muted);
  color: var(--text);
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
}

.gallery-index {
  color: var(--text-soft);
  font-size: .8rem;
  font-weight: 600;
}

.product-info-col {
  display: grid;
  gap: 1rem;
}

@media (min-width: 1200px) {
  .product-info-col {
    position: sticky;
    top: 86px;
  }
}

.product-info-card {
  padding: 1.1rem;
}

.product-title {
  margin: 0;
  font-size: clamp(1.2rem, 2.2vw, 1.7rem);
  color: var(--text);
  line-height: 1.3;
  word-break: break-word;
}

.product-price {
  margin: .55rem 0 0;
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--primary);
}

.product-tax {
  margin: .1rem 0 1rem;
  color: var(--text-soft);
  font-size: .88rem;
}

.stats-strip {
  display: flex;
  flex-wrap: wrap;
  gap: .45rem;
  margin-bottom: .95rem;
}

.stats-strip span {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-soft);
  padding: .24rem .55rem;
  font-size: .78rem;
}

.info-block {
  margin-bottom: .95rem;
}

.block-title {
  margin: 0 0 .5rem;
  font-size: .92rem;
  font-weight: 700;
  color: var(--text-soft);
}

.sizes-grid {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}

.size-pill {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-soft);
  border-radius: 999px;
  padding: .35rem .7rem;
  min-width: 46px;
  cursor: pointer;
  transition: all var(--ease);
}

.size-pill:hover,
.size-pill.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.size-pill.active {
  box-shadow: 0 10px 18px rgba(37, 99, 235, 0.24);
}

.qty-wrap {
  display: inline-flex;
  align-items: center;
  gap: .65rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: .2rem .3rem;
  background: var(--surface);
}

.qty-btn {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-muted);
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--ease), background var(--ease), border-color var(--ease);
}

.qty-btn:hover {
  transform: scale(1.06);
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 10%, var(--surface));
}

.qty-value {
  min-width: 28px;
  text-align: center;
  font-weight: 700;
  color: var(--text);
}

.add-cart-btn {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.add-cart-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 75%;
  height: 100%;
  background: linear-gradient(110deg, transparent, rgba(255,255,255,.28), transparent);
  transition: left .65s ease;
}

.add-cart-btn:hover::after {
  left: 150%;
}

.service-card {
  padding: .9rem;
  display: grid;
  gap: .7rem;
  background: linear-gradient(165deg, var(--surface), var(--surface-muted));
}

.service-item {
  display: flex;
  align-items: flex-start;
  gap: .45rem;
}

.service-item strong {
  color: var(--text);
}

.service-item p {
  margin: .1rem 0 0;
  color: var(--text-soft);
  font-size: .86rem;
}

.details-layout {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.description-card,
.comments-card {
  padding: 1rem;
}

.description-card h2,
.comments-card h2 {
  margin: 0 0 .75rem;
  font-size: 1.2rem;
  color: var(--text);
}

.description-text {
  margin: 0 0 .8rem;
  color: var(--text-soft);
  line-height: 1.7;
  word-break: break-word;
}

.spec-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: .55rem;
}

.spec-list li {
  color: var(--text-soft);
  display: flex;
  align-items: center;
  line-height: 1.4;
}

.empty-comments {
  color: var(--text-soft);
  font-size: .9rem;
}

.comments-list {
  display: grid;
  gap: .85rem;
}

.comment-item {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: .65rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: .8rem;
  transition: transform var(--ease), background var(--ease), border-color var(--ease);
  border-radius: 12px;
  padding: .55rem;
}

.comment-item:hover {
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--surface-muted) 70%, transparent);
  border-color: color-mix(in srgb, var(--primary) 20%, var(--border));
}

.comment-avatar {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  object-fit: cover;
}

.comment-content {
  min-width: 0;
}

.comment-head {
  display: flex;
  justify-content: space-between;
  gap: .6rem;
  align-items: center;
  flex-wrap: wrap;
}

.comment-head strong {
  color: var(--text);
}

.comment-head span {
  font-size: .8rem;
  color: var(--text-soft);
}

.comment-content p {
  margin: .35rem 0 0;
  color: var(--text-soft);
  line-height: 1.6;
  word-break: break-word;
}

.comment-form {
  margin-top: .85rem;
  padding-top: .8rem;
  border-top: 1px solid var(--border);
}

.comment-form h3 {
  margin: 0 0 .5rem;
  font-size: 1rem;
  color: var(--text);
}

.comment-login-block {
  margin-top: .9rem;
  border-top: 1px solid var(--border);
  padding-top: .8rem;
}

.comment-login-block p {
  color: var(--text-soft);
}

.comment-submit-btn {
  min-width: 180px;
}

.comment-fade-enter-active,
.comment-fade-leave-active {
  transition: all .32s ease;
}

.comment-fade-enter-from,
.comment-fade-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(.985);
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8, 15, 30, 0.84);
  z-index: 2600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100vw;
  height: 100dvh;
}

.lightbox-content {
  position: relative;
  width: min(1100px, 100%);
  max-height: calc(100dvh - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: lightboxIn .22s ease-out;
}

.lightbox-image {
  max-width: 100%;
  max-height: calc(100dvh - 4rem);
  object-fit: contain;
  border-radius: 14px;
  background: #fff;
}

.lightbox-close {
  position: absolute;
  top: .4rem;
  right: .4rem;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.55);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.55);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.lightbox-nav.prev { left: .35rem; }
.lightbox-nav.next { right: .35rem; }

.lightbox-counter {
  position: absolute;
  bottom: .5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.58);
  color: #fff;
  border-radius: 999px;
  padding: .2rem .65rem;
  font-size: .8rem;
}

@keyframes revealUp {
  from {
    transform: translateY(14px) scale(.99);
  }
  to {
    transform: translateY(0) scale(1);
  }
}

@keyframes lightboxIn {
  from {
    opacity: 0;
    transform: scale(.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes orbFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@media (max-width: 1199.98px) {
  .product-layout {
    grid-template-columns: 1fr;
  }

  .details-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767.98px) {
  .product-page {
    padding-top: .75rem;
  }

  .product-heading-row {
    flex-direction: column;
    align-items: stretch;
  }

  .wishlist-btn {
    width: 100%;
    justify-content: center;
  }

  .page-meta-row {
    margin-bottom: .55rem;
  }

  .meta-right {
    width: 100%;
    justify-content: flex-start;
  }

  .product-alert {
    margin-bottom: .75rem;
  }

  .gallery-controls {
    flex-wrap: wrap;
    justify-content: center;
  }

  .gallery-index {
    width: 100%;
    text-align: center;
  }

  .stats-strip {
    gap: .35rem;
  }

  .stats-strip span {
    font-size: .74rem;
  }

  .gallery-card,
  .product-info-card,
  .service-card,
  .description-card,
  .comments-card {
    border-radius: var(--radius-sm);
  }

  .gallery-main {
    min-height: 260px;
  }

  .gallery-zoom-hint {
    font-size: .68rem;
    padding: .24rem .5rem;
  }

  .thumb-btn {
    width: 62px;
    height: 62px;
  }

  .product-price {
    font-size: 1.55rem;
  }

  .comment-item {
    grid-template-columns: 1fr;
  }

  .comment-avatar {
    width: 36px;
    height: 36px;
  }

  .lightbox-content {
    width: 100%;
    max-height: calc(100dvh - .5rem);
    align-items: flex-start;
    padding-top: max(env(safe-area-inset-top), .25rem);
  }

  .lightbox-image {
    max-height: calc(100dvh - 1.6rem);
    border-radius: 10px;
  }

  .lightbox-nav {
    width: 36px;
    height: 36px;
  }
}
</style>
