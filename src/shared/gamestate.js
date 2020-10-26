import EventEmitter from 'events'

import { MapWidth, MapHeight } from './config.js'
import { Map, Tile } from './map.js'
import { MapPlaceUnit } from './actions.js'

export class Gamestate extends EventEmitter {
		constructor() {
				super()
				this.turn = 0
				this.map = new Map(MapWidth, MapHeight)
				this.past_actions = []
				this.actions = []
		}
		load_default() {
				const place_unit = new MapPlaceUnit(0, {x: 25, y: 17})
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
						if (!a.can_execute(this.map)) continue
						a.execute(this.map)
						this.emit(a.name, a)
						this.past_actions[this.turn].push(a)
				}
				this.turn++
		}
}
