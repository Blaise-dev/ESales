<template>
  <section class="contact-page">
    <span class="page-orb orb-left"></span>
    <span class="page-orb orb-right"></span>

    <div class="container contact-shell">
      <header class="hero-card reveal-item reveal-1">
        <p class="hero-kicker">Contact</p>
        <h1 class="hero-title">Parlons de votre besoin en quelques minutes.</h1>
        <p class="hero-subtitle">
          Une question sur une commande, un paiement ou un produit ?
          Notre équipe vous répond rapidement.
        </p>
      </header>

      <section class="contact-grid">
        <article class="surface-card info-card reveal-item reveal-2">
          <h2 class="section-title">
            <v-icon size="20" class="me-2">mdi-headset</v-icon>
            Infos utiles
          </h2>

          <div class="info-list">
            <div class="info-item">
              <v-icon size="18">mdi-map-marker-outline</v-icon>
              <div>
                <strong>Adresse</strong>
                <p>Rennes, France</p>
              </div>
            </div>
            <div class="info-item">
              <v-icon size="18">mdi-phone-outline</v-icon>
              <div>
                <strong>Téléphone</strong>
                <p>+33 6 27 37 93 60</p>
              </div>
            </div>
            <div class="info-item">
              <v-icon size="18">mdi-email-outline</v-icon>
              <div>
                <strong>Email</strong>
                <p>contact@esales.sn</p>
              </div>
            </div>
            <div class="info-item">
              <v-icon size="18">mdi-clock-outline</v-icon>
              <div>
                <strong>Horaires</strong>
                <p>Lun - Sam · 09:00 - 19:00</p>
              </div>
            </div>
          </div>

          <div class="quick-links">
            <RouterLink :to="{ path: '/account', hash: '#orders' }" class="quick-link">Suivre mes commandes</RouterLink>
            <RouterLink to="/shoppingcart" class="quick-link">Voir mon panier</RouterLink>
          </div>
        </article>

        <article class="surface-card form-card reveal-item reveal-3">
          <h2 class="section-title">
            <v-icon size="20" class="me-2">mdi-message-text-outline</v-icon>
            Envoyer un message
          </h2>

          <v-alert
            v-if="submitState === 'success'"
            type="success"
            variant="tonal"
            density="comfortable"
            class="mb-3"
          >
            Message envoyé. Notre équipe vous répondra très vite.
          </v-alert>

          <v-alert
            v-if="submitState === 'error'"
            type="error"
            variant="tonal"
            density="comfortable"
            class="mb-3"
          >
            Merci de compléter tous les champs correctement.
          </v-alert>

          <v-form @submit.prevent="submitContact" class="contact-form">
            <div class="form-grid">
              <v-text-field
                v-model="form.fullName"
                label="Nom complet"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                required
              />
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                required
              />
            </div>

            <v-text-field
              v-model="form.subject"
              label="Sujet"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              required
            />

            <v-textarea
              v-model="form.message"
              label="Message"
              rows="5"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              required
            />

            <div class="form-actions">
              <button type="submit" class="btn btn-modern send-btn">
                <v-icon size="16" class="me-1">mdi-send-outline</v-icon>
                Envoyer
              </button>
              <button type="button" class="btn btn-outline reset-btn" @click="resetForm">
                Réinitialiser
              </button>
            </div>
          </v-form>
        </article>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      submitState: 'idle',
      form: {
        fullName: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    isValidEmail(value) {
      const email = (value || '').toString().trim()
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },
    submitContact() {
      const fullName = this.form.fullName.trim()
      const email = this.form.email.trim()
      const subject = this.form.subject.trim()
      const message = this.form.message.trim()

      if (!fullName || !subject || !message || !this.isValidEmail(email)) {
        this.submitState = 'error'
        return
      }

      this.submitState = 'success'
      this.resetForm(false)
    },
    resetForm(clearState = true) {
      this.form = {
        fullName: '',
        email: '',
        subject: '',
        message: ''
      }

      if (clearState) {
        this.submitState = 'idle'
      }
    }
  }
}
</script>

<style scoped>
.contact-page {
  position: relative;
  min-height: calc(100vh - 140px);
  background: var(--bg);
  padding: 1rem 0 2rem;
  overflow: hidden;
}

.contact-shell {
  position: relative;
  z-index: 1;
}

.page-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(44px);
  opacity: .22;
  pointer-events: none;
  animation: orbFloat 10s ease-in-out infinite;
}

.orb-left {
  width: 250px;
  height: 250px;
  top: 8%;
  left: -40px;
  background: color-mix(in srgb, var(--primary) 34%, transparent);
}

.orb-right {
  width: 220px;
  height: 220px;
  bottom: 8%;
  right: -24px;
  background: color-mix(in srgb, var(--accent) 34%, transparent);
  animation-delay: 1.3s;
}

.hero-card {
  border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border));
  border-radius: calc(var(--radius-md) + 2px);
  background: linear-gradient(155deg, var(--surface), color-mix(in srgb, var(--surface-muted) 82%, var(--primary) 8%));
  box-shadow: var(--shadow-sm);
  padding: 1.2rem;
}

.hero-kicker {
  margin: 0 0 .35rem;
  font-size: .74rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--primary);
}

.hero-title {
  margin: 0;
  color: var(--text);
  font-size: clamp(1.3rem, 2.5vw, 1.95rem);
  line-height: 1.3;
}

.hero-subtitle {
  margin: .6rem 0 0;
  color: var(--text-soft);
  max-width: 70ch;
}

.contact-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 0.95fr 1.25fr;
  gap: .9rem;
}

.info-card,
.form-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
}

.section-title {
  margin: 0 0 .8rem;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  font-size: 1.03rem;
  font-weight: 700;
}

.info-list {
  display: grid;
  gap: .65rem;
}

.info-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  padding: .6rem .7rem;
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: .5rem;
  color: var(--text-soft);
}

.info-item strong {
  color: var(--text);
  font-size: .88rem;
}

.info-item p {
  margin: .05rem 0 0;
  font-size: .82rem;
}

.quick-links {
  margin-top: .8rem;
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}

.quick-link {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: .38rem .72rem;
  font-size: .8rem;
  color: var(--text-soft);
  background: var(--surface);
}

.quick-link:hover {
  color: var(--primary);
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
}

.contact-form {
  display: grid;
  gap: .8rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .7rem;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .55rem;
}

.send-btn,
.reset-btn {
  border-radius: 999px;
  min-height: 42px;
}

.reset-btn {
  border: 1px solid var(--border);
  color: var(--text-soft);
  background: var(--surface);
}

.reset-btn:hover {
  color: var(--primary);
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
}

.reveal-item {
  opacity: 0;
  transform: translateY(10px);
  animation: sectionIn .5s var(--ease) forwards;
}

.reveal-1 { animation-delay: .05s; }
.reveal-2 { animation-delay: .1s; }
.reveal-3 { animation-delay: .16s; }

@keyframes sectionIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 991.98px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767.98px) {
  .contact-page {
    padding: .9rem 0 1.5rem;
  }

  .hero-card,
  .info-card,
  .form-card {
    padding: .9rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 1.35rem;
  }
}
</style>
