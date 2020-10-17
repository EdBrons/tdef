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
				this.zoom = 5
				this.scale.set(this.zoom)
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
		}
		on_resize() {
				this.resize()
		}
		resize() {
				this.app.renderer.resize(window.innerWidth, window.innerHeight)
		}
}
