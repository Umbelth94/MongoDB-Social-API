const mongoose = require('mongoose');
const { User } = require('../models');

module.exports = { 
//Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            console.log(users);
            res.json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(err);
        }
    }
}