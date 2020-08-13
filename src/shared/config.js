const tilesize = 16
const width = 5
const height = 5

const terrain_names = { OCEAN: 0, LAND: 1 }
const terrain_map = [
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
]

const resource_types = 1
const resource_names = { FOOD: 0 }
const resource_map = [
    [[0], [1], [1], [1], [0]],
    [[0], [1], [1], [1], [0]],
    [[0], [1], [1], [1], [0]],
    [[0], [1], [1], [1], [0]],
    [[0], [0], [0], [0], [0]],
]

export {
    width, height, 
    terrain_names, terrain_map, 
    resource_types, resource_names, resource_map
}