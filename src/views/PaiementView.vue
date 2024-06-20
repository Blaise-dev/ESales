<script setup>
import { mapGetters } from 'vuex'
</script>

<template>
  <br />
  <br />
  <div class="d-flex align-items-center mb-4 ms-3">
    <div class="d-flex align-items-center mb-4">
      <h3 class="text-primary mb-0" style="margin-left: 200px">Paiement par Carte Bancaire</h3>

      <div class="ms-3">
        <img src="@/assets/VISA.png" alt="VISA" class="payment-icon me-2" />
        <img src="@/assets/MC.png" alt="MasterCard" class="payment-icon me-2" />
        <img src="@/assets/CB.png" alt="CB" class="payment-icon me-2" />
        <img src="@/assets/pay.png" alt="Paylib" class="payment-icon" />
      </div>
    </div>
  </div>
  <h5 class="mb-4" style="margin-left: 500px; font-weight: bold">
    Montant de la transaction : {{ paymentData ? paymentData.price : 0 }} €
  </h5>

  <div class="d-flex justify-content-center">
    <div class="card w-100" style="max-width: 600px">
      <div class="card-body">
        <form class="w-100">
          <h6 class="mb-4 text-primary">
            Veuillez saisir les informations de votre carte de crédit
          </h6>

          <div class="mb-3 position-relative">
            <label for="carte" class="form-label"
              >Numéro de la carte <span class="text-danger">*</span></label
            >
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-credit-card-fill"></i>
              </span>
              <input type="carte" name="carte" class="form-control" id="carte" required />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="phone" class="form-label"
                >Date d'expiration <span class="text-danger">*</span></label
              >
              <input
                type="tel"
                name="phone"
                class="form-control"
                id="phone"
                placeholder="MM/AA"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="phone" class="form-label"
                >cryptogramme visuel <span class="text-danger">*</span></label
              >
              <input
                type="tel"
                name="phone"
                class="form-control"
                id="phone"
                placeholder="***"
                required
              />
            </div>
          </div>

          <!-- Submit button -->
          <div class="d-flex flex-column align-items-center">
            <RouterLink
              to="/Cpaiement"
              data-mdb-button-init
              data-mdb-ripple-init
              class="mb-3 w-50 btn btn-primary btn-lg btn-block"
            >
              <i class="bi bi-check-circle me-2"></i>
              Valider
            </RouterLink>
            <br />

            <RouterLink
              to="/shoppingcart"
              data-mdb-button-init
              data-mdb-ripple-init
              class="mb-3 w-50 btn btn-danger btn-lg btn-block"
              @click="onAbandon"
            >
              <i class="bi bi-x-circle me-2"></i>
              Abandonner
            </RouterLink>
            <div class="mt-4 text-center">
              <i class="bi bi-lock-fill me-2"></i>
              Paiement 100% sécurisé
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ...mapGetters(['paymentData'])
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .payment-icon {
    width: 40px; /* Taille fixe des icônes */
    height: auto; /* Conserver les proportions */
  }

  .d-flex.align-items-center.mb-4.ms-3 {
    margin-left: 2rem; /* Ajustez cette valeur selon vos besoins */
  }

  h4.text-primary.mb-0 {
    margin-right: 2rem; /* Ajustez cette valeur selon vos besoins */
  }
}
</style>
