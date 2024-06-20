<script setup>
import { mapGetters } from 'vuex'
</script>

<template>
  <br />
  <div class="header">
    <div class="header-content">
      <p>Paiement accepté</p>
    </div>
  </div>
  <div class="droite">
    <RouterLink to="/" class="back-link">
      <img src="/src/assets/Retour.png" alt="Retour" class="back-link-icon" />
      Retour à la page d'accueil
    </RouterLink>
  </div>
  <div class="container">
    <br />
    <br />
    <div class="content">
      <h2 class="custom-header">Merci pour votre commande !</h2>
      <p>Commande Confirmée : #56</p>
      <p class="custom-header1">
        Merci d'avoir commandé chez E-Sales. Votre commande a été reçue et est en cours de
        traitement.
      </p>

      <div class="order-summary">
        <h2 class="section-title">
          <img class="section-title img" src="/src/assets/Résumé.png" alt="Order Summary Icon" />
          Récapitulatif de votre commande :
        </h2>
        <ul class="circle-list">
          <li v-for="produit in this.panier">
            {{ produit.name }} - Quantité: {{ produit.quantity }} - Prix: {{ produit.price }} €
          </li>
          <li>Sous-total: {{ getSubtotal }} €</li>
          <li>Frais de livraison: 5,00 €</li>
          <li>Total: {{ getTotalPrice }}€</li>
        </ul>
      </div>

      <div class="delivery-info">
        <h2 class="section-title">
          <img class="section-title img" src="/src/assets/livraison.png" alt="Delivery Info Icon" />
          Informations de livraison :
        </h2>
        <ul class="circle-list">
          <li>Adresse: 123 Rue de l'Exemple, 75000 Paris, France</li>
          <li>Méthode de livraison: Livraison standard</li>
          <li>Date estimée de livraison: 5 juin 2024</li>
        </ul>
      </div>

      <div class="contact-info">
        <h2 class="section-title">
          <img class="section-title img" src="/src/assets/contactez.png" alt="Contact Info Icon" />
          Contactez-nous :
        </h2>
        <ul class="circle-list">
          <li>Service clientèle: serviceclient@estores.com | +33 1 23 45 67 89</li>
          <li>Heures d'ouverture: Lundi à Vendredi - 9:00 à 18:00</li>
          <li>
            Un e-mail de confirmation a été envoyé à votre adresse. Si vous avez des questions,
            n'hésitez pas à nous contacter.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPaiement',
  computed: {
    getSubtotal() {
      return this.panier.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    getTax() {
      return this.getSubtotal * 0.2 // Calcul de la taxe à 20%
    },
    getTotalPrice() {
      return this.getSubtotal + this.getTax + 5
    },
    ...mapGetters(['panier'])
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
}

.container {
  width: 400%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 0px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #28a745; /* Vert pour correspondre à l'image */
  color: #fff; /* Texte en blanc */
  padding: 15px 20px;
  border-radius: 5px 5px 0 0;
}

.header-content {
  flex: 1;
  text-align: center;
}

.header p {
  margin: 0;
  font-weight: bold;
}

.back-link {
  font-weight: bold; /* Met le texte en gras */
  display: inline-block;
  text-align: right;
  right: 20px; /* Ajustez cette valeur selon vos besoins */
  top: 20px; /* Ajustez cette valeur selon vos besoins */
  text-decoration: none;
  color: black; /* Ajustez la couleur selon vos besoins */
}

.back-link:hover {
  text-decoration: underline;
}

.content h1 {
  color: #333333;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.content p {
  color: #666666;
  margin-bottom: 10px;
}

.order-summary,
.delivery-info,
.contact-info {
  background-color: #f8f9fa;
  padding: 15px;
  border: 8px solid #e0e0e0;
  border-radius: 0px;
  margin-bottom: 20px;
  width: 800px;
}

.order-summary h2,
.delivery-info h2,
.contact-info h2 {
  color: #333333;
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.order-summary ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 10px 0;
}

.order-summary ul li {
  color: #666666;
  margin-bottom: 5px;
}

.footer {
  text-align: center;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  margin-top: 20px;
}

.custom-header {
  font-weight: bold; /* Met le texte en gras */
  font-size: 40px; /* Ajustez la taille de la police selon vos besoins */
}

.custom-header1 {
  font-size: 12px;
}

.section-title img {
  margin-right: 8px; /* Espace entre l'icône et le texte */
  width: 24px; /* Taille de l'icône */
  height: 24px; /* Taille de l'icône */
}
.section-title img {
  margin-right: 20px; /* Espace entre l'icône et le texte */
  width: 40px; /* Taille de l'icône */
  height: 40px; /* Taille de l'icône */
}
.back-link:hover {
  text-decoration: underline;
}

.back-link-icon {
  margin-right: 8px; /* Espace entre l'icône et le texte */
  width: 24px; /* Taille de l'icône */
  height: 24px; /* Taille de l'icône */
}
.droite {
  text-align: right;
}
</style>
