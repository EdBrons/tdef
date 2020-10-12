import map_data from '../shared/map.js'
import { TERRAIN_COLORS } from './colors.js'
import * as utils from '../shared/utils'

let ts = map_data.tile_size

export function draw_map(ctx, top, data) {
	const ts = map_data.tile_size

	let get_fac_color = (fid) => {
		return data.players[fid].color
	}

	// tile game coords
	let fill_tile = (x, y, color) => {
		x -= top.x
		y -= top.y
		ctx.fillStyle = color
		ctx.fillRect(
			x * ts, y * ts,
			ts, ts
		)
	}

	// local game coords
	let draw_square = (x, y, color, r) => {
		x -= top.x
		y -= top.x
		ctx.fillStyle = color
		ctx.fillRect(
			x * ts - r, y * ts - r,
			2 * r, 2 * r
		)
	}

	// draw map
    for (let y = 0; y < map_data.height; y++) {
        for (let x = 0; x < map_data.width; x++) {
            let terrain = utils.terrain_at(utils.vec(x, y))
            let color = TERRAIN_COLORS[terrain]
			fill_tile(x, y, color)
        }
    }

    // draw cities
    data.cities.forEach(c => {
		draw_square(c.pos.x, c.pos.y, get_fac_color(c.fid), 4)
    })

    // draw units
    data.units.forEach(u => {
		draw_square(u.pos.x, u.pos.y, get_fac_color(u.fid), 2)
    })

	if (data.tick % 10 == 0) {
		//console.log(data)
	}
}
