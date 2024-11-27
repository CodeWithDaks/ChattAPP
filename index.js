//We use this http module because we want to make a connection between express and Socket.IO.
//we not use directly app.listen here
const http =require("http");

const express =require ("express");
const path =require("path");

const {Server} =require("socket.io");

const app =express();
const server =http.createServer(app);
const io =new Server(server);

//-->Socket.io(All Socket.io thing handle here and http request handle by express)

io.on('connection',(socket)=>{
    
    socket.on("user-message",(message)=>{
    // console.log("A new User Message",message); //Yaha ham console kara ka message server ka pass hi rakh raha ha par hama use dusra clent ka pas sebd karna ha.So we do:-
    io.emit("message",message);
  });
});


app.use(express.static(path.resolve("./public")));

app.get('/',(req,res)=>{
     return res.sendFile("/public/index.html");
});


server.listen(9000,()=>{
    console.log(`Server Started At PORT:9000`);
});
