import map_data from '../shared/map.js'
import * as utils from '../shared/utils'

let ts = map_data.tile_size

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

let draw_square = (ctx, color, x, y, r) => {
    ctx.fillStyle = color
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
}


export function draw_map(ctx, top, data) {
    // draw map
	let get_color_for = (fid) => {
		return data.players[fid].color
	}
	let draw_entity = (ctx, color, c, r) => {
		draw_square(ctx, color, (c.pos.x - top.x) * ts, (c.pos.y - top.y) * ts, r)
	}
	// draws an x at these global coords
	let draw_x = (ctx, color, x, y) => {
		x -= top.x
		y -= top.y
		ctx.strokeStyle = color
		ctx.lineWidth = 3

		ctx.beginPath()
		ctx.moveTo(x * ts, y * ts)
		ctx.lineTo((x+1) * ts, (y+1) * ts)
		ctx.stroke()

		ctx.beginPath()
		ctx.moveTo(x * ts, (y+1) * ts)
		ctx.lineTo((x+1) * ts, (y) * ts)
		ctx.stroke()
	}
    for (let y = 0; y < map_data.height - top.y; y++) {
        for (let x = 0; x < map_data.width - top.x; x++) {
            let terrain = utils.terrain_at(utils.add(utils.vec(x, y), top))
            let color = terrain_colors[terrain]
			let fid = data.ownership[x + y * map_data.width]
            ctx.fillStyle = color
            ctx.fillRect(
                x * ts, y * ts,
                ts, ts
            )
			if (fid != -1) {
				ctx.fillStyle = 
				//ctx.fillRect((x - top.x) * ts, (y - top.y) * ts, ts, ts)
				draw_x(ctx, get_color_for(fid), x, y)
			}
        }
    }
    if (!data) return
    // draw cities
    data.cities.forEach(c => {
	    draw_entity(ctx, get_color_for(c.fid), c, 4)
    })
    // draw units
    data.units.forEach(u => {
	    draw_entity(ctx, get_color_for(u.fid), u, 1)
    })
}
