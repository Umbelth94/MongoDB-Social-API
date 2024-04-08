const mongoose = require('mongoose');
const dayjs = require('dayjs');

// Defining the reaction subdocument Schema
const reactionSchema = new mongoose.Schema({
    reactionId: {
        //use mongoose's ObjectId data type
        //default value is set to a new ObjectId
        type: mongoose.Schema.Types.ObjectId,
        default: () => mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //Getter function to format the date
        get: function () {
            return dayjs(this.createdAt).format('MMMM DD YYYY');
        }
    }
})

//Defining the thoughtSchema 
const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 120,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //Getter function to format the date
        get: function () {
            return dayjs(this.createdAt).format('MMMM DD YYYY');
        }
       },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reactions: [reactionSchema],
});

thoughtSchema.virtual('reactionCount', function () {
    return this.reactions.length;
});


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;

