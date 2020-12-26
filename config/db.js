'user strict';

const mongoose = require('mongoose');

//connect to mongoose
const DATABASE_URL = 'mongodb://127.0.0.1:27017/todo';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(DATABASE_URL, options);
mongo.then(() => {
    console.log('DB connected');
}, error => {
    console.log(error, 'error');
})

module.exports = mongo;
