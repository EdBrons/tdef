import map from './map.js'

export default class Unit {
    constructor(id, fid, pos, type) {
        this.id = id
        this.fid = fid
        this.pos = pos
        this.type = type
		this.speed = map.tile_size / 300
    }
}