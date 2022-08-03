const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server (server, {
  cors: {
    origin: "http://localhost:8081",
  }
});

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  renderWithHeader(res, {filename: "/chat"}, "stdheader");
});

io.on('connection', (socket)=>{
  console.log('cunt connected');
  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  });
  socket.on('sendMessage', (msg) => {
    if(msg.length < 3)
    {
      console.log(socket.client);
      console.log("fucky");
      return;
    }
    console.log(msg);
    console.log(socket.client);
    socket.emit('sendMessage', msg);
  });
});


function renderWithHeader(res, array) {
  renderWithHeader(res, array, 'stdheader')
}
function renderWithHeader(res, array, header) {
    array.header=header;
    res.render('templates/template', array);
}
server.listen(3000, () => {
  console.log('listening on *:3000');
});




function simpleStringify (object){
    // stringify an object, avoiding circular structures
    // https://stackoverflow.com/a/31557814
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};
