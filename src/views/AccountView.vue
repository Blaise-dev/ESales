<script setup>
import { mapGetters } from 'vuex'
import apiClient from '@/api'
import Commands from '@/components/Commands.vue'
</script>

<template>
  <v-container class="account-page">
    <v-row class="account-layout">
      <v-col cols="12" md="3">
        <v-list class="account-nav surface-card">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :class="['account-nav-item', { active: activeSection === item.id }]"
            @click="setActiveSection(item.id)"
            class="my-2"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="mr-5">{{ item.icon }}</v-icon> {{ item.title }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="9">
        <v-card v-if="activeSection === 'summary'" id="summary">
          <v-card-text>
            <v-row class="account-summary-row">
              <v-col cols="12" md="3" class="account-avatar-col">
                <v-img
                  :src="user.photo"
                  aspect-ratio="2"
                  class="position-relative w-100 h-100"
                  :class="{ 'opacity-0': isLoading }"
                ></v-img>
                <div class="position-relative">
                  <v-file-input
                    accept="image/*"
                    ref="fileInput"
                    style="display: none"
                    @change="handleFileChange"
                  ></v-file-input>
                  <v-btn
                    icon
                    color="primary"
                    class="position-absolute bottom-0 end-0 ml-5 mt-5"
                    @click="openFileInput"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-progress-circular
                    v-if="isLoading"
                    indeterminate
                    color="primary"
                    class="position-absolute top-50 start-50 translate-middle"
                  ></v-progress-circular>
                </div>
              </v-col>
              <v-col cols="12" md="9">
                <v-card-title class="font-weight-bold"> Salut {{ user.prenom }} </v-card-title>
                <p class="ml-4 text-grey">
                  Depuis ton tableau de bord, tu peux
                  <router-link @click="setActiveSection('orders')" to=""
                    >voir tes commandes</router-link
                  >, gérer ton
                  <router-link @click="setActiveSection('addresses')" to=""
                    >adresse de facturation</router-link
                  >
                  et ton
                  <router-link @click="setActiveSection('addresses')" to=""
                    >adresse de livraison</router-link
                  >
                  et
                  <router-link @click="setActiveSection('change-password')" to=""
                    >modifier ton mot de passe</router-link
                  >
                  et les
                  <router-link @click="setActiveSection('account-settings')" to=""
                    >détails de ton compte</router-link
                  >.
                </p>
                <v-alert type="info">
                  <span v-if="orders.length">
                    <v-icon>mdi-check-circle-outline</v-icon>
                    Vous avez {{ orders.length }} commandes effectuées.</span
                  >
                  <span v-else>Aucune commande effectuée pour le moment.</span>
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card v-if="activeSection === 'orders'" id="orders" class="account-section-card orders-section surface-card" flat>
          <Commands :orders="orders" title="Ma listes de commandes"></Commands>
        </v-card>

        <v-card v-if="activeSection === 'account-settings'" id="account-settings">
          <v-card-title>Paramètres de Compte</v-card-title>
          <!-- Contenu des paramètres de compte -->
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <v-card>
              <v-card-text>
                <v-text-field
                  v-model="form.nom"
                  :rules="nameRules"
                  label="Nom"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="form.prenom"
                  :rules="nameRules"
                  label="Prénom"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  label="Email"
                  required
                  type="email"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Mettre à jour mes coordonnées</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-card>

        <v-card class="pb-5 account-section-card addresses-section surface-card" v-if="activeSection === 'addresses'" id="addresses" flat>
          <div class="addresses-header">
            <div class="addresses-heading-block">
              <p class="section-kicker">Carnet d'adresses</p>
              <v-card-title class="addresses-title">Adresses enregistrées</v-card-title>
              <p class="addresses-subtitle">Gérez vos adresses de livraison et de facturation dans une interface plus claire, adaptée au thème.</p>
            </div>
            <v-btn class="addresses-add-btn mt-2" color="primary" variant="flat" @click="openModal()">Ajouter une adresse</v-btn>
          </div>

          <div v-if="!addresses.length" class="addresses-empty surface-card">
            <v-icon size="22" class="me-2">mdi-map-marker-off-outline</v-icon>
            Aucune adresse enregistrée pour le moment.
          </div>

          <div v-else class="addresses-grid">
            <article class="address-card surface-card" v-for="address in addresses" :key="address.id">
              <div class="address-card-head">
                <div>
                  <h3 class="address-name">{{ address.fullName }}</h3>
                  <p class="address-phone">{{ address.phoneNumber }}</p>
                </div>
                <span class="address-badge">
                  <v-icon size="16">mdi-truck-delivery-outline</v-icon>
                  Livraison
                </span>
              </div>

              <div class="address-details">
                <p><strong>Email</strong><span>{{ address.email }}</span></p>
                <p><strong>Ville</strong><span>{{ address.city }}</span></p>
                <p><strong>Adresse</strong><span>{{ address.address }}</span></p>
              </div>

              <div class="address-actions">
                <v-btn variant="text" color="primary" @click="openModal(address)">Modifier</v-btn>
                <v-btn variant="text" color="error" @click="removeAddress(address.id)">Supprimer</v-btn>
              </div>
            </article>
          </div>

          <!-- Modale -->
          <v-dialog v-model="showModal" persistent max-width="500px">
            <v-card class="address-modal surface-card">
              <v-card-title class="headline">
                {{ isEditing ? 'Modifier une adresse' : 'Ajouter une adresse' }}
              </v-card-title>

              <v-card-text>
                <v-form @submit.prevent="saveAddress">
                  <v-text-field
                    v-model="currentAddress.fullName"
                    label="Nom complet"
                    variant="outlined"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="currentAddress.phoneNumber"
                    label="Numéro de téléphone"
                    variant="outlined"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="currentAddress.email"
                    label="Email"
                    variant="outlined"
                    required
                  ></v-text-field>
                  <v-text-field v-model="currentAddress.city" label="Ville" variant="outlined" required></v-text-field>
                  <v-text-field
                    v-model="currentAddress.address"
                    label="Adresse"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeModal">Annuler</v-btn>
                <v-btn color="primary" @click="saveAddress">{{
                  isEditing ? 'Enregistrer' : 'Ajouter'
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>

        <v-card v-if="activeSection === 'change-password'" id="change-password">
          <v-card-title>Modifier le mot de passe</v-card-title>
          <v-divider></v-divider>
          <v-form class="account-password-form mx-auto p-3" @submit.prevent="validatePasswords">
            <br />
            <v-text-field
              v-model="currentPassword"
              label="Mot de passe actuel"
              type="password"
              required
              outlined
              :error="error"
              :error-messages="errorMsgPass"
            ></v-text-field>

            <br />

            <v-text-field
              v-model="newPassword"
              label="Nouveau mot de passe"
              type="password"
              required
              outlined
              dense
              :error="errorNewPass"
              :error-messages="errorMsgNewPass"
            ></v-text-field>

            <br />

            <v-text-field
              v-model="confirmPassword"
              label="Confirmer mot de passe"
              type="password"
              required
              outlined
              dense
              :error="errorNewPass"
              :error-messages="errorMsgNewPass"
            ></v-text-field>

            <v-btn class="mr-4 mt-5" color="error" @click="annuler">Annuler</v-btn>
            <v-btn class="mt-5" type="submit" color="primary">Modifier</v-btn>
          </v-form>
        </v-card>

        <v-card v-if="activeSection === 'delete-account'" id="delete-account">
          <v-card-title>Supprimer le compte</v-card-title>
          <v-divider></v-divider>
          <!-- Contenu pour supprimer le compte -->

          <br />
          <v-form class="account-password-form mx-auto p-3" @submit.prevent>
            <v-text-field
              v-model="confirmDeletePassword"
              label="Mot de passe"
              type="password"
              required
              outlined
              :error="error"
              :error-messages="errorMsgPass"
            ></v-text-field>
            <!-- Bouton de suppression du compte -->
            <v-btn block color="red" @click="confirmDeleteAccount">Supprimer mon compte</v-btn>
          </v-form>

          <!-- Boîte de dialogue de confirmation -->
          <v-dialog v-model="showConfirmDialog" max-width="500">
            <v-card>
              <v-card-title class="headline">Confirmation</v-card-title>
              <v-card-text>
                Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="showConfirmDialog = false">Annuler</v-btn>
                <v-btn color="red" text @click="deleteAccount">Confirmer</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      showConfirmDialog: false,
      isEditing: false,
      isLoading: false, // State variable for loading,
      currentAddress: {
        id: null,
        fullName: '',
        phoneNumber: '',
        email: '',
        city: '',
        address: ''
      },
      valid: false,
      form: {
        nom: '',
        prenom: '',
        email: ''
      },
      nameRules: [
        (v) => !!v || 'Le champ est requis',
        (v) => v.length >= 2 || 'Le nom doit contenir au moins 2 caractères'
      ],
      emailRules: [
        (v) => !!v || 'Le champ est requis',
        (v) => /.+@.+\..+/.test(v) || 'E-mail doit être valide'
      ],
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      confirmDeletePassword: '',
      activeSection: 'summary',
      addresses: [],
      menuItems: [
        { title: 'Résumé', icon: 'mdi-home', id: 'summary' },
        { title: 'Commandes', icon: 'mdi-cart', id: 'orders' },
        { title: 'Paramètres de Compte', icon: 'mdi-cog', id: 'account-settings' },
        { title: 'Adresses', icon: 'mdi-map-marker', id: 'addresses' },
        { title: 'Modifier le mot de passe', icon: 'mdi-pencil', id: 'change-password' },
        { title: 'Supprimer le compte', icon: 'mdi-delete', id: 'delete-account' }
      ],
      fileInput: null, // Pour stocker l'élément d'entrée de fichier
      orders: [], // Les commandes devraient être récupérées depuis une API ou une source de données
      error: false,
      errorNewPass: false,
      errorMsgPass: '',
      errorMsgNewPass: ''
    }
  },
  created() {
    this.updateActiveSectionFromHash()
    this.fetchAddresses()
    this.fetchCommands()
    this.form = { ...this.user } // Pré-remplir le formulaire avec les valeurs de l'utilisateur
    this.addresses = Array.isArray(this.user?.addresses) ? [...this.user.addresses] : []
  },
  methods: {
    syncAddressesToUser() {
      if (!this.user) return
      const updatedUser = {
        ...this.user,
        addresses: [...this.addresses]
      }
      this.$store.dispatch('setUser', updatedUser)
    },
    async fetchAddresses() {
      try {
        const response = await apiClient.get(`/addresses`)
        const data = response.data
        const allAddresses = Array.isArray(data) ? data : []

        const byUserId = allAddresses.filter(
          (address) => String(address.userId ?? '') === String(this.user?.id ?? '')
        )

        const byEmail = allAddresses.filter(
          (address) =>
            !address.userId &&
            String(address.email ?? '').toLowerCase() === String(this.user?.email ?? '').toLowerCase()
        )

        const fallbackLegacy = !byUserId.length && !byEmail.length ? allAddresses.slice(0, 1) : []

        this.addresses = [...byUserId, ...byEmail, ...fallbackLegacy]
        this.syncAddressesToUser()
      } catch (error) {
        // Gérer les erreurs de requête
        console.error('Erreur de connexion:', error)
        this.addresses = Array.isArray(this.user?.addresses) ? [...this.user.addresses] : []
      }
    },
    async fetchCommands() {
      try {
        // On vérifie si l'email existe dans la base de données
        const response = await apiClient.get('/commandes')
        this.orders = response.data
      } catch (error) {
        // Gérer les erreurs de requête
        this.error = "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        console.error('Erreur de connexion:', error)
      }
    },
    setActiveSection(sectionId) {
      this.activeSection = sectionId
    },
    closeModal() {
      this.showModal = false
    },
    async saveAddress() {
      try {
        const payload = {
          ...this.currentAddress,
          userId: this.user?.id ?? null
        }

        if (this.isEditing) {
          const response = await apiClient.put(`/addresses/${this.currentAddress.id}`, payload)
          const updated = response?.data || payload
          const index = this.addresses.findIndex((addr) => String(addr.id) === String(updated.id))
          if (index !== -1) {
            this.addresses.splice(index, 1, updated)
          }
        } else {
          const response = await apiClient.post('/addresses', payload)
          const created = response?.data || payload
          this.addresses.push(created)
        }

        this.syncAddressesToUser()
        this.closeModal()
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'adresse:', error)
      }
    },
    openModal(address = null) {
      this.showModal = true
      if (address) {
        this.isEditing = true
        this.currentAddress = { ...address }
      } else {
        this.isEditing = false
        this.currentAddress = {
          id: null,
          fullName: '',
          phoneNumber: '',
          email: '',
          city: '',
          address: ''
        }
      }
    },
    async removeAddress(addressId) {
      try {
        await apiClient.delete(`/addresses/${addressId}`)
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'adresse:', error)
      } finally {
        this.addresses = this.addresses.filter((address) => String(address.id) !== String(addressId))
        this.syncAddressesToUser()
      }
    },

    validatePasswords() {
      if (this.currentPassword == '') {
        this.errorNewPass = false
        this.error = true
        this.errorMsgNewPass = ''
        this.errorMsgPass = 'Veuillez renseigner un mot de passe !'
      } else if (
        this.newPassword != '' ||
        this.confirmPassword != '' ||
        this.newPassword !== this.confirmPassword
      ) {
        this.errorNewPass = true
        this.error = false
        this.errorMsgNewPass = 'Veuillez renseigner 2 mots de passe identiques et non vides !'
        this.errorMsgPass = ''
        return
      } else if (this.currentPassword != this.user.password) {
        this.error = true
        this.errorNewPass = false
        this.errorMsgPass = 'Vous avez entré un mauvais mot de passe !'
        this.errorMsgNewPass = ''
      } else {
        this.error = false
        this.errorNewPass = false
        this.errorMsgPass = ''
        this.errorMsgNewPass = ''
      }
    },

    validatePasswordDelete() {
      if (this.confirmDeletePassword != this.user.password) {
        this.error = true
        this.errorNewPass = false
        this.errorMsgPass = 'Vous avez entré un mauvais mot de passe !'
        this.errorMsgNewPass = ''
      } else {
        this.error = false
        this.errorNewPass = false
        this.errorMsgPass = ''
        this.errorMsgNewPass = ''
      }
    },
    annuler() {
      this.currentPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },
    confirmDeleteAccount() {
      this.validatePasswordDelete()
      if (!this.error) this.showConfirmDialog = true
    },
    async deleteAccount() {
      this.showConfirmDialog = false
      try {
        await this.$store.dispatch('deleteAccount', this.user.id)
        this.$router.push('/') // Rediriger l'utilisateur après la suppression du compte
      } catch (error) {
        console.error('Erreur lors de la suppression du compte:', error)
        // Gérer l'erreur (afficher un message d'erreur, etc.)
      }
    },
    openFileInput() {
      this.$refs.fileInput.click() // Ouvre le sélecteur de fichier
    },
    async handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('user', JSON.stringify(this.user))

        this.isLoading = true // Start loading
        try {
          await this.$store.dispatch('updateUser', formData)
        } catch (error) {
          console.error('Error updating user:', error)
        } finally {
          this.isLoading = false // Stop loading
        }
      }
    },
    async submit() {
      if (this.$refs.form.validate()) {
        // Handle form submission
        const formData = new FormData()
        this.form = { ...this.user, ...this.form }
        formData.append('user', JSON.stringify(this.form))
        try {
          await this.$store.dispatch('updateUser', formData)
        } catch (error) {
          console.error('Error updating user:', error)
        } finally {
        }
      }
    },
    updateActiveSectionFromHash() {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        this.activeSection = hash
      } else {
        this.activeSection = 'summary' // Valeur par défaut si aucun hashtag
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.account-page {
  padding-top: 1rem;
  padding-bottom: 1.5rem;
}

.account-layout {
  align-items: flex-start;
}

.account-nav {
  padding: .6rem;
  border: 1px solid var(--border);
  animation: fade-slide-up 420ms var(--ease) both;
}

.account-nav-item {
  border-radius: 14px;
  border: 1px solid transparent;
  color: var(--text);
  transition: transform var(--ease), border-color var(--ease), background-color var(--ease);
}

.account-nav-item:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--primary) 20%, var(--border));
  background: color-mix(in srgb, var(--surface-muted) 82%, var(--primary) 5%);
}

