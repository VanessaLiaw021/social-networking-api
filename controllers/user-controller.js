//Import model 
const { User } = require("../models");

//Export the following functions 
module.exports = {

    //Function that get all users 
    getAllUsers(req, res) {

        //Find all users
        User.find()

            //Display the actual thought content by user instead of id 
            .populate({ path: "thoughts" })
            .select("-__v")

            //Return data as json and if any error display it
            .then(allUser => res.json(allUser))
            .catch(err => res.status(500).json(err))
    },

    //Function that get a single user 
    getSingleUser(req, res) {

        //Find one user
        User.findOne({ _id: req.params.id })

            //Display the actual thought content by user instead of id
            .populate({ path: "thoughts" })

            //Display the actual friend content by user instead of id
            .populate({ path: "friends" })
            .select("-__v")

            //Return data as json and if any error display it
            .then(user => 
                
                //Check to see if id exist, then get that specific user by id
                !user ? res.status(400).json({ message: "No user exist with the ID "}) : res.json(user)

            ).catch(err => res.status(500).json(err))
    },

    //Function that add a new user 
    createUser(req, res) {

        //Create a user
        User.create(req.body)
        
            //Return data as json if any error display it
            .then(addUser => res.json(addUser)).catch(err => res.status(500).json(err))
    },

    //Function that update a user 
    updateUser(req, res) {

        //Update a user
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })

            //Return data as json if any error display it
            .then(userUpdate => 
                
                //Check to see if id exist, then update user
                !userUpdate ? res.status(400).json({ message: "No user exist with ID" }) : res.json(userUpdate)

            ).catch(err => res.status(500).json(err))
    },
    
    //Function that delete a user 
    deleteUser(req, res) {
        
        //Delete a user
        User.findOneAndDelete({ _id: req.params.id })

            //Return data as json if any error display it
            .then(userDelete => 

                //Check to see if id exist, then delete the user
                !userDelete ? res.status(400).json({ message: "No user exist with ID" }): res.json(userDelete)

            ).catch(err => res.status(500).json(err))
    },

    //Function that add a friend 
    addFriend(req, res) {

        //Add friend
        User.findOneAndUpdate(

            //Add friend with using user id 
            { _id: req.params.userId }, 

            //Push the friends created that is associated to the username
            { $push: { friends: req.params.friendId }}, 

            //Set new to true and runValidators 
            { new: true, runValidators: true }

        //Return data as json and if any error display it
        ).then(friendAdd => res.json(friendAdd)).catch(err => res.status(500).json(err))
    },

    //Function that remove a friend 
    removeFriend(req, res) {

        //Remove friend
        User.findOneAndUpdate(

            //Remove friend with using user id
            { _id: req.params.userId },

            //Pull the friends deleted that is associated to the username 
            { $pull: { friends: req.params.friendId }},

            //Set new to true
            { new: true }

        //Return data as json and if any error display it
        ).then(friendRemove => 

            //Check to see if id exist, then remove friend
            !friendRemove ? res.status(400).json({ message: "No user exist with ID" }): res.json(friendRemove)

        ).catch(err => res.status(500).json(err))
    }
};