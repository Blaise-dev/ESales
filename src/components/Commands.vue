<script setup>
import { mapGetters } from 'vuex'

import ProductCard from '@/components/ProductCard.vue'
</script>
<template>
  <v-data-table :headers="headers" :items="orders" :sort-by="[{ key: 'total', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          >{{ title }}
          <span class="badge badge-dark">{{ this.orders.length }}</span></v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.number" label="N° Com"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.total" label="Total"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.createdAt" label="Date"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.paymentMethod"
                      label="Méthode de paiement"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.statut" label="Statut"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogView" max-width="1300px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-card class="mb-5 p-3" outlined>
                  <v-card-title class="headline text-center mb-4">
                    <v-icon class="mr-2">mdi-receipt</v-icon> Détails de la Commande #{{
                      editedItem.number
                    }}
                  </v-card-title>
                  <v-card-subtitle class="mb-3">
                    <v-row>
                      <v-col cols="6">
                        <v-icon class="mr-2">mdi-cash</v-icon>
                        <strong>Total : </strong>
                        <span class="text-success">{{ editedItem.total }} €</span>
                      </v-col>
                      <v-col cols="6">
                        <v-icon class="mr-2">mdi-calendar</v-icon>
                        <strong>Date de création : </strong>
                        <span class="text-muted">{{ editedItem.createdAt }}</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-icon class="mr-2">mdi-credit-card</v-icon>
                        <strong>Méthode de paiement : </strong>
                        <span class="text-info">{{ editedItem.paymentMethod }}</span>
                      </v-col>
                      <v-col cols="6">
                        <v-icon class="mr-2">mdi-truck</v-icon>
                        <strong>Statut : </strong>
                        <span :class="statusClass(editedItem.statut)">{{ editedItem.statut }}</span>
                      </v-col>
                    </v-row>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-title class="headline mt-4">
                    <v-icon class="mr-2">mdi-basket</v-icon> Articles
                  </v-card-title>
                  <v-list>
                    <v-list-item
                      v-for="(product, index) in editedItem.produits"
                      :key="product.id"
                      class="d-flex align-items-center"
                    >
                      <v-list-item-avatar>
                        <v-img :src="product.image" class="rounded-circle"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ product.name }}</v-list-item-title>
                        <v-list-item-subtitle>
                          <v-icon class="mr-2">mdi-tag</v-icon> {{ product.quantity }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          <v-icon class="mr-2">mdi-currency-eur</v-icon> {{ product.price }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      v-if="index < editedItem.produits.length - 1"
                      :key="'divider-' + index"
                    ></v-divider>
                  </v-list>
                </v-card>
                <v-row>
                  <v-card class="w-100 m-2 pb-5 pl-5 pt-2">
                    <v-card-title>Historique de la commande </v-card-title>
                    <v-timeline class="w-50" density="compact" side="end">
                      <v-timeline-item class="mb-4" dot-color="rgb(190, 190, 190)" size="small">
                        <div
                          class="d-flex justify-space-between flex-grow-1"
                          style="color: rgb(190, 190, 190)"
                        >
                          <v-chip class="ms-0" color="green" size="small" label> Livrée </v-chip>
                          <div>Commande livrée à l'adresse.</div>
                          <div class="flex-shrink-0">15:26 EDT</div>
                        </div>
                      </v-timeline-item>

                      <v-timeline-item class="mb-4" dot-color="rgb(190, 190, 190)" size="small">
                        <div
                          class="d-flex justify-space-between flex-grow-1"
                          style="color: rgb(190, 190, 190)"
                        >
                          <div>Livraison en cours vers votre adresse.</div>
                          <div class="flex-shrink-0">15:25 EDT</div>
                        </div>
                      </v-timeline-item>

                      <v-timeline-item class="mb-4" dot-color="primary" size="small">
                        <div class="d-flex justify-space-between flex-grow-1">
                          <div>
                            <v-chip class="ms-0" color="purple" size="small" label>
                              Processing
                            </v-chip>
                            La commande est en cours de traitement.
                          </div>
                          <div class="flex-shrink-0">15:25 EDT</div>
                        </div>
                      </v-timeline-item>

                      <v-timeline-item class="mb-4" dot-color="grey" size="small">
                        <div class="d-flex justify-space-between flex-grow-1">
                          <div>
                            Confirmation de la commande envoyée par mail à {{ this.user.nom }} ({{
                              this.user.email
                            }}).
                          </div>
                          <div class="flex-shrink-0">15:25 EDT</div>
                        </div>
                      </v-timeline-item>

                      <v-timeline-item class="mb-4" dot-color="grey" size="small">
                        <div class="d-flex justify-space-between flex-grow-1">
                          <div>Le paiement a été accepté.</div>
                          <div class="flex-shrink-0">15:25 EDT</div>
                        </div>
                      </v-timeline-item>

                      <v-timeline-item class="mb-4" dot-color="grey" size="small">
                        <div class="d-flex justify-space-between flex-grow-1">
                          <div>Un paiement de 15.00 euros a été effectué par carte bancaire.</div>
                          <div class="flex-shrink-0">15:25 EDT</div>
                        </div>
                      </v-timeline-item>

                      <v-timeline-item dot-color="grey" size="small">
                        <div class="d-flex justify-space-between flex-grow-1">
                          <div>
                            {{ user.nom }} a crée la commande (d'ordre #{{ editedItem.number }}).
                          </div>
                          <div class="flex-shrink-0">15:25 EDT</div>
                        </div>
                      </v-timeline-item>
                    </v-timeline></v-card
                  >
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="cancelCom">
                Annuler la commande
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="closeView"> Fermer </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon class="me-2" size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      <v-icon size="small" @click="viewItem(item)"> mdi-eye </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogView: false,
    headers: [
      {
        title: 'N° Com',
        align: 'start',
        sortable: false,
        key: 'number'
      },
      { title: 'Date', key: 'createdAt' },
      { title: 'Total (€)', key: 'total' },
      { title: 'Méthode de paiement', key: 'paymentMethod' },
      { title: 'Statut', key: 'statut' },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    input: null,
    nonce: 0,
    editedIndex: -1,
    editedItem: {
      number: '',
      total: '0',
      createdAt: '',
      paymentMethod: '',
      statut: '',
      produits: []
    },
    defaultItem: {
      number: '',
      total: '0',
      createdAt: '',
      paymentMethod: '',
      statut: '',
      produits: []
    }
  }),

  computed: {
    formTitle() {
      if (this.editedIndex === -1) return ''
      else {
        if (this.dialogView) return 'Détails de la commande ' + this.editedItem.number
        else return 'Modifier une commande'
      }
    },

    ...mapGetters(['user'])
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogView(val) {
      val || this.closeView()
    }
  },

  methods: {
    statusClass(status) {
      switch (status) {
        case 'En attente':
          return 'text-warning'
        case 'En cours':
          return 'text-primary'
        case 'Livré':
          return 'text-success'
        case 'Annulé':
          return 'text-danger'
        default:
          return ''
      }
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    viewItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogView = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeView() {
      this.dialogView = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.orders[this.editedIndex], this.editedItem)
      } else {
        this.orders.push(this.editedItem)
      }
      this.close()
    },

    cancelCom() {
      if (this.editedIndex > -1) {
        Object.assign(this.orders[this.editedIndex], this.editedItem)
      } else {
        this.orders.push(this.editedItem)
      }
      this.closeView()
    }
  }
}
</script>

<style>
.v-card-title {
  font-weight: bold;
}

.v-card-subtitle {
  font-size: 1.1rem;
}

.v-list-item-title {
  font-size: 1.2rem;
}

.v-list-item-subtitle {
  color: gray;
}

.v-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
