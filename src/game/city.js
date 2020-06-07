import * as settings from './config.js'

class City {
    constructor() {
        this.population = 1
        this.food = 1
        this.growth_counter = 0
    }
    get_tax() {
        return this.population * settings.tax_per_pop
    }
    get_food_consumption() {
        return this.population * settings.food_per_pop
    }
    add_growth(val) {
        this.growth_counter += val
    }
    growth_for_grow() {
        return this.population * settings.growth_cost_factor
    }
    growth_for_shrink() {
        return -1 * this.growth_for_grow()
    }
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
            // TODO: what to do if starvation at 1
        }
    }
}