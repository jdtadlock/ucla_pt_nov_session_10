const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const api_routes = require('./routes/api_routes');
const auth_routes = require('./routes/auth_routes');
const port = process.env.PORT || 5000;
const config = require('./config');

mongoose.connect('mongodb://localhost/ucla_10');
mongoose.Promise = Promise;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api_routes);
app.use('/auth', auth_routes);

app.listen(port, () => console.log(`Listening on port port`));