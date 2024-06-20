<script setup>
import { mapGetters } from 'vuex'
import apiClient from '@/api'
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
                <v-img :src="this.user.photo" aspect-ratio="1"></v-img>
              </v-col>
              <v-col cols="8">
                <v-card-title class="font-weight-bold"> Salut {{ this.user.prenom }} </v-card-title>
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
          <v-card-title>Commandes</v-card-title>
          <v-data-table :headers="headers" :items="orders" class="elevation-1">
            <template v-slot:no-data>
              <v-alert :value="true" color="info" icon="mdi-alert-circle-outline">
                Aucune commande pour le moment
              </v-alert>
            </template>
          </v-data-table>
        </v-card>

        <v-card v-if="activeSection === 'account-settings'" id="account-settings">
          <v-card-title>Paramètres de Compte</v-card-title>
          <!-- Contenu des paramètres de compte -->
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
          <!-- Contenu pour changer le mot de passe -->
        </v-card>

        <v-card v-if="activeSection === 'delete-account'" id="delete-account">
          <v-card-title>Supprimer le compte</v-card-title>
          <!-- Contenu pour supprimer le compte -->
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
      isEditing: false,
      currentAddress: {
        id: null,
        fullName: '',
        phoneNumber: '',
        email: '',
        city: '',
        address: ''
      },
      activeSection: 'summary',
      addresses: [
        {
          id: 1,
          fullName: 'Théo backbwell',
          phoneNumber: '0622715780',
          email: 'theobackbwell@gmail.com',
          city: 'Rennes',
          address: '20 Avenue des Buttes de Coësmes, Rennes'
        },
        {
          id: 2,
          fullName: 'Naomie Capoela',
          phoneNumber: '0636728790',
          email: 'naomiecapoela@gmail.com',
          city: 'Rennes',
          address: '03 Square de Varsovie, Rennes'
        }
      ],
      menuItems: [
        { title: 'Résumé', icon: 'mdi-home', id: 'summary' },
        { title: 'Commandes', icon: 'mdi-cart', id: 'orders' },
        { title: 'Paramètres de Compte', icon: 'mdi-cog', id: 'account-settings' },
        { title: 'Adresses', icon: 'mdi-map-marker', id: 'addresses' },
        { title: 'Modifier le mot de passe', icon: 'mdi-pencil', id: 'change-password' },
        { title: 'Supprimer le compte', icon: 'mdi-delete', id: 'delete-account' }
      ],
      headers: [
        { text: 'N°Com', value: 'number' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Total', value: 'total' },
        { text: 'Méthode de paiement', value: 'paymentMethod' },
        { text: 'Statut', value: 'status' },
        { text: 'Action', value: 'action' }
      ],
      orders: [] // Les commandes devraient être récupérées depuis une API ou une source de données
    }
  },
  methods: {
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
    removeAddress(address) {}
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
</style>