.account-nav-item.active {
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 14%, var(--surface)), color-mix(in srgb, var(--accent) 8%, var(--surface)));
  border-color: color-mix(in srgb, var(--primary) 34%, var(--border));
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.12);
}

.account-section-card {
  border: 1px solid var(--border) !important;
  background: linear-gradient(160deg, var(--surface), color-mix(in srgb, var(--surface-muted) 80%, var(--primary) 5%)) !important;
  box-shadow: var(--shadow-sm) !important;
  animation: fade-slide-up 460ms var(--ease) both;
}

.orders-section,
.addresses-section {
  overflow: hidden;
}

.section-kicker {
  margin: 0 0 .2rem;
  font-size: .74rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--primary);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1040;
}

.modal.fade.show {
  display: block;
  z-index: 1050;
}

.modal-content {
  background-color: var(--surface);
  color: var(--text);
}

.btn-close-white {
  filter: invert(1);
}
.v-card {
  border: 1px solid #ddd;
}
.v-list-item {
  transition: background-color 0.3s;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.v-list-item.active {
  background-color: rgba(0, 0, 0, 0.1); /* Change this to whatever color you prefer */
  border-left: 4px solid #42a5f5; /* Example: add a left border to the active item */
}
.translate-middle {
  transform: translate(-50%, -50%);
}
.headline {
  text-align: center;
  color: var(--text);
}

.account-password-form {
  width: min(520px, 100%);
}

.addresses-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 1rem 1rem .5rem;
}

