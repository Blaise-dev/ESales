<template>
  <section class="confirmation-page">
    <span class="page-orb orb-a"></span>
    <span class="page-orb orb-b"></span>

    <div class="container confirmation-shell">
      <div class="hero-card reveal-item reveal-1">
        <div class="status-pill">
          <v-icon size="16" class="me-1">mdi-check-decagram</v-icon>
          Paiement accepté
        </div>

        <h1 class="hero-title">Merci pour votre commande !</h1>
        <p class="hero-subtitle">
          Votre commande est confirmée et en cours de traitement. Un e-mail récapitulatif vous est envoyé.
        </p>

        <div class="hero-metrics">
          <div class="metric-item">
            <span class="metric-label">Articles</span>
            <strong class="metric-value">{{ totalItems }}</strong>
          </div>
          <div class="metric-item">
            <span class="metric-label">Total TTC</span>
            <strong class="metric-value">{{ getTotalPrice.toFixed(2) }} €</strong>
          </div>
          <div class="metric-item">
            <span class="metric-label">Livraison</span>
            <strong class="metric-value">3 à 5 jours</strong>
          </div>
        </div>

        <div class="hero-actions">
          <RouterLink to="/" class="btn btn-modern hero-btn">
            <v-icon size="16" class="me-1">mdi-home-variant-outline</v-icon>
            Retour à l'accueil
          </RouterLink>
          <RouterLink to="/shoppingcart" class="btn btn-outline hero-btn-secondary">
            <v-icon size="16" class="me-1">mdi-cart-outline</v-icon>
            Voir mon panier
          </RouterLink>
        </div>
      </div>

      <div class="content-grid">
        <article class="surface-card block-card reveal-item reveal-2">
          <h2 class="section-title">
            <v-icon size="20" class="me-2">mdi-receipt-text-check-outline</v-icon>
            Récapitulatif de votre commande
          </h2>

          <ul class="items-list" v-if="orderItems.length">
            <li v-for="produit in orderItems" :key="produit.id" class="item-row">
              <span class="item-name">{{ produit.name }}</span>
              <span class="item-meta">x{{ produit.quantity }}</span>
              <strong class="item-price">{{ (produit.price * produit.quantity).toFixed(2) }} €</strong>
            </li>
          </ul>
          <p v-else class="empty-note">Aucun article trouvé dans le panier.</p>

          <div class="summary-totals">
            <div class="total-line"><span>Sous-total</span><strong>{{ getSubtotal.toFixed(2) }} €</strong></div>
            <div class="total-line"><span>Taxe (20%)</span><strong>{{ getTax.toFixed(2) }} €</strong></div>
            <div class="total-line"><span>Livraison</span><strong>{{ shippingCost.toFixed(2) }} €</strong></div>
            <div class="total-line grand-total"><span>Total TTC</span><strong>{{ getTotalPrice.toFixed(2) }} €</strong></div>
          </div>
        </article>

        <article class="surface-card block-card reveal-item reveal-3">
          <h2 class="section-title">
            <v-icon size="20" class="me-2">mdi-truck-delivery-outline</v-icon>
            Informations de livraison
          </h2>

          <ul class="details-list">
            <li v-if="deliverySummary.fullName"><span>Nom</span><strong>{{ deliverySummary.fullName }}</strong></li>
            <li v-if="deliverySummary.email"><span>Email</span><strong>{{ deliverySummary.email }}</strong></li>
            <li v-if="deliverySummary.phone"><span>Téléphone</span><strong>{{ deliverySummary.phone }}</strong></li>
            <li><span>Adresse</span><strong>{{ deliverySummary.address }}</strong></li>
            <li v-if="deliverySummary.comments"><span>Commentaire</span><strong>{{ deliverySummary.comments }}</strong></li>
          </ul>

          <div class="shipping-timeline">
            <div class="timeline-step active">
              <v-icon size="16">mdi-check-circle</v-icon>
              <span>Paiement validé</span>
            </div>
            <div class="timeline-step active">
              <v-icon size="16">mdi-package-variant-closed-check</v-icon>
              <span>Préparation</span>
            </div>
            <div class="timeline-step">
              <v-icon size="16">mdi-truck-fast-outline</v-icon>
              <span>Expédition 24-48h</span>
            </div>
          </div>
        </article>

        <article class="surface-card block-card reveal-item reveal-4 support-card">
          <h2 class="section-title">
            <v-icon size="20" class="me-2">mdi-face-agent</v-icon>
            Besoin d'aide ?
          </h2>
          <p class="support-text">Notre équipe vous accompagne du lundi au vendredi, de 9h00 à 18h00.</p>
          <div class="support-actions">
            <a href="mailto:serviceclient@estores.com" class="support-link">serviceclient@estores.com</a>
            <a href="tel:+33123456789" class="support-link">+33 1 23 45 67 89</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CheckoutPaiement',
  computed: {
    ...mapGetters(['panier', 'paymentData']),
    orderItems() {
      const fromPayment = this.paymentData?.items
      if (Array.isArray(fromPayment) && fromPayment.length) return fromPayment
      return Array.isArray(this.panier) ? this.panier : []
    },
    getSubtotal() {
      const fromPayment = Number(this.paymentData?.subtotal)
      if (Number.isFinite(fromPayment)) return fromPayment
      return this.orderItems.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0)
    },
    getTax() {
      const fromPayment = Number(this.paymentData?.tax)
      if (Number.isFinite(fromPayment)) return fromPayment
      return this.getSubtotal * 0.2
    },
    shippingCost() {
      const fromPayment = Number(this.paymentData?.shippingCost)
      return Number.isFinite(fromPayment) ? fromPayment : 0
    },
    getTotalPrice() {
      const fromPayment = Number(this.paymentData?.price)
      if (Number.isFinite(fromPayment)) return fromPayment
      return this.getSubtotal + this.getTax + this.shippingCost
    },
    totalItems() {
      return this.orderItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
    },
    deliverySummary() {
      const info = this.paymentData?.deliveryInfo || {}
      const addressLine = [info.address, info.city, info.department, info.country].filter(Boolean).join(', ')
      return {
        fullName: [info.name, info.prenom].filter(Boolean).join(' ').trim(),
        email: info.email || '',
        phone: info.phone || '',
        address: addressLine || 'Adresse non renseignée',
        comments: info.comments || ''
      }
    }
  }
}
</script>

