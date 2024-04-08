const mongoose = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
    
async getAllThoughts(req, res) {
    try {
        const thoughts = await Thought.find()
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
            // Find the user based on the provided username
            const user = await User.findOne({ _id: req.body.userId });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userName = user.username;
    
            // Create the thought using the user's ObjectId
            const thoughtData = {
                thoughtText: req.body.thoughtText,
                username: userName, // Use the user's ObjectId as the username for now.  
                userId: user._id 
            };
            
            // Create the thought
            const thought = await Thought.create(thoughtData);
    
            //Push the thought's ID to the user's thoughts array
            user.thoughts.push(thought._id);
            await user.save();
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
    async deleteThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            res.json(thought);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    //Add a reaction to an existing thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}}, {new: true});
            res.json(thought);
        } catch {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    //Delete a reaction from an existing thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new: true});
            res.json(thought);
        } catch {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }
}