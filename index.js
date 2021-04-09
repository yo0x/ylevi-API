const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv/config");
//Middlewares
// app.use(cors());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  
});
//import routes
const projRoute = require('./routes/projectsr');
app.use(bodyParser.json());
app.use('/projects', cors(), projRoute);
//Routes
app.get("/yonor",cors(), (req, res) => {
  res.send("Sir yonor top dev");
});
app.get("/posts",cors(), (req, res) => {
  res.send("We are on home");
});
//Connect to DB
mongoose.connect(process.env.DB_CONNECION, { useNewUrlParser: true, useUnifiedTopology: true } , () =>
  console.log("Connected to db")
);

//Listen
//app.listen(process.env.PORT || 3000);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});