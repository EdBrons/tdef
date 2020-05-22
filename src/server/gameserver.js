import { tick_len } from './config.js'
import { Game } from './game.js'

class Client {
    constructor(socket) {
        this.socket = socket
        this.player_id = null
    }
}

class Gameserver {
    constructor() {
        this.sockets = {}
        this.ticking = false
        this.start = (new Date()).getTime()
        this.last_tick = (new Date()).getTime()
        this.begin()
    }
    // sockets have a cid and a uid
    // the cid, client id, is unique to each client
    // the uid, user id, links the socket to a specific ingame player
    // uid can be shared probably
    addClient(socket, data) {
        this.sockets[socket] = data
    }
    begin() {
        this.game = new Game()
        this.game.loadDefault()
        this.startTicks()
    }
    startTicks() {
        this.ticking = true
        this.tick()
    }
    tick() {
        let now = (new Date()).getTime()
        console.log(`Delta time: ${now-this.last_tick}`)
        this.game.doTick()
        this.last_tick = now
        setTimeout(() => this.tick(), tick_len)
    }
    endTicks() {
        this.ticking = false
    }
}

export default new Gameserver()
