import io from 'socket.io-client'
import * as utils from '../shared/utils'
import { draw_map } from './draw'
import map from '../shared/map.js'
import resources from '../shared/resources.js'

const socket = io()
let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')
let s = 2
let data = {}
let camera_pos = utils.vec(15, 15)
c.scale(s, s)

socket.on('update', (d) => { data = d; default_draw() })

function default_draw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    c.scale(s, s)
    draw_map(c, camera_pos, data)
}

canvas.onclick = (e) => {
	let x = e.clientX
	let y = e.clientY
    let v = utils.add(utils.floor(utils.div(utils.vec(x, y), map.tile_size * s)), camera_pos)
    data.cities.forEach(c => {
        if (utils.is_equal(c.pos, v)) {
            console.log(c)
        }
    })
	//console.log(utils.resource_name(utils.resource_at(v)))
}

window.onresize = () => default_draw()
