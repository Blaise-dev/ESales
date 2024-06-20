<template>
    <div class="categorie-form">
     <div class="partie-grise">
      <div class="header">
      <h1>Role</h1>
      <nav>Dashboard / Role / <strong>Ajouter role</strong></nav>
    </div>
    <div class="partie-blanche">
        <br>
        <br>
        <br>
      <div class="form-group2">
        <label for="name" class="custom-label">Nom</label>
        <input type="text" class="taille-case" v-model="name" id="name" placeholder="Entrez le nom" />
      </div>
  
      <br>
        <br>
        <br>
        <div class="form-actions">
          <button class="cancel" @click="annuler">Annuler</button>
          <button class="submit" @click="ajouter">Ajouter</button>
        </div>
    </div>
  </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: ''
      };
    },
    methods: {
     
      annuler() {
        this.name = ''
      },
      ajouter() {
        // Logic to handle adding the product
        console.log('Nom:', this.name);
      }
    }
  };
  </script>
  
  <style scoped>

  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
    width: 600px;

  }
  .form-group2 {
    margin-bottom: 20px;
    text-align: left;
    width: 400px;

  }
  .form-group3 {
    margin-bottom: 20px;
    text-align: left;
    width: 150px;

  }
  
  .custom-label {
    display: block;
    margin-bottom: 8px;
    font-weight: normal;
    font-size: 14px;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;

  }
  .form-group2 input,
  .form-group2 textarea,
  .form-group2 select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .form-group3 input,
  .form-group3 textarea,
  .form-group3 select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .image-actions {
    margin-top: 10px;
  }
  .color{
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
  .form-actions2 {
    display: flex;
    justify-content:left;
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
  .partie-grise {
  background-color: #f0f0f0;
  padding: 30px;
  border-radius: 35px;
  width: 100% ;
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

.categorie-form {
  max-width: 1000px;
  margin: 50px auto;
  padding: 40px;
 
}
  </style>
  