import { dev } from './config.js'
import Gameserver from './gameserver.js'

class Login {
    constructor() {
        this.sockets = {}
    }
    onConnection(socket) {
        this.sockets[socket] = {}
        socket.on('login', data => this.onLogin(socket, data))
    }
    onLogin(socket, data) {
        if (dev) this.login(socket, { uid: 0 })
    }
    login(socket, data) {
        data.success = true
        socket.emit('loginres', data)
        Gameserver.addClient(socket, data)
    }
}

export default new Login()