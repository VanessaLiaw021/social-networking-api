//Import model 
const { User, Thought } = require("../models");

//Export the following functions 
module.exports = {

    //Function that get all users 
    getAllUsers(req, res) {
        User.find()
            .populate({ path: "thoughts", select: "-__v "})
            .populate({ path: "friends", select: "-__v"})
            .select("-__v")
            .then(allUser => res.json(allUser))
            .catch(err => res.status(500).json(err))
    },

    //Function that get a single user 
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({ path: "thoughts", select: "-__v" })
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err))
    },

    //Function that add a new user 
    createUser(req, res) {
        User.create({ username: req.body.username, email: req.body.email })
            .then(addUser => res.json(addUser))
            .catch(err => res.status(500).json(err))
    },

    //Function that update a user 
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(userUpdate => res.json(userUpdate))
            .catch(err => res.status(500).json(err))
    },
    
    //Function that delete a user 
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then(userDelete => res.json(userDelete))
            .catch(err => res.status(500).json(err))
    },

    //Function that add a friend 
    addFriend(req, res) {
        User.findOneAndUpdate(

            { _id: req.params.userId }, 
            { $push: { friends: req.params.friendId }}, 
            { new: true, runValidators: true }

        ).then(friendAdd => res.json(friendAdd)).catch(err => res.status(500).json(err))
    },

    //Function that remove a friend 
    removeFriend(req, res) {
        User.findOneAndUpdate(

            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }

        ).then(friendRemove => res.json(friendRemove)).catch(err => res.status(500).json(err))
    }
};