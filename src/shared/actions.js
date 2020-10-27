export let to_json = (a) => {
		let obj = {}
		for (p in this) {
				obj += a[p]
		}
		return obj
}

export let from_json = (obj) => {
		let a
		switch(obj.name) {
				case 'MapMoveUnit': 
						a = new MapMoveUnit(obj.unit_id, obj.from, obj.to)
						break
				case 'MapPlaceUnit': 
						a = new MapPlaceUnit(obj.unit_id, obj.at)
						break
				default:
						a = new MapChange()
						console.log('Something is fucked')
		}
		return a
}

export class MapChange {
		constructor(deps = []) {
				this.deps = deps
		}
		can_execute(m) {
				return this.deps.find(d => !d.can_execute(m)) != null
		}
		execute(m) {
				this.deps.forEach(d => d.execute(m))
		}
}

export class MapMoveUnit extends MapChange {
		constructor(u_id, from, to) {
				super()
				this.name = 'MapMoveUnit'
				this.unit_id = u_id
				this.from = from
				this.to = to
		}
		can_execute(m) {
				return 	m.is_adjs(this.from, this.to) 
						&& m.unit_at(this.from) == this.unit_id
		}
		execute(m) {
				m.tile(this.from).set_unit(null)
				m.tile(this.to).set_unit(this.unit_id)
				console.log(`Moved U-${this.unit_id} from (${this.from.x}, ${this.from.y}) to (${this.to.x}, ${this.to.y}).`)
		}
}

export class MapPlaceUnit extends MapChange {
		constructor(u_id, at) {
				super()
				this.name = 'MapPlaceUnit'
				this.unit_id = u_id
				this.at = at
		}
		can_execute(m) {
				return m.unit_at(this.at) == null
		}
		execute(m) {
				m.tile(this.at).set_unit(this.unit_id)
				console.log(`Placed U-${this.unit_id} at (${this.at.x}, ${this.at.y}).`)
		}
}

export class MapMakeUnit extends MapChange {
		constructor(u) {
				super([ new MapPlaceUnit(u.unit_id, u.pos) ])
				this.name = 'MapMakeUnit'
				this.unit = u
		}
		can_execute(m) {
				return super.can_execute(m)
		}
		execute(m) {
				m.units.append(this.unit)
				super.execute(m)
		}
}

export class MapClaimTile extends MapChange {
		constructor(f_id, at) {
				super()
				this.name = 'MapClaimTile'
				this.fac_id = f_id
				this.at = at
		}
		can_execute(m) {
				return true
		}
		execute(m) {
				m.tile(this.at).set_fac(this.fac_id)
				console.log(`Claimed tile (${this.at.x}, ${this.at.y}) for F-${this.unit_id}.`)
		}
}
