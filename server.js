var express = require('express');
var http=require('http');
var https = require('https');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var request = require('request');

app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);

var urlencodedParser = bodyParser.urlencoded({extended: false});


app.post('/maps', urlencodedParser, function (req, results) {
        //console.log(req);
        //console.log(req.data);
        //console.log(req.params);
        //console.log(req);
        //console.log(req);

    var URL="https://maps.googleapis.com/maps/api/directions/json?&origin=ORIGIN&destination=DESTINATION&key=AIzaSyD_70F4Mj8HaLj4AS8IYt4ZXyJGm2v-KD0";
    var a=URL.replace("ORIGIN",req.body.origin);
    var b=a.replace("DESTINATION",req.body.destination);

    //console.log(b);
    request({
            url: b,
            json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                //console.log(response);
               //    console.log(body) // Print the json response
                    results.json(body);
            }
        });

    });

app.post('/hello2', function(req, res){
    res.json(app.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LOCATION&types=geocode&key=AIzaSyA3nKVMjeVHJbKe7D8M6U8SFlg4kTZU1bg"));
});

