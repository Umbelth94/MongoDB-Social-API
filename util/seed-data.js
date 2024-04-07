const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/thoughts');

// Function to seed data
async function seedData() {
  try {
    // Create users
    const user1 = await User.create({ name: 'User1', email: 'user1@example.com' });
    const user2 = await User.create({ name: 'User2', email: 'user2@example.com' });
    const user3 = await User.create({ name: 'User3', email: 'user3@example.com' });

    // Create thoughts
    const thought1 = await Thought.create({
      thoughtText: 'Thought by User1',
      username: user1._id,
    });

    const thought2 = await Thought.create({
      thoughtText: 'Thought by User2',
      username: user2._id,
    });

    // Create reactions
    await Thought.findByIdAndUpdate(thought1._id, {
      $push: { reactions: { reactionBody: 'Reaction to thought1 by User3', username: user3._id } },
    });

    await Thought.findByIdAndUpdate(thought2._id, {
      $push: { reactions: { reactionBody: 'Reaction to thought2 by User3', username: user3._id } },
    });

    console.log('Data seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Seed the data
seedData();