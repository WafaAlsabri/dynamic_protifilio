/*
const express = require('express');



const app = express()
const port = process.env.PORT | 5000;

require('./models/db');
const path = require('path');
const expejs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');
const experinceController = require('./controllers/experinceController');
const skillController = require('./controllers/skillController');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));



app.set('view engine', 'ejs')
// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/img'))

// Set Templating Engine

app.use('/user', employeeController);
app.use('/skill', skillController);
app.use('/experince', experinceController);
app.set('view engine', 'ejs')



app.get('', (req, res) => {
    res.render('index', { title: 'Home Page'})
})


app.get('/sidebar', (req, res) => {
    res.render('sidebar', { title: 'sidebar Page'})
})
app.get('/skills', (req, res) => {
    res.render('skills', { title: 'skills Page'})
})
app.get('/login', (req, res) => {
    res.render('login', { title: 'login Page'})
})



app.get('/experinces', (req, res) => {
    res.render('experinces', { title: 'experince Page'})
})

app.get('/Education', (req, res) => {
    res.render('Education', { title: 'Education Page'})
})
// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`));*/

const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');

const bodyParser = require('body-parser');

const indexRouter = require('./router/index');

const app = express();

app.listen(7000, () => {
    console.log('Express server started at port : 7000');
});
// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('views'));
app.use(express.static('public'));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
