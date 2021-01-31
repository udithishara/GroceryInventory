<template>
  <main>
    <h1 class="text-center">Add new Item</h1>

    Add New Item

    <form method="post" @submit.prevent="checkForm" class="lead-form">
      <div>
        <label for="groceryItemName" class="sr-only">Name*</label>
        <input
          type="text"
          class="form-control"
          id="groceryItemName"
          v-model="groceryItem.name"
          placeholder="Name*"
        />
      </div>

      <div>
        <label for="groceryItemExpiresOn" class="sr-only">Expires On*</label>
        <input
          type="date"
          class="form-control"
          id="groceryItemExpiresOn"
          v-model="groceryItem.expiresOn"
          placeholder="Expires On*"
        />
      </div>

      <div v-if="formErrors.length">
        <p v-for="(error, i) in formErrors" :key="i">{{ error }}</p>
      </div>

      <div>
        <input type="submit" value="Add Time" />
      </div>
    </form>
  </main>
</template>

<script>
import firebase from '../firebase'
import timeFromNow from '@/utils/timeFromNow'

export default {
  name: 'AddNewItem',
  data() {
    return {
      itemSubmitted: false,
      formErrors: [],
      groceryItem: {
        name: '',
        expiresOn: '',
        boughtOn: ''
      }
    }
  },
  methods: {
    checkForm() {
      this.formErrors = []

      if (!this.groceryItem.name) {
        this.formErrors.push('Item name is required')
      }

      if (!this.groceryItem.expiresOn) {
        this.formErrors.push('Expiration Date is required')
      }

      if (
        this.groceryItem.expiresOn &&
        timeFromNow(this.groceryItem.expiresOn).when === 'past'
      ) {
        this.formErrors.push('Expiry date cannot be in the past')
      }

      // This is a very basic way of checking if fields are validated
      // Ideally this should be more thoroughly validated
      // For now this works
      if (this.formErrors.length === 0) {
        this.submitItem()
      }
    },
    async submitItem() {
      const itemInfo = {
        name: this.groceryItem.name,
        expiresOn: new Date(this.groceryItem.expiresOn),
        boughtOn: new Date()
      }

      await firebase
        .firestore()
        .collection('items')
        .add(itemInfo)
        .then((this.submitItem = true))
    }
  }
}
</script>
