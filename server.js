//Import required packages 
const { application } = require("express");
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

//Start express server
const PORT = process.env.PORT || 3001;
const app = express();

//Parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Read from the routes directory 
app.use(routes);

//Listening to the port 
db.once("open", () => { app.listen(PORT, () => { console.log(`API server running on ${PORT}`)})});