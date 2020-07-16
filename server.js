var http = require('http');
var app = require('./app');

var port = process.env.port | 3000;
var server = http.createServer(app);

server.listen(port, ()=>{
    console.log("Server berjalan pada server http://localhost:3000");
});