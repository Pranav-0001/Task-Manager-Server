import { Server } from "socket.io";


export const socket=(server)=>{
    const io=new Server(server , {
        pingTimeout:60000,
        cors:{
            origin: '*',
            methods: ["GET", "POST", "PUT"]
        },
    })
    io.on("connection",(socket)=>{
        socket.on('login',(userId)=>{
            console.log(`${userId} joined the room`);
            socket.join(userId) 
        })
        socket.on("new-task",(task)=>{
            io.emit("broadcast-task",task)
        })
    })
}