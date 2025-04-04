var http = require('http');
const { connectDB } = require('./db');
const { fetchUserById } = require('./schema/user');

//create a server object:
const server = http.createServer(function (req, res) {
    connectDB()
    console.log("Hi")
    const data = fetchUserById()
    console.log(data)
  res.write('Hello World!'); 
  res.end(); 
})


server.listen(8080, () => {
    console.log("server started");
  }); 