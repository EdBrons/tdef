import EventEmitter from 'events'

export class Gamestate extends EventEmitter {
		constructor() {
				super()
				this.turn = 0
				this.past_actions = []
				this.actions = []
		}
		load_default() {
				this.turn = 0
				this.map = new Map()
				this.map.init_from_json({width: 200, height: 200})
		}
		do_turn() {
				this.turn++
		}
}

export class Map {
		init_from_json(json) {
				this.width = json.width
				this.height = json.height
				this._tiles = new Array(this.height * this.width)
				for (let y = 0; y < this.height; y++) {
						for (let x = 0; x < this.width; x++) {
								const tile = new Tile()
								tile.init_from_json(
										json.tiles ? 
										json.tiles[x + y * this.width] : 
										{x: x, y: y, unit_id: null, fac_id: null}
								)
								this._tiles[x + y * this.width] = tile
						}
				}
		}
		is_adjs(p, q) {
				return Math.abs(p.x - q.x) + Math.abs(p.y - q.y) == 1
		}
		get_tile(p) {
				return this._tiles[p.x + p.y * this.width]
		}
}

export class Tile {
		init_from_json(json) {
				this.x = json.x
				this.y = json.y
				this.unit_id = json.unit_id | null
				this.fac_id = json.fac_id | null
		}
}

export class Unit {
		init_from_json(json) {
				this.unit_id = json.unit_id
				this.fac_id = json.fac_id
				this.pos = json.pos
		}
}
