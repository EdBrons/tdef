import map_data from '../shared/map.js'
import { TERRAIN_COLORS } from './config.js'

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
}
