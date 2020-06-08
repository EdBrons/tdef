import * as settings from './config.js'
import { Map } from './map.js'

export class Game {
    constructor() {
        this.map = new Map(settings.map_width, settings.map_height)
    }
    do_tests() {
    }
}