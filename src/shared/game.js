import * as utils from './utils.js'

import map from '../shared/map.js'
import resources from '../shared/resources.js'
import fac_colors from './fac_colors.js'

import { resource_count, city_locations, trade_clock_time, unit_types, no_owner, default_city_resources, city_needs } from './config.js'
import { ActionMove } from './action.js'

class City {
    constructor(fid, pos) {
        this.fid = fid
        this.pos = pos
		this.tiles = []

		//this.resources = new Array(resource_count)
		//this.resources.fill(0)
		this.dir_res_income = default_city_resources
		this.needs = city_needs
		this.value = new Array(resource_count)
		this.value.fill(1)
    }
	update_resources() {
		for (let i = 0; i < resource_count; i++) {
			this.resources[i] += this.dir_res_income[i]
		}
	}
	balance(i) {
		return this.dir_res_income[i]
	}
	update_needs() {
		let d = new Array(resource_count)
		d.fill(0)
		for (let i = 0; i < resource_count; i++) {
			d[i] += Math.max( this.needs[i] - this.balance(i), 0 )
		}
		for (let i = 0; i < resource_count; i++) {
			if (d[i] > 0) {
				this.value[i]++
			}
			else if  (this.value[i] > 1) {
				this.value[i]--
			}
		}
	}
	add_tile(v) {
		this.tiles.push(v)
		this.dir_res_income[utils.resource_at(v)]++
	}
	remove(v) {
		this.tiles.splice(this.tiles.indexOf(v), 1)
		this.dir_res_income[utils.resource_at(v)]--
	}
}

class Unit {
    constructor(id, fid, pos, type) {
        this.id = id
        this.fid = fid
        this.pos = pos
        this.type = type
		this.speed = map.tile_size / 300
    }
}

class Player {
    constructor(fid, color) {
        this.fid = fid
		this.color = color
    }
}

export class Game {
    constructor() {
        this.tick = 0
        this.fidx = 0
        this.uidx = 0

        this.players = {}
        this.sockets = []
        this.cities = []
        this.units = []

		this.tile_fac = new Array(map.height)
		for (let y = 0; y < map.height; y++) {
			this.tile_fac[y] = new Array(map.width)
			for (let x = 0; x < map.width; x++) {
				this.tile_fac[y][x] = no_owner
			}
		}

		this.actions = []

        this.init()
    }
    init() {
        city_locations.forEach(c_loc => {
            let x = c_loc[0]
            let y = c_loc[1]
            let fid = this.fidx++

            let player = new Player(fid, fac_colors.pop())
            let city = new City(fid, utils.vec(x, y))
			let u = this.make_unit(fid, city.pos, unit_types.TRADER)
			this.set_faction_at(x, y, city)

			//this.start_move(u, utils.add(u.pos, utils.vec(10, 10)))

            this.players[fid] = player
            this.cities.push(city)
        })
    }
	set_faction_at(x, y, city) {
		this.tile_fac[y][x] = city.fid
		city.add_tile(utils.vec(x, y))
	}
	flatten_tiles() {
		return this.tiles.flat(1)
	}
	get_fid_tiles(fid) {
		return 
	}
    add_socket(socket) {
        this.sockets.push(socket)
    }
    make_unit(fid, pos, t) {
        let new_unit = new Unit(this.uidx++, fid, pos, t)
        this.units.push(new_unit)
        return new_unit
    }
    remove_unit(u) {
        let i = this.units.indexOf(u)
        if (i == -1) return
        this.units.splice(i, 1)
    }
	start_action(a) {
		this.actions.push(a)
	}
	start_move(u, d) {
		let move = new ActionMove(u, d)
		this.start_action(move)
	}
    update() {
		// update city economy
		if (this.tick % 4 == 0) {
			//this.cities.forEach(c => c.update_resources())
			this.cities.forEach(c => c.update_needs())
		}

		// do actions
		this.actions.forEach(m => m.act())
		this.actions = this.actions.filter(a => !a.done)

		// update the clients
        this.sockets.forEach(s => s.emit('update', {
			tick: this.tick, 
			cities: this.cities, 
			units: this.units, 
			players: this.players, 
			ownership: this.ownership
		}))
        this.tick++
    }
}
