//Import model 
const { Thought, User } = require("../models");


//Export the following functions 
module.exports = {

    //Function to get all thoughts 
    getAllThoughts(req, res) {

        Thought.find()
            .populate({ path: "reactions", select: "-__v"})
            .select("-__v")
            .then(allThoughts => res.json(allThoughts))
            .catch(err => res.status(500).json(err))
    },

    //Function to get a single thought 


    //Function to create a thought 


    //Function to update a thought 


    //Function to delete a thought

};