export class Display {
        constructor() {
                this.div = document.getElementById("game")
                this.map_canvas = document.getElementById("map-canvas")
				this.map_c = this.map_canvas.getContext('2d')

                this.map_image = new Image()
                this.map_image.src = "map.png"

				this.camera = { x: 0, y: 0 }
                this.map_scale = 20

                window.onresize = () => {
                        this.draw_map()
                }
        }
		// coords
		client_to_global(pos) {
				return {
						x: this.camera.x + Math.floor(pos.x / this.map_scale),
						y: this.camera.y + Math.floor(pos.y / this.map_scale)
				}
		}
		global_to_client(pos) {
				return {
						x: (this.pos.x - this.camera.x) * this.map_scale,
						x: (this.pos.y - this.camera.y) * this.map_scale
				}
		}
		// drawing
        fit_canvas() {
				this.map_canvas.width = this.map_image.width
				this.map_canvas.height = this.map_image.height
				this.map_canvas.style.width = this.map_image.width * this.map_scale + "px"
				this.map_canvas.style.height = this.map_image.height * this.map_scale + "px"
        }
        draw_map() {
				this.fit_canvas()
				this.map_c.drawImage(this.map_image, -this.camera.x, -this.camera.y)
        }
		// camera
		move_camera(dx, dy) {
				this.camera.x += dx
				this.camera.y += dy
				this.bound_camera()
				this.draw_map()
		}
		bound_camera() {
				this.camera.x = Math.max(this.camera.x, 0)
				this.camera.y = Math.max(this.camera.y, 0)
				this.camera.x = Math.min(this.camera.x, this.map_image.width - Math.floor(window.innerWidth / this.map_scale))
				this.camera.y = Math.min(this.camera.y, this.map_image.height - Math.floor(window.innerHeight / this.map_scale))
		}
}
