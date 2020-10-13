const update_time = 1000 / 60

export class Input {
		constructor(d) {
				this.display = d

				this.keydown = {}
				addEventListener('keydown', (e) => this.onkeydown(e))
				addEventListener('keyup', (e) => this.onkeyup(e))

				this.mousedown = false
				this.mouse_pos = {}
				this.mousedown_pos = {}
				this.mouseup_pos = {}
				addEventListener('mousedown', (e) => this.onmousedown(e))
				addEventListener('mouseup', (e) => this.onmouseup(e))
				addEventListener('mousemove', (e) => this.onmousemove(e))

				this.update_helper()
		}
		// keys
		onkeydown(e) {
				this.keydown[e.keyCode] = true
		}
		onkeyup(e) {
				this.keydown[e.keyCode] = false
		}
		// mouse
		onmousedown(e) {
				this.movedown = true
				this.mousedown_pos = this.display.client_to_global({x: e.clientX, y: e.clientY})
				console.log(this.mousedown_pos)
		}
		onmouseup(e) {
				this.movedown = false
				this.mouseup_pos = this.display.client_to_global({x: e.clientX, y: e.clientY})
		}
		onmousemove(e) {
				this.mouse_pos = this.display.client_to_global({x: e.clientX, y: e.clientY})
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
				// this.display.add_scale(ds)
		}
}
