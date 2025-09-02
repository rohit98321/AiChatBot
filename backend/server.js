require("dotenv").config()
const app =require("./src/app")
const {createServer}=require("http")
const {Server}=require("socket.io")
const generateResponse = require("./src/service/ai.service")

const httpServer=createServer(app)
const io = new Server(httpServer)

io.on("connection",(socket)=>{
    console.log("connect");


    socket.on("disconnect",()=>{
        console.log("disconnect");
    })


    //custom event
    socket.on("ai-message",async (data)=>{
        console.log("message recieved",data);

        const aiResponse=await generateResponse(data)
    })


    
})



httpServer.listen(3000,()=>{
    console.log("server running on 3000 port");
})