<template>
  <div class="mb-3">
    <h1 class="text-3xl font-bold">{{ this.heading }}</h1>
    <p class="text-sm text-gray-500 font-bold">
      {{ this.subHeading }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    heading: {
      type: String,
      required: true
    },
    subHeading: {
      type: String,
      required: false
    }
  }
}
</script>
