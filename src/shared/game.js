import * as utils from './utils.js'

import map from '../shared/map.js'
import resources from '../shared/resources.js'
import fac_colors from './fac_colors.js'

import { city_locations, trade_clock_time, unit_types } from './config.js'
import { ActionMove } from './action.js'

class City {
    constructor(fid, pos) {
        this.fid = fid
        this.pos = pos
		this.wealth = 0
        this.industry = 4
		this.tilewealth = 0
        this.trade_clock = 0
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

			this.start_move(u, utils.add(u.pos, utils.vec(10, 10)))

            this.players[fid] = player
            this.cities.push(city)
        })
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
