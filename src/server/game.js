class Entity {
    constructor(x, y, t, h, s, attack) {
        this.x = x
        this.y = y
        this.t = t
        this.h = h
        this.s = s
        this.attack = attack
        this.range = 30
        this.shots = 3
    }
    getName() {
        return isMob(this) ? 'mob' : 'defense'
    }
}

function distanceTo(e1, e2) {
    return Math.sqrt( Math.pow(e1.x - e2.x, 2) + Math.pow(e1.y - e2.y, 2) )
}

function isInside(rx, ry, w, h, px, py) {
    return px >= rx && px < rx + w && py >= ry && py < ry + h
}

// e: entity to be moved, d: destination
// moves by a vector with a magnitude of e's speed
function moveTowards(e, d) {
    let dist = distanceTo(e, d)
    let v = {
        x: d.x-e.x,
        y: d.y-e.y
    }
    let finished = false
    if (dist > e.s) {
        let m = e.s / dist
        v.x *= m
        v.y *= m
    }
    else {
        finished = true
    }
    e.x += v.x
    e.y += v.y
    return {
        v: v,
        sucess: finished
    }
}

export function isMob(e) {
    return e.t === 1
}

export function isDef(e) {
    return e.t === 0
}

export class Game {
    constructor() {
        this.entities = []
        this.changes = []
        this.tick = 0
    }
    loadDefault() {
        this.width = 100
        this.height = 100

        let ox = 40
        let oy = 40
        let w = 20
        let h = 20

        for (let x = 0; x <= w; x+=2) {
            this.addEntity(new Entity(ox + x, oy, 0, 10, 0, 3))
        }
        for (let x = 0; x <= w; x+=2) {
            this.addEntity(new Entity(ox + x, oy+h, 0, 10, 0, 3))
        }
        for (let y = 0; y <= h; y+=2) {
            this.addEntity(new Entity(ox, oy + y, 0, 10, 0, 3))
        }
        for (let y = 0; y <= h; y+=2) {
            this.addEntity(new Entity(ox + w, oy + y, 0, 10, 0, 3))
        }
    }
    spawnWave() {
        for (let x = 0; x <= this.width; x++) {
            this.addEntity(new Entity(x, 0, 1, 1, 1, 1))
        }
        for (let x = 0; x <= this.width; x++) {
            this.addEntity(new Entity(x, this.height, 1, 1, 1, 1))
        }
        for (let y = 0; y <= this.height; y++) {
            this.addEntity(new Entity(0, y, 1, 1, 1, 1))
        }
        for (let y = 0; y <= this.height; y++) {
            this.addEntity(new Entity(this.width, y, 1, 1, 1, 1))
        }
    }
    getInitialdata() {
        return {
            width: this.width,
            height: this.height
        }
    }
    getData() {
        return {
            entities: this.entities
        }
    }
    addEntity(e) {
        this.entities.push(e)
    }
    removeEntity(e) {
        let i = this.entities.indexOf(e)
        if (i == -1) return
        //console.log('entity removed!')
        this.entities.splice(i, 1)
    }
    isInBounds(x, y) {
        //return x >= 0 && x < this.width && y >= 0 && y < this.height
        return isInside(0, 0, this.width, this.height, x, y)
    }
    getEntitiesInRadius(x, y, r) {
        let p = new Entity(x, y)
        return this.entities.filter(e => distanceTo(e, p) <= r)
    }
    // f is an optional filter function
    // TODO: this is probably super slow
    getClosestEntityTo(x, y, f=(e)=>true) {
        let p = new Entity(x, y)
        if (this.entities.length < 2) return null
        let ents = this.entities.filter(e => f(e))
        if (ents.length < 1) return null
        ents.sort((a, b) => distanceTo(a, p) - distanceTo(b, p))
        return ents[0]
    }
    // x and y are the top left
    getEntitiesInRect(x, y, w, h) {
        return this.entities.filter(e => isInside(x, y, w, h, e.x, e.y))
    }
    getDefenses() {
        return this.entities.filter(e => isDef(e))
    }
    getMobs() {
        return this.entities.filter(e => isMob(e))
    }
    doTick() {
        console.log(`Tick ${this.tick}`)
        this.updateDefenses()
        this.updateMobs()
        if (this.tick % 10 == 0) {
            this.spawnWave()
        }
        this.tick++
    }
    updateDefenses() {
        this.getDefenses().forEach((d) => {
            // find entities near it to kill
            let targets = this.getEntitiesInRadius(d.x, d.y, d.range).filter(e => e !== d && isMob(e))
            for (let i = 0; i < Math.min(targets.length, d.shots); i++) {
                let target = targets[i]
                this.attack(d, target)
            }
        })
    }
    updateMobs() {
        this.getMobs().forEach((e) => {
            // move towards closest defense
            // if it touches it, do damage
            let target = this.getClosestEntityTo(e.x, e.y, (e) => isDef(e))
            if (target == null) return
            let res = moveTowards(e, target)
            // the entity reached the target
            if (res.sucess) {
                this.attack(e, target)
            }
        })
    }
    attack(a, d) {
        this.takeDamage(d, a.attack)
        if (isMob(a)) {
            this.takeDamage(a, 1)
        }
        else if (isDef(a)) {

        }
    }
    takeDamage(e, d) {
        e.h -= d
        //console.log(`${e.getName()} has taken ${d} damage.`)
        if (e.h <= 0) {
            this.onEntityDeath(e)
        }
    }
    onEntityDeath(e) {
        this.removeEntity(e)
        //if (isMob(e)) {
        //    console.log('A mob has died')
        //}
        //if (isDef(e)) {
        //    console.log('A defense has died')
        //}
    }
}