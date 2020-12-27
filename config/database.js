'user strict';

const mongoose = require('mongoose');

//connect to mongoose
const DATABASE_URL = 'mongodb://127.0.0.1:27017/todo_db';
const mongo = mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

module.exports = mongo;
