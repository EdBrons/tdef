import * as utils from './utils.js'
import * as config from './config.js'

import map from '../shared/map.js'

class User {
	constructor(name, socket) {
		this.name = name
		this.socket = socket
	}
}

class Tile {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

export class Game {
    constructor() {
        this.tick = 0
        this.users = []
        this.tiles = new Array(map.height)
        for (let y = 0; y < map.height; y++) {
                this.tiles[y] = new Array(map.width)
                for (let x = 0; x < map.width; x++) {
                        this.tiles[y][x] = new Tile(x, y)
                }
        }
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
