import map from '../shared/map.js'

export function random(max, min=0) {
    return Math.floor(Math.random() * (max - min) + min)
}

export function remove_from_arr(arr, el) {
    arr = arr.splice()
    let i = arr.indexOf(el)
    if (i != -1) arr.splice(i, 1)
    return arr
}

export function terrain_at(pos) {
    return map.terrain[pos.y][pos.x]
}

export function vec(x, y) {
    return {
        x: x,
        y: y
    }
}

export function is_equal(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y
}

export function add(pos1, pos2) {
    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y,
    }
}

export function sub(pos1, pos2) {
    return {
        x: pos1.x - pos2.x,
        y: pos1.y - pos2.y,
    }
}

export function mul(pos, s) {
    return {
        x: pos.x * s,
        y: pos.y * s
    }
}

export function div(pos, s) {
    return {
        x: pos.x / s,
        y: pos.y / s
    }
}

export function mag(vec) {
    return Math.sqrt(vec.x**2 + vec.y**2)
}

export function distance(v1, v2) {
    return mag(sub(v1, v2))
}

export function floor(pos) {
    return {
        x: Math.floor(pos.x),
        y: Math.floor(pos.y)
    }
}

export function local_to_global(pos) {
    return {
        x: Math.floor(pos.x / map.tile_size),
        y: Math.floor(pos.y / map.tile_size)
    }
}

export function client_to_global(pos, scale) {
    return local_to_global(floor(div(pos, scale)))
}