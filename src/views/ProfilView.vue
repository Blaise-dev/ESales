<template>
    <div class="categorie-form">
      <div class="partie-grise">
        <div class="header">
          <h1>Profil</h1>
          <nav>Dashboard / Profil / <strong>Ajouter Profil</strong></nav>
        </div>
        <div class="partie-blanche">
          <div class="form-actions">
            <div class="form-group2">
              <label for="lastName" class="custom-label">Nom</label>
              <input type="text" class="taille-case" v-model="lastName" id="lastName" placeholder="Entrez le nom" />
            </div>
            <div class="form-group2">
              <label for="firstName" class="custom-label">Prénom</label>
              <input type="text" class="taille-case" v-model="firstName" id="firstName" placeholder="Entrez le prénom" />
            </div>
          </div>
          <div class="form-group2">
            <label for="email" class="custom-label">Email</label>
            <input type="email" class="taille-case" v-model="email" id="email" placeholder="Entrez l'émail" />
          </div>
          <div class="form-group">
            <label for="image" class="custom-label">Photo</label>
            <input type="file" class="color" @change="handleImageUpload" id="image" />
            <div class="image-actions">
              <a href="#" @click.prevent="clearImage" class="red">Vider</a>
            </div>
          </div>
          <div class="form-actions">
            <button class="cancel" @click="changerMotDePasse">Changer le mot de passe</button>
            <button class="submit" @click="annuler">Annuler</button>
            <button class="submit" @click="modifier">Modifier</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        lastName: '',
        firstName: '',
        email: '',
        image: null
      };
    },
    methods: {
      handleImageUpload(event) {
        this.image = event.target.files[0];
      },
      clearImage() {
        this.image = null;
        document.getElementById('image').value = '';
      },
      changerMotDePasse() {
        // Logique pour changer la page (ex: redirection)
        this.$router.push('/change-password');
      },
      annuler() {
        this.lastName = '';
        this.firstName = '';
        this.email = '';
        this.image = null;
      },
      async modifier() {
        // Créez un objet FormData pour envoyer les données, y compris le fichier image
        let formData = new FormData();
        formData.append('lastName', this.lastName);
        formData.append('firstName', this.firstName);
        formData.append('email', this.email);
        if (this.image) {
          formData.append('image', this.image);
        }
  
        try {
          // Effectuer une requête HTTP POST ou PUT pour envoyer les données
          const response = await axios.post('https://votre-api-url.com/profil', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert('Modifications enregistrées avec succès!');
          console.log(response.data);
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement des modifications:', error);
          alert('Erreur lors de l\'enregistrement des modifications');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .categorie-form {
    max-width: 1000px;
    margin: 50px auto;
    padding: 40px;
  }
  
  .partie-grise {
    background-color: #f0f0f0;
    padding: 30px;
    border-radius: 35px;
    width: 100%;
    height: 700px;
  }
  
  .partie-blanche {
    background-color: white;
    padding: 40px;
    border-radius: 25px;
    height: 550px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    margin-bottom: 20px;
    text-align: left;
    padding-left: 36px;
  }
  
  .taille-case {
    width: 20%;
  }
  
  .custom-label {
    display: block;
    margin-bottom: 8px;
    font-weight: normal;
    font-size: 14px;
    color: #333;
  }
  
  .form-group2 {
    margin-bottom: 20px;
    text-align: left;
    width: 400px;
  }
  
  .form-group input,
  .form-group2 input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .image-actions {
    margin-top: 10px;
  }
  
  .color {
    color: #007bff;
  }
  
  .image-actions a {
    margin-right: 10px;
    text-decoration: none;
    color: #007bff;
  }
  
  .image-actions .red {
    color: red;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 50px;
  }
  
  .form-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .form-actions .cancel {
    background-color: #f8d7da;
    color: #a1222e;
  }
  
  .form-actions .submit {
    background-color: #e2e3e5;
    color: #495057;
  }
  </style>
  