import * as settings from './config.js'

class Items {
    constructor() {
        this.vals = new Array(settings.item_count).fill(0)
    }
}

class Faction {
    constructor(id) {
        this.id = id
        this.relations = []
    }
    add_relation(faction) {
        if (faction == this) this.relations.push(null)
        this.relations.push(0)
    }
}

class Unit {
    constructor(id, fid, x, y) {
        this.id = id
        this.fid = fid
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
        this.factions = []
        for (let y = 0; y < height; y++) {
            this.tiles[y] = new Array(width)
            for (let x = 0; x < width; x++) {
                this.tiles[y][x] = new Tile(x, y)
                //console.log(x, y)
            }
        }
    }
    load_test() {
        for (let i = 0; i < this.width; i++) {
            this.make_unit(i, i, i)
        }
        for (let i = 0; i < this.width; i++) {
            this.make_faction()
        }
    }
    // tiles
    is_tile(x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height
    }
    get_tile(x, y) {
        return this.tiles[y][x]
    }
    get_tiles() {
        return this.tiles.flat()
    }
    get_adjs(x, y) {
        let adjs = [ [1, 0], [-1, 0], [0, 1],[0, -1]  ]
        return adjs.filter(p => this.is_tile(p[0], p[1])).map(p => this.get_tile(p[0], p[1]))
    }
    is_adj(x1, y1, x2, y2) {
        return this.is_tile(x2, y2) && this.is_tile(x1, y1) ? 
            this.get_adjs(x1, y1).includes(this.get_tile(x2, y2)) :
            false
    }
    // units
    get_units_at(x, y) {
        return this.get_tile(x, y).units
    }
    get_units() {
        return this.get_tiles().map(t => t.units).flat()
    }
    get_unit_by_id(id) {
        return this.get_units().find(u => u.id == id)
    }
    add_unit(unit) {
        let tile = this.get_tile(unit.x, unit.y)
        tile.add_unit(unit)
    }
    make_unit(fid, x, y) {
        let unit = new Unit(this.uidx++, fid, x, y)
        this.add_unit(unit)
        return unit
    }
    // factions
    get_faction_by_id(id) {
        return this.factions[id]
    }
    make_faction() {
        let faction = new Faction(this.fidx++)
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