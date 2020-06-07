import { Map } from './game.js'

class Gameserver {
    constructor() {
        this.sockets = {}

        this.ticking = false
        this.start = (new Date()).getTime()
        this.last_tick = this.start

        this.map = new Map()
        this.map.load_default()
        //this.begin()
    }
    addClient(socket, data) {
        this.sockets[socket.id] = data
        this.sockets[socket.id].socket = socket
    }
    begin() {
        this.startTicks()
    }
    startTicks() {
        this.ticking = true
        this.tick()
    }
    tick() {
        let now = (new Date()).getTime()
        this.last_tick = now
        if (this.ticking) {
            setTimeout(() => this.tick(), 1000/1)
        }
    }
    endTicks() {
        this.ticking = false
    }
}

export default new Gameserver()