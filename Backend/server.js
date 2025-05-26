const app = require('./app');
const http = require('http');
const Port = process.env.port || 4000

const server = http.createServer(app);

server.listen(Port , ()=>{
    console.log(`server start on port: ${Port}`);
    
})

