import map_data from '../shared/map.js'
import { TERRAIN_COLORS } from './colors.js'

let ts = map_data.tile_size

export function draw_map(ctx) {
        const ts = map_data.tile_size
        const top = {
                x: 0,
                y: 0
        }

        let get_fac_color = (fid) => {
                return "#FF000"
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
                        let terrain = 0
                        let color = TERRAIN_COLORS[terrain]
                        fill_tile(x, y, color)
                }
        }
}
