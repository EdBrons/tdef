import * as utils from './utils.js'

class Action {
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
		super()
		this.unit = unit
		this.destination = destination
	}
	update() {
		this.move()
	}
	finish() {
		// do nothing
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
