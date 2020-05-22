import { dev } from '../server/config.js'

export class Login {
    constructor(socket, onlogin) {
        this.onlogin = onlogin
        this.socket = socket
        this.tryLogin()
    }
    tryLogin() {
        this.socket.emit('login')
        this.socket.on('loginres', data => this.onLoginRes(data))
    }
    onLoginRes(data) {
        if (data.sucess) {
            this.onlogin(data)
        }
    }
}