const express = require("express");
var fs = require('fs');
var http = require('http');
var https = require('https');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();
require("dotenv/config");

//Middlewares
//var whitelist = ['http://ylevigroup.com','https://ylevigroup.com','https://scrm.ylevigroup.com', 'http://scrm.ylevigroup.com', 'https://localhost', 'http://localhost','http://ylevigroup.com/dbb','https://ylevigroup.com/dbb','*']
//app.use(cors(whitelist));
app.use(cors());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  
});
//import routes
const projRoute = require('./routes/projectsr');
app.use(bodyParser.json());
app.use('/projects', projRoute);
//Routes
app.get("/yonor", (req, res) => {
  res.send("Sir yonor top dev");
});
app.get("/posts", (req, res) => {
  res.send("We are on home");
});
//Connect to DB
mongoose.connect(process.env.DB_CONNECION, { useNewUrlParser: true, useUnifiedTopology: true } , () =>
  console.log("Connected to db")
);
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
//Listen
//app.listen(process.env.PORT || 3000);
const PORT_http = process.env.PORT || 3000;
const PORT_htts = process.env.PORT || 3001;

httpServer.listen(PORT_http, () => {
    console.log(`Our http app is running on port ${ PORT_http }`);
});

httpsServer.listen(PORT_htts, () => {
  console.log(`Our https app is running on port ${ PORT_htts }`);
});

