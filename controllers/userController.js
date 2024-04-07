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
    }
}