var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var app = express.createServer();

app.register('.ejs', ejs);

// use POST
app.use(express.bodyParser());

app.get('/', function(req, res) {
	var read = fs.createReadStream(__dirname + '/public/slides.html');
	read.on('data', function(data) {
		res.render('index.ejs', {
			locals : {
				slides : data,
			}
		});
	});
});


app.post('/save', function(req, res) {
	var writableStream = fs.createWriteStream(__dirname + '/public/slides.html');
    writableStream.on('close', function(){
    	res.send();
    });
    writableStream.on('error', function(){
    	res.send('error');
    });
    writableStream.write(req.body.text, 'utf8');
    writableStream.end();
});

// Configuration

app.configure('development', function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	var oneYear = 60 * 60 * 24 * 365250;
	app.use(express.static(__dirname + '/public', {
		maxAge : oneYear
	}));
	app.use(express.errorHandler());
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode",
		app.address().port, app.settings.env);
