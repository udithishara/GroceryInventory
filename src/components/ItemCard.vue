<template>
  <Item>
    {{ item.name }}: Expires in {{ this.formattedExpiresOnDate.time }}
    {{ this.formattedExpiresOnDate.unitOfTime }}
  </Item>
</template>

<script>
import timeFromNow from '@/utils/timeFromNow'

export default {
  name: 'ItemCard',
  props: {
    item: {
      Type: Object,
      Required: true
    }
  },
  computed: {
    formattedExpiresOnDate() {
      return timeFromNow(this.item.expiresOn.toDate())
    }
  }
}
</script>
