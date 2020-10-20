import { MapWidth, MapHeight } from './config.js'
import { Map, Tile } from './map.js'
import { MapPlaceUnit } from './actions.js'

export class Gamestate {
		constructor() {
				this.turn = 0
				this.map = new Map(MapWidth, MapHeight)
				this.past_actions = []
				this.actions = []
		}
		load_default() {
				const place_unit = new MapPlaceUnit(0, {x: 0, y: 0})
				this.add_action(place_unit)
		}
		add_action(a) {
				this.actions.push(a)
		}
		add_actions(actions) {
				for (const a of actions) {
						this.add_action(a)
				}
		}
		do_turn() {
				this.past_actions[this.turn] = []
				for (let i = 0; i < this.actions.length; i++) {
						let a = this.actions.shift()
						a.execute(this.map)
						this.past_actions[this.turn].push(a)
				}
				this.turn++
		}
}
