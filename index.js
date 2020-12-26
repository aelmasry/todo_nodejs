// use express package
const express = require('express')
      cors = require('cors'),
      session = require('express-session'),
      bodyParser = require('body-parser')
      createError = require('http-errors');
      // md5 = require('md5'),
      // path = require('path') ;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', process.env.PORT || 3000);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const dbconnect = require('./config/db.js')

let tasksController = require('./Controllers/TasksController')
app.use('/api/tasks', tasksController)

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

app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
