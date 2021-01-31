<template>
  <div>
    <ItemCard v-for="item in items" :key="item.docUid" :item="item" />
  </div>
</template>

<script>
import firebase from '../firebase'
import ItemCard from '@/components/ItemCard'

export default {
  name: 'ItemsList',
  data() {
    return {
      db: firebase.firestore(),
      items: [],
      firebaseObj: firebase
    }
  },
  components: {
    ItemCard
  },
  created() {
    this.db
      .collection('items')
      .orderBy('boughtOn', 'desc')
      .onSnapshot(querySnap => {
        this.items = querySnap.docs.map(doc => {
          let itemData = doc.data()
          itemData['docUid'] = doc.id
          return itemData
        })
      })
  },
}
</script>
