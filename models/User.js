//Import required packages
const { Schema, model } = require("mongoose");

//Schema for the User model
const userSchema = new Schema (
    {
        //Schema for username
        username: { 
            type: String, 
            unique: true, 
            required: true,
            trim: true 
        },

        //Schema for email 
        email: { 
            type: String, 
            unique: true, 
            required: true, 
            match: [ 
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Your email is incorrect, please enter a valid email address."
            ] 
        },

        //Schema for thoughts 
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },

        //Schema for friends
        friends: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        toJSON: { virtuals: true },
        id: false
    }
);

//Create a virtual property "friendCount" that retrieves the length of the user's friends array 
userSchema.virtual("friendCount").get(function() { return this.friends.length });

//Initialize the User model 
const User = model("User", userSchema);

//Export User Model 
module.exports = User;