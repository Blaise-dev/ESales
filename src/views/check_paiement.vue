<template>
    <div class="container">
      <div class="header">
        <div class="header-content ">
          <p>Paiement accepté</p>
        </div>
      </div>
     
        <a href="#" class="back-link">← Retour à la page d'accueil</a>
     
      <div class="content">
        <h1>Merci pour votre commande !</h1>
        <p>Commande Confirmée : #56</p>
        <p>Merci d'avoir commandé chez EStores. Votre commande a été reçue et est en cours de traitement.</p>
  
        <div class="order-summary">
          <h2>Récapitulatif de votre commande :</h2>
          <ul>
            <li>T-shirt à manches courtes et col en V dégradé pour l'été - Quantité: 1 - Prix: 5,99€</li>
            <li>Class Chemise Décontractée À Manches Chauve-souris À Encolure En V Unie - Quantité: 1 - Prix: 5,52€</li>
            <li>1 Pièce Étagère De Rangement De Cuisine - Quantité: 1 - Prix: 5,10€</li>
            <li>1 pièce Fouet semi-automatique à rotation - Quantité: 1 - Prix: 1,80€</li>
          </ul>
          <p>Sous-total: 50,00€</p>
          <p>Frais de livraison: 5,00€</p>
          <p>Total: 55,00€</p>
        </div>
  
        <div class="delivery-info">
          <h2>Informations de livraison :</h2>
          <p>Adresse: 123 Rue de l'Exemple, 75000 Paris, France</p>
          <p>Méthode de livraison: Livrason standard</p>
          <p>Date estimée de livraison: 5 juin 2024</p>
        </div>
  
        <div class="contact-info">
          <h2>Contactez-nous :</h2>
          <p>Service clientèle: serviceclient@estores.com | +33 1 23 45 67 89</p>
          <p>Heures d'ouverture: Lundi à Vendredi - 9:00 à 18:00</p>
          <p>Un e-mail de confirmation a été envoyé à votre adresse. Si vous avez des questions, n'hésitez pas à nous contacter.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CheckoutPaiement'
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
    width: 80%;
    max-width: 800px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
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
    text-decoration: none;
    color: #131212; /* Texte en blanc */
    font-size: 0.9rem;
    text-align: right

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
  
  .order-summary, .delivery-info, .contact-info {
    background-color: #f8f9fa;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .order-summary h2, .delivery-info h2, .contact-info h2 {
    color: #333333;
    font-size: 1.2rem;
    margin-bottom: 10px;
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
  </style>
  