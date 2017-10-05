// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
// require bodyParser
var bodyParser = require('body-parser');
// require session:
var session = require('express-session');

// use session:
app.use(session({secret: 'grantssecretencrypter'}));  // string for encryption
// use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// root route to render the index.ejs view
app.get('/', function(req, res) {
    if(req.session.counter){
        req.session.counter += 1;
    } else{
        req.session.counter = 1;
    }
    console.log(req.session.counter, req.session);
 res.render("index", {counter: req.session.counter});
})

// Adds an extra 1 to session counter before redirect, so really adding 2 each time pressed
app.post('/plus2', function(req, res) {
    console.log("POST DATA", req.body);
    if(req.session.counter){
        req.session.counter += 1;
    } else{
        req.session.counter = 1;
    }
 res.redirect('/');
})

// Resets session counter back to 0
app.post('/reset', function(req, res) {
    console.log("POST DATA", req.body);
    if(req.session.counter){
        req.session.counter = 0;
    } else{
        req.session.counter = 0;
    }
 res.redirect('/');
})


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
