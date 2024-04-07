// const { Schema, model } = require('mongoose');
// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

//Create a new instance of the Mongoose Schema to define shape of our document
const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required:true, 
            trim: true, 
            unique: true 
        },
        email: {
            type: String,
            required: true,
            Unique: true,
            //Email Validation Regex
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }],
        lastAccessed: {type: Date, default: Date.now}
    },
    {   
        //Include the virtuals in the JSON response
        toJSON: {
            virtuals: true
        }
    }
)

//Virtual to get the count on a user's number of friends
userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
})



const User = model('User', userSchema);

module.exports = User;