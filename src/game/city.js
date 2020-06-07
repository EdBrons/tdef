import * as settings from './config.js'

export class City {
    constructor() {
        this.population = 1
        this.food = 1
        this.gold = 1
        this.growth_counter = 0
        this.is_starving = false
    }
    get_tax() {
        return this.population * settings.tax_per_pop
    }
    get_food_consumption() {
        return this.population * settings.food_per_pop
    }
    // adds growth to growth counter and updates growth from that
    add_growth(val) {
        this.growth_counter += val
        this.check_growth()
    }
    growth_for_grow() {
        return this.population * settings.growth_cost_factor
    }
    growth_for_shrink() {
        return -1 * this.growth_for_grow()
    }
    // grows or shrinks city if possible
    check_growth() {
        if (this.growth_counter > this.growth_for_grow()) {
            this.grow()
        }
        else if (this.growth_counter < this.growth_for_shrink()) {
            this.shrink()
        }
    }
    grow() {
        this.population++
        this.growth_counter = 0
    }
    shrink() {
        this.population--
        if (this.population < 1) {
            this.population = 1
            this.growth_counter = 0
        }
    }
    get_food_balance() {
        return -this.get_food_consumption()
    }
    // consumes food, and updates growth
    update_growth() {
        let food_balance = this.get_food_balance()
        this.set_starving(food_balance < 0)
        this.add_growth(food_balance)
    }
    set_starving(val) {
        this.is_starving = val
    }
    get_gold_balance() {
        return this.get_tax()
    }
    add_gold(val) {
        this.gold += val
    }
    update_gold() {
        let gold_balance = this.get_gold_balance()
    }
    // updates cities stats, first population, then gold
    update() {
        this.update_growth()
        this.update_gold()
    }
}