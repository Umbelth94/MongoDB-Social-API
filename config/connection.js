//Import mongoose 
const { connect, connection, Schema } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/thoughts'

connect(connectionString);

module.exports = connection;