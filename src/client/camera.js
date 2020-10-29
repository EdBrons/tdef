import * as PIXI from 'pixi.js'

export class Camera extends PIXI.Container {
		constructor() {
				super()
		}
		set_background(b) {
				this.background = b
				this.addChild(b)
		}
		move_by(dx, dy) {
				this.x -= dx
				this.y -= dy
				this.bound()
		}
		move_to_tile(x, y) {
				this.x = -x * this.scale.x * this.background.scale.x
				this.y = -y * this.scale.y * this.background.scale.y
				this.bound()
		}
		scale_by(ds) {
				this.scale.set(this.scale.x + ds, this.scale.y + ds)
				let d = ds / this.scale.x
				this.move_by(this.width * d, this.height * d)
				this.bound()
		}
		bound() {
				this.x = Math.min(this.x, 0)
				this.y = Math.min(this.y, 0)
				this.x = Math.max(window.innerWidth - this.width, this.x)
				this.y = Math.max(window.innerHeight - this.height, this.y)
		}
}

