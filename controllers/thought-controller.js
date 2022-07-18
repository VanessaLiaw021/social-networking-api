//Import model 
const { Thought, User } = require("../models");

//Export the following functions 
module.exports = {

    //Function to get all thoughts 
    getAllThoughts(req, res) {

        //Find all thought
        Thought.find()  

            //Display the actual reaction content by user instead of id
            .populate({ path: "reactions" })

            //Return data as json and if any error display it
            .then(allThoughts => res.json(allThoughts))
            .catch(err => res.status(500).json(err))
    },

    //Function to get a single thought 
    getSingleThought(req, res) {

        //Find a single thought 
        Thought.findOne({ _id: req.params.id })

            //Display the actual reaction content by user instead of id
            .populate({ path: "reactions" })

            //Return data as json and if any error display it
            .then(singleThought => 

                //Check to see if id exist, then get that specific thought
                !singleThought ? res.status(400).json({ message: "No thought exist with ID" }): res.json(singleThought)

            ).catch(err => res.status(500).json(err))
    },

    //Function to create a thought 
    createThought(req, res) {

        //Create a thought 
        Thought.create(req.body)

            //Push the thought created that is associated with the user's username
            .then(thought => User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thought._id }}, { new: true }))

            //Return data as json and if any error display it 
            .then(thoughtCreate => res.json(thoughtCreate))
            .catch(err => res.status(500).json(err))
    },

    //Function to update a thought 
    updateThought(req, res) {

        //Update a thought 
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })

            //Return data as json and if any error display it
            .then(thoughtUpdate => 

                //Check to see if id exist, then update thought
                !thoughtUpdate ? res.status(400).json({ message: "No thought exist with ID" }): res.json(thoughtUpdate)

            ).catch(err => res.status(500).json(err))
    },

    //Function to delete a thought
    deleteThought(req, res) {

        //Delete a thought 
        Thought.findOneAndDelete({ _id: req.params.id })

            //Return data as json and if any error display it
            .then(thoughtDelete => 

                //Check to see if id exist, then delete the thought
                !thoughtDelete ? res.status(400).json({ message: "No thought exist with ID" }): res.json(thoughtDelete)

            ).catch(err => res.status(500).json(err))
    },

    //Function to add a reaction 
    addReaction(req, res) {

        //Add a reaction 
        Thought.findOneAndUpdate(

            //Add reaction with using thought id
            { _id: req.params.thoughtId },
            
            //Push the reaction created that is associated to the username
            { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username }}},
            
            //Set new to true
            { new: true }

        //Return data as json and if any error display it
        ).then(reactionAdd => res.json(reactionAdd)).catch(err => res.status(500).json(err))
    },

    //Function to remove a reaction 
    removeReaction(req, res) {

        //Remove a reaction 
        Thought.findOneAndUpdate(
            
            //Remove reaction with using thought id 
            { _id: req.params.thoughtId }, 

            //Pull the reaction deleted that is associated with that reaction id
            { $pull: { reactions: { _id: req.params.reactionId }}}, 

            //Set new to true
            { new: true }

        //Return data as json and if any error display it
        ).then(reactionDelete => 
            
            //Check to see if id exist, then remove reaction
            !reactionDelete ? res.status(400).json({ message: "No thought exist with ID" }) : res.json(reactionDelete)
        
        ).catch(err => res.status(500).json(err))
    }
};