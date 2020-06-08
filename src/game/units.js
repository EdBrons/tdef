export class Unit {
    constructor(id) {
        this.id = id
    }
}

export class UnitManager {
    constructor() {
        this.idx = 0
    }
    get_new_id() {
        return this.idx++
    }
    add_unit(unit) {
        this.units.push(unit)
    }
    get_unit(id) {
        return this.units.find(e => e.id == id)
    }
    make_unit() {
        let unit = new Unit(this.get_new_id())
        this.add_unit(unit)
        return unit
    }
}