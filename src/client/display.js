export class Display {
        constructor() {
                this.div = document.getElementById("game")
                this.canvas = document.getElementById("canvas")
                this.c = canvas.getContext('2d')
                this.c.imageSmoothingEnabled = false;
                this.map_image = new Image()
                this.map_image.src = "map.png"

				this.camera = { x: 0, y: 0 }
                this.scale = 20

                window.onresize = () => {
                        this.draw_map()
                }
        }
        fit_canvas() {
                canvas.style.width = this.map_image.width * this.scale + "px"
                canvas.style.height = this.map_image.height * this.scale + "px"
        }
        draw_map() {
				this.fit_canvas()
				this.c.drawImage(this.map_image, -this.camera.x, -this.camera.y)
        }
		move_camera(dx, dy) {
				this.camera.x += dx
				this.camera.y += dy
				this.bound_camera()
				this.draw_map()
		}
		bound_camera() {
				this.camera.x = Math.max(this.camera.x, 0)
				this.camera.y = Math.max(this.camera.y, 0)
				this.camera.x = Math.min(this.camera.x, this.map_image.width - window.innerWidth / this.scale)
				this.camera.y = Math.min(this.camera.y, this.map_image.height - window.innerHeight / this.scale)
		}
}
