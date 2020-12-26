var mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  is_done : Boolean,
},
{ timestamps: true }
);
mongoose.model('Task', TaskSchema);
module.exports = mongoose.model('Task');
