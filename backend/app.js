var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// Schemas
const userDefs = require("./graphql/schemas/userSchema");

// Resolvers
const userResolver = require("./graphql/resolvers/userResolver");

const mongoose = require("mongoose");
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const apolloServer = new ApolloServer({
  typeDefs: userDefs,  
  resolvers: userResolver,  
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

// Server will start on 3001 port 
async function startServer(){
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: 3001 }, // You can specify the port here as needed
  });
}

mongoose.connect(process.env.DEV_DB_URL)
  // Connect to db then start the server
  .then(() => {
    console.log('MongoDB connected') 
    startServer();
  })
  .catch(err => console.error('MongoDB connection error:', err));


module.exports = app;
