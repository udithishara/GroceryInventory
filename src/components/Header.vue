<template>
  <header class="flex justify-end h-10">
    <div class="relative">
      <router-link to="profile">
        <img
          class="h-8 w-8 rounded-full"
          src="../assets/profile.png"
          alt="Logged In Profile Picture"
        />
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>