<style scoped>
.confirmation-page {
  position: relative;
  min-height: 100vh;
  background: var(--bg);
  padding: 1rem 0 2rem;
  overflow: hidden;
}

.confirmation-shell {
  position: relative;
  z-index: 1;
}

.page-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(46px);
  opacity: .22;
  pointer-events: none;
  animation: orbFloat 11s ease-in-out infinite;
}

.orb-a {
  width: 250px;
  height: 250px;
  top: 7%;
  left: -35px;
  background: rgba(37, 99, 235, .34);
}

.orb-b {
  width: 220px;
  height: 220px;
  bottom: 9%;
  right: -28px;
  background: rgba(16, 185, 129, .28);
  animation-delay: 1.8s;
}

.hero-card {
  border: 1px solid color-mix(in srgb, var(--primary) 24%, var(--border));
  background: linear-gradient(155deg, var(--surface), color-mix(in srgb, var(--surface-muted) 78%, var(--primary) 8%));
  border-radius: calc(var(--radius-md) + 2px);
  box-shadow: var(--shadow-sm);
  padding: 1.2rem;
  margin-bottom: 1rem;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: .28rem .62rem;
  font-size: .76rem;
  font-weight: 700;
  color: var(--primary);
  background: color-mix(in srgb, var(--surface) 84%, var(--primary) 10%);
  border: 1px solid color-mix(in srgb, var(--primary) 24%, var(--border));
}

.hero-title {
  margin: .65rem 0 .2rem;
  font-size: clamp(1.35rem, 2.8vw, 2rem);
  color: var(--text);
}

