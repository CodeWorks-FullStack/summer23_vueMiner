import { AppState } from "../AppState.js"

class CheeseService {
  mineCheese() {
    AppState.cheese++

    AppState.upgrades.forEach(upgrade => {
      if (upgrade.isTypeClick) {
        AppState.cheese += upgrade.multiplier * upgrade.quantity
      }
    })
  }

  buyUpgrade(upgrade) {
    upgrade.quantity++
    AppState.cheese -= upgrade.price
    upgrade.price *= 2
  }

  applyAuto() {
    AppState.upgrades.forEach(upgrade => {
      if (!upgrade.isTypeClick) {
        AppState.cheese += upgrade.quantity * upgrade.multiplier
      }
    })
  }

}

export const cheeseService = new CheeseService()