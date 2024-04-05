//Import mongoose 
const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/thoughts'

connect(connectionString);

module.exports = connection;