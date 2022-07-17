//Import model 
const { Thought, User } = require("../models");


//Export the following functions 
module.exports = {

    //Function to get all thoughts 
    getAllThoughts(req, res) {

        //Find all thought
        Thought.find()
            .populate({ path: "reactions", select: "-__v"})
            .select("-__v")
            .then(allThoughts => res.json(allThoughts))
            .catch(err => res.status(500).json(err))
    },

    //Function to get a single thought 
    getSingleThought(req, res) {

        //Find a single thought 
        Thought.findOne({ _id: req.params.id })
            .populate({ path: "reactions", select: "-__v"})
            .select("-__v")
            .then(singleThought => res.json(singleThought))
            .catch(err => res.status(500).json(err))
    },

    //Function to create a thought 


    //Function to update a thought 


    //Function to delete a thought

};