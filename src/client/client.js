import io from 'socket.io-client'

const socket = io()

let canvas = document.getElementById('maincanvas')
canvas.hidden = true
let c = canvas.getContext('2d')