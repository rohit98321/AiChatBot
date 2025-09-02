require("dotenv").config()
const app =require("./src/app")
const {createServer}=require("http")
const {Server}=require("socket.io")
const generateResponse = require("./src/service/ai.service")

const httpServer=createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173"
    }
})

const chatHistory=[
   
]

io.on("connection",(socket)=>{
    console.log("connect");


    socket.on("disconnect",()=>{
        console.log("disconnect");
    })


    //custom event
    socket.on("ai-message",async (data)=>{
        

        chatHistory.push({
            role:"user",
            parts:[{text:data}]
        })

    
        const aiResponse=await generateResponse(chatHistory)


        
        chatHistory.push({
            role:"model",
            parts:[{text:aiResponse}]
        })

        console.log(aiResponse);
        socket.emit("ai-message-response",{aiResponse})
    })



    
})



httpServer.listen(3000,()=>{
    console.log("server running on 3000 port");
})