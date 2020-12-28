// use express package
const express = require('express')
      cors = require('cors'),
      bodyParser = require('body-parser'),
      createError = require('http-errors'),
      path = require('path'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');;


const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:3000"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const dbconnect = require('./config/database.js')

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to todo application." });
});

let tasksController = require('./Controllers/TasksController')
app.use('/tasks', tasksController)

require('./routes/users')(app);
require('./routes/index')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message : 'error'});
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
