//Import required packages
const { Schema, model, Types } = require("mongoose");

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

//Schema for the reaction model
const reactionSchema = new Schema(
    {
        //Schema for reaction id
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId()
        },

        //Schema for reaction body 
        reactionBody: {
            type: String, 
            required: true, 
            maxLength: 200
        },

        //Schema for username 
        username: {
            type: String, 
            required: true
        },

        //Schema for created at 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: (time) => format_date(time)
        }
    },
    {
        toJSON: {
            getters: true
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