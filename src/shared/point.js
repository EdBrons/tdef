export class Point {
		constructor(x, y) {
				this.x = x
				this.y = y
		}
		add(p) {
				return new Point(
					this.x - p.x,
					this.y - p.y
				)
		}
		sub(p) {
				return new Point(
					this.x - p.x,
					this.y - p.y
				)
		}
		scale(a) {
				return new Point(
					this.x * a,
					this.y * b
				)
		}
		mag() {
				return Math.sqrt(this.x**2 + this.y**2)
		}
		dist_to(p) {
				return this.sub(p).mag()
		}
		dot(p) {
				return this.x * p.x + this.y * p.y
		}
}
