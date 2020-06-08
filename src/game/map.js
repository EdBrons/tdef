import * as settings from './config.js'

class Tile {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

export class Map {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.idx = 0
        this.tiles = new Array(height)
        for (let y = 0; y < height; y++) {
            this.tiles[y] = new Array(width)
            for (let x = 0; x < width; x++) {
                this.tiles[y][x] = new Tile(x, y)
            }
        }
    }
    get_new_id() {
        return this.idx++
    }
    get_tile(x, y) {
        return this.tiles[y][x]
    }
}