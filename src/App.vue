<template>
  <main
    id="app"
    class="bg-gray-200 flex flex-col min-h-screen p-4 pb-16 text-gray-800 w-full"
  >
    <Header />
    <router-view />
    <Nav />
  </main>
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
</style>
