<template>
  <main>
    <Heading heading="Add New Item" />

    <form method="post" @submit.prevent="checkForm" class="form relative">
      <input
        type="text"
        name="Search"
        id="groceryItemName"
        v-model="groceryItem.name"
        placeholder="Name"
        autocomplete="off"
        class="bg-white w-full h-10 px-5 pr-10 mb-4 rounded-full text-sm focus:outline-none"
      />

      <input
        type="date"
        class="bg-white w-full h-10 px-5 pr-3 mb-4 rounded-full text-sm focus:outline-none"
        id="groceryItemExpiresOn"
        v-model="groceryItem.expiresOn"
        placeholder="Expires On*"
      />

      <div>
        <input
          type="submit"
          value="Add Item"
          class="bg-gray-900 hover:bg-gray-700 text-white font-light py-2 mb-4 rounded-full w-full focus:outline-none mb-3"
        />
      </div>

      <transition name="fade">
        <div
          v-if="formErrors.length"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
          role="alert"
        >
          <strong class="font-bold">An Error has occured</strong>
          <span
            v-for="(error, i) in formErrors"
            :key="i"
            class="block sm:inline mt-2"
          >
            - {{ error }}
          </span>
        </div>
      </transition>

      <!-- <transition name="fade"> -->
      <div
        v-if="itemSubmitted"
        role="alert"
        class="px-4 py-3 leading-normal text-green-700 bg-green-100 rounded-lg"
      >
        <p class="font-bold">Item has been added</p>
      </div>
      <!-- </transition> -->
    </form>
  </main>
</template>

<script>
import { itemsCollection } from '@/firebase'
import timeFromNow from '@/utils/timeFromNow'
import Heading from '@/components/Heading'

export default {
  name: 'AddNewItem',
  data() {
    return {
      itemSubmitted: false,
      formErrors: [],
      show: true,
      groceryItem: {
        name: '',
        expiresOn: '',
        boughtOn: ''
      }
    }
  },
  components: {
    Heading
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

      await itemsCollection.add(itemInfo).then((this.itemSubmitted = true))
    }
  }
}
</script>
