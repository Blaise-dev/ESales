<template>
    <div class="categorie-form">
      <div class="partie-grise">
        <div class="ajustement-enface">
          <div class="header">
            <h1>Produit</h1>
            <nav>Dashboard / <strong>Produit</strong> </nav>
          </div>
          <button @click="addCategory" class="add-category">Ajouter Produit</button>
        </div>
        <div class="partie-blanche">
          <div id="app">
            <div class="search-bar">
              <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Rechercher" />
              <span class="search-icon">🔍</span>
            </div>
            <div class="controle-table">
              <table>
                <thead>
                  <tr>
                    <th class="ajustement-center">Id</th>
                    <th class="ajustement-center">Image</th>
                    <th class="ajustement-center">Nom</th>
                    <th class="ajustement-center">Description</th>
                    <th class="ajustement-center">Quantité</th>
                    <th class="ajustement-center">Catégorie</th>
                    <th class="ajustement-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="Produit in paginatedCategories" :key="Produit.id">
                    <td class="ajustement-center">{{ Produit.id }}</td>
                    <td class="ajustement-center"><img :src="Produit.image" alt="Icone" class="icon taille-img" /></td>
                    <td class="ajustement-center">{{ Produit.nameproduit }}</td>
                    <td class="ajustement-center">{{ Produit.description }}</td>
                    <td class="ajustement-center">{{ Produit.quantite }}</td>
                    <td class="ajustement-center">{{ Produit.namecategorie }}</td>
                    <td class="ajustement-center">
                      <button @click="editCategory(Produit.id)" class="edit-btn"><img class="taille-img" src="/src/assets/boutton_modifier.png"></button>
                      <button @click="deleteCategory(Produit.id)" class="delete-btn"><img class="taille-img" src="/src/assets/boutton_supprimer.png"></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div class="pagination">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">«</button>
              <button v-for="page in totalPages" :key="page" @click="changePage(page)">
                {{ page }}
              </button>
              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        Produits: [
          { id: 7, image: '/src/assets/trico2.png', nameproduit: "T-shirt bleu", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' },
          { id: 13, image: '/src/assets/pantalon2.png', nameproduit: "Pantalon-cargo", description: "cvvvvvv", quantite: "23", namecategorie: 'Pantalon' },
          { id: 27, image: '/src/assets/robe2.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'Robe' },
          { id: 921, image: '/src/assets/lunette2.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'Accessoire' },
          { id: 14, image: 'path/to/robe.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' },
          { id: 35, image: 'path/to/blouse.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' },
          { id: 67, image: 'path/to/chemise.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' },
          { id: 88, image: 'path/to/pull.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' }
        ],
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 4
      };
    },
    computed: {
      filteredCategories() {
        return this.Produits.filter(Produit =>
          Produit.nameproduit.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      paginatedCategories() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredCategories.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredCategories.length / this.itemsPerPage);
      }
    },
    methods: {
      handleSearch() {
        this.currentPage = 1; // Reset to the first page
      },
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
      deleteCategory(id) {
        this.Produits = this.Produits.filter(Produit => Produit.id !== id);
      },
      editCategory(id) {
        alert('Edit category with id: ' + id);
      },
      addCategory() {
        alert('Add new category');
      }
    }
  };
  </script>
  
  <style>
  #app {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  .search-bar {
    position: relative;
    margin-bottom: 20px;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    padding: 5px;
    display: flex;
    float: right;
    width: 400px;
    margin-bottom: 50px;
  }
  .search-bar input {
    border: none;
    outline: none;
    flex: 1;
  }
  .search-bar .search-icon {
    margin-left: 10px;
    font-size: 18px;
  }
  .add-category {
    margin-bottom: 60px;
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  table {
    width: 100%;
    border-collapse: collapse; /* Fusionne les bordures des cellules */
  }
  th, td {
    border: none; /* Supprime toutes les bordures */
    border-bottom: 1px solid #ddd; /* Ajoute une bordure seulement en bas */
    padding: 8px; /* Espacement interne des cellules */
    text-align: center; /* Alignement du texte au centre */
  }
  .icon {
    width: 32px;
    height: 32px;
  }
  .edit-btn, .delete-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .pagination {
    margin-top: 20px;
    margin-left: 600px;
  }
  .pagination button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px;
    margin: 0 2px;
    cursor: pointer;
  }
  .pagination button:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
  .partie-grise {
    background-color: #f0f0f0;
    padding: 30px;
    border-radius: 35px;
    width: 100%;
    height: 700px;
  }
  .header {
    margin-bottom: 20px;
    text-align: left;
    padding-left: 36px;
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
  .ajustement-enface {
    display: flex;
    gap: 500px;
  }
  .controle-table {
    border: none; /* Supprime les bordures des côtés */
  }
  .taille-img {
    width: 50px;
    height: 50px;
  }
  .ajustement-center {
    text-align: center;
  }
  </style>
  