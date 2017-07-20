const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const TodoItem = require('../models/TodoItem.js')

mongoose.connection.on('connected', function() {
  console.log("Successfully connected to MongoDB")
})

mongoose.connect(process.env.MONGODB_URI)

router.get('/', (req, res) => {
  console.log('fetching todoitems');
  TodoItem.find()
    .then(todoItems => {
      res.json(todoItems)
    })
})

router.post('/add', (req, res) => {
  const {text, completed, _id} = req.body.todoItem
  new TodoItem({
    _id: _id,
    text: text,
    completed: completed
  }).save()
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })
})

router.post('/remove', (req, res) => {
  console.log("removing");
  var id = req.body._id
  TodoItem.remove({_id: id}, (err, todoItem) => {
    console.log('item removed')
  })
})

router.post('/complete', (req, res) => {
  console.log("completing item");
  var id = req.body._id;
  var status = req.body.status
  TodoItem.findOneAndUpdate({_id: id}, {$set: {completed: !status}}, (err, todoItem) => {
    console.log('item completed')
  })
})
module.exports = router;
