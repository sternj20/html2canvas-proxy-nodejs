
var port = (process.env.PORT || 3000);
var proxy = require('html2canvas-proxy');
var express = require('express');

var app = express();
app.use('/', proxy());



console.log("Server running on port", port);

app.listen(port);