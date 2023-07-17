import { reactive } from 'vue'
import { Upgrade } from './models/Upgrade.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  cheese: 100,

  /** @type {import('./models/Upgrade.js').Upgrade[]} */
  upgrades: [
    new Upgrade({ name: 'pickaxe', price: 10, multiplier: 1, isTypeClick: true }),
    new Upgrade({ name: 'drill', price: 20, multiplier: 2, isTypeClick: true }),
    new Upgrade({ name: 'rover', price: 30, multiplier: 1, isTypeClick: false }),
    new Upgrade({ name: 'mousetronaut', price: 40, multiplier: 5, isTypeClick: false }),
  ]
})
