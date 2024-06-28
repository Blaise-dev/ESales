<script setup>
import { mapGetters } from 'vuex'
import apiClient from '@/api'
import Commands from '@/components/Commands.vue'
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-list>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :class="{ active: activeSection === item.id }"
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

      <v-col cols="9">
        <v-card v-if="activeSection === 'summary'" id="summary">
          <v-card-text>
            <v-row>
              <v-col cols="2">
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
              <v-col cols="8">
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
                  <v-icon>mdi-check-circle-outline</v-icon>
                  Aucune commande effectuée pour le moment.
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card v-if="activeSection === 'orders'" id="orders">
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

        <v-card class="pb-5" v-if="activeSection === 'addresses'" id="addresses">
          <div class="d-flex justify-content-around">
            <v-card-title class="w-50">Adresses </v-card-title
            ><v-btn class="mt-2" color="primary" @click="openModal()">Ajouter une adresse</v-btn>
          </div>

          <!-- Card d'adresse -->
          <v-card class="my-2" v-for="address in addresses" :key="address.id">
            <v-card-title
              >{{ address.fullName }}
              <v-icon class="ml-5 w-50" color="blue">mdi-truck-delivery</v-icon></v-card-title
            >
            <v-card-subtitle>{{ address.phoneNumber }}</v-card-subtitle>
            <v-card-text>
              <p>Email: {{ address.email }}</p>
              <p>Ville: {{ address.city }}</p>
              <p>Adresse: {{ address.address }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="openModal(address)">Edit</v-btn>
              <v-btn text @click="removeAddress(address.id)" color="red">Remove</v-btn>
            </v-card-actions>
          </v-card>

          <!-- Modale -->
          <v-dialog v-model="showModal" persistent max-width="500px">
            <v-card>
              <v-card-title class="headline">
                {{ isEditing ? 'Modifier une adresse' : 'Ajouter une adresse' }}
              </v-card-title>

              <v-card-text>
                <v-form @submit.prevent="saveAddress">
                  <v-text-field
                    v-model="currentAddress.fullName"
                    label="Nom complet"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="currentAddress.phoneNumber"
                    label="Numéro de téléphone"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="currentAddress.email"
                    label="Email"
                    required
                  ></v-text-field>
                  <v-text-field v-model="currentAddress.city" label="Ville" required></v-text-field>
                  <v-text-field
                    v-model="currentAddress.address"
                    label="Adresse"
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
          <v-form class="w-25 mx-auto p-3" @submit.prevent="validatePasswords">
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
          <v-form class="w-25 mx-auto p-3" @submit.prevent>
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
      addresses: null,
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
  },
  methods: {
    async fetchAddresses() {
      try {
        const response = await apiClient.get(`/addresses`)
        const data = response.data
        this.addresses = data
      } catch (error) {
        // Gérer les erreurs de requête
        console.error('Erreur de connexion:', error)
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
    saveAddress() {
      if (this.isEditing) {
        // Update existing address
        const index = this.addresses.findIndex((addr) => addr.id === this.currentAddress.id)
        if (index !== -1) {
          this.$set(this.addresses, index, this.currentAddress)
        }
      } else {
        // Add new address
        this.currentAddress.id = this.addresses.length + 1 // Simulate an ID
        this.addresses.push(this.currentAddress)
      }
      this.closeModal()
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
    removeAddress(address) {},

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
  background-color: #343a40;
  color: white;
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
}
</style>
