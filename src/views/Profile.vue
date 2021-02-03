<template>
  <section v-if="isLoggedIn">
    <div class="photo-wrapper p-2">
      <img
        class="w-32 h-32 rounded-full mx-auto"
        :src="loggedUserProfilePicture"
        alt="John Doe"
      />
    </div>
    <div class="p-2">
      <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
        {{ loggedUserDisplayName }}
      </h3>

      <div class="text-center my-3">
        <button
          @click="logout"
          class="px-8 py-2 rounded-full bg-red-600 hover:bg-red-600 text-white max-w-max shadow-sm hover:shadow-lg focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { auth } from '@/firebase'

export default {
  name: 'Profile',
  computed: {
    isLoggedIn() {
      return auth.currentUser ? true : false
    },
    loggedUserProfilePicture() {
      return this.isLoggedIn ? auth.currentUser.photoURL : null
    },
    loggedUserDisplayName() {
      return this.isLoggedIn ? auth.currentUser.displayName : null
    }
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace('/')
      })
    }
  }
}
</script>
