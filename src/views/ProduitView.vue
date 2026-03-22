<template>
  <div class="admin-page">
    <div class="admin-shell">
      <div class="admin-topbar">
        <div class="admin-header">
          <h1>Produits</h1>
          <nav>Dashboard / <strong>Produit</strong></nav>
        </div>
        <button @click="addCategory" class="btn-add">+ Ajouter un produit</button>
      </div>
      <div class="admin-card">
        <div class="table-toolbar">
          <div class="search-bar">
            <span class="search-icon">🔍</span>
            <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Rechercher un produit…" />
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Qté</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="produit in paginatedCategories" :key="produit.id">
                <td>{{ produit.id }}</td>
                <td><img :src="produit.image" alt="produit" class="row-img" /></td>
                <td>{{ produit.nameproduit }}</td>
                <td class="td-desc">{{ produit.description }}</td>
                <td>{{ produit.quantite }}</td>
                <td>{{ produit.namecategorie }}</td>
                <td>
                  <button @click="editCategory(produit.id)" class="icon-btn"><img src="@/assets/boutton_modifier.png" alt="Modifier" /></button>
                  <button @click="deleteCategory(produit.id)" class="icon-btn"><img src="@/assets/boutton_supprimer.png" alt="Supprimer" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">«</button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            :class="{ active: page === currentPage }"
          >{{ page }}</button>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">»</button>
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
          { id: 7, image: '/uploads/trico2.png', nameproduit: "T-shirt bleu", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' },
          { id: 13, image: '/uploads/pantalon2.png', nameproduit: "Pantalon-cargo", description: "cvvvvvv", quantite: "23", namecategorie: 'Pantalon' },
          { id: 27, image: '/uploads/robe2.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'Robe' },
          { id: 921, image: '/uploads/lunette2.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'Accessoire' },
          { id: 14, image: '/uploads/robe2.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' },
          { id: 35, image: '/uploads/trico2.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' },
          { id: 67, image: '/uploads/trico2.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' },
          { id: 88, image: '/uploads/trico2.png', nameproduit: "dhdhdgd", description: "cvvvvvv", quantite: "23", namecategorie: 'T-shirt' }
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
  <style scoped>
  .admin-page {
    max-width: 1100px;
    margin: 2.5rem auto;
    padding: 0 1rem;
  }
  .admin-shell {
    background: var(--surface-muted);
    border-radius: var(--radius-lg);
    padding: 2rem;
    border: 1px solid var(--border);
  }
  .admin-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .admin-header h1 { margin: 0 0 .2rem; font-size: 1.6rem; color: var(--text); }
  .admin-header nav { font-size: .85rem; color: var(--text-soft); }

  .btn-add {
    padding: .55rem 1.2rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;
  }
  .btn-add:hover { background: var(--primary-strong); }

  .admin-card {
    background: var(--surface);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border);
  }

  .table-toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.25rem;
  }
  .search-bar {
    display: flex;
    align-items: center;
    gap: .5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: .45rem .75rem;
    background: var(--bg-alt);
    width: min(100%, 300px);
  }
  .search-bar input {
    border: none;
    outline: none;
    background: transparent;
    color: var(--text);
    width: 100%;
    font-size: .9rem;
  }

  .table-wrap { overflow-x: auto; }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    background: var(--surface-muted);
    color: var(--text-soft);
    font-size: .8rem;
    text-transform: uppercase;
    letter-spacing: .04em;
    padding: .65rem .75rem;
    text-align: center;
    border-bottom: 2px solid var(--border);
  }
  td {
    padding: .7rem .75rem;
    text-align: center;
    border-bottom: 1px solid var(--border);
    color: var(--text);
    font-size: .9rem;
    vertical-align: middle;
  }
  tr:hover td { background: var(--surface-muted); }
  .td-desc {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .row-img { width: 44px; height: 44px; object-fit: cover; border-radius: 6px; }

  .icon-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: .25rem;
  }
  .icon-btn img { width: 28px; height: 28px; }

  .pagination {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: .4rem;
    margin-top: 1.25rem;
  }
  .pagination button {
    padding: .45rem .85rem;
    background: var(--surface-muted);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: .875rem;
    transition: background var(--ease);
  }
  .pagination button:hover:not(:disabled) { background: var(--primary); color: #fff; border-color: var(--primary); }
  .pagination button.active { background: var(--primary); color: #fff; border-color: var(--primary); }
  .pagination button:disabled { opacity: .45; cursor: not-allowed; }

  @media (max-width: 640px) {
    .admin-page  { margin: 1rem auto; }
    .admin-shell { padding: 1rem; }
    .admin-card  { padding: .75rem; }
    .table-toolbar { justify-content: stretch; }
    .search-bar { width: 100%; }
  }
  </style>
  