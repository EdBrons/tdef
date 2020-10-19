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
				this.scale.set(15)
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
				this.init_keyboard()
		}
		init_keyboard() {
				this.keys = new KeyboardInput()
				const move_speed = 6
				const scale_speed = .1
				// keyboard movement
				this.keys.add_cb(38, () => this.camera.move_by(0, -move_speed))
				this.keys.add_cb(37, () => this.camera.move_by(-move_speed, 0))
				this.keys.add_cb(40, () => this.camera.move_by(0, move_speed))
				this.keys.add_cb(39, () => this.camera.move_by(move_speed, 0))
				// scale
				this.keys.add_cb(90, () => this.camera.scale_by(scale_speed))
				this.keys.add_cb(88, () => this.camera.scale_by(-scale_speed))
		}
		on_resize() {
				this.resize()
		}
		resize() {
				this.app.renderer.resize(window.innerWidth, window.innerHeight)
		}
}

// TODO: make combos blocking
// example: [shift + w] should not trigger a [w] event
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
