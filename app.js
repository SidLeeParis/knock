var express = require('express'),
	path 	= require('path');

app = express();

app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'dist')));

var port = process.env.PORT || 5000;

app.listen(port);