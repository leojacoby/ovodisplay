const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  text: {type: String, required: true},
  completed: {type: Boolean, default: false}
})

const TodoItem = mongoose.model('TodoItem', todoItemSchema);

module.exports = TodoItem;
