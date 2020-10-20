import io from 'socket.io-client'

import { from_json } from '../shared/actions.js'
import { Gamestate } from '../shared/gamestate.js'
import { Login } from './login.js'
import { Display } from './display.js'

import * as PIXI from 'pixi.js'

export class Client {
		constructor() {
				this.gamestate = new Gamestate()
				this.display = new Display(this)
				this.socket = io()
				this.login = new Login(this.socket, () => this.on_login())
		}
		on_login() {
				this.socket.on('initial_update', (data) => {
						for (let turn in data.past_actions) {
								let pa = data.past_actions[turn]
								for (const a of pa) {
										this.gamestate.add_action(from_json(a))
								}
								this.gamestate.do_turn()
						}
				})
				this.socket.on('update', (data) => {
						this.gamestate.add_actions(data.actions)
						this.gamestate.do_turn()
				})
		}
}

const client = new Client()
