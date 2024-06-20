<template>
  <div class="categorie-form">
    
    <div class="partie-grise">
      <div class="header">
      <h1>Catégorie</h1>
      <nav>Dashboard / Catégorie / <strong>Ajouter catégorie</strong></nav>
    </div>
      <div class="partie-blanche">
        <div class="taille-formule">
          <br>
          <br>
        <div class="form-group">
          <label for="categorie" class="custom-label">Catégorie</label>
          <input type="text"  v-model="categorie" id="categorie" placeholder="Entrez la catégorie" />
        </div>
        
        <div class="form-group">
          <label for="icone" class="custom-label">Icône</label>
          <input type="text"  v-model="icone" id="icone" placeholder="Entrez l'icône" />
        </div>
        <br>
        <br>
        <div class="form-actions">
          <button class="cancel" @click="annuler">Annuler</button>
          <button class="submit" @click="ajouter">Ajouter</button>
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
      categorie: '',
      icone: ''
    };
  },
  methods: {
    annuler() {
      this.categorie = '';
      this.icone = '';
    },
    ajouter() {
      // Code pour gérer l'ajout de la catégorie
      console.log('Catégorie:', this.categorie);
      console.log('Icône:', this.icone);
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
  justify-content:center;
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
  font-size: 16px; /* Adjust this value as needed */
  color: #918888;
  font-stretch: condensed;
  }
</style>
