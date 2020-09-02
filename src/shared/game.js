import * as utils from './utils.js'
import * as config from './config.js'

import map from '../shared/map.js'
import resources from '../shared/resources.js'

import City from './city.js'
import Unit from './unit.js'
import Player from './player.js'
import { ActionMove } from './action.js'

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
				this.tile_fac[y][x] = config.no_owner
			}
		}

		this.actions = []

        this.init()
    }
    init() {
        config.city_locations.forEach(c_loc => {
            let x = c_loc[0]
            let y = c_loc[1]
            let fid = this.fidx++

            let player = new Player(fid, config.faction_colors.pop())
            let city = new City(fid, utils.vec(x, y))
			let u = this.make_unit(fid, city.pos, config.unit_types.TRADER)
			this.set_faction_at(x, y, city)

			//this.start_move(u, utils.add(u.pos, utils.vec(10, 10)))

            this.players[fid] = player
            this.cities.push(city)
        })
    }
    add_socket(socket) {
        this.sockets.push(socket)
    }
	set_faction_at(x, y, city) {
		this.tile_fac[y][x] = city.fid
		city.add_tile(utils.vec(x, y))
	}
	flatten_tiles() {
		return this.tiles.flat(1)
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
		this.actions.sort((a, b) => a.p - b.p)
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
