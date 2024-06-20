<template>
    <div class="categorie-form">
      <div class="partie-grise">
        <div class="header">
          <h1>Profil</h1>
          <nav>Dashboard / Profil / <strong>Mot de passe</strong></nav>
        </div>
        <div class="partie-blanche">
          <div class="taille-formule">
            <br><br>
            <div class="form-group">
              <label for="currentPassword" class="custom-label">
                Mot de passe actuel <span class="required">*</span>
              </label>
              <input type="password" v-model="currentPassword" id="currentPassword" required />
            </div>
  
            <div class="form-group">
              <label for="newPassword" class="custom-label">
                Nouveau mot de passe <span class="required">*</span>
              </label>
              <input type="password" v-model="newPassword" id="newPassword" required />
            </div>
  
            <div class="form-group">
              <label for="confirmPassword" class="custom-label">
                Confirmer mot de passe <span class="required">*</span>
              </label>
              <input type="password" v-model="confirmPassword" id="confirmPassword" required />
            </div>
  
            <br><br>
            <div class="form-actions">
              <button class="cancel" @click="annuler">Annuler</button>
              <button class="submit" @click="validatePasswords">Modifier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    },
    methods: {
      annuler() {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      validatePasswords() {
        if (this.newPassword !== this.confirmPassword) {
          alert("Les nouveaux mots de passe ne correspondent pas.");
        } else {
          // Effectuez les autres actions nécessaires pour changer le mot de passe
          alert("Mot de passe changé avec succès.");
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
  
  .header {
    margin-bottom: 20px;
    text-align: left;
    padding-left: 36px;
  }
  
  .header h1 {
    margin: 0;
    font-size: 28px;
  }
  
  .header nav {
    font-size: 14px;
    color: #666;
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
  
  .form-group {
    margin-bottom: 30px;
    text-align: left;
    padding-left: 36px;
    width: 620px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .form-actions {
    display: flex;
    justify-content: center;
    gap: 30px;
  }
  
  .form-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .form-actions .cancel {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .form-actions .submit {
    background-color: #e2e3e5;
    color: #495057;
  }
  
  .taille-formule {
    height: 4000px;
  }
  
  .custom-label {
    font-weight: normal;
    font-size: 16px;
    color: #918888;
    font-stretch: condensed;
  }
  
  .required {
    color: red;
    font-weight: bold;
  }
  </style>
  