<template>
  <div class="col-12 text-center">
    <!-- NOTE @click is shorthand for v-on:click, which is how vue handles it's events -->
    <!-- NOTE @contextmenu is the event handler for right-clicking. .prevent is a quicker way of writing out event.preventDefault() -->
    <img @click="mineCheese()" @contextmenu.prevent="mineCheese()" class="img-fluid"
      src="https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1268&q=80"
      alt="moon">
  </div>
  <div class="col-12 text-center fs-2">
    Cheese: {{ cheese }}
  </div>
</template>


<script>
import { computed } from 'vue';
import { cheeseService } from '../services/CheeseService.js';
import { AppState } from '../AppState.js';

export default {
  setup() {
    return {
      cheese: computed(() => AppState.cheese),

      mineCheese() {
        // AppState.cheese++
        // logger.log(AppState.cheese)

        cheeseService.mineCheese()
      },
    }
  }
}
</script>


<style lang="scss" scoped>
// NOTE since this style tag is scoped, it only applies these styles to img tags contained within this .vue file
img {
  max-height: 40vh;
}
</style>