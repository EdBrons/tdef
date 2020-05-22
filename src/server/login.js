import { dev } from './config.js'
import Gameserver from './gameserver.js'

class Login {
    constructor() {
        this.sockets = {}
        this.cid_x = 0
    }
    onConnection(socket) {
        this.sockets[socket] = {
            cid: this.cid_x
        }
        this.cid_x++
        socket.on('login', data => this.onLogin(socket, data))
    }
    onLogin(socket, data) {
        if (dev) {
            this.login(socket, { uid: 0 })
        }
    }
    login(socket, data) {
        data.sucess = true
        data.cid = this.sockets[socket].cid 
        socket.emit('loginres', data)
        Gameserver.addClient(socket, data)
    }
}

export default new Login()