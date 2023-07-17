<template>
  <div class="container-fluid">
    <div class="row">
      <!-- <div class="col-12 text-center">
        <img @click="mineCheese()" @contextmenu.prevent="mineCheese()" class="img-fluid"
          src="https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1268&q=80"
          alt="moon">
      </div>
      <div class="col-12 text-center fs-2">
        Cheese: {{ cheese }}
      </div> -->
      <MoonComponent />
      <div class="col-12 text-center fs-2">
        <span>
          Click power: {{ clickPower }}
        </span>
        <span v-if="autoPower > 0">
          Auto Power: {{ autoPower }}
        </span>
      </div>
      <div v-for="upgrade in upgrades" :key="upgrade.name" class="col-6 mb-3">
        <h2>{{ upgrade.name.toUpperCase() }} || Multiplier: {{ upgrade.multiplier }}</h2>
        <h3>Qty: {{ upgrade.quantity }}</h3>
        <h3>${{ upgrade.price }}</h3>
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

    return {
      // NOTE public variables/functions

      // cheese: computed(() => { return AppState.cheese }),
      cheese: computed(() => AppState.cheese),
      upgrades: computed(() => AppState.upgrades),
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
      buyUpgrade(upgrade) {
        logger.log(upgrade)
        if (upgrade.price > AppState.cheese) {
          Pop.error('Not enough cheese')
          return
        }

        cheeseService.buyUpgrade(upgrade)
      }
    }
  },
  components: { MoonComponent }

}
</script>


<style lang="scss" scoped>
// img {
//   max-height: 40vh;
// }
</style>
