// for debug
const default_username = ""
const default_password = ""
const auto_login = true

export class Login {
        constructor(socket, onsuccess) {
                this.socket = socket
                this.onsuccess = onsuccess

                // html elements
				if (!auto_login) {
						this.logindiv = document.getElementById("login-div")
						this.username = document.getElementById("login-username")
						this.password = document.getElementById("login-password")
						this.button = document.getElementById("login-button")
						this.button.onclick = () => this.try_login(
							this.username.value,
							this.password.value
						)
				}

                if (auto_login) this.try_login()
        }
        try_login(username=default_username, password=default_password) {
            console.log("Trying to login...")
            this.socket.emit("login", {
                    username: username,
                    password: password
            })
            this.socket.on("login", (data) => {
                    if (data.success) {
                            console.log("Login successful!")
                            if (!auto_login) { 
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
