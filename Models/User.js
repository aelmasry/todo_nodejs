
const mongoose = require('mongoose');
const validator = require('validator');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)

const UserSchema = mongoose.Schema(
      {
        name: String,
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          validate: (value) => {
            return validator.isEmail(value)
          }
        },
        password: String
      },
      { timestamps: true }
    );

module.exports = mongoose.model('User', UserSchema);

