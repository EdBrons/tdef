import io from 'socket.io-client'
import { Login } from './login.js'
import * as PIXI from 'pixi.js'

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const socket = io()
const app = new PIXI.Application()

let on_resize = () => {
		app.renderer.resize(window.innerWidth, window.innerHeight)
}

const login = new Login(socket, () => {
		document.body.appendChild(app.view)
		PIXI.Loader.shared.add('map.png').load(() => {
				window.onresize = () => on_resize()
				on_resize()

				const map_sprite = new PIXI.Sprite(PIXI.utils.TextureCache['map.png'])
				map_sprite.x = 0
				map_sprite.y = 0

				app.stage.addChild(map_sprite)

				app.stage.scale.set(5, 5)
		})
        // socket.on('update', (data) => {
		// 		// something
        // })
})
