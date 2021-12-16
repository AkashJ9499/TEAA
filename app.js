const bodyParser = require('body-parser');
var express = require('express');
const session = require('express-session');

const path = require('path');
var rootRouter = require('./routes/rootRouter');
var authRouter = require('./routes/authRouter');
var appointmentRouter = require('./routes/appointmentRouter');
var availableDaysRouter = require('./routes/availableDaysRouter')

const morgan = require('morgan');
var gcal = require('./util/gcal.js');

const auth = {};
global.auth = this.auth;
var app = express()

gcal.initAuth(setAuth);

function setAuth(auth) {
  this.auth = auth;
  console.log('\nServer is now running... Ctrl+C to end');
}

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));


app.use('/',rootRouter)
app.use('/auth/',authRouter)
app.use('/appointment/',appointmentRouter)
app.use('/available/',availableDaysRouter)

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});