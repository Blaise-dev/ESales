<template>
  <section class="payment-page">
    <span class="page-orb orb-a"></span>
    <span class="page-orb orb-b"></span>

    <div class="container payment-shell">
      <div class="payment-hero reveal-item reveal-1">
        <div class="status-pill">
          <v-icon size="16" class="me-1">mdi-lock-check-outline</v-icon>
          Paiement sécurisé
        </div>
        <h1 class="hero-title">Paiement par carte bancaire</h1>
        <p class="hero-subtitle">
          Finalisez votre commande en toute sécurité. Vos données sont chiffrées et protégées.
        </p>
      </div>

      <div class="payment-layout">
        <article class="surface-card payment-card reveal-item reveal-2">
          <h2 class="card-title">
            <v-icon size="20" class="me-2">mdi-credit-card-outline</v-icon>
            Informations de paiement
          </h2>

          <div class="brand-row">
            <img src="@/assets/VISA.png" alt="VISA" class="brand-icon" />
            <img src="@/assets/MC.png" alt="MasterCard" class="brand-icon" />
            <img src="@/assets/CB.png" alt="CB" class="brand-icon" />
            <img src="@/assets/pay.png" alt="Paylib" class="brand-icon" />
          </div>

          <form class="payment-form" @submit.prevent="confirmPayment">
            <div class="field-group">
              <label for="card-number">Numéro de carte <span class="req">*</span></label>
              <input
                id="card-number"
                v-model.trim="cardForm.number"
                type="text"
                class="field-input"
                placeholder="1234 5678 9012 3456"
                inputmode="numeric"
                maxlength="19"
                required
              />
            </div>

            <div class="field-group">
              <label for="card-holder">Nom sur la carte <span class="req">*</span></label>
              <input
                id="card-holder"
                v-model.trim="cardForm.holder"
                type="text"
                class="field-input"
                placeholder="Marie Dupont"
                required
              />
            </div>

            <div class="row-grid">
              <div class="field-group">
                <label for="card-expiry">Date d'expiration <span class="req">*</span></label>
                <input
                  id="card-expiry"
                  v-model.trim="cardForm.expiry"
                  type="text"
                  class="field-input"
                  placeholder="MM/AA"
                  maxlength="5"
                  required
                />
              </div>

              <div class="field-group">
                <label for="card-cvv">Cryptogramme <span class="req">*</span></label>
                <input
                  id="card-cvv"
                  v-model.trim="cardForm.cvv"
                  type="password"
                  class="field-input"
                  placeholder="***"
                  inputmode="numeric"
                  maxlength="4"
                  required
                />
              </div>
            </div>

            <p v-if="errorMessage" class="error-inline">{{ errorMessage }}</p>

            <div class="actions">
              <button type="submit" class="btn btn-modern pay-btn" :disabled="!canPay">
                <v-icon size="16" class="me-1">mdi-check-circle-outline</v-icon>
                Valider le paiement
              </button>

              <button type="button" class="btn btn-outline-danger cancel-btn" @click="onAbandon">
                <v-icon size="16" class="me-1">mdi-close-circle-outline</v-icon>
                Abandonner
              </button>
            </div>

            <div class="secure-note">
              <v-icon size="16" class="me-1">mdi-shield-check-outline</v-icon>
              Paiement 100% sécurisé
            </div>
          </form>
        </article>

        <aside class="surface-card summary-card reveal-item reveal-3">
          <h2 class="card-title">
            <v-icon size="20" class="me-2">mdi-receipt-outline</v-icon>
            Récapitulatif
          </h2>

          <div class="summary-line">
            <span>Montant de la transaction</span>
            <strong>{{ formattedAmount }} €</strong>
          </div>

          <div class="summary-line" v-if="deliveryInfo.fullName">
            <span>Client</span>
            <strong>{{ deliveryInfo.fullName }}</strong>
          </div>

          <div class="summary-line" v-if="deliveryInfo.email">
            <span>Email</span>
            <strong>{{ deliveryInfo.email }}</strong>
          </div>

          <div class="summary-line" v-if="deliveryInfo.address">
            <span>Adresse</span>
            <strong>{{ deliveryInfo.address }}</strong>
          </div>

          <div class="timeline">
            <div class="timeline-step active">
              <v-icon size="16">mdi-form-select</v-icon>
              <span>Informations validées</span>
            </div>
            <div class="timeline-step active">
              <v-icon size="16">mdi-credit-card-check-outline</v-icon>
              <span>Paiement en cours</span>
            </div>
            <div class="timeline-step">
              <v-icon size="16">mdi-flag-checkered</v-icon>
              <span>Confirmation</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PaiementView',
  data() {
    return {
      errorMessage: '',
      cardForm: {
        number: '',
        holder: '',
        expiry: '',
        cvv: ''
      }
    }
  },
  computed: {
    ...mapGetters(['paymentData']),
    amountValue() {
      const raw = this.paymentData?.price
      const amount = Number(raw)
      return Number.isFinite(amount) ? amount : 0
    },
    formattedAmount() {
      return this.amountValue.toFixed(2)
    },
    deliveryInfo() {
      const info = this.paymentData?.deliveryInfo || {}
      const addressLine = [info.address, info.city, info.department, info.country].filter(Boolean).join(', ')
      return {
        fullName: [info.name, info.prenom].filter(Boolean).join(' ').trim(),
        email: info.email || '',
        address: addressLine || ''
      }
    },
    canPay() {
      const sanitizedNumber = this.cardForm.number.replace(/\s+/g, '')
      const validNumber = /^\d{13,19}$/.test(sanitizedNumber)
      const validHolder = this.cardForm.holder.length >= 3
      const validExpiry = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(this.cardForm.expiry)
      const validCvv = /^\d{3,4}$/.test(this.cardForm.cvv)
      return validNumber && validHolder && validExpiry && validCvv
    }
  },
  methods: {
    confirmPayment() {
      if (!this.canPay) {
        this.errorMessage = 'Veuillez compléter correctement les informations de carte.'
        return
      }

      this.errorMessage = ''
      this.$router.push('/Cpaiement')
    },
    onAbandon() {
      this.$router.push('/shoppingcart')
    }
  }
}
</script>

