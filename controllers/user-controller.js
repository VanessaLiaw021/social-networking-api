//Import model 
const User = require("../models/User");

//Export the following functions 
module.exports = {

    //Function that get all users 
    getAllUsers(req, res) {
        User.find()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
    },
};