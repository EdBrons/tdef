import io from 'socket.io-client'
import * as utils from '../shared/utils'
import { draw_map } from './draw'

const socket = io()
let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')
let s = 2
let data = {}
c.scale(s, s)

socket.on('update', (d) => { data = d; default_draw() })

function default_draw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    c.scale(s, s)
    draw_map(c, utils.vec(15, 15), data)
}

window.onresize = () => default_draw()
