import * as settings from './config.js'
import { Map } from './map.js'

export class Game {
    constructor() {
        this.map = new Map(settings.map_width, settings.map_height)
    }
    do_tests() {
        this.map.create_city(0, 0)
        this.map.create_city(0, 0)
        this.map.create_city(0, 0)
        this.map.create_city(0, 0)
        for (let i = 0; i < 200; i++) {
            this.update_cities()
        }
        this.map.get_cities().forEach(c => console.log(c))
    }
    update_cities() {
        this.map.get_cities().forEach(c => c.update())
    }
}