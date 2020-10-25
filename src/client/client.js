import io from 'socket.io-client'

import { from_json, MapPlaceUnit, MapMoveUnit } from '../shared/actions.js'
import { Gamestate } from '../shared/gamestate.js'
import { Login } from './login.js'
import { Display } from './display.js'

import * as PIXI from 'pixi.js'

export class Client {
		constructor() {
				this.gamestate = new Gamestate()
				this.display = new Display(this, () => {
						this.socket = io()
						this.login = new Login(this.socket, () => this.on_login())
				})
		}
		move_unit(u_id, dest) {
				let from_tile = this.gamestate.map.unit_tile(u_id)
				let from = {
						x: from_tile.x,
						y: from_tile.y
				}
				this.socket.emit('action', { a: new MapMoveUnit(u_id, from, dest) })
		}
		on_login() {
				this.socket.on('initial_update', (data) => {
						for (let pa of data.past_actions) {
								for (const a of pa) {
										console.log('action: ', a)
										this.gamestate.add_action(from_json(a))
										this.gamestate.do_turn()
								}
						}
				})
				this.socket.on('update', (data) => {
						for (const a of data.actions) {
								this.gamestate.add_action(from_json(a))
						}
						this.gamestate.do_turn()
				})
		}
}

const client = new Client()
