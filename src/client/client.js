import { Login } from './login.js'
import io from 'socket.io-client'

const socket = io()
let login = new Login(socket, (data) => {
    console.log(`My id is ${data.cid}`)
})