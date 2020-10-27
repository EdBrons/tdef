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
    }
    update() {
			// update
    }
}
