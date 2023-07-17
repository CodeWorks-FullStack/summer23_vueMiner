<template>
  <header>
    <!-- NOTE injects all of the code from our Navbar.vue and injects it here -->
    <Navbar />
  </header>
  <main>
    <!-- NOTE works with the vue-router to inject different "views" inside of main based on our url. See the router.js for more info. Will default to our HomePage.vue if the url has no extra parameters -->
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks!!!
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
