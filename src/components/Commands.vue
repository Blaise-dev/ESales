<template>
  <section class="orders-shell">
    <div class="orders-head surface-card">
      <div>
        <p class="orders-kicker">Suivi</p>
        <h2 class="orders-title">
          {{ title }}
          <span class="orders-count">{{ orders.length }}</span>
        </h2>
        <p class="orders-subtitle">Consultez, suivez et gérez vos commandes dans une interface plus claire.</p>
      </div>
    </div>

    <div class="orders-table-wrap surface-card">
      <v-data-table
        :headers="headers"
        :items="orders"
        :sort-by="[{ key: 'createdAt', order: 'desc' }]"
        class="orders-table"
      >
        <template #item.number="{ item }">
          <div class="order-ref">
            <span class="order-ref-badge">#{{ item.number }}</span>
          </div>
        </template>

        <template #item.total="{ item }">
          <strong class="order-total">{{ formatCurrency(item.total) }}</strong>
        </template>

        <template #item.paymentMethod="{ item }">
          <span class="order-payment">{{ item.paymentMethod }}</span>
        </template>

        <template #item.statut="{ item }">
          <v-chip size="small" label :class="statusChipClass(item.statut)">
            {{ item.statut }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <div class="action-group">
            <button type="button" class="icon-action" @click="editItem(item)" aria-label="Modifier">
              <v-icon size="18">mdi-pencil-outline</v-icon>
            </button>
            <button type="button" class="icon-action danger" @click="deleteItem(item)" aria-label="Supprimer">
              <v-icon size="18">mdi-trash-can-outline</v-icon>
            </button>
            <button type="button" class="icon-action primary" @click="viewItem(item)" aria-label="Voir le détail">
              <v-icon size="18">mdi-eye-outline</v-icon>
            </button>
          </div>
        </template>

        <template #no-data>
          <div class="empty-state">
            <v-icon size="22" class="me-2">mdi-package-variant-closed-remove</v-icon>
            Aucune commande disponible.
          </div>
        </template>
      </v-data-table>
    </div>

    <v-dialog v-model="dialog" max-width="560px">
      <v-card class="surface-card edit-dialog">
        <v-card-title class="dialog-title">{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.number" label="N° commande" variant="outlined" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.total" label="Total" variant="outlined" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.createdAt" label="Date" variant="outlined" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.paymentMethod" label="Paiement" variant="outlined" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.statut" label="Statut" variant="outlined" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="close">Annuler</v-btn>
          <v-btn color="primary" variant="flat" @click="save">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogView" :max-width="isMobile ? '100%' : '1180px'" :fullscreen="isMobile">
      <v-card class="order-detail-dialog">
        <div class="detail-shell">
          <div class="detail-hero">
            <div class="detail-hero-copy">
              <p class="detail-kicker">Détail commande</p>
              <h3 class="detail-title">Commande #{{ editedItem.number || '--' }}</h3>
              <p class="detail-subtitle">
                Suivez le statut, les articles et l’historique complet de cette commande.
              </p>
            </div>

            <div class="detail-hero-meta">
              <v-chip size="small" label :class="statusChipClass(editedItem.statut)">
                {{ editedItem.statut || 'Inconnu' }}
              </v-chip>
              <strong class="detail-hero-total">{{ formatCurrency(editedItem.total) }}</strong>
            </div>
          </div>

          <div class="detail-grid">
            <section class="surface-card overview-card">
              <div class="overview-grid">
                <article class="overview-item">
                  <span class="overview-label">Date</span>
                  <strong>{{ editedItem.createdAt || '--' }}</strong>
                </article>
                <article class="overview-item">
                  <span class="overview-label">Paiement</span>
                  <strong>{{ editedItem.paymentMethod || '--' }}</strong>
                </article>
                <article class="overview-item">
                  <span class="overview-label">Articles</span>
                  <strong>{{ productCount }} produit{{ productCount > 1 ? 's' : '' }}</strong>
                </article>
                <article class="overview-item">
                  <span class="overview-label">Montant</span>
                  <strong>{{ formatCurrency(editedItem.total) }}</strong>
                </article>
              </div>
            </section>

            <section class="surface-card items-card">
              <div class="section-head">
                <h4>Articles commandés</h4>
                <span>{{ productCount }} élément{{ productCount > 1 ? 's' : '' }}</span>
              </div>

              <div class="order-products">
                <article v-for="(product, index) in normalizedProducts" :key="`${product.id}-${index}`" class="order-product-row">
                  <img :src="product.image" :alt="product.name" class="order-product-image" />
                  <div class="order-product-main">
                    <strong class="order-product-name">{{ product.name }}</strong>
                    <span class="order-product-meta">Qté: {{ product.quantity }}</span>
                  </div>
                  <div class="order-product-side">
                    <strong>{{ formatCurrency(product.price) }}</strong>
                  </div>
                </article>
              </div>
            </section>

            <section class="surface-card timeline-card">
              <div class="section-head">
                <h4>Historique de la commande</h4>
                <span>Mis à jour automatiquement</span>
              </div>

              <div class="timeline-list">
                <article v-for="(step, index) in timelineSteps" :key="`${step.title}-${index}`" class="timeline-row" :class="{ active: step.active }">
                  <span class="timeline-dot"></span>
                  <div class="timeline-content">
                    <div class="timeline-topline">
                      <strong>{{ step.title }}</strong>
                      <span>{{ step.time }}</span>
                    </div>
                    <p>{{ step.description }}</p>
                  </div>
                </article>
              </div>
            </section>
          </div>

          <div class="detail-actions">
            <button type="button" class="btn btn-outline-secondary detail-btn danger-outline" @click="cancelCom">
              Annuler la commande
            </button>
            <button type="button" class="btn btn-modern detail-btn" @click="closeView">
              Fermer
            </button>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card class="surface-card delete-dialog">
        <v-card-title class="dialog-title">Supprimer cette commande ?</v-card-title>
        <v-card-text>
          Cette action retirera la commande #{{ editedItem.number || '--' }} de la liste affichée.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeDelete">Annuler</v-btn>
          <v-btn color="error" variant="flat" @click="deleteItemConfirm">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

const FALLBACK_IMAGE = '/uploads/1719579105590-vuejs_original_wordmark_logo_icon_146305.png'

export default {
  name: 'Commands',
  props: {
    orders: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogView: false,
    isMobile: false,
    headers: [
      { title: 'Commande', align: 'start', sortable: false, key: 'number' },
      { title: 'Date', key: 'createdAt' },
      { title: 'Total', key: 'total' },
      { title: 'Paiement', key: 'paymentMethod' },
      { title: 'Statut', key: 'statut' },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      number: '',
      total: '0',
      createdAt: '',
      paymentMethod: '',
      statut: '',
      produits: []
    },
    defaultItem: {
      number: '',
      total: '0',
      createdAt: '',
      paymentMethod: '',
      statut: '',
      produits: []
    }
  }),
  computed: {
    ...mapGetters(['user']),
    formTitle() {
      if (this.editedIndex === -1) return ''
      return this.dialogView
        ? `Détails de la commande ${this.editedItem.number}`
        : 'Modifier une commande'
    },
    normalizedProducts() {
      const products = Array.isArray(this.editedItem?.produits) ? this.editedItem.produits : []
      return products.map((product) => ({
        id: product?.id || `product-${Math.random()}`,
        name: product?.name || 'Produit',
        quantity: Number(product?.quantity) || 1,
        price: Number(product?.price) || 0,
        image: product?.image || FALLBACK_IMAGE
      }))
    },
    productCount() {
      return this.normalizedProducts.length
    },
    timelineSteps() {
      const orderTime = this.editedItem?.createdAt || 'Aujourd’hui'
      const userName = [this.user?.nom, this.user?.prenom].filter(Boolean).join(' ') || 'Client'
      const status = (this.editedItem?.statut || '').toString().toLowerCase()

      const steps = [
        {
          title: 'Commande créée',
          description: `${userName} a validé la commande #${this.editedItem.number || '--'}.`,
          time: orderTime,
          active: true
        },
        {
          title: 'Paiement confirmé',
          description: `Paiement ${this.editedItem.paymentMethod || 'sécurisé'} accepté avec succès.`,
          time: orderTime,
          active: true
        },
        {
          title: 'Préparation en cours',
          description: 'Les articles sont en cours de vérification et d’emballage.',
          time: orderTime,
          active: status !== 'annulé'
        },
        {
          title: status === 'livré' ? 'Commande livrée' : 'Livraison planifiée',
          description:
            status === 'livré'
              ? 'Le colis a bien été livré à l’adresse indiquée.'
              : 'L’expédition sera mise à jour dès la prise en charge par le transporteur.',
          time: orderTime,
          active: status === 'livré'
        }
      ]

      if (status === 'annulé') {
        steps.splice(2, 2, {
          title: 'Commande annulée',
          description: 'La commande a été annulée avant son expédition.',
          time: orderTime,
          active: true
        })
      }

      return steps
    }
  },
  watch: {
    dialog(val) {
      if (!val) this.close()
    },
    dialogDelete(val) {
      if (!val) this.closeDelete()
    },
    dialogView(val) {
      if (!val) this.closeView()
    }
  },
  mounted() {
    this.updateViewportMode()
    window.addEventListener('resize', this.updateViewportMode)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateViewportMode)
  },
  methods: {
    updateViewportMode() {
      this.isMobile = window.innerWidth < 960
    },
    formatCurrency(value) {
      const amount = Number(value) || 0
      return `${amount.toFixed(2)} €`
    },
    statusChipClass(status) {
      const normalized = (status || '').toString().toLowerCase()
      if (normalized === 'livré') return 'status-chip status-success'
      if (normalized === 'en cours') return 'status-chip status-primary'
      if (normalized === 'en attente') return 'status-chip status-warning'
      if (normalized === 'annulé') return 'status-chip status-danger'
      return 'status-chip status-neutral'
    },
    statusClass(status) {
      return this.statusChipClass(status)
    },
    editItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    viewItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogView = true
    },
    deleteItemConfirm() {
      if (this.editedIndex > -1) {
        this.orders.splice(this.editedIndex, 1)
      }
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeView() {
      this.dialogView = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.orders[this.editedIndex], this.editedItem)
      } else {
        this.orders.push(this.editedItem)
      }
      this.close()
    },
    cancelCom() {
      if (this.editedIndex > -1) {
        this.orders[this.editedIndex].statut = 'Annulé'
        this.editedItem.statut = 'Annulé'
      }
      this.closeView()
    }
  }
}
</script>

