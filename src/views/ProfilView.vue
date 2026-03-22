<template>
  <div class="admin-page">
    <div class="admin-shell">
      <div class="admin-header">
        <h1>Profil</h1>
        <nav>Dashboard / Profil / <strong>Modifier le profil</strong></nav>
      </div>
      <div class="admin-card">
        <div class="fields-row">
          <div class="field-group">
            <label for="lastName" class="custom-label">Nom</label>
            <input type="text" class="field-input" v-model="lastName" id="lastName" placeholder="Entrez le nom" />
          </div>
          <div class="field-group">
            <label for="firstName" class="custom-label">Prénom</label>
            <input type="text" class="field-input" v-model="firstName" id="firstName" placeholder="Entrez le prénom" />
          </div>
        </div>
        <div class="field-group">
          <label for="email" class="custom-label">Email</label>
          <input type="email" class="field-input" v-model="email" id="email" placeholder="Entrez l'email" />
        </div>
        <div class="field-group">
          <label for="image" class="custom-label">Photo de profil</label>
          <input type="file" accept="image/*" @change="handleImageUpload" id="image" />
          <div class="image-actions">
            <a href="#" @click.prevent="clearImage" class="link-red">Vider</a>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn-cancel" @click="changerMotDePasse">Changer le mot de passe</button>
          <button class="btn-ghost" @click="annuler">Annuler</button>
          <button class="btn-submit" @click="modifier">Enregistrer</button>
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
  .admin-page {
    max-width: 860px;
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

  .fields-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .field-group {
    margin-bottom: 1.25rem;
  }

  .custom-label {
    display: block;
    margin-bottom: .45rem;
    font-size: .875rem;
    font-weight: 500;
    color: var(--text-soft);
  }

  .field-input {
    width: 100%;
    padding: .6rem .9rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--bg-alt);
    color: var(--text);
    font-size: .95rem;
    transition: border-color var(--ease), box-shadow var(--ease);
    outline: none;
  }
  .field-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37,99,235,.15);
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

  .btn-cancel {
    padding: .6rem 1.4rem;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    background: rgba(224,82,82,.12);
    color: #c0392b;
    font-size: .9rem;
  }
  .btn-cancel:hover { background: rgba(224,82,82,.22); }

  .btn-ghost {
    padding: .6rem 1.4rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-soft);
    cursor: pointer;
    font-size: .9rem;
  }
  .btn-ghost:hover { background: var(--surface-muted); }

  .btn-submit {
    padding: .6rem 1.6rem;
    border: none;
    border-radius: var(--radius-sm);
    background: var(--primary);
    color: #fff;
    cursor: pointer;
    font-size: .9rem;
    font-weight: 600;
  }
  .btn-submit:hover { background: var(--primary-strong); }

  @media (max-width: 640px) {
    .admin-page { margin: 1rem auto; }
    .admin-shell { padding: 1rem; border-radius: var(--radius-md); }
    .admin-card  { padding: 1rem; border-radius: var(--radius-sm); }
    .fields-row  { grid-template-columns: 1fr; }
    .form-actions { justify-content: stretch; }
    .form-actions button { flex: 1 1 100%; }
  }
  </style>
  