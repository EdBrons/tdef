import * as utils from './utils.js'
import * as config from './config.js'

export default class City {
    constructor(g, fid, pos) {
		// this.g = g
        this.fid = fid
        this.pos = pos
		this.tiles = []

		this.wealth = 200

		this.tile_income = utils.item_arr()
		this.values = config.city_base_needs.concat([])
    }
	get_supply() {
		return config.city_base_income
	}
	get_needs() {
		return config.city_base_needs
	}
	update() {
		let b = []
		let s = this.get_supply()
		let n = this.get_needs()
		for (let i = 0; i < config.resource_count; i++) {
			b[i] = s[i] - n[i]
		}
		for (let i = 0; i < config.resource_count; i++) {
			if (b[i] < 0) {
				this.values[i]++
			}
			if (b[i] > 0) {
				this.values[i]--
			}
			this.values[i] = Math.max(this.values[i], .01)
			this.values[i] = Math.min(this.values[i], 10000)
		}
	}
	get_price_of(i) {
		return this.values[i] * this.wealth / 100
	}
	add_tile(v) {
		this.tiles.push(v)
		this.tile_income[utils.resource_at(v)]++
	}
	remove(v) {
		this.tiles.splice(this.tiles.indexOf(v), 1)
		this.tile_income[utils.resource_at(v)]--
	}
}
