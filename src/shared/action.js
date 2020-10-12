import * as utils from './utils.js'
import * as config from './config.js'

class Action {
	constructor(p) {
		this.p = p
	}
	act() {
		this.update()
		if (this.is_done()) {
			this.done = true
			this.finish()
		}
	}
	update() {}
	is_done() {}
	finish() {}
}

export class ActionMove extends Action {
	constructor(unit, destination) {
		super(5)
		this.unit = unit
		this.destination = destination
	}
	update() {
		this.move()
	}
	finish() {
		// do nothing
	}
	is_done() {
		return utils.equals(this.destination, this.unit.pos)
	}
	move() {
        let delta = utils.sub(this.destination, this.unit.pos)
        let m = utils.mag(delta)
        if (m <= this.unit.speed) {
            this.unit.pos = this.destination
			this.finish()
			return
        }
        delta = utils.mul(delta, this.unit.speed / m)
        this.unit.pos = utils.add(delta, this.unit.pos)
	}
}

export class CityEconAction extends Action {
	constructor(c) {
		super(1)
		this.c = c
	}
	update() {
		this.c.values.forEach(v => {
		})
	}
	finish() {
		// nothing
	}
	is_done() {
		// eternal
		return false
	}
}
