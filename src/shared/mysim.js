const { Sim } = require("./sim")

import { Sim } from './sim'

let mysim = new Sim()

// find collisions and creates collision entity for
// another system to resolve
mysim.add_sys('find_collisions', (sim, ents, comps) => {
    let mycomps = comps['has_position']
    if (!mycomps) return
    collisions = []
    collisions.forEach(col => {
        let col_ent = sim.add_ent()
        sim.add_comp(col_ent, 'collision', {id1: col[0], id2: col[1]})
    })
})

mysim.add_sys('resolve_collisions', (sim, ents, comps) => {
    let mycomps = comps['collision']
    if (!mycomps) return
    mycomps.forEach(col => {
        let ent1 = col.id1
        let ent2 = col.id2
    })
})

export { mysim }