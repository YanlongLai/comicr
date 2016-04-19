'use strict';

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var main = require('./main');

// DB postgre
var pgp = require("pg-promise")();
/*options*/var db = pgp("postgres://laiyanlong@localhost:5432/comicr");

db.one("SELECT $1 AS value", 123).then(function (data) {
    console.log("DATA:", data.value);
}).catch(function (error) {
    console.log("ERROR:", error);
});

// DB
// var mongoose   = require('mongoose');
// var uri = 'mongodb://comicr:hunter318@ds033018.mlab.com:33018/comicr';
// var uri = 'mongodb://comicr:hunter318@ds025399.mlab.com:25399/comicr';
// mongoose.connect(uri, function(error) {
// console.log(error);
// }); // connect to our database
// Output - 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
// console.log(mongoose.connection.readyState);

// Start your program
// var Bear     = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initial function
// TODO follow data to parser all comic volumns and save them
// 		and then pass to specfic router path

var port = process.env.PORT || 8000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    // console.log(data.length);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var userAgent = req.headers['user-agent'];
    console.log(userAgent + '\n' + ip);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res, next) {
    // console.log(main._run);
    res.setHeader('Content-Type', 'application/json');
    main._run(function (data) {
        res.write(JSON.stringify(data, null, 3));
        res.end();
    });
});

router.get('/:comic', function (req, res, next) {
    var comic = req.param('comic');
    res.setHeader('Content-Type', 'application/json');
    main._getVolumn(comic, function (data) {
        res.write(JSON.stringify(data, null, 3));
        res.end();
    });

    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify(volumn, null, 3));
    // res.end();
    // next();
});

router.get('/:comic/:volumn*', function (req, res, next) {
    var comic = req.param('comic');
    var volumn = req.param('volumn');
    res.setHeader('Content-Type', 'application/json');
    main._getPage(comic, volumn, 0, function (data) {
        res.write(JSON.stringify(data, null, 3));
        res.end();
    });
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

// create a bear (accessed at POST http://localhost:8080/api/bears)
.post(function (req, res) {

    var bear = new Bear(); // create a new instance of the Bear model
    bear.name = req.body.name; // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function (err) {
        if (err) res.send(err);

        res.json({ message: 'Bear created!' });
    });
});

// // get all the bears (accessed at GET http://localhost:8080/api/bears)
// .get(function(req, res) {
//     Bear.find(function(err, bears) {
//         if (err)
//             res.send(err);

//         res.json(bears);
//     });
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Comic Server runs on port ' + port);