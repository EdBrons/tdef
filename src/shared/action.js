export class ActionManager {
		constructor(m) {
				this.map = m
				this.actions = []
		}
		add_action(a) {
				this.actions.push(a)
		}
		update() {
				this.actions.forEach(a => a.update())
				this.actions = this.actions.filter(a => !a.finished)
		}
}

class Action {
		constructor(m) {
				this.map = m
				this.finished = false
		}
		update() {
				this._update()
				if (this.is_finished()) {
						this.finished = true
						this._on_finish()
				}
		}
		_update() {}
		_on_finish() {}
}

export class MoveUnit extends Action {
		constructor(m, uid, d, t) {
				super(m)
				this.uid = uid
				this.dest = d
				this.time = t
				this.progress = 0
		}
		is_valid() {
				return true
		}
		_update() {
				console.log(`My progress: ${this.progress}`)
				this.progress++
		}
		is_finished() {
				return this.progress >= this.time
		}
		_on_finish() {
				let unit = this.map.get_unit(this.uid)
				this.map.set_unit_pos(unit, this.dest)
		}
}
