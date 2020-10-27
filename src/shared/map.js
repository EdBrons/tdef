export class Map {
		constructor(w, h) {
				this.width = w
				this.height = h
				this._tiles = new Array(h)
				this._units = []
				for (let y = 0; y < this.height; y++) {
						this._tiles[y] = new Array(w)
						for (let x = 0; x < this.width; x++) {
								this._tiles[y][x] = new Tile(x, y)
						}
				}
		}
		is_adjs(p, q) {
				return Math.abs(p.x - q.x) + Math.abs(p.y - q.y) == 1
		}
		tile(p) {
				return this._tiles[p.y][p.x]
		}
		tiles() {
				return this._tiles.flat()
		}
		units() {
				return this.tiles().map(t => t.unit_id).filter(t => t != null)
		}
		unit_at(p) {
				return this.tile(p).unit_id
		}
		unit_tile(u_id) {
				return this.tiles().find(t => t.unit_id == u_id)
		}
}

export class Tile {
		constructor(x, y) {
				this.x = x
				this.y = y
				this.unit_id = null
				this.fac_id = null
		}
		set_unit(u_id) {
				console.log(`setting unit_id of (${this.x}, ${this.y}) to ${u_id}`)
				this.unit_id = u_id
		}
		set_fac(f_id) {
				console.log(`setting unit_id of (${this.x}, ${this.y}) to ${f_id}`)
				this.fac_id = f_id
		}
}

export class Unit {
		constructor(u_id, f_id, p) {
				this.unit_id = u_id
				this.f_id = f_id
				this.pos = p
		}
}
