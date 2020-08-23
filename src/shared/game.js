import map from '../shared/map.js'

const TERRAIN = {
    OCEAN: 0, BEACH: 1, PLAINS: 2, FOREST: 3, HIGHLAND: 4
}

function unit_pos_to_global(x, y) {
    return {
        x: Math.floor(x / map.tile_size),
        y: Math.floor(y / map.tile_size)
    }
}

function get_terrain_at(x, y) {
    return map.terrain[y][x]
}

function can_walk_on(u, t) {
    return u.land_unit ? t != TERRAIN.OCEAN : t == TERRAIN.OCEAN
}

function is_out_of_bounds(x, y) {
    return x < 0 || y < 0 || x >= map.width * map.tile_size || y >= map.height * map.tile_size
}

function unit_invalid_location(u) {
    let pos = unit_pos_to_global(u.x, u.y)
    return !can_walk_on(u, get_terrain_at(pos.x, pos.y)) || is_out_of_bounds(pos.x, pos.y)
}

class Player {
    constructor(socket) {
        this.id = socket.id
        this.gold = 100
    }
}

class Unit {
    constructor(id, fid, x, y) {
        this.id = id
        this.fid = fid
        this.x = x
        this.y = y

        this.land_unit = true

        this.moving = false
        this.dx = null
        this.dy = null
        this.s = 1
    }
}

let random = (max, min=0) => {
    return Math.floor(Math.random() * (max - min)) + min
}

let random_coord = () => {
    return {
        x: random(1000, 500),
        y: random(1000, 500),
    }
}

let spawn_locations = [{x: 16, y: 37}, {x: 28, y: 29}]

export class Game {
    constructor() {
        this.players = {}
        this.sockets = {}
        this.uidx = 0
        this.units = []
    }
    add_player(socket) {
        console.log('(PLAYER)new connection')
        let p = new Player(socket)
        this.players[p.id] = p
        this.sockets[p.id] = socket
        socket.on('disconnect', () => this.remove_player(p))
        this.init_player(p)
        this.update_player(p)
    }
    init_player(p) {
    }
    remove_player(p) {
        delete this.players[p.id]
        delete this.sockets[p.id]
        this.remove_team(p)
        spawn_locations.push(p.capital)
        console.log('(PLAYER)removed player')
    }
    remove_team(p) {

    }
    add_unit(f, x, y) {
        let u = new Unit(this.uidx++, f, x, y)
        u.dx = x += 100
        u.dy = y
        u.moving = true
        if (unit_invalid_location(u)) return false
        console.log('(GAME)unit created')
        this.units.push(u)
        return u
    }
    kill(u) {
        console.log('(GAME)unit killed')
        this.units.splice(this.units.indexOf(u), 1)
    }
    move_units() {
        this.units.filter(u => u.moving).forEach(u => {
            let dx = u.dx - u.x
            let dy = u.dy - u.y
            if (dx > 0) {
                u.x++
            }
            if (dy > 0) {
                u.y++
            }
            if (dx < 0) {
                u.x--
            }
            if (dy < 0) {
                u.y--
            }
            if (dx == 0 && dy == 0) {
                u.moving = false
                u.dx = null
                u.dy = null
            }
        })
    }
    validate_movement() {
        this.units.filter(u => unit_invalid_location(u)).forEach(u => {
            console.log('(GAME)invalid movement found')
            // no mercy
            this.kill(u)
        })
    }
    update_player(p) {
        //console.log('(PLAYER)updating player')
        this.sockets[p.id].emit('update', {
            team: p.id,
            players: this.players,
            units: this.units
        })
    }
    update() {
        this.move_units()
        this.validate_movement()

        for (let p in this.players) {
            this.update_player(this.players[p])
        }
    }
}