let mouse_down = false

let mouse_start_x = 0
let mouse_start_y = 0

let mouse_now_x = 0
let mouse_now_y = 0

let onmousedown = (e) => {
    mouse_start_x = e.clientX
    mouse_start_y = e.clientY
    mouse_down = true
}

let onmouseup = (e) => {
    mouse_down = false
}

let onmousemove = (e) => {
    mouse_now_x = e.clientX
    mouse_now_y = e.clientY
}

let init = () => {
    window.addEventListener('mousedown', onmousedown)
    window.addEventListener('mouseup', onmouseup)
    window.addEventListener('mousemove', onmousemove)
}

let get_mouse_data = () => {
    return {
        mouse_is_down: mouse_is_down,
        mouse_pos: {
            x: mouse_now_x,
            y: mouse_now_y,
        },
        mouse_down_start: {
            x: mouse_start_x,
            y: mouse_start_y,
        },
    }
}

export { init, get_mouse_data }