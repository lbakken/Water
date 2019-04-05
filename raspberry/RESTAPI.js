var express = require('express');
var app = express();

// query directly to the raspberry pi, skipping the sql database
// NOT A GOOD IDEA
app.get('/')