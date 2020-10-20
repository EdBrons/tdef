import { ActionManager, MoveUnit } from './action.js'
import mapdata from './mapdata.js'

export class Map {
		constructor(w=mapdata.width, h=mapdata.height) {
				this.w = w
				this.h = h

				this.actman = new ActionManager(this)

				this.factions = {}
				this.units = []
				this.uidx = 0

				this.tiles = new Array(h)
				for (let y = 0; y < h; y++) {
						this.tiles[y] = new Array(w)
						for (let x = 0; x < w; x++) {
								this.tiles[y][x] = new Tile(x, y)
						}
				}

				this.load_default()
		}
		load_default() {
				for (let i = 0; i < mapdata.faction_locs.length; i++) {
						this.make_faction(i, mapdata.faction_locs[i])
				}
				let my_pos = mapdata.faction_locs[1]
				my_pos.x++
				const my_fac = this.factions[1]
				const my_unit = this.get_fac_units(my_fac.id)[0]
				let my_action = new MoveUnit(this, my_unit.id, my_pos, 2)
				this.actman.add_action(my_action)
		}
		update() {
				this.actman.update()
		}
		make_faction(id, pos) {
				let f = new Faction(id)
				this.get_tile(pos).fac = id
				this.factions[id] = f
				this.make_unit(id, pos)
		}
		make_unit(fid, pos) {
				let u = new Unit(fid, this.uidx++, pos)
				try {
						this.set_unit_pos(u, pos)
						this.units.push(u)
				} catch(e) {
						console.log('Invalid unit creation')
				}
		}
		set_unit_pos(unit, pos) {
				let tile = this.get_tile(pos)
				if (!this.unit_can_stand(unit, pos)) {
						throw 'InvalidUnitPlacement'
				}
				tile.unit = unit
				console.log(`Moved unit_${unit.id} to (${pos.x}, ${pos.y})`)
		}
		unit_can_stand(unit, pos) {
				return true
		}
		get_unit(uid) { return this.units.find(u => u.id == uid) }
		get_fac_units(uid) { return this.units.filter(u => u.id == uid) }
		in_bounds(pos) { return pos.x >= 0 && pos.y >= 0 && pos.x < this.w && pos.y < this.h }
		get_tile(pos) { return this.tiles[pos.y][pos.x] }
		get_tiles() { return this.tiles.flat() }
		get_fac_tiles(f) { return this.get_tiles().filter(t => t.fac == f) }
}

export class Tile {
	constructor(x, y) {
		this.x = x
		this.y = y

		this.tax = 2
		this.buildings = {}

		this.fac = null
		this.unit = null
	}
}

export class Faction {
		constructor(id) {
				this.id = id
		}
}

export class Unit {
		constructor(id, fac, pos) {
				this.id = id
				this.fac = fac
				this.pos = pos
				this.unit_types = {}
		}
}
