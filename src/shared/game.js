import { Gamestate } from './gamestate.js'

const TICK_TIME = 3000

class User {
	constructor(name, socket, faction_id) {
		this.name = name
		this.socket = socket
		this.faction_id = faction_id
	}
}

export class Game {
	constructor() {
			this.gamestate = new Gamestate()
			this.gamestate.load_default()
			this.users = []
			this.last_update = (new Date()).getTime()
	}
    add_player(name, socket) {
            const user = new User(name, socket, 0)
            this.users.push(user)
            console.log(`New user '${name}' has joined.`)
			user.socket.emit('past_actions', this.gamestate.past_actions)
    }
    update() {
			let current_time = (new Date()).getTime()
			if (current_time - this.last_update < TICK_TIME) return
			this.last_update = current_time

			for (const user of this.users) {
					user.socket.emit('actions', this.gamestate.actions)
			}
			this.gamestate.do_turn()
    }
}