.hero-subtitle {
  margin: 0;
  color: var(--text-soft);
  max-width: 60ch;
}

.hero-metrics {
  margin-top: .9rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .6rem;
}

.metric-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  padding: .65rem .75rem;
  display: grid;
  gap: .16rem;
}

.metric-label {
  font-size: .74rem;
  color: var(--text-soft);
}

.metric-value {
  color: var(--text);
  font-size: .94rem;
}

.hero-actions {
  margin-top: .9rem;
  display: flex;
  flex-wrap: wrap;
  gap: .55rem;
}

.hero-btn,
.hero-btn-secondary {
  border-radius: 999px;
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.hero-btn-secondary {
  border: 1px solid var(--border);
  color: var(--text-soft);
  padding: .5rem .95rem;
}

.hero-btn-secondary:hover {
  color: var(--primary);
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
}

.block-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
}

.block-card:nth-child(1) {
  grid-column: span 7;
}

.block-card:nth-child(2) {
  grid-column: span 5;
}

.support-card {
  grid-column: span 12;
}

.section-title {
  margin: 0 0 .8rem;
  color: var(--text);
  font-size: 1.03rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}

.items-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: .52rem;
}

.item-row {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: .55rem .62rem;
  background: var(--surface-muted);
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: .55rem;
  align-items: center;
}

.item-name {
  color: var(--text);
  font-size: .88rem;
}

.item-meta {
  font-size: .76rem;
  color: var(--text-soft);
}

.item-price {
  color: var(--primary);
  font-size: .86rem;
}

.empty-note {
  color: var(--text-soft);
  margin: .2rem 0;
}

.summary-totals {
  margin-top: .78rem;
  border-top: 1px solid var(--border);
  padding-top: .65rem;
  display: grid;
  gap: .35rem;
}

.total-line {
  display: flex;
  justify-content: space-between;
  gap: .6rem;
  color: var(--text-soft);
  font-size: .88rem;
}

.grand-total {
  color: var(--text);
  font-weight: 700;
  margin-top: .25rem;
}

.details-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: .48rem;
}

.details-list li {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  padding: .5rem .62rem;
  display: grid;
  gap: .16rem;
}

.details-list span {
  font-size: .74rem;
  color: var(--text-soft);
}

.details-list strong {
  color: var(--text);
  font-size: .86rem;
  font-weight: 600;
}

.shipping-timeline {
  margin-top: .8rem;
  border-top: 1px solid var(--border);
  padding-top: .7rem;
  display: grid;
  gap: .5rem;
}

.timeline-step {
  display: inline-flex;
  align-items: center;
  gap: .42rem;
  color: var(--text-soft);
  font-size: .83rem;
}

.timeline-step.active {
  color: var(--text);
}

.support-text {
  color: var(--text-soft);
  margin: 0 0 .75rem;
}

.support-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .55rem;
}

.support-link {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: .38rem .72rem;
  color: var(--text-soft);
  text-decoration: none;
}

.support-link:hover {
  color: var(--primary);
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
}

.reveal-item {
  animation: revealIn .52s var(--ease) both;
}

.reveal-2 {
  animation-delay: .08s;
}

.reveal-3 {
  animation-delay: .14s;
}

.reveal-4 {
  animation-delay: .2s;
}

@keyframes revealIn {
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 991.98px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .block-card:nth-child(1),
  .block-card:nth-child(2),
  .support-card {
    grid-column: auto;
  }

  .hero-metrics {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 575.98px) {
  .confirmation-page {
    padding-top: .75rem;
  }

  .hero-card,
  .block-card {
    padding: .82rem;
    border-radius: var(--radius-sm);
  }

  .hero-title {
    font-size: 1.18rem;
  }

  .hero-metrics {
    grid-template-columns: 1fr;
    gap: .45rem;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .hero-btn,
  .hero-btn-secondary {
    justify-content: center;
    width: 100%;
  }

  .item-row {
    grid-template-columns: 1fr;
    gap: .2rem;
  }

  .item-meta,
  .item-price {
    justify-self: start;
  }

  .support-actions {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