<style scoped>
.payment-page {
  position: relative;
  min-height: 100vh;
  background: var(--bg);
  padding: 1rem 0 2rem;
  overflow: hidden;
}

.payment-shell {
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
  top: 8%;
  left: -35px;
  background: rgba(37, 99, 235, .34);
}

.orb-b {
  width: 220px;
  height: 220px;
  bottom: 10%;
  right: -30px;
  background: rgba(16, 185, 129, .28);
  animation-delay: 1.8s;
}

.payment-hero {
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
  max-width: 64ch;
}

.payment-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1rem;
}

.payment-card,
.summary-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
}

.card-title {
  margin: 0 0 .8rem;
  color: var(--text);
  font-size: 1.03rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}

.brand-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: .5rem;
  margin-bottom: .85rem;
}

.brand-icon {
  width: 34px;
  height: auto;
}

.payment-form {
  display: grid;
  gap: .72rem;
}

.field-group {
  display: grid;
  gap: .3rem;
}

.field-group label {
  color: var(--text-soft);
  font-size: .84rem;
  font-weight: 600;
}

.req {
  color: #ef4444;
}

.field-input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-muted);
  color: var(--text);
  padding: .58rem .82rem;
  min-height: 42px;
  outline: none;
  transition: border-color var(--ease), box-shadow var(--ease);
}

.field-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, .12);
}

.row-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .62rem;
}

.error-inline {
  margin: 0;
  border: 1px solid rgba(239, 68, 68, .25);
  background: rgba(239, 68, 68, .1);
  color: #dc2626;
  border-radius: 8px;
  padding: .58rem .74rem;
  font-size: .82rem;
}

.actions {
  display: grid;
  gap: .52rem;
  margin-top: .3rem;
}

.pay-btn,
.cancel-btn {
  min-height: 44px;
  border-radius: 999px;
}

.pay-btn:disabled {
  opacity: .58;
  cursor: not-allowed;
}

.secure-note {
  margin-top: .2rem;
  font-size: .8rem;
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  gap: .65rem;
  padding: .5rem 0;
  border-bottom: 1px solid var(--border);
  color: var(--text-soft);
  font-size: .85rem;
}

.summary-line:last-of-type {
  border-bottom: none;
}

.summary-line strong {
  color: var(--text);
}

.timeline {
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

.reveal-item {
  opacity: 0;
  transform: translateY(10px);
  animation: revealIn .52s var(--ease) forwards;
}

.reveal-2 {
  animation-delay: .08s;
}

.reveal-3 {
  animation-delay: .14s;
}

@keyframes revealIn {
  to {
    opacity: 1;
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
  .payment-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575.98px) {
  .payment-page {
    padding-top: .75rem;
  }

  .payment-hero,
  .payment-card,
  .summary-card {
    padding: .82rem;
    border-radius: var(--radius-sm);
  }

  .hero-title {
    font-size: 1.18rem;
  }

  .row-grid {
    grid-template-columns: 1fr;
    gap: .5rem;
  }

  .pay-btn,
  .cancel-btn {
    width: 100%;
  }
}
</style>
