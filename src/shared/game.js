import * as utils from './utils.js'
import * as config from './config.js'

import map from '../shared/map.js'
// import resources from '../shared/resources.js'

import City from './city.js'
import Unit from './unit.js'
import Player from './player.js'

class Tile {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

export class Game {
    constructor() {
        this.tick = 0

        this.sockets = []
        this.players = {}

	this.tiles = new Array(map.height)
	for (let y = 0; y < map.height; y++) {
		this.tiles[y] = new Array(map.width)
		for (let x = 0; x < map.width; x++) {
			this.tiles[y][x] = new Tile(x, y)
		}
	}

	this.actions = []
        this.init()
    }
    init() {

    }
    add_player(name, socket) {
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
        if (this.tick % 100 == 0) {
            // this.cities.forEach(c => c.update())
        }
        
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
		}))

        this.tick++
    }
}
