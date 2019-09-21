/// --- SERVER

// Require Modules
const express        = require("express");
const mongoose       = require("mongoose");
const axios          = require("axios");
const cheerio        = require("cheerio");
const handlebarsSuck = require("express-handlebars");
const bodyParser     = require("body-parser");

// Database Models
//const db = require("./models");

// Config Express Server
const app = express();
app.engine('handlebars', handlebarsSuck());         // Define Handlebars from module
app.set('view engine', 'handlebars');               // Assign Handlebars as our viewing engine
app.use(bodyParser.urlencoded({extended: false}));  // Multi-part body parsing middleware
app.use(bodyParser.json());                         // JSON Support from body parsing


// Routes
require("./routes/routes")(app);

// Initialize Server
app.listen(3000, function(){
    console.log("We good.");
});