<template>
  <div class="card mb-3 cart-item">
    <div class="row no-gutters align-items-center">
      <div class="col-4 col-md-4">
        <img :src="item.image" class="card-img-top img-fluid cart-image" alt="Image de l'article" />
      </div>

      <div class="col-8 col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text"><strong>{{ (item.price * item.quantity).toFixed(2) }} €</strong></p>

          <div class="quantity-controls">
            <div class="oval-group">
              <button @click="decrementQuantity" class="oval-btn" aria-label="Diminuer la quantité">-</button>
              <span class="quantity-text">{{ item.quantity }}</span>
              <button @click="incrementQuantity" class="oval-btn" aria-label="Augmenter la quantité">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="showDeleteConfirm"
      class="delete-dialog-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deleteDialogTitle"
      @click="closeModal"
      @touchmove.prevent
    >
      <div class="delete-dialog-card" @click.stop>
        <h5 id="deleteDialogTitle" class="delete-dialog-title">Supprimer l’article ?</h5>
        <p class="delete-dialog-text">
          Voulez-vous vraiment retirer <strong>{{ item.name }}</strong> du panier ?
        </p>

        <div class="delete-dialog-actions">
          <button type="button" class="btn btn-cancel" @click="closeModal">Annuler</button>
          <button type="button" class="btn btn-delete" @click="confirmDelete">Supprimer</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDeleteConfirm: false
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeyDown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
    this.unlockBodyScroll()
  },
  watch: {
    showDeleteConfirm(value) {
      if (value) {
        this.lockBodyScroll()
      } else {
        this.unlockBodyScroll()
      }
    }
  },
  methods: {
    lockBodyScroll() {
      if (typeof document === 'undefined') return
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    },
    unlockBodyScroll() {
      if (typeof document === 'undefined') return
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    },
    incrementQuantity() {
      this.$emit('updateQuantity', this.item.quantity + 1)
    },
    decrementQuantity() {
      if (this.item.quantity > 1) {
        this.$emit('updateQuantity', this.item.quantity - 1)
      } else {
        this.showDeleteConfirm = true
      }
    },
    onKeyDown(event) {
      if (event.key === 'Escape' && this.showDeleteConfirm) {
        this.closeModal()
      }
    },
    closeModal() {
      this.showDeleteConfirm = false
    },
    confirmDelete() {
      this.$emit('removeItem', this.item.id)
      this.showDeleteConfirm = false
    }
  }
}
</script>

<style scoped>
.cart-item {
  max-width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
  overflow: hidden;
  background: var(--surface);
}

.cart-image {
  width: 100%;
  height: 100%;
  max-height: 120px;
  object-fit: cover;
}

.card-body {
  padding: 10px;
}

.card-title {
  margin-bottom: 0.4rem;
  color: var(--text);
}

.card-text {
  margin-bottom: 0.5rem;
  color: var(--text);
}

.quantity-controls {
  margin-top: 10px;
}

.oval-group {
  display: flex;
  align-items: center;
  background-color: var(--surface-muted);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 5px;
  width: fit-content;
}

.oval-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background-color: var(--surface);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 5px;
}

.oval-btn:active {
  transform: scale(0.97);
}

.quantity-text {
  font-size: 1.05rem;
  min-width: 24px;
  text-align: center;
  color: var(--text);
}

.delete-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

.delete-dialog-card {
  width: min(92vw, 420px);
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-md);
  padding: 1rem;
}

.delete-dialog-title {
  margin: 0 0 0.45rem;
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 800;
}

.delete-dialog-text {
  margin: 0;
  color: var(--text-soft);
  line-height: 1.5;
  font-size: 0.92rem;
}

.delete-dialog-text strong {
  color: var(--text);
}

.delete-dialog-actions {
  margin-top: 0.95rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
}

.btn-cancel,
.btn-delete {
  border-radius: 999px;
  padding: 0.58rem 0.9rem;
  font-weight: 600;
  font-size: 0.86rem;
  min-height: 42px;
  touch-action: manipulation;
}

.btn-cancel {
  border: 1px solid var(--border);
  background: var(--surface-muted);
  color: var(--text-soft);
}

.btn-delete {
  border: 1px solid rgba(220, 53, 69, 0.35);
  background: rgba(220, 53, 69, 0.12);
  color: #c62828;
}

@media (max-width: 575.98px) {
  .delete-dialog-overlay {
    align-items: flex-end;
    padding: .5rem;
  }

  .cart-image {
    max-height: 96px;
  }

  .card-title {
    font-size: 0.95rem;
  }

  .delete-dialog-card {
    width: 100%;
    padding: 0.9rem;
    border-radius: 14px 14px 10px 10px;
    box-shadow: 0 -8px 30px rgba(2, 6, 23, 0.25);
  }

  .delete-dialog-actions {
    grid-template-columns: 1fr;
  }
}
</style>
