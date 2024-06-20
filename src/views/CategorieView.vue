<template>
    <div class="categorie-form">
      <div class="partie-grise">
          <div class="ajustement-enface">
            <div class="header">
              <h1>Catégorie</h1>
              <nav>Dashboard / <strong>Catégorie</strong> </nav>
            </div>
            <button @click="addCategory" class="add-category">Ajouter catégorie</button>
           </div>
        <div class="partie-blanche">
          <div id="app">
            <div class="search-bar">
              <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Rechercher" />
              <span class="search-icon">🔍</span>
            </div>
        <div class="controle-table">
            <table >
              <thead >
                <tr >
                  <th class="ajustement-center">Id</th>
                  <th class="ajustement-center">Icone</th>
                  <th class="ajustement-center">Catégorie</th>
                  <th class="ajustement-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in paginatedCategories" :key="category.id">
                  <td class="ajustement-center">{{ category.id }}</td>
                  <td class="ajustement-center"><img :src="category.icon" alt="Icone" class="icon taille-img" /></td>
                  <td class="ajustement-center">{{ category.name }}</td>
                  <td class="ajustement-center">
                    <button @click="editCategory(category.id)" class="edit-btn"><img class="taille-img" src="/src/assets/boutton_modifier.png"></button>
                    <button @click="deleteCategory(category.id)" class="delete-btn"><img class="taille-img" src="/src/assets/boutton_supprimer.png"></button>
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
        categories: [
          { id: 7, icon: '/src/assets/itrico.png', name: 'T-shirt', class:"taille-img"},
          { id: 13, icon: '/src/assets/ipantalon.png', name: 'Pantalon',class:"taille-img" },
          { id: 27, icon: '/src/assets/irobe.png', name: 'Jupe',class:"taille-img" },
          { id: 921, icon: '/src/assets/ichapeau.png', name: 'Chapeau',class:"taille-img" },
          { id: 14, icon: 'path/to/robe.png', name: 'Robe' ,class:"taille-img"},
          { id: 35, icon: 'path/to/blouse.png', name: 'Blouse', class:"taille-img" },
          { id: 67, icon: 'path/to/chemise.png', name: 'Chemise', class:"taille-img" },
          { id: 88, icon: 'path/to/pull.png', name: 'Pull', class:"taille-img" }
        ],
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 4
      };
    },
    computed: {
      filteredCategories() {
        return this.categories.filter(category =>
          category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
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
        this.categories = this.categories.filter(category => category.id !== id);
      },
      editCategory(id) {
        alert('Edit category with id: ' + id);
      },
      addCategory() {
        alert('Add new category');
      }
    },
    mounted() {
      // Fetch categories from API if needed
      // axios.get('/api/categories')
      //   .then(response => {
      //     this.categories = response.data;
      //   });
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
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
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
    margin-top: 50px;
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
  .ajustement-enface{
    display: flex;
    gap: 500px;
  }
  .controle-table{
    border: none; /* Supprime les bordures des côtés */
  
  }
 
  .taille-img{
    width: 50px;
    height: 50px;
  }
  .ajustement-center{
    text-align: center;
    border: none; /* Supprime les bordures des côtés */
  border-bottom: 1px solid #ddd; /* Ajoute une bordure seulement en bas */
  padding: 8px; /* Espacement interne des cellules */
  text-align: center; /* Alignement du texte au centre */
     border-collapse: separate;
  }
  </style>
  