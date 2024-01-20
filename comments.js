// Create new web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = require('./comments.json');
var path = require('path');

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Set up server
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/comments', function(req, res){
	res.json(comments);
});

// Post comments
app.post('/comments', function(req, res){
	comments.push(req.body);
	fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err){
		res.json(comments);
	});
});

// Start server
app.listen(3000, function(){
	console.log('Server running on port 3000');
});