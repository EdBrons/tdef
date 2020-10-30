import EventEmitter from 'events'

export const EMPTY = -1

export class Gamestate extends EventEmitter {
		constructor() {
				super()
				this.turn = 0
				this.past_actions = []
				this.actions = []
				this.map = new Map()
				this.map.make({width: 200, height: 200})
		}
		load_default() {
				this.turn = 0
				const my_action = new BuildUnit()
				my_action.make({time: 2, unit_json: {fac_id: 0, pos: {x: 20, y: 17}}})
				this.add_action(my_action)
		}
		add_action_json(json) {
				let a
				switch (json.name) {
						case 'MoveUnit': a = new MoveUnit()
						case 'BuildUnit': a = new BuildUnit()
				}
				a.make(json)
				this.add_action(a)
		}
		add_action(a) {
				if (a.validate(this.map)) this.actions.push(a)
				this.emit(a.name + " begun", {
						data: a
				})
				a.on("executed", () => {
						this.emit(a.name + " executed", {
								data: a
						})
				})
		}
		do_actions() {
				this.actions.forEach(a => a.update(this.map))
				const finished_actions = this.actions.filter(a => a.done)
				this.actions = this.actions.filter(a => !a.done)
				this.past_actions.push(finished_actions)
		}
		do_turn() {
				console.log('turn: ', this.turn)
				this.do_actions()
				this.turn++
		}
}

class TimedAction extends EventEmitter {
		constructor() {
				super()
				this.name = "TimedAction"
		}
		make(json) {
				this.done = json.done | false
				this.time = json.time
		}
		validate(map) {
				return true
		}
		update(map) {
				this.time--
				if (this.time <= 0 || this.done) {
						this.execute(map)
				}
		}
		execute(map) {
				this.done = true
				this.emit("executed", this)
		}
}

class MoveUnit extends TimedAction {
		constructor() {
		}
		make(json) {
				super.make(json)
				this.name = 'MoveUnit'
				this.unit_id = json.unit_id
				this.dest = json.dest
		}
		validate(map) {
				const unit = map.get_unit(this.unit_id)
				return map.is_adj(unit.pos, this.dest)
		}
		update(map) {
				super.update(map)
		}
		execute(map) {
				super.execute()
				const unit = map.get_unit(this.unit_id)
				map.get_tile(unit.pos).unit_id = null
				unit.pos = this.dest
				map.get_tile(unit.pos).unit_id = this.unit_id
		}
}

class BuildUnit extends TimedAction {
		make(json) {
				super.make(json)
				this.name = 'BuildUnit'
				this.unit_json = json.unit_json
		}
		validate(map) {
				const tile = map.get_tile(this.unit_json.pos)
				return tile.unit_id == EMPTY
		}
		update(map) {
				if (this.validate(map)) super.update(map)
		}
		execute(map) {
				super.execute()
				const unit = new Unit()
				this.unit_json.unit_id = map.get_unit_id()
				unit.make(this.unit_json)
				map.add_unit(unit)
		}
}

export class Map {
		make(json) {
				this.width = json.width
				this.height = json.height
				this._tiles = new Array(this.height * this.width)
				this._unit_id = 0
				this._units = []
				for (let y = 0; y < this.height; y++) {
						for (let x = 0; x < this.width; x++) {
								const tile = new Tile()
								tile.make(
										json.tiles ? 
										json.tiles[x + y * this.width] : 
										{x: x, y: y, unit_id: EMPTY, fac_id: EMPTY}
								)
								this._tiles[x + y * this.width] = tile
						}
				}
		}
		get_unit_id() {
				return this._unit_id++
		}
		add_unit(u) {
				this._units.push(u)
				this.get_tile(u.pos).unit_id = u.unit_id
				console.log('new unit: ', u)
		}
		is_adj(p, q) {
				return Math.abs(p.x - q.x) + Math.abs(p.y - q.y) == 1
		}
		get_tile(p) {
				return this._tiles[p.x + p.y * this.width]
		}
		get_unit(u_id) {
				return this._units.find(u => u.unit_id == u_id)
		}
}

export class Tile {
		make(json) {
				this.x = json.x
				this.y = json.y
				this.unit_id = json.unit_id | null
				this.fac_id = json.fac_id | null
		}
}

export class Unit {
		make(json) {
				this.unit_id = json.unit_id
				this.fac_id = json.fac_id
				this.pos = json.pos
		}
}