.addresses-title {
  width: auto !important;
  padding: 0 !important;
  margin: 0;
  color: var(--text);
}

.addresses-icon {
  width: auto !important;
}

.addresses-heading-block {
  max-width: 720px;
}

.addresses-subtitle {
  margin: .35rem 0 0;
  color: var(--text-soft);
}

.addresses-add-btn {
  border-radius: 999px;
  min-height: 42px;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.18);
}

.addresses-empty {
  margin: .5rem 1rem 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  color: var(--text-soft);
}

.addresses-grid {
  padding: .5rem 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.address-card {
  padding: 1rem;
  border: 1px solid var(--border);
  display: grid;
  gap: .9rem;
  animation: fade-slide-up 520ms var(--ease) both;
}

.address-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: .8rem;
}

.address-name {
  margin: 0;
  color: var(--text);
  font-size: 1rem;
  font-weight: 800;
}

.address-phone {
  margin: .25rem 0 0;
  color: var(--text-soft);
  font-size: .84rem;
}

.address-badge {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--primary) 18%, var(--border));
  background: color-mix(in srgb, var(--primary) 10%, var(--surface));
  color: var(--primary);
  padding: .34rem .65rem;
  font-size: .78rem;
  font-weight: 700;
}

.address-details {
  display: grid;
  gap: .55rem;
}

