import mapdata from './mapdata.js'
import { Map } from './map.js'

class User {
	constructor(n, s, fid) {
		this.name = n
		this.socket = s
		this.fac = fid
	}
}

export class Game {
	constructor() {
			this.tick = 0
			this.users = []
			this.map = new Map()
			this.available_facs = Object.keys(this.map.factions)
	}
    add_player(name, socket) {
			socket.emit('test')
            let user = new User(name, socket, this.available_facs.pop())
            console.log(`New user '${name}' has joined. Their faction is ${user.fac}.`)
            this.users.push(user)
			this.initial_update(user)
    }
	initial_update(user) {
			user.socket.emit('initial_update', {
					units: this.map.units,
					factions: this.map.factions
			})
	}
    update() {
			console.log(`Tick ${this.tick}`)
			this.map.update()
			this.users.forEach(u => {
					u.socket.emit('update', {
							tick: this.tick,
							actions: this.map.actman.actions
					})
			})
			this.tick++
    }
}
