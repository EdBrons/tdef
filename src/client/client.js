import io from 'socket.io-client'

import { Map } from '../shared/map.js'
import { Login } from './login.js'
import { Display } from './display.js'

import * as PIXI from 'pixi.js'

export class Client {
		constructor() {
				this.gamestate = new Map()
				this.socket = io()
				this.login = new Login(this.socket, () => this.on_login())
		}
		on_login() {
				this.display = new Display(this)
				this.socket.on('initial_update', (data) => {
						this.gamestate = data
				})
				this.socket.on('update', (data) => {
						data.actions.forEach(a => {
								console.log(a)
						})
				})
		}
}

const client = new Client()
