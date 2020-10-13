export class Display {
        constructor() {
                this.div = document.getElementById("game")
                this.canvas = document.getElementById("canvas")
                this.c = canvas.getContext('2d')
                this.c.imageSmoothingEnabled = false;
                this.map_image = new Image()
                this.map_image.src = "map.png"

                this.scale = 15

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
                this.c.drawImage(this.map_image, 0, 0)
        }
}
