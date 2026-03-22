<template>
  <div class="admin-page">
    <div class="admin-shell">
      <div class="admin-header">
        <h1>Produit</h1>
        <nav>Dashboard / Produit / <strong>Ajouter produit</strong></nav>
      </div>
      <div class="admin-card">
        <div class="field-group">
          <label for="name" class="custom-label">Nom du produit <span class="required">*</span></label>
          <input type="text" class="field-input" v-model="name" id="name" placeholder="Ex : T-shirt bleu" />
        </div>

        <div class="field-group">
          <label for="description" class="custom-label">Description</label>
          <textarea class="field-input field-textarea" v-model="description" id="description" placeholder="Décrivez le produit…" rows="3"></textarea>
        </div>

        <div class="field-group">
          <label for="image" class="custom-label">Image</label>
          <input type="file" accept="image/*" @change="handleImageUpload" id="image" />
          <div class="image-actions">
            <a href="#" @click.prevent="clearImage" class="link-red">Vider</a>
          </div>
        </div>

        <div class="selects-row">
          <div class="field-group">
            <label for="category" class="custom-label">Catégorie</label>
            <select v-model="category" id="category" class="field-input">
              <option disabled value="">Choisir une catégorie</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="field-group">
            <label for="quantity" class="custom-label">Quantité</label>
            <select v-model="quantity" id="quantity" class="field-input">
              <option disabled value="">Choisir une quantité</option>
              <option v-for="qty in quantities" :key="qty" :value="qty">{{ qty }}</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn-ghost" @click="annuler">Annuler</button>
          <button class="btn-submit" @click="ajouter">Ajouter le produit</button>
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
.admin-page {
  max-width: 720px;
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
.field-textarea { resize: vertical; min-height: 90px; }

.selects-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.image-actions { margin-top: .5rem; }
.link-red { color: #e05252; font-size: .85rem; text-decoration: none; }
.link-red:hover { text-decoration: underline; }

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
  .selects-row { grid-template-columns: 1fr; }
  .form-actions { justify-content: stretch; }
  .form-actions button { flex: 1 1 100%; }
}
</style>
