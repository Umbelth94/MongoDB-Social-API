const mongoose = require('mongoose');
const { User, Thought } = require('../models');

module.exports = { 
    //Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            // .populate('thoughts');
            console.log(users);
            res.json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(err);
        }
    },
    //Get a single user by their id, and populated thought and friend data
    async getUserByID(req, res) {
        try {
            console.log('User ID from request:', req.params.userId)
            const user = await User.findOne({_id: req.params.userId})
               .populate('thoughts')
               .populate('friends');
            
            if (!user) {
                return res.status(404).json({message: 'No user with that ID'})
            }

            console.log(user);
            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },
    //Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },
    //Update an existing user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true});
            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },
    //Delete an existing user (This doesn't work yet)
    async deleteUserAndThoughts(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});

            if (!user) {
                throw new Error('User not found');
            }

            //Extract the IDs of the thoughts associated with the user
            const thoughtIds = user.thoughts;

            //Delete the thoughts using their IDs
            await Thought.deleteMany({ _id: {$in: thoughtIds}})


            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },
    //Add a friend to a user
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId}, 
                {$addToSet: {friends: req.params.friendId}}, 
                {new: true});
            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },
    //Remove a friend from a user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.userId}, 
                {$pull: {friends: req.params.friendId}}, 
                {new: true});
            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        }
    },
}