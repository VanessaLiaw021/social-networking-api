//Import required packages
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//Schema for Thought Model 
const thoughtSchema = new Schema(
    {
        //Schema for thought text
        thoughtText: {
            type: String, 
            required: true, 
            minLength: 1, 
            maxLength: 280
        },

        //Scehema for created at 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: (time) => format_date(time)
        },

        //Schema for username 
        username: {
            type: String,
            required: true
        },

        //Schema for reactions 
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },

        id: false
    }
);

//Create a virtual property "reactionCount" that retrieves the length of the user's friends array
thoughtSchema.virtual("reactionCount").get(function() { return this.reactions.length });

//Initialize the Thought model 
const Thought = model("Thought", thoughtSchema);

//Export Thought model 
module.exports = Thought;