<style scoped>
.orders-shell {
  display: grid;
  gap: 1rem;
}

.orders-head {
  padding: 1rem 1.05rem;
  animation: fade-slide-up 420ms var(--ease) both;
}

.orders-kicker {
  margin: 0 0 .25rem;
  font-size: .74rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--primary);
}

.orders-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: .55rem;
  flex-wrap: wrap;
  font-size: clamp(1.1rem, 2vw, 1.55rem);
  color: var(--text);
}

.orders-count {
  min-width: 28px;
  height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: #fff;
  font-size: .82rem;
}

.orders-subtitle {
  margin: .4rem 0 0;
  color: var(--text-soft);
}

.orders-table-wrap {
  overflow: hidden;
  padding: .3rem;
  animation: fade-slide-up 520ms var(--ease) both;
}

.orders-table :deep(.v-table),
.orders-table :deep(.v-data-table),
.orders-table :deep(.v-data-table__wrapper),
.orders-table :deep(table) {
  background: transparent !important;
  color: var(--text) !important;
}

.orders-table :deep(thead tr) {
  background: color-mix(in srgb, var(--surface-muted) 88%, var(--primary) 5%);
}

.orders-table :deep(th) {
  color: var(--text-soft) !important;
  font-size: .78rem;
  font-weight: 800 !important;
  letter-spacing: .04em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border) !important;
}

