<template>
  <section class="about-page">
    <span class="page-orb orb-left"></span>
    <span class="page-orb orb-right"></span>

    <div class="container about-shell">
      <header class="hero-card reveal-item reveal-1">
        <p class="hero-kicker">À propos d’E-Sales</p>
        <h1 class="hero-title">Une expérience e-commerce plus simple, plus rapide et plus humaine.</h1>
        <p class="hero-subtitle">
          E-Sales aide les clients à découvrir des produits de qualité, commander en quelques clics
          et suivre leurs achats avec une interface moderne, fluide et fiable.
        </p>

        <div class="hero-actions">
          <RouterLink to="/" class="btn btn-modern hero-btn">
            <v-icon size="16" class="me-1">mdi-storefront-outline</v-icon>
            Découvrir la boutique
          </RouterLink>
          <RouterLink to="/search" class="btn btn-outline hero-btn-secondary">
            <v-icon size="16" class="me-1">mdi-magnify</v-icon>
            Explorer les produits
          </RouterLink>
        </div>
      </header>

      <section class="stats-grid reveal-item reveal-2">
        <article v-for="item in highlights" :key="item.label" class="surface-card stat-card">
          <v-icon size="20" class="stat-icon">{{ item.icon }}</v-icon>
          <strong class="stat-value">{{ item.value }}</strong>
          <span class="stat-label">{{ item.label }}</span>
        </article>
      </section>

      <section class="content-grid">
        <article class="surface-card content-card reveal-item reveal-3">
          <h2 class="section-title">
            <v-icon size="20" class="me-2">mdi-bullseye-arrow</v-icon>
            Notre mission
          </h2>
          <p class="section-text">
            Notre mission est de rendre le shopping en ligne accessible à tous, avec une plateforme
            agréable à utiliser, sécurisée et performante sur mobile comme sur desktop.
          </p>
          <p class="section-text">
            Nous optimisons chaque étape du parcours client: recherche intelligente, panier clair,
            checkout guidé et confirmation de commande transparente.
          </p>
        </article>

        <article class="surface-card content-card reveal-item reveal-4">
          <h2 class="section-title">
            <v-icon size="20" class="me-2">mdi-star-circle-outline</v-icon>
            Nos valeurs
          </h2>
          <ul class="values-list">
            <li v-for="value in values" :key="value.title" class="value-item">
              <v-icon size="18" class="value-icon">{{ value.icon }}</v-icon>
              <div>
                <strong>{{ value.title }}</strong>
                <p>{{ value.description }}</p>
              </div>
            </li>
          </ul>
        </article>

        <article class="surface-card content-card timeline-card reveal-item reveal-5">
          <h2 class="section-title">
            <v-icon size="20" class="me-2">mdi-timeline-clock-outline</v-icon>
            Notre évolution
          </h2>
          <div class="timeline">
            <div v-for="step in roadmap" :key="step.year" class="timeline-step">
              <span class="timeline-dot"></span>
              <div class="timeline-content">
                <span class="timeline-year">{{ step.year }}</span>
                <strong>{{ step.title }}</strong>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      highlights: [
        { icon: 'mdi-account-group-outline', value: '10k+', label: 'Utilisateurs actifs' },
        { icon: 'mdi-package-variant-closed-check', value: '35k+', label: 'Commandes livrées' },
        { icon: 'mdi-shield-check-outline', value: '99.9%', label: 'Transactions sécurisées' },
        { icon: 'mdi-cellphone-check', value: 'Mobile First', label: 'Expérience responsive' }
      ],
      values: [
        {
          icon: 'mdi-heart-outline',
          title: 'Simplicité',
          description: 'Des interfaces claires pour commander vite et sans confusion.'
        },
        {
          icon: 'mdi-lock-outline',
          title: 'Confiance',
          description: 'Protection des données et parcours de paiement sécurisés.'
        },
        {
          icon: 'mdi-lightning-bolt-outline',
          title: 'Performance',
          description: 'Navigation fluide, chargements optimisés et actions instantanées.'
        }
      ],
      roadmap: [
        {
          year: '2024',
          title: 'Lancement de la plateforme',
          description: 'Mise en place du catalogue produits et des fonctionnalités panier.'
        },
        {
          year: '2025',
          title: 'Refonte UX complète',
          description: 'Modernisation des vues clés avec un design cohérent et responsive.'
        },
        {
          year: '2026',
          title: 'Checkout intelligent',
          description: 'Tunnel de commande renforcé avec un flux paiement/confirmation fiable.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  position: relative;
  min-height: calc(100vh - 140px);
  background: var(--bg);
  padding: 1rem 0 2rem;
  overflow: hidden;
}

.about-shell {
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
  width: 240px;
  height: 240px;
  top: 8%;
  left: -30px;
  background: color-mix(in srgb, var(--primary) 35%, transparent);
}

.orb-right {
  width: 220px;
  height: 220px;
  bottom: 8%;
  right: -24px;
  background: color-mix(in srgb, var(--accent) 34%, transparent);
  animation-delay: 1.4s;
}

.hero-card {
  border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border));
  border-radius: calc(var(--radius-md) + 2px);
  background: linear-gradient(155deg, var(--surface), color-mix(in srgb, var(--surface-muted) 80%, var(--primary) 8%));
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
  font-size: clamp(1.3rem, 2.6vw, 2rem);
  line-height: 1.3;
}

