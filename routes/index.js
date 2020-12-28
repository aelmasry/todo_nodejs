module.exports = app => {
  const users = require("../Controllers/UsersController.js");

  var router = require("express").Router();

  // User login
  router.post("/login", users.login);

  app.use('/', router);
};
