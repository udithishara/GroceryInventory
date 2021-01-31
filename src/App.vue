<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Item List</router-link> |
      <router-link to="/add-new">Add New Item</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
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
