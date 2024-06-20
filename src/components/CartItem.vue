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
            <div class="oval-button-group">
              <button @click="decrementQuantity" class="btn-simple oval-button">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button @click="incrementQuantity" class="btn-simple oval-button">+</button>
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
      this.$emit('removeItem');
      // Fermer le modal après suppression
      this.$store.dispatch('removeFromPanier', item.id);
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

.oval-button-group {
  border-radius: 20px;
  background-color: #f0f0f0;
  margin: 0 10px;
  padding: 5px;
}

.oval-button {
  width: 50px; /* Largeur du bouton */
  height: 20px; /* Hauteur du bouton */
  font-size: 1.2em; /* Taille du texte du bouton */
  margin: 0 2px 0 5px; /* Réduit l'espace à droite du bouton */
}
</style>
