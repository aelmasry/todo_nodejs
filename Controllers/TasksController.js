let express = require('express');
let router = express.Router();

let Task = require('../Models/Task');

/* GET tasks listing. */
router.get('/', (req, res, next) => {
  const name = req.query.name;
  let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Task.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tasks."
      });
    });
});

/* GET task by id. */
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Task.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Task with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Task with id=" + id });
    });
});

// create todo and send back all todos after creation
router.post('/store', (req, res, next) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Task name is required" });
    return;
  }

  Task.create({
    name: req.body.name,
    description: req.body.description,
    is_done: req.body.done ? req.body.done : false
  })
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
});

// update task
router.post('/update/:id',  (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  let id = req.params.id;
  // update task
  Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`
        });
      } else res.send({ message: "Task was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });
});

// delete task
router.delete('/', (req, res, next) => {
  let id = req.body.id;
  Task.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
        });
      } else {
        res.send({
          message: "Task was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });
});

module.exports = router;
