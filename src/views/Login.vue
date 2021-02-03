<template>
  <section>
    <Heading
      heading="Unauthorized"
      subHeading="This page requires you to be logged in"
    />

    <button
      @click="login"
      class="text-white px-4 w-auto h-10 bg-red-700 rounded-full hover:bg-red-900 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="w-6 h-6 inline-block mr-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z"
          fill="currentColor"
        />
      </svg>
      <span>Login with Google</span>
    </button>
  </section>
</template>

<script>
import Heading from '@/components/Heading'
import { auth, GoogleAuthProvider } from '@/firebase'

export default {
  name: 'Login',
  data() {
    return {}
  },
  components: {
    Heading
  },
  methods: {
    login() {
      auth.signInWithPopup(GoogleAuthProvider).then(
        () => {
          this.$router.replace('add-new')
        },
        err => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>
