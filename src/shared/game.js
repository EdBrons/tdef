import { from_json } from './actions.js'
import { Gamestate } from './gamestate.js'

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
	}
    add_player(name, socket) {
            const user = new User(name, socket, 0)
            this.users.push(user)
            console.log(`New user '${name}' has joined.`)
			user.socket.emit('initial_update', {
					past_actions: this.gamestate.past_actions
			})
			user.socket.on('action', (data) => {
					this.gamestate.add_action(from_json(data.a))
			})
    }
    update() {
			// do something
			for (const user of this.users) {
					user.socket.emit('update', {
							actions: this.gamestate.actions
					})
			}
			this.gamestate.do_turn()
    }
}