.address-details p {
  margin: 0;
  display: grid;
  gap: .12rem;
}

.address-details strong {
  color: var(--text-soft);
  font-size: .76rem;
  text-transform: uppercase;
  letter-spacing: .05em;
}

.address-details span {
  color: var(--text);
  line-height: 1.5;
}

.address-actions {
  display: flex;
  justify-content: flex-end;
  gap: .35rem;
  flex-wrap: wrap;
}

.address-modal {
  border: 1px solid var(--border) !important;
}

.account-avatar-col {
  max-width: 220px;
}

@media (max-width: 991.98px) {
  .account-summary-row {
    gap: 8px;
  }

  .account-avatar-col {
    max-width: 140px;
    margin: 0 auto;
  }

  .v-list-item-title {
    font-size: 0.95rem;
    line-height: 1.35;
  }

  .v-list-item-title .v-icon {
    margin-right: 10px !important;
  }

  .addresses-title,
  .addresses-icon {
    width: auto !important;
    margin-left: 0 !important;
  }

  .addresses-header {
    justify-content: flex-start !important;
  }

  .addresses-header .v-btn {
    width: 100%;
  }

  .addresses-grid {
    grid-template-columns: 1fr;
  }

  .account-password-form {
    width: 100%;
    padding: 12px !important;
  }
}

@media (max-width: 767.98px) {
  .account-page {
    padding-top: .75rem;
  }

  .addresses-header,
  .addresses-grid {
    padding-left: .85rem;
    padding-right: .85rem;
  }

  .addresses-empty {
    margin-left: .85rem;
    margin-right: .85rem;
  }

  .address-card {
    padding: .9rem;
  }

  .address-card-head {
    flex-direction: column;
  }

  .address-actions .v-btn {
    flex: 1 1 100%;
  }
}
</style>
