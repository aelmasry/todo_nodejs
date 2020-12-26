let express = require('express');
let router = express.Router();
// let bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
let Task = require('../Models/Task');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Task.find({}, function (err, tasks) {
    if (err) return res.status(500).send("There was a problem finding the tasks.");
    res.status(200).send(tasks);
  });
});

// create todo and send back all todos after creation
router.post('/store', function (req, res) {
  // create a task
  Task.create({
    name: req.body.name,
    description: req.body.description,
    is_done: false
  },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(user);
    });
});



// create todo and send back all todos after creation
router.post('/update/:id', function (req, res) {
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

module.exports = router;
