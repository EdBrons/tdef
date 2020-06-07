class Tile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.units = 0
        this.faction = null
        this.terrain = null
    }
}
class Faction {
    constructor(id, money) {
        this.id = id
        this.money = money
    }
}
export class Map {
    load_default(width = 5, height = 5) {
        this.width = width
        this.height = height
        this.unit_cost = 1
        this.tiles = []
        this.faction_relations = []
        this.factions = []
        this.fac_idx = 0
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.tiles.push(new Tile(x, y))
            }
        }

        this.make_faction()
        this.make_faction()
        this.make_faction()
        this.make_faction()
    }
    make_faction() {
        let new_id = this.fac_idx
        let faction = new Faction(new_id, 10)
        this.fac_idx++
        this.faction_relations[new_id] = (new Array(new_id)).fill(0)
        this.faction_relations[new_id][new_id] = null
        for (let i = 0; i < new_id; i++) {
            this.faction_relations[i][new_id] = 0
        }
        return new_id
    }
    get_faction_count() {
        return this.faction_relations.length
    }
    is_valid_fac_id(id) {
        return id >= 0 && id < this.get_faction_count()
    }
    get_my_opinion_of(me, them) {
        return this.is_valid_fac_id(me) 
            && this.is_valid_fac_id(them) ?
            this.faction_relations[me][them] :
            null
    }
    get_opinion_of_me(me, them) {
        return this.get_my_opinion_of(them, me)
    }
    in_bounds(x, y) {
        return  x >= 0 
                && y >= 0 
                && x < this.width 
                && y < this.height
    }
    get_tile(x, y) {
        return  this.in_bounds(x, y) ? 
                this.tiles[x + y * this.width] : 
                null
    }
    _get(x, y, f) {
        return this.in_bounds(x, y) ?
            f(this.get_tile(x, y)) :
            null
    }
    get_units(x, y) {
        return this._get(x, y, t => t.units)
    }
    get_fac(x, y) {
        return this._get(x, y, t => t.faction)
    }
    get_terrain(x, y) {
        return this._get(x, y, t => t.terrain)
    }
    get_adjs(x, y) {
        let adjs = [ [1, 0], [-1, 0], [0, 1], [0, -1] ]
        return adjs
            .map(p => this.get_tile(x + p[0], y + p[1]))
            .filter(t => t)
    }
    is_adjs(t1, t2) {
        return this.get_adjs(t1.x, t1.y).includes(t2)
    }
    get_faction_id_at(x, y) {
        return this._get(x, y, t => t.faction)
    }
    can_attack(t1, t2) {
        if (!this.is_adjs(t1, t2)) return false
        if (this.get_faction_id_at(t1.x, t1.y) == this.get_faction_id_at(t2.x, t2.y)) return false
        return true
    }
    can_move_units(t1, t2, val=false) {
        if (!val) val = this.get_units(t1.x, t1.y)
        if (this.get_units(t1.x, t1.y) < val) return false
        if (!this.is_adjs(t1, t2)) return false
        if (this.get_faction_id_at(t1.x, t1.y) != this.get_faction_id_at(t2.x, t2.y)) return false
        return true
    }
    can_build_units(fac, t, val) {
        if (this.get_faction_id_at(t.x, t.y) != fac.id) return false
        if (fac.gold < val * this.unit_cost) return false
        return true
    }
}