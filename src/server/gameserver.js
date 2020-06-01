import { Game } from './game.js'

class Gameserver {
    constructor() {
        this.sockets = {}

        this.ticking = false
        this.start = (new Date()).getTime()
        this.last_tick = this.start

        this.begin()
    }
    addClient(socket, data) {
        this.sockets[socket.id] = data
        this.sockets[socket.id].socket = socket
    }
    begin() {
        this.game = new Game()
        this.game.load_default()

        this.startTicks()
    }
    startTicks() {
        this.ticking = true
        this.tick()
    }
    tick() {
        let now = (new Date()).getTime()
        this.game.doTick()
        this.last_tick = now
        if (this.ticking) {
            setTimeout(() => this.tick(), tick_len)
        }
    }
    endTicks() {
        this.ticking = false
    }
}

export default new Gameserver()
