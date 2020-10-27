import io from 'socket.io-client'

import { Gamestate } from '../shared/gamestate.js'
import { Login } from './login.js'
import { Display } from './display.js'

import * as PIXI from 'pixi.js'

export class Client {
		constructor() {
				this.gamestate = new Gamestate()
				this.display = new Display(this, () => this.on_load())
		}
		on_load() {
				this.socket = io()
				this.login = new Login(this.socket, () => this.on_login())
		}
		on_login() {
				// something
		}
}

const client = new Client()
