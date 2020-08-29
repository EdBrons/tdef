import * as utils from './utils.js'
import map from '../shared/map.js'
import fac_colors from './fac_colors.js'

let city_locations = [
    [34, 32],
    [40, 30],
    [43, 30],
    [40, 26],
    [35, 25],
    [34, 20],
    [39, 19],
]

let TRADE_ClOCK_TIME = 25

class City {
    constructor(fid, pos) {
        this.fid = fid
        this.pos = pos
		this.wealth = 0
        this.industry = 4
		this.tilewealth = 0
        this.trade_clock = 0
    }
	add_tile(tile) {

	}
}

const UNIT_TYPES = {
		TRADER: 0
}

let def_check = () => false
let def_reached = () => {}

class Unit {
    constructor(id, fid, pos, type) {
        this.id = id
        this.fid = fid
        this.pos = pos
        this.type = type
        this.s = .1
        this.moving = false
        this.is_obj_reached = def_check
        this.on_obj_reached = def_reached
    }
    set_dest(dest) {
        this.dest = dest
        this.moving = true
    }
    move_towards(vec) {
        let delta = utils.sub(vec, this.pos)
        let l = utils.mag(delta)
        if (l <= this.s) {
            this.pos = this.dest
            this.moving = false
            return
        }
        delta = utils.mul(delta, this.s / l)
        this.pos = utils.add(delta, this.pos)
    }
}

class Player {
    constructor(fid, color) {
        this.fid = fid
		this.color = color
    }
}

export class Game {
    constructor() {
        this.fidx = 0
        this.tick = 0
        this.players = {}
        this.sockets = []
        this.cities = []
        this.uidx = 0
        this.units = []
		this.ownership = []
        this.unit_count = 0
        this.init()
    }
    init() {
		for (let i = 0; i < map.width * map.height; i++) {
			this.ownership[i] = -1
		}
        city_locations.forEach(c_loc => {
            let x = c_loc[0]
            let y = c_loc[1]
            let fid = this.fidx++
            let player = new Player(fid, fac_colors.pop())
            let city = new City(fid, utils.vec(x, y))
            this.players[fid] = player
            this.cities.push(city)
			this.set_owner(utils.vec(x, y), city)
        })
    }
	set_owner(pos, city) {
		this.ownership[pos.x + pos.y * map.width] = city.fid
		city.add_tile(pos)
	}
    add_player(socket) {
        this.sockets.push(socket)
    }
    make_unit(fid, pos, t) {
        let new_unit = new Unit(this.uidx++, fid, pos, t)
        this.units.push(new_unit)
        return new_unit
    }
    do_unit_move(u) {
        u.move_towards(u.dest)
    }
    send_trade(from, to) {
        let trader = this.make_unit(from.fid, from.pos, UNIT_TYPES.TRADER)
        trader.is_obj_reached = () => {
            return trader.pos.x == to.pos.x && trader.pos.y == to.pos.y
            return utils.is_equal(trader.pos, to.pos)
        }
        trader.on_obj_reached = () => {
            from.wealth += 2
            to.wealth += 1
            this.remove_trader(trader)
        }
        trader.set_dest(to.pos)
    }
    remove_unit(u) {
        let i = this.units.indexOf(u)
        if (i == -1) return
        this.units.splice(i, 1)
    }
    remove_trader(t) {
        this.remove_unit(t)
    }
    do_city_trade(c) {
        let other_c = this.cities[utils.random(this.cities.length)]
        if (other_c == c) return
        this.send_trade(c, other_c)
    }
    update() {
        // city stuff
        this.cities.forEach(c => {
			c.wealth += c.industry + c.tilewealth
            c.trade_clock--
            if (c.trade_clock <= 0) {
                this.do_city_trade(c)
                c.trade_clock = TRADE_ClOCK_TIME
            }
        })
        // move units
        this.units.filter(u => u.moving).forEach(u => {
            this.do_unit_move(u)
        })
        this.units.filter(u => u.is_obj_reached()).forEach(u => {
            u.on_obj_reached()
        })
        this.sockets.forEach(s => s.emit('update', {tick: this.tick, cities: this.cities, units: this.units, players: this.players, ownership: this.ownership}))
        this.tick++
    }
}
