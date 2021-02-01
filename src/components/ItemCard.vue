<template>
  <div class="col-span-12 sm:col-span-6 md:col-span-3 mb-3 relative">
    <div class="flex flex-row bg-white shadow-sm rounded p-4">
      <div class="flex flex-col flex-grow">
        <div class="text-sm text-gray-500">{{ item.name }}</div>
        <div class="font-bold text-lg">
          Expires in {{ this.formattedExpiresOnDate.time }}
          {{ this.formattedExpiresOnDate.unitOfTime }}
        </div>
      </div>
    </div>
  </div>
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