.orders-table :deep(td) {
  color: var(--text) !important;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 88%, transparent) !important;
  background: transparent !important;
}

.orders-table :deep(tbody tr) {
  transition: background-color var(--ease), transform var(--ease);
}

.orders-table :deep(tbody tr:hover) {
  background: color-mix(in srgb, var(--surface-muted) 82%, var(--primary) 4%) !important;
}

.orders-table :deep(.v-data-table__wrapper) {
  overflow-x: auto;
}

.orders-table :deep(.v-data-table-footer) {
  background: transparent !important;
  color: var(--text-soft) !important;
  border-top: 1px solid var(--border) !important;
}

.order-ref-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: .34rem .7rem;
  background: color-mix(in srgb, var(--primary) 12%, var(--surface));
  border: 1px solid color-mix(in srgb, var(--primary) 18%, var(--border));
  color: var(--text);
  font-weight: 700;
}

.order-total {
  color: #0f8a4b;
}

.order-payment {
  color: var(--text-soft);
}

.action-group {
  display: flex;
  align-items: center;
  gap: .35rem;
}

.icon-action {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--ease), border-color var(--ease), color var(--ease);
}

.icon-action:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
  color: var(--primary);
}

.icon-action.primary {
  color: var(--primary);
}

.icon-action.danger:hover,
.danger-outline {
  color: #dc2626;
}

.status-chip {
  font-weight: 700;
  border: none !important;
}

.status-success {
  background: rgba(34, 197, 94, 0.12) !important;
  color: #15803d !important;
}