.hero-subtitle {
  margin: .6rem 0 0;
  color: var(--text-soft);
  max-width: 70ch;
}

.hero-actions {
  margin-top: .9rem;
  display: flex;
  flex-wrap: wrap;
  gap: .55rem;
}

.hero-btn,
.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  min-height: 42px;
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

.stats-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .75rem;
}

.stat-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: .85rem;
  display: grid;
  gap: .18rem;
}

.stat-icon {
  color: var(--primary);
}

.stat-value {
  color: var(--text);
  font-size: 1rem;
}

.stat-label {
  color: var(--text-soft);
  font-size: .78rem;
}

.content-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: .85rem;
}

.content-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
}

.content-card:nth-child(1) {
  grid-column: span 6;
}

.content-card:nth-child(2) {
  grid-column: span 6;
}

.timeline-card {
  grid-column: span 12;
}

.section-title {
  margin: 0 0 .75rem;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  font-size: 1.03rem;
  font-weight: 700;
}

.section-text {
  margin: 0 0 .55rem;
  color: var(--text-soft);
  line-height: 1.6;
}

.values-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: .52rem;
}

.value-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  padding: .55rem .62rem;
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: .45rem;
}

.value-icon {
  color: var(--primary);
  margin-top: 2px;
}

.value-item strong {
  color: var(--text);
  font-size: .86rem;
}

.value-item p {
  margin: .2rem 0 0;
  color: var(--text-soft);
  font-size: .8rem;
}

.timeline {
  display: grid;
  gap: .6rem;
}

.timeline-step {
  display: grid;
  grid-template-columns: 12px 1fr;
  gap: .5rem;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-top: .34rem;
  background: var(--primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 22%, transparent);
}

.timeline-content {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  padding: .52rem .62rem;
}

.timeline-year {
  display: inline-block;
  margin-bottom: .2rem;
  color: var(--primary);
  font-size: .74rem;
  font-weight: 700;
}

.timeline-content strong {
  display: block;
  color: var(--text);
  font-size: .86rem;
}

.timeline-content p {
  margin: .2rem 0 0;
  color: var(--text-soft);
  font-size: .8rem;
}

.reveal-item {
  animation: revealIn .5s var(--ease) both;
}

.reveal-2 { animation-delay: .06s; }
.reveal-3 { animation-delay: .12s; }
.reveal-4 { animation-delay: .16s; }
.reveal-5 { animation-delay: .22s; }

@keyframes revealIn {
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 991.98px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .content-card:nth-child(1),
  .content-card:nth-child(2),
  .timeline-card {
    grid-column: auto;
  }
}

@media (max-width: 575.98px) {
  .about-page {
    padding-top: .75rem;
  }

  .hero-card,
  .content-card,
  .stat-card {
    padding: .82rem;
    border-radius: var(--radius-sm);
  }

  .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .hero-btn,
  .hero-btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: .6rem;
  }
}
</style>
