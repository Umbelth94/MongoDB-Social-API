const mongoose = require('mongoose');

//Create a new instance of the Mongoose Schema to define shape of our document
const userSchema = new mongoose.Schema({
    name: { type: String, required:true},
    email: String,
    lastAccessed: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

User.create({
    name: 'Veronica',
    email: 'veronica@gg.com'
}).then ( result => console.log('Created new document', result))
.catch(err => handleError(err));

module.exports = User;