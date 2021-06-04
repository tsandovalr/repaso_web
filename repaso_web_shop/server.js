const http = require('http');
const app = require('./app');
require('dotenv').config();

const port = process.env.port || 3000;
console.log('Connected on port:'+port);



const server= http.createServer(app);

server.listen(port);