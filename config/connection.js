//Import required packages 
const { connect, connection } = require("mongoose");

//Connect to the local host 
connect("mongodb://localhost/socialNetworkDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Export connection 
module.exports = connection;