export const Terrain = {}

Terrain.Types = {
		Water: 0, Beach: 1, Plains: 2, Forest: 3, Highland: 4, Count: 5
}

export const Unit = {}

Unit.Types = {
		Infantry: 0, Mechanized: 1, Naval: 2, Count: 3
}

// Health
Unit.Health = {}
Unit.Health[Unit.Types.Infantry] = 4
Unit.Health[Unit.Types.Mechanized] = 6
Unit.Health[Unit.Types.Infantry] = 6

// Movement
const MovementCostMatrix = [
	[-1, 2, 2, 2, 3],
	[-1, 1, 1, 3, 4],
	[1, -1, -1, -1, -1]
]
Unit.MovementCost = {}
Unit.CantMove = -1
for (let u = 0; u < Unit.Types.Count; u++) {
		Unit.MovementCost[u] = {}
		for (let t = 0; t < Terrain.Types.Count; t++) {
				Unit.MovementCost[u][t] = MovementCostMatrix[u][t]
		}
}

// Attack
const UnitAttackMatrix = [
	[2, 1, -1],
	[3, 2, -1],
	[-1, -1, 2]
]
Unit.Attack = {}
Unit.CantAttack = -1
for (let u = 0; u < Unit.Types.Count; u++) {
		Unit.Attack[u] = {}
		for (let a = 0; a < Unit.Types.Count; a++) {
				Unit.MovementCost[u][a] = UnitAttackMatrix[u][a]
		}
}
