var express    = require('express'),
	bodyParser = require('body-parser'),
    app        = express();

app.use(express.static(__dirname + '/client'));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));

app.use(bodyParser.json());

app.listen(3000);


app.post('/userdata', function (request, response) {
	response.writeHead(200, {
		'Content-type': 'text/plain'
	});
	response.end('success'); 
});

app.get('/', function (request, response) {
	response.sendFile(__dirname + '/client/index.html');
});

console.log('listening on port 3000');