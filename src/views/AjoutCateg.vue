<template>
  <div class="admin-page">
    <div class="admin-shell">
      <div class="admin-header">
        <h1>Catégorie</h1>
        <nav>Dashboard / Catégorie / <strong>Ajouter catégorie</strong></nav>
      </div>
      <div class="admin-card">
        <div class="field-group">
          <label for="categorie" class="custom-label">Nom de la catégorie <span class="required">*</span></label>
          <input type="text" class="field-input" v-model="categorie" id="categorie" placeholder="Ex : T-shirt, Pantalon…" />
        </div>
        <div class="field-group">
          <label for="icone" class="custom-label">Icône (URL ou emoji)</label>
          <input type="text" class="field-input" v-model="icone" id="icone" placeholder="Ex : /uploads/itrico.png" />
        </div>
        <div class="form-actions">
          <button class="btn-ghost" @click="annuler">Annuler</button>
          <button class="btn-submit" @click="ajouter">Ajouter</button>
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
.admin-page {
  max-width: 640px;
  margin: 2.5rem auto;
  padding: 0 1rem;
}
.admin-shell {
  background: var(--surface-muted);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border);
}
.admin-header { margin-bottom: 1.5rem; }
.admin-header h1 { margin: 0 0 .25rem; font-size: 1.6rem; color: var(--text); }
.admin-header nav { font-size: .85rem; color: var(--text-soft); }

.admin-card {
  background: var(--surface);
  border-radius: var(--radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

.field-group { margin-bottom: 1.25rem; }

.custom-label {
  display: block;
  margin-bottom: .4rem;
  font-size: .875rem;
  color: var(--text-soft);
}
.required { color: #e05252; font-weight: 700; }

.field-input {
  width: 100%;
  padding: .6rem .9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-alt);
  color: var(--text);
  font-size: .95rem;
  outline: none;
  transition: border-color var(--ease), box-shadow var(--ease);
}
.field-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37,99,235,.15);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.75rem;
  flex-wrap: wrap;
}
.btn-ghost {
  padding: .6rem 1.4rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-soft);
  cursor: pointer;
}
.btn-ghost:hover { background: var(--surface-muted); }
.btn-submit {
  padding: .6rem 1.6rem;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--primary);
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}
.btn-submit:hover { background: var(--primary-strong); }

@media (max-width: 640px) {
  .admin-page { margin: 1rem auto; }
  .admin-shell { padding: 1rem; }
  .admin-card  { padding: 1rem; }
  .form-actions { justify-content: stretch; }
  .form-actions button { flex: 1 1 100%; }
}
</style>
