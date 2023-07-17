<template>
  <div class="container-fluid">
    <div class="row">
      <!-- STUB moved all of this to MoonComponent file -->
      <!-- <div class="col-12 text-center">
        <img @click="mineCheese()" @contextmenu.prevent="mineCheese()" class="img-fluid"
          src="https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1268&q=80"
          alt="moon">
      </div>
      <div class="col-12 text-center fs-2">
        Cheese: {{ cheese }}
      </div> -->


      <!-- NOTE injecting a component inside of our page. Brings in all of the code from our MoonComponent and injects it here  -->
      <MoonComponent />


      <div class="col-12 text-center fs-2">
        <span>
          <!-- NOTE we use double-curlies to inject javascript into our HTML as text-content. clickPower is a computed variable defined in our return object inside of our script tag -->
          Click power: {{ clickPower }}
        </span>
        <!-- NOTE v-if will only render the corresponding HTML element if the conditional supplied is true -->
        <span v-if="autoPower > 0">
          Auto Power: {{ autoPower }}
        </span>
      </div>
      <!-- NOTE v-for will render html for every piece of data stored in an array. The key property should be a unique identifier stored on each piece of data in the array -->
      <div v-for="upgrade in upgrades" :key="upgrade.name" class="col-6 mb-3">
        <!-- NOTE upgrade is defined in our v-for. Every time our v-for iterates, it pulls out the data stored at that index and sets it as the upgrade variable -->
        <h2>{{ upgrade.name.toUpperCase() }} || Multiplier: {{ upgrade.multiplier }}</h2>
        <h3>Qty: {{ upgrade.quantity }}</h3>
        <h3>${{ upgrade.price }}</h3>
        <!-- NOTE :class="{ 'btn-success': upgrade.isTypeClick}" is class binding. This statement will add the key of this object into the classlist if the value in the object evaluates as truthy.  -->
        <!-- NOTE  :disabled="cheese < upgrade.price" will add the disabled property to this button if the supplied condition evaluates as truthy -->
        <button @click="buyUpgrade(upgrade)" class="btn" :disabled="cheese < upgrade.price"
          :class="{ 'btn-success': upgrade.isTypeClick, 'btn-info': !upgrade.isTypeClick, 'fw-bold': upgrade.price > 10 }">Buy
          Upgrade</button>
      </div>
    </div>
  </div>
</template>


<!-- <script>
import { ref } from 'vue'
import { logger } from '../utils/Logger.js'

export default {
  setup() {
    // NOTE private variables/functions

    let cheese = ref(10000000000)
    return {
      // NOTE public variables/functions

      cheese,
      mineCheese() {
        cheese.value++
        logger.log('Cheese went up?', cheese)
      }
    }
  }
}
</script> -->

<script>
import { computed } from 'vue'
import { AppState } from '../AppState.js'
import { cheeseService } from '../services/CheeseService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import MoonComponent from '../components/MoonComponent.vue'

export default {

  setup() {
    // NOTE private variables/functions
    setInterval(cheeseService.applyAuto, 3000);

    // NOTE everything inside of the return object is accessible in the above HTML template
    return {
      // NOTE public variables/functions

      // NOTE this does the same thing as the line below
      // cheese: computed(() => { return AppState.cheese }),

      // NOTE computed is a function from Vue that takes in a function as an argument. That function must return a value, and if this data ever changes in the AppState, it will update here as well. If your function only points towards one value, it returns by default
      cheese: computed(() => AppState.cheese),
      upgrades: computed(() => AppState.upgrades),
      // NOTE the functions that you pass to your computed can be multi-line by supplying curly-brackets after your lamda. DO NOT FORGET to return a value from your function
      clickPower: computed(() => {
        const clickUpgrades = AppState.upgrades.filter(u => u.isTypeClick)
        let total = 1
        clickUpgrades.forEach(u => total += u.multiplier * u.quantity)
        return total
      }),
      autoPower: computed(() => {
        const autoUpgrades = AppState.upgrades.filter(u => !u.isTypeClick)
        let total = 0
        autoUpgrades.forEach(u => total += u.multiplier * u.quantity)
        return total
      }),

      // mineCheese() {
      //   // AppState.cheese++
      //   // logger.log(AppState.cheese)

      //   cheeseService.mineCheese()
      // },
      // NOTE if you want your method to be accessible to the HTML template above, it must be in the return object as well
      buyUpgrade(upgrade) {
        logger.log(upgrade)
        if (upgrade.price > AppState.cheese) {
          Pop.error('Not enough cheese')
          return
        }
        // NOTE still following the MVC design pattern
        cheeseService.buyUpgrade(upgrade)
      }
    }
  },
  // NOTE this is only for making components turn green in our template, not necessary
  components: { MoonComponent }

}
</script>


<style lang="scss" scoped>
// img {
//   max-height: 40vh;
// }
</style>
