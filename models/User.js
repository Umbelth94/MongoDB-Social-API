// const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

//Create a new instance of the Mongoose Schema to define shape of our document
const userSchema = new mongoose.Schema({
    name: { 
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        }],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
    lastAccessed: {type: Date, default: Date.now}
})

//Virtual to get the count on a user's number of friends
userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
})



const User = mongoose.model('User', userSchema);

module.exports = User;