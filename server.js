var express = require('express');
var app = express();

var http=require('http');
var https = require('https');

var bodyParser = require('body-parser');

var multer = require('multer');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});

var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/form-maker';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var request = require('request');

// load session support
var session = require('express-session');

// load passport module
var passport = require('passport');

// load cookie parsers
var cookieParser = require('cookie-parser');

// configure cookie parser - needed for oauth
app.use(cookieParser());

// configure session support
var key=process.env.SESSION_SECRET;
app.use(session({
    secret: key,
    resave: true,
    saveUinitialized: true
}));

// initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());



require("./public/assignment/server/app.js")(app,db);
require("./public/project/server/app.js")(app,db);

app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);


app.post('/maps', urlencodedParser, function (req, results) {

    var URL="https://maps.googleapis.com/maps/api/directions/json?&origin=ORIGIN&destination=DESTINATION&key=AIzaSyD_70F4Mj8HaLj4AS8IYt4ZXyJGm2v-KD0";
    var a=URL.replace("ORIGIN",req.body.origin);
    var b=a.replace("DESTINATION",req.body.destination);

    console.log(b);
    request({
            url: b,
            json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                //console.log(response);
               // console.log(body) // Print the json response
                    results.json(body);
            }
        });

    });

app.post('/hello2', function(req, res){
    res.json(app.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LOCATION&types=geocode&key=AIzaSyA3nKVMjeVHJbKe7D8M6U8SFlg4kTZU1bg"));
});

