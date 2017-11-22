
const port = (process.env.PORT || 3000);
var proxy = require('html2canvas-proxy');
var express = require('express');

var app = express();
app.use('/', proxy());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log("Server running on port", port);

app.listen(port);