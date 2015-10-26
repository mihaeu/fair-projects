var express = require('express');
var app = express();

// static files like html, js, css or images are served from here
app.use(express.static('public'));

// load routes and inject our app
require('./app/routes')(app);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Fair Projects app listening at http://%s:%s', host, port);
});