var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// import URL routes
var posts = require('./routes/posts');
var comments = require('./routes/comments');

// remove the following middleware in the production version
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

// uncomment the following line for the production version
//app.use(express.static('public'));

// the following 2 middleware convert the URL req and res to json format
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// use Express to handle routes
app.use('/posts', posts);
app.use('/comments', comments);

// connect to mongoDB using mongoose driver
mongoose.connect('mongodb://localhost/startUp', { useMongoClient: true });

app.listen(3700, function () {
    console.log('The Start-up server is listening on port 3700');
});
