import { users } from './config.js'

export class Login {
	constructor(g) {
		this.sockets = {}
		this.game = g
	}
	on_connection(socket) {
		socket.on('login', (data) => this.try_login(socket, data))
		socket.on('disconnection', () => {
			game.socket_disconnect(socket)
			delete this.sockets[socket.id]
		})
	}
	is_valid_login(username, password) {
        for (let i = 0; i < users.length; i++) {
            let u = users[i]
			if (u.name === username && u.password === password) {
				return true
			}
		}
		return false
	}
	try_login(socket, data) {
		if (this.is_valid_login(data.username, data.password)) {
			this.game.add_player(data.name, socket)
			socket.emit('login', {
				success: true
			})
		}
		else {
			socket.emit('login', {
				success: false
			})
		}
	}
}
