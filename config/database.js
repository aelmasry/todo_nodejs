'user strict';

const mongoose = require('mongoose'),
      validator = require('validator');

//connect to mongoose
const DATABASE_URL = 'mongodb://127.0.0.1:27017/todo_db';
const mongo = mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch(err => {
    console.log("Database connection error!", err);
    process.exit();
  });

module.exports = mongo;
