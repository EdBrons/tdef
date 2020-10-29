// export const port = process.env.PORT
export const port = 2000
export const env = process.env.NODE_ENV
export const dev = process.env.NODE_ENV !== "production"

// temporary
export const users = [
	{
		name: "admin",
		password: "password",
		admin: true
	}
]
