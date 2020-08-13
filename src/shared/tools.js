export const COLLISION_TYPES = { NEUTRAL: 0, HOSTILE: 1, FRIENDLY: 2 }
export function get_collision_type(ent1, ent2, sim) {
    return COLLISION_TYPES.NEUTRAL
}