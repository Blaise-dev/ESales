<template>
  <div class="card mb-3 cart-item">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="item.image" class="card-img-top img-fluid" alt="Image de l'article">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text"><strong>{{ (item.price * item.quantity).toFixed(2) }} €</strong></p>
          <div class="quantity-controls">
            <div class="oval-group">
              <button @click="decrementQuantity" class="oval-btn">-</button>
              <span class="quantity-text">{{ item.quantity }}</span>
              <button @click="incrementQuantity" class="oval-btn">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de confirmation -->
  <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmation de suppression</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Êtes-vous sûr de vouloir supprimer cet article du panier ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
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
  methods: {
    incrementQuantity() {
      this.$emit('updateQuantity', this.item.quantity + 1);
    },
    decrementQuantity() {
      if (this.item.quantity > 1) {
        this.$emit('updateQuantity', this.item.quantity - 1);
      } else {
        // Afficher le modal de confirmation si la quantité est 1
        $('#confirmDeleteModal').modal('show');
      }
    },
    closeModal() {
      $('#confirmDeleteModal').modal('hide'); // Ferme le modal
    },
    confirmDelete() {
      // Émettre un événement pour supprimer l'article du panier
      this.$emit('removeItem', this.item.id);
      // Fermer le modal après suppression
      this.$store.dispatch('removeFromPanier', this.item.id);
      $('#confirmDeleteModal').modal('hide');

    }
  }
};
</script>

<style scoped>
.cart-item {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.card-body {
  padding: 10px;
}

.quantity-controls {
  margin-top: 10px;
}

.oval-group {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px;
  width: fit-content; /* Ajuste la largeur au contenu */
}


.oval-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 5px;
}

.quantity-text {
  font-size: 1.2em;
}
</style>
