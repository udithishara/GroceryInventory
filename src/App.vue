<template>
  <div id="app" class="flex min-h-screen bg-gray-200 text-gray-800">
    <div class="p-4 w-full pb-16">
      <Header />
      <router-view />
    </div>
    <Nav />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Nav,
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  margin-bottom: 1rem;
}

Item {
  display: block;
}
</style>
