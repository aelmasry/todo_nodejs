const User = require("../Models/User");
console.log('user controller')

exports.login = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "field is required" });
    return;
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false });

    res.status(200).send({ auth: true});
  });
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "content is required" });
    return;
  }

  let password = bcrypt.hashSync(req.body.password, 10);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: password
  })
  .then(data => {
    res.status(200).send({ message: "User registration success" });
  }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};
