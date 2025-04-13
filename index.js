const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http,{
    cors:{
        origin:'exp://172.22.36.155:8081'
    }
})
const PORT = 4000;
var robot = require("robotjs")

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

socketIO.on('connection',(socket)=>{
    console.log(`${socket.id} got connected`)
    socket.on('click',(msg)=>{
        if(msg.length==1){
            robot.keyToggle(msg,"down")
        }
        else{
            robot.keyToggle(msg[0],"up")
        }
        console.log(msg)
    })
})

app.get('/api',(req,res)=>{
    console.log(req,res);
})

http.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})