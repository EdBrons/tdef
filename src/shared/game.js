import * as utils from './utils.js'
import * as config from './config.js'

import map from '../shared/map.js'
import { Point } from './point.js'

class User {
	constructor(name, socket) {
		this.name = name
		this.socket = socket
	}
}

class Tile {
	constructor(x, y, t) {
		this.x = x
		this.y = y
		this.terrain = t
		this.unit = null
	}
}

export class Map {
		constructor(w, h) {
				this.w = w
				this.h = h
				this.tiles = new Array(h)
				this.units = []
				for (let y = 0; y < h; y++) {
						this.tiles[y] = new Array(w)
						for (let x = 0; x < w; x++) {
								this.tiles[y][x] = new Tile(x, y, map.terrain[y][x])
						}
				}
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
			this.map = new Map(map.width, map.height)
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
