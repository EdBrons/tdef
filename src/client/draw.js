import map_data from '../shared/map.js'
import * as utils from '../shared/utils'
import map from '../shared/map.js'

// water, beach, plains, forest, highland
let terrain_colors = [
    "#000099",
    "#0000FF",
    "#00FF00",
    "#009900",
    "#990000"
]

let city_color = "#FF0000"

let unit_color = "#FFFFFF"

let draw_sqaure = (ctx, color, x, y, r) => {
    ctx.fillStyle = color
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
}

export function draw_map(ctx, top, data) {
    // draw map
    let ts = map_data.tile_size
    for (let y = 0; y < map_data.height; y++) {
        for (let x = 0; x < map_data.width; x++) {
            let terrain = utils.terrain_at(utils.add(utils.vec(x, y), top))
            let color = terrain_colors[terrain]
            ctx.fillStyle = color
            ctx.fillRect(
                x * ts, y * ts,
                ts, ts
            )
        }
    }
    if (!data) return
    // draw cities
    data.cities.forEach(c => {
        draw_sqaure(ctx, city_color, c.pos.x * ts, c.pos.y * ts, 4)
    })
    // draw units
    data.units.forEach(u => {
        draw_sqaure(ctx, unit_color, u.pos.x * ts, u.pos.y * ts, 1)
    })
}