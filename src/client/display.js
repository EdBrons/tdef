import * as PIXI from 'pixi.js'

import { KeyboardInput } from './keyboard.js'
import { Camera } from './camera.js'

const LOADER = PIXI.Loader.shared
const TEXTURES = PIXI.utils.TextureCache
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

class Background extends PIXI.Sprite {
		constructor() {
				super(TEXTURES['map.png'])
				this.scale.set(12)
				this.interactive = true
		}
}

class Unit extends PIXI.Sprite {
		constructor(texture) {
				super(texture)
				this.interactive = true
		}
}

export class Display {
		constructor(client, on_load) {
				this.client = client
				this.app = new PIXI.Application()
				document.body.appendChild(this.app.view)
				LOADER.add('map.png').add('sheet.png').load(() => this.on_load(on_load))
		}
		on_load(on_load) {
				this.resize()
				window.onresize = () => this.on_resize()
				this.camera = new Camera()
				this.background = new Background()
				this.init_keyboard()

				TEXTURES['sheet.png'].frame = new PIXI.Rectangle(196, 66, 12, 12)
				this.city_texture = TEXTURES['sheet.png']

				TEXTURES['sheet.png'].frame = new PIXI.Rectangle(79, 66, 12, 12)
				this.boat_texture = TEXTURES['sheet.png']

				const u = new Unit(this.boat_texture)
				u.x = 53 * 12
				u.y = 66 * 12

				this.background.on('click', (e) => {
						let pos = e.data.getLocalPosition(this.background)
						pos.x = Math.floor(pos.x)
						pos.y = Math.floor(pos.y)
						console.log(pos)
				})

				this.camera.set_background(this.background)
				this.app.stage.addChild(this.camera)
				this.camera.addChild(u)

				this.camera.scale.set(1.5)
				this.camera.move_to_tile(40, 60)

				on_load()
		}
		on_resize() {
				this.resize()
		}
		resize() {
				this.app.renderer.resize(window.innerWidth, window.innerHeight)
		}
		init_keyboard() {
				this.keys = new KeyboardInput()
				const move_speed = 6
				const scale_speed = .05
				// keyboard movement
				this.keys.add_cb(38, () => this.camera.move_by(0, -move_speed))
				this.keys.add_cb(37, () => this.camera.move_by(-move_speed, 0))
				this.keys.add_cb(40, () => this.camera.move_by(0, move_speed))
				this.keys.add_cb(39, () => this.camera.move_by(move_speed, 0))
				// scale
				// this.keys.add_cb(90, () => this.camera.scale_by(scale_speed))
				// this.keys.add_cb(88, () => this.camera.scale_by(-scale_speed))
		}
}
