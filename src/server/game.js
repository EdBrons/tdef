class Fac {
    constructor(id) {
        this.id = id
    }
}

class Game {
    load_default(width = 100, height = 100) {
        this.width = width
        this.height = height
        this.unit_vals = []
        this.unit_facs = []
        this.facs = []
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.unit_vals.push(0)
                this.unit_facs.push(null)
            }
        }
    }
    in_bounds(x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height
    }
    get_units_at(x, y) {
        return this.in_bounds(x, y) ? this.unit_vals[x + y * this.width] : null
    }
    get_fac_at(x, y) {
        return this.in_bounds(x, y) ? this.unit_facs[x + y * this.width] : null
    }
}