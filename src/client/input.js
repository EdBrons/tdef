const update_time = 1000 / 60

export class Input {
		constructor(d) {
				this.display = d
				this.keydown = {}
				addEventListener('keydown', (e) => this.onkeydown(e))
				addEventListener('keyup', (e) => this.onkeyup(e))
				this.update_helper()
		}
		onkeydown(e) {
				this.keydown[e.keyCode] = true
		}
		onkeyup(e) {
				this.keydown[e.keyCode] = false
		}
		update_helper() {
				this.update()
				setTimeout(() => this.update_helper(), update_time)
		}
		update() {
				// camera movement
				let d = { x: 0, y: 0 }
				// right arrow
				if (this.keydown[39]) {
						d.x++
				}
				// left arrow
				if (this.keydown[37]) {
						d.x--
				}
				// up arrow
				if (this.keydown[38]) {
						d.y--
				}
				// down arrow
				if (this.keydown[40]) {
						d.y++
				}
				this.display.move_camera(d.x, d.y)

				// zooming
				let ds = 0
				// z && shift
				if (this.keydown[90] && this.keydown[16]) {
						ds--
				}
				// z
				else if (this.keydown[90]) {
						ds++
				}
				this.display.add_scale(ds)
		}
}
