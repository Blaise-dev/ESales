<template>
  <div class="categorie-form">
    <div class="partie-grise">
      <div class="header">
        <h1>Produit</h1>
        <nav>Dashboard / Produit / <strong>Ajouter produit</strong></nav>
      </div>
      <div class="partie-blanche">
        <div class="form-group2">
          <label for="name" class="custom-label">Nom</label>
          <input
            type="text"
            class="taille-case"
            v-model="name"
            id="name"
            placeholder="Entrez le nom"
          />
        </div>

        <div class="form-group">
          <label for="image" class="custom-label">Image</label>
          <input type="file" class="color" @change="handleImageUpload" id="image" />
          <div class="image-actions">
            <a href="#" @click.prevent="clearImage" class="red">vider</a>
          </div>
        </div>

        <div class="form-group">
          <label for="description" class="custom-label">Description</label>
          <textarea
            v-model="description"
            id="description"
            placeholder="Entrez la description"
          ></textarea>
        </div>

        <div class="form-actions2">
          <div class="form-group3">
            <select v-model="category" id="category" class="custom-select">
              <option disabled value="">Catégorie</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="form-group3">
            <select v-model="quantity" id="quantity" class="custom-select">
              <option disabled value="">Quantité</option>
              <option v-for="qty in quantities" :key="qty" :value="qty">{{ qty }}</option>
            </select>
          </div>
        </div>
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
        name: '',
        image: null,
        description: '',
        category: '',
        quantity: '',
        categories: ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'],
        quantities: ['1', '2', '3', '4', '5']
      };
    },
    methods: {
      handleImageUpload(event) {
        this.image = event.target.files[0];
      },
      addImage() {
        // Logic to handle adding an image
        console.log('Ajouter image');
      },
      clearImage() {
        this.image = null;
        document.getElementById('image').value = '';
      },
      annuler() {
        this.name = '';
        this.image = null;
        this.description = '';
        this.category = '';
        this.quantity = '';
      },
      ajouter() {
        // Logic to handle adding the product
        alert("Ceci est une alerte !");
        console.log('Nom:', this.name);
        console.log('Image:', this.image);
        console.log('Description:', this.description);
        console.log('Catégorie:', this.category);
        console.log('Quantité:', this.quantity);
      }
    }
  }

</script>

<style scoped>
.product-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

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
.form-actions2 {
  display: flex;
  justify-content: left;
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
.taille-case {
  width: 20%;
}
.custom-select {
  width: 100%;
  padding: 10px;
  height: 50px;
  border: 1px solid #ddd;
  background-color: #e2e3e5;
  color: #333;
  font-size: 15px;
  font-weight: normal;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: left;
}

.custom-select option {
  padding: 10px;
}
</style>
