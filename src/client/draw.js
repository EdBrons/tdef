import map_data from '../shared/map.js'
import map from '../shared/map.js'

// water, beach, plains, forest, highland
let color = [
    "#000099",
    "#0000FF",
    "#00FF00",
    "#009900",
    "#990000"
]

export function draw_map(ctx, gx, gy, cw, ch, s) {
    for (let y = gy; y < gy + ch / s; y++) {
        for (let x = gx; x < gx + cw / s; x++) {
            let t = map_data.terrain[y][x]
            ctx.fillStyle = color[t]
            ctx.fillRect(
                x * s, y * s,
                s, s
            )
        }
    }
}

let unit_onscreen = (u, gx, gy, cw, ch, s) => {
    return  gx * map.tile_size < u.x && gy * map.tile_size < u.y 
            && (gx + cw / s) * map.tile_size > u.x && (gy + ch / s) * map.tile_size > u.y 
}

export function draw_units(ctx, gx, gy, cw, ch, s, units) {
    if (!units) return
    let r = 3
    units.filter(u => unit_onscreen(u, gx, gy, cw, ch, s)).forEach(u => {
        ctx.fillStyle = "#000000"
        ctx.fillRect(u.x - r, u.y - r, 2*r, 2*r)
    })
}