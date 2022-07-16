//Import model 
const User = require("../models/User");

//Export the following functions 
module.exports = {

    //Function that get all users 
    getAllUsers(req, res) {
        User.find()
            .then(allUser => res.json(allUser))
            .catch(err => res.status(500).json(err));
    },

    //Function that get a single user 
    getSingleUser(req, res) {
        User.findOne({ id: req.params.id })
            .then(singleUser => res.json(singleUser))
            .catch(err => res.status(500).json(err))
    },
};