.status-primary {
  background: rgba(37, 99, 235, 0.12) !important;
  color: #1d4ed8 !important;
}

.status-warning {
  background: rgba(245, 158, 11, 0.12) !important;
  color: #b45309 !important;
}

.status-danger {
  background: rgba(220, 38, 38, 0.12) !important;
  color: #b91c1c !important;
}

.status-neutral {
  background: rgba(100, 116, 139, 0.12) !important;
  color: #475569 !important;
}

.empty-state {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-soft);
}

.dialog-title {
  font-weight: 800;
  color: var(--text);
}

.order-detail-dialog {
  background: var(--bg);
}

.detail-shell {
  padding: 1rem;
  display: grid;
  gap: 1rem;
  animation: fade-slide-up 380ms var(--ease) both;
}

.detail-hero {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border));
  border-radius: calc(var(--radius-md) + 2px);
  background: linear-gradient(155deg, var(--surface), color-mix(in srgb, var(--surface-muted) 82%, var(--primary) 8%));
  box-shadow: var(--shadow-sm);
  padding: 1rem;
}

.detail-kicker {
  margin: 0 0 .25rem;
  font-size: .74rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--primary);
}

.detail-title {
  margin: 0;
  font-size: clamp(1.15rem, 2.2vw, 1.7rem);
  color: var(--text);
}

.detail-subtitle {
  margin: .45rem 0 0;
  max-width: 64ch;
  color: var(--text-soft);
}

.detail-hero-meta {
  display: grid;
  gap: .6rem;
  justify-items: end;
}

.detail-hero-total {
  font-size: 1.25rem;
  color: var(--text);
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, .9fr);
  gap: 1rem;
}

.overview-card,
.items-card,
.timeline-card {
  padding: 1rem;
}

.overview-card {
  grid-column: 1 / -1;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .75rem;
}

.overview-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  padding: .8rem;
  display: grid;
  gap: .2rem;
}

.overview-label {
  font-size: .78rem;
  color: var(--text-soft);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .8rem;
  margin-bottom: .8rem;
}

.section-head h4 {
  margin: 0;
  color: var(--text);
  font-size: 1rem;
}

.section-head span {
  color: var(--text-soft);
  font-size: .8rem;
}

.order-products {
  display: grid;
  gap: .75rem;
}

.order-product-row {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  gap: .75rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  padding: .7rem;
}

.order-product-image {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  object-fit: cover;
  background: var(--surface);
}

.order-product-main {
  min-width: 0;
  display: grid;
  gap: .2rem;
}

.order-product-name {
  color: var(--text);
}

.order-product-meta {
  color: var(--text-soft);
  font-size: .82rem;
}

.order-product-side {
  text-align: right;
  color: var(--text);
}

.timeline-list {
  display: grid;
  gap: .75rem;
}

.timeline-row {
  position: relative;
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  gap: .7rem;
}

.timeline-row:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 18px;
  bottom: -14px;
  width: 2px;
  background: var(--border);
}

.timeline-dot {
  width: 14px;
  height: 14px;
  margin-top: .22rem;
  border-radius: 999px;
  background: #cbd5e1;
  box-shadow: 0 0 0 4px rgba(148, 163, 184, 0.12);
}

.timeline-row.active .timeline-dot {
  background: var(--primary);
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.12);
}

.timeline-content {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  padding: .75rem .8rem;
}

.timeline-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .8rem;
  margin-bottom: .2rem;
}

.timeline-topline strong {
  color: var(--text);
}

.timeline-topline span,
.timeline-content p {
  color: var(--text-soft);
  font-size: .82rem;
}

.timeline-content p {
  margin: 0;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: .6rem;
  flex-wrap: wrap;
}

.detail-btn {
  min-height: 42px;
  border-radius: 999px;
}

@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 959.98px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .overview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-hero {
    flex-direction: column;
  }

  .detail-hero-meta {
    width: 100%;
    justify-items: start;
  }
}

@media (max-width: 767.98px) {
  .orders-head,
  .orders-table-wrap,
  .detail-shell,
  .overview-card,
  .items-card,
  .timeline-card {
    padding: .85rem;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .order-product-row {
    grid-template-columns: 56px minmax(0, 1fr);
  }

  .order-product-image {
    width: 56px;
    height: 56px;
    border-radius: 14px;
  }

  .order-product-side {
    grid-column: 2;
    text-align: left;
  }

  .timeline-topline {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-actions {
    justify-content: stretch;
  }

  .detail-btn,
  .danger-outline {
    width: 100%;
  }
}
</style>
