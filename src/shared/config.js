export const Terrain = {}

Terrain.Types = { Water: 0, Beach: 1, Plains: 2, Forest: 3, Highland: 4, Count: 5}

export const Unit = {}

Unit.Types = { Infantry: 0, Mechanized: 1, Naval: 2, Count: 3 }

// Health
Unit.Health = [4, 6, 6]

// Movement
Unit.CantMove = -1
Unit.MovementCost = [
	[-1, 2, 2, 2, 3],
	[-1, 1, 1, 3, 4],
	[1, -1, -1, -1, -1]
]

// Attack
Unit.CantAttack = -1
Unit.Attack = [
	[2, 1, -1],
	[3, 2, -1],
	[-1, -1, 2]
]

export const Building = {}

Building.Types = { Farm: 0, Mine: 1, LumberMill: 2 }
