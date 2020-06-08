import * as settings from './config.js'

class Faction {
    constructor(id) {
        this.id = id
        this.relations = []
    }
    add_relation(faction) {
        this.relations.push(0)
    }
}

class Unit {
    constructor(id, x, y) {
        this.id = id
        this.x = x
        this.y = y
    }
}

class Tile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.units = []
    }
    add_unit(unit) {
        this.units.push(unit)
    }
    remove_unit(unit) {
        let i = this.units.indexOf(unit)
        if (i != -1) this.units.splice(i, 1)
    }
}

export class Map {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.uidx = 0
        this.fidx = 0
        this.tiles = new Array(height)
        for (let y = 0; y < height; y++) {
            this.tiles[y] = new Array(width)
            for (let x = 0; x < width; x++) {
                this.tiles[y][x] = new Tile(x, y)
            }
        }
    }
    // tiles
    get_tile(x, y) {
        return this.tiles[y][x]
    }
    // units
    get_units_at(x, y) {
        return this.get_tile(x, y).units
    }
    get_units() {
        return this.tiles.flat().map(t => t.units).flat()
    }
    get_unit_by_id(id) {
        return this.get_units().find(u => u.id == id)
    }
    add_unit(unit) {
        let tile = this.get_tile(unit.x, unit.y)
        tile.add_unit(unit)
    }
    make_unit(x, y) {
        let unit = new Unit(this.uidx++, x, y)
        this.add_unit(unit)
        return unit
    }
    // factions
    make_faction() {
        let faction = new Faction(fidx++)
        this.factions.push(faction)
        // update relations
        for (let i = 0; i < faction.id; i++) {
            this.factions[i].add_relation(faction)
            faction.add_relation(this.factions[i])
        }
        faction.add_relation(faction)
        return faction
    }
}