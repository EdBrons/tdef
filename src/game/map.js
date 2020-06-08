import * as settings from './config.js'
import { City } from './city.js'

class Tile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.food_production = 1
        this.cities = []
    }
    add_city(city) {
        this.cities.push(city)
    }
    remove_city(city) {
        i = this.cities.indexOf(city)
        if (i != -1) this.cities.splice(i, 1)
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
    get_cities() {
        return this.tiles.flat().map(t => t.cities).flat()
    }
    create_city(x, y) {
        let city = new City(this.get_new_id())
        this.get_tile(x, y).add_city(city)
    }
}