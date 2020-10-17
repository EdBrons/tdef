import * as PIXI from 'pixi.js'

const LOADER = PIXI.Loader.shared
const TEXTURES = PIXI.utils.TextureCache

class Background extends PIXI.Sprite {
		constructor() {
				super(TEXTURES['map.png'])
		}
}

class Camera extends PIXI.Container {
		constructor() {
				super()
				this.scale.set(10)
		}
		move_by(dx, dy) {
				this.x -= dx
				this.y -= dy
				this.bound()
		}
		scale_by(ds) {
				this.scale.set(this.scale.x + ds, this.scale.y + ds)
		}
		bound() {
				this.x = Math.min(this.x, 0)
				this.y = Math.min(this.y, 0)
				this.x = Math.max(window.innerWidth - this.width, this.x)
				this.y = Math.max(window.innerHeight - this.height, this.y)
		}
}

export class Display {
		constructor() {
				PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
				this.app = new PIXI.Application()
				this.keys = new KeyboardInput()
				document.body.appendChild(this.app.view)
				LOADER.add('map.png').load(() => this.on_load())
		}
		on_load() {
				this.resize()
				window.onresize = () => this.on_resize()
				this.camera = new Camera()
				this.background = new Background()
				this.camera.addChild(this.background)
				this.app.stage.addChild(this.camera)

				// keyboard movement
				this.keys.add_cb(38, () => this.camera.move_by(0, -1))
				this.keys.add_cb(37, () => this.camera.move_by(-1, 0))
				this.keys.add_cb(40, () => this.camera.move_by(0, 1))
				this.keys.add_cb(39, () => this.camera.move_by(1, 0))
		}
		on_resize() {
				this.resize()
		}
		resize() {
				this.app.renderer.resize(window.innerWidth, window.innerHeight)
		}
}

class KeyboardInput {
		constructor() {
				this.keys_down = {}
				this.cbs = {}
				// 30 times a second
				this.delay = 1000 / 30
				addEventListener("keydown", (e) => {this.keys_down[e.keyCode] = true})
				addEventListener("keyup", (e) => {this.keys_down[e.keyCode] = false})
				this._loop_helper()
		}
		add_cb(k, f) {
				if (!this.cbs[k]) { 
						this.cbs[k] = [] 
				}
				if (!Array.isArray(k)) { 
						k = [k] 
				}
				this.cbs[k].push(f)
		}
		is_active(keys) {
				for (const k of keys) {
						if (!(k in this.keys_down)) return false
						if (!this.keys_down[k]) return false
				}
				return true
		}
		_loop_helper() {
				this._loop()
				setTimeout(() => this._loop_helper(), this.delay)
		}
		_loop() {
				for (const keys_str in this.cbs) {
						const keys = keys_str.split(",")
						if (this.cbs[keys] != undefined && this.is_active(keys)) {
								for (const f of this.cbs[keys]) f()
						}
				}
		}
}
