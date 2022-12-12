import express from "express"
import {createServer} from "http"
import cors from 'cors'
import {Server} from "socket.io"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import routerUser from "./routes/userRoute"
import routerMessage from "./routes/messageRouter"

dotenv.config()
const port = process.env.PORT || 5050
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true,
    }
})

app.use(cors())
app.use(express.json())
app.use('/api/auth', routerUser)
app.use('/api/message', routerMessage)


if (process.env.DB_URL) {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Connect with DB")
        })
        .catch(() => {
            console.log("don't connect DB")
        })
}

httpServer.listen(port, () => {
    console.log(`Server start on PORT: ${port}`)
})


const onlineUsers = new Map()

io.on("connection", (socket) => {
    console.log("Connection")
    socket.on("add-user", (data) => {
        if (!onlineUsers.get(data.id)) {
            onlineUsers.set(data.id, socket.id)
            for (let key of onlineUsers) {
                if (key[1] !== socket.id) {
                    socket.to(key[1]).emit('update-users', data)

                }
            }
        } else {
            onlineUsers.set(data.id, socket.id)
        }
    })


    socket.on("add-message", (data) => {
        const currentOnlineUser = onlineUsers.get(data.message.usersChat[1])
        console.log(currentOnlineUser)
        if (currentOnlineUser) {
            socket.to(currentOnlineUser).emit("msg-recieve", data.message)
        }

    })

    io.on("disconnect", () => {
        console.log("disconnect")
    })
})

