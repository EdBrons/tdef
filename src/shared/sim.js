import * as settings from './config.js'

export class Sim {
    constructor() {
        this.idx = 0
        this.ents = {}
        this.comps = {}
        this.sys = {}
    }
    add_sys(name, f) {
        this.sys[name] = f
    }
    add_ent() {
        this.ents[this.idx++] = []
        return this.idx
    }
    add_comp(id, name, data) {
        if (!this.comps[name]) this.comps[name] = {}
        this.comps[name][id] = data
        if (!this.ents[id]) this.ents[id] = []
        this.ents[id].push(name)
    }
    rm_comp(id, name) {
        if (!this.comps[name]) return
        delete this.comps[name][id]
        if (!this.ents[id]) return
        this.ents[id].splice(this.ents[id].indexOf(name), 1)
    }
    update() {
        for (s in this.sys) {
            s(this, this.ents, this.comps)
        }
    }
}