import * as utils from './utils.js'
import * as config from './config.js'

import mapdata from './mapdata.js'
import { Point } from './point.js'

class User {
	constructor(name, socket) {
		this.name = name
		this.socket = socket
	}
}

class Faction {
		constructor(id) {
				this.id = id
		}
}

class Unit {
		constructor(id, f, p) {
				this.id = id
				this.fac = f
				this.pos = p
				this.unit_types = {}
		}
}

class Tile {
	constructor(x, y, t) {
		this.x = x
		this.y = y
		this.terrain = t
		this.tax = 2
		this.buildings = {}

		this.fac = null
		this.unit = null
	}
	set_fac(fid) {
			this.fac = fid
	}
}

export class Map {
		constructor(w, h) {
				this.w = w
				this.h = h
				this.factions = {}
				this.tiles = new Array(h)
				this.units = []
				for (let y = 0; y < h; y++) {
						this.tiles[y] = new Array(w)
						for (let x = 0; x < w; x++) {
								this.tiles[y][x] = new Tile(x, y, mapdata.terrain[y][x], 2)
						}
				}
				for (let i = 0; i < mapdata.faction_locs.length; i++) make_faction(i)
		}
		make_faction(id) {
				let f = new Faction(id)
				let pos = faction_locs[id]
				this.get_tile(pos).set_fac(id)
				this.factions[id] = f
		}
		in_bounds(p) {
				return p.x >= 0 && p.y >= 0 && p.x < this.w && p.y < this.h
		}
		get_tile(p) {
				return this.in_bounds(p) ? this.tiles[p.y][p.x] : null
		}
}

export class Game {
	constructor() {
			this.tick = 0
			this.users = []
			this.map = new Map(mapdata.width, mapdata.height)
	}
    add_player(name, socket) {
            console.log("New user added.")
            let user = new User(name, socket)
            this.users.push(user)
    }
    update() {
        this.users.forEach(u => {
                u.socket.emit('update', {
                    tick: this.tick
                })
        })
        this.tick++
    }
}
