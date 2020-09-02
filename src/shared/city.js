import * as utils from './utils.js'
import * as config from './config.js'

export default class City {
    constructor(fid, pos) {
        this.fid = fid
        this.pos = pos
		this.tiles = []

		this.tile_income = utils.item_arr()
		this.values = utils.item_arr(1)
    }
	get_balance() {
		return config.city_base_income
	}
	get_needs() {
		return config.city_base_need
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