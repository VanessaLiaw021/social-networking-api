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

    //Function that add a new user 
    createUser(req, res) {
        User.create(req.body)
            .then(addUser => res.json(addUser))
            .catch(err => res.status(500).json(err))
    },

    //Function that update a user 
    updateUser(req, res) {
        User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(update => res.json(update))
            .catch(err => res.status(500).json(err))
    }
};