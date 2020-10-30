// TODO: make combos blocking
// example: [shift + w] should not trigger a [w] event
export class KeyboardInput {
		constructor() {
				this.keys_down = {}
				this.cbs = {}
				// 30 times a second
				this.delay = 1000 / 30
				addEventListener("keydown", (e) => {this.keys_down[e.keyCode] = true})
				addEventListener("keyup", (e) => {this.keys_down[e.keyCode] = false})
				this._loop_helper()
		}
		add_cb(k, f) {
				if (!this.cbs[k]) { 
						this.cbs[k] = [] 
				}
				if (!Array.isArray(k)) { 
						k = [k] 
				}
				this.cbs[k].push(f)
		}
		is_active(keys) {
				for (const k of keys) {
						if (!(k in this.keys_down)) return false
						if (!this.keys_down[k]) return false
				}
				return true
		}
		_loop_helper() {
				this._loop()
				setTimeout(() => this._loop_helper(), this.delay)
		}
		_loop() {
				for (const keys_str in this.cbs) {
						const keys = keys_str.split(",")
						if (this.cbs[keys] != undefined && this.is_active(keys)) {
								for (const f of this.cbs[keys]) f()
						}
				}
		}
}
