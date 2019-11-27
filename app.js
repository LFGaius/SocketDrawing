const app=require('express')();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const PORT=process.env.PORT||8000;
//const {check,validationResult}=require('express-validator');
//const bodyParser=require('body-parser');

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');

app.get('/app',(req,res)=>{
    res.status(200).render('app.ejs');
});

io.on('connection',(socket)=>{
    //default events: disconnect,connect,message,broadcast,emit,send
    // socket.on('disconnect',()=>{
    //     console.log('A user has just leaved the connection!');
    // });
    // socket.on('message',()=>{
    //     console.log('A user sent message!');
    // });
    // socket.on('connect',()=>{
    //     console.log('A user is connected!');
    // });
    console.log('There is a new connected user!');
    socket.on('disconnect',()=>{
        console.log('A user has just leaved the connection!');
    });
    socket.on('clientmessage',(msg)=>{
        console.log('Client:'+msg);
        socket.send('servermessage');//emit sends response only to  the sender(the one who sent the message for which we are in that block)
        //socket.emit('servermessage','HI!I am the server!');//emit sends response only to  the sender(the one who sent the message for which we are in that block)
        //socket.broadcast.emit('servermessage','HI!I am the server!');//broadcast sends response to everybody except  the sender(the one who sent the message for which we are in that block)
    });
    socket.on('servermessage',(msg)=>{
        console.log('Server:I receive a server message!');
    });
});

http.listen(8000,()=>{
    console.log('App listening at the url http://localhost:'+PORT)
})