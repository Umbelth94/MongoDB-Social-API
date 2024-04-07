const mongoose = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
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
            .populate('reactions');

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
}