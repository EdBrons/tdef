export class Faction {
    constructor(id) {
        this.id = id
    }
}

export class FactionManager {
    constructor() {
        this.idx = 0
        this.factions = []
    }
    get_new_id() {
        return this.idx++
    }
    make_faction() {
        let faction = new Faction(this.get_new_id())
        this.factions.push(faction)
        return faction
    }
}