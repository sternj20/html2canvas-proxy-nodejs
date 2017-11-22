var proxy = require('html2canvas-proxy');
var express = require('express');

var app = express();
app.use('/', proxy());