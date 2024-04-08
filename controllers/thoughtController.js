const mongoose = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
    
async getAllThoughts(req, res) {
    try {
        const thoughts = await Thought.find()
            // .populate({
            //     path: 'username',
            //     // select: 'username' // Only select the username field from the User model
            // })
            // .populate({
            //     path: 'reactions',
            //     populate: {
            //         path: 'username',
            //         // select: 'username' // Only select the username field from the User model
            //     }
            // })


        console.log(thoughts);
        res.json(thoughts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal server error'});
    }
},

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            .populate(
                {
                    path: 'reactions',
                    populate: {
                        path: 'username',
                        select: 'username'
                    }
        });

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID'})
            }

            console.log(thought);
            res.json(thought);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },
    //Create a new thought
    async createThought(req, res) {
        try {
            // Step 1: Find the user based on the provided username
            const user = await User.findOne({ _id: req.body.userId });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


    
            // Step 2: Create the thought using the user's ObjectId
            const thoughtData = {
                thoughtText: req.body.thoughtText,
                username: req.body.username, // Use the user's ObjectId as the username for now.  
                userId: user._id 
            };
    
            const thought = await Thought.create(thoughtData);
    
            // Send a response with the created thought
            res.json(thought);
        } catch (error) {
            console.error('Error creating thought:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    //Update an existing thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, {new: true});
            res.json(thought);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },
    //Delete an existing thought
}