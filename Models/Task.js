var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var TaskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  is_done : Boolean,
},
{ timestamps: true }
);

Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
