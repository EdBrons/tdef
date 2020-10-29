import { users } from './config.js'

export class Login {
	constructor(g) {
		this.sockets = {}
		this.game = g
	}
	on_connection(socket) {
        console.log("socket_" + socket.id + " connected")
		socket.on('login', (data) => this.try_login(socket, data))
		socket.on('disconnection', () => {
            console.log("socket_" + socket.id + " disconnected")
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
            console.log("socket_" + socket.id + " successfully logged in")
			socket.emit('login', {
				success: true
			})
			this.game.add_player(data.username, socket)
		}
		else {
            console.log("socket_" + socket.id + " unsuccessfully logged in")
			socket.emit('login', {
				success: false
			})
		}
	}
}
