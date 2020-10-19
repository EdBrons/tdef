import { users } from '../server/config.js'

const debug = true
const default_user = users[0]

export class Login {
        constructor(socket, onsuccess) {
                this.socket = socket
                this.onsuccess = onsuccess

                // html elements
				if (!debug) {
						this.logindiv = document.getElementById("login-div")
						this.username = document.getElementById("login-username")
						this.password = document.getElementById("login-password")
						this.button = document.getElementById("login-button")
						this.button.onclick = () => this.try_login(
							this.username.value,
							this.password.value
						)
				}

                if (debug) this.try_login()
        }
        try_login(username=default_user.name, password=default_user.password) {
            console.log("Trying to login...")
            this.socket.emit("login", {
                    username: username,
                    password: password
            })
            this.socket.on("login", (data) => {
                    if (data.success) {
                            console.log("Login successful!")
                            if (!debug) { 
									this.logindiv.hidden = true 
							}
                            this.onsuccess()
                    }
                    else {
                            console.log("Login failed...")
                    }
            })
        }
}
