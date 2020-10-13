export class Display {
        constructor() {
                this.canvas = document.getElementById('canvas')
                this.c = canvas.getContext('2d')
                this.c.imageSmoothingEnabled = false;
                this.map_image = new Image()
                this.map_image.src = "map.png"
        }
}
