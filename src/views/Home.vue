<template>
  <section>
    <Heading
      heading="Updated On"
      :subHeading="this.getFormatedLastUpdatedDate"
    />

    <div class="relative mb-3">
      <input
        v-model="searchQuery"
        type="search"
        name="serch"
        placeholder="Search"
        autocomplete="off"
        class="bg-white w-full h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
      <span class="absolute right-0 top-0 my-3 mr-4">
        <svg
          class="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style="enable-background:new 0 0 56.966 56.966;"
          xml:space="preserve"
          width="512px"
          height="512px"
        >
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
          />
        </svg>
      </span>
    </div>

    <ItemCard v-for="item in filteredItems" :key="item.docUid" :item="item" />
  </section>
</template>

<script>
import { itemsCollection } from '@/firebase'
import ItemCard from '@/components/ItemCard'
import Heading from '@/components/Heading'

export default {
  name: 'Home',
  data() {
    return {
      items: [],
      singleItem: null,
      searchQuery: ''
    }
  },
  components: {
    Heading,
    ItemCard
  },
  created() {
    try {
      itemsCollection.orderBy('expiresOn', 'asc').onSnapshot(querySnap => {
        this.items = querySnap.docs.map(doc => {
          let itemData = doc.data()
          itemData['docUid'] = doc.id
          return itemData
        })
      })

      itemsCollection
        .orderBy('boughtOn', 'desc')
        .limit(1)
        .onSnapshot(querySnap => {
          this.singleItem = querySnap.docs.map(doc => {
            return doc.data().boughtOn.toDate()
          })
        })
    } catch (error) {
      console.log(error.message)
    }
  },
  computed: {
    getFormatedLastUpdatedDate() {
      return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full'
      }).format(new Date(this.singleItem))
    },
    filteredItems() {
      if (this.searchQuery) {
        return this.items.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every(v => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.items
      }
    }
  }
}
</script>
