let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
console.log("1#" + io);
console.log(io);
const port = process.env.PORT || 1443;
// const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

    console.log('user connected', socket.id); 
   
    socket.on("new-message", function (message,jsonarray) {
        console.log(jsonarray);
        io.emit("new-message", message,jsonarray);
        // io.emit("newbid-message", bidmessage, bidmatchseries);
    });
    // socket.off('new-message');        
    
    socket.on("newbid-message", function (bidmessage, bidmatchseries) {
        console.log(bidmessage);
        io.emit("newbid-message", bidmessage, bidmatchseries);
    });
    // socket.off('newbid-message'); 

});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});