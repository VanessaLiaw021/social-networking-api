//Import model 
const { Thought, User } = require("../models");

//Export the following functions 
module.exports = {

    //Function to get all thoughts 
    getAllThoughts(req, res) {

        //Find all thought
        Thought.find()
            .populate({ path: "reactions" })
            .select("-__v")
            .then(allThoughts => res.json(allThoughts))
            .catch(err => res.status(500).json(err))
    },

    //Function to get a single thought 
    getSingleThought(req, res) {

        //Find a single thought 
        Thought.findOne({ _id: req.params.thoughtId })
            .populate({ path: "reactions" })
            .select("-__v")
            .then(singleThought => 

                //Check to see if id exist, then get that specific thought
                !singleThought ? res.status(400).json({ message: "No thought exist with ID" }): res.json(singleThought)

            ).catch(err => res.status(500).json(err))
    },

    //Function to create a thought 
    createThought(req, res) {

        //Create a thought 
        Thought.create(req.body)
            .then(thought => User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thought._id }}, { new: true }))
            .then(thoughtCreate => res.json(thoughtCreate))
            .catch(err => res.status(500).json(err))
    },

    //Function to update a thought 
    updateThought(req, res) {

        //Update a thought 
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true, runValidators: true })
            .then(thoughtUpdate => 

                //Check to see if id exist, then update thought
                !thoughtUpdate ? res.status(400).json({ message: "No thought exist with ID" }): res.json(thoughtUpdate)

            ).catch(err => res.status(500).json(err))
    },

    //Function to delete a thought
    deleteThought(req, res) {

        //Delete a thought 
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(thoughtDelete => 

                //Check to see if id exist, then delete the thought
                !thoughtDelete ? res.status(400).json({ message: "No thought exist with ID" }): res.json(thoughtDelete)

            ).catch(err => res.status(500).json(err))
    },

    //Function to add a reaction 
    addReaction(req, res) {

        //Add a reaction 
        Thought.findOneAndUpdate(

            { _id: req.params.thoughtId }, 
            { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username}}}, 
            { new: true }

        ).then(reactionAdd => res.json(reactionAdd)).catch(err => res.status(500).json(err))
    },

    //Function to remove a reaction 
    removeReaction(req, res) {

        //Remove a reaction 
        Thought.findOneAndUpdate(
            
            { _id: req.params.thoughtId }, 
            { $pull: { reactions: { _id: req.params.reactionId}}}, 
            { new: true }

        ).then(reactionDelete => 
            
            //Check to see if id exist, then remove reaction
            !reactionDelete ? res.status(400).json({ message: "No thought exist with ID" }) : res.json(reactionDelete)
        
        ).catch(err => res.status(500).json(err))
    }
};