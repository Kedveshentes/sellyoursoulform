var express    = require('express'),
	bodyParser = require('body-parser'),
    app        = express();


var staticOccupations = [
	'programmer', 'plumber', 'freelancer', 'data analyst', 'dancer',
	'lighting designer', 'producer', 'sailor', 'astronaut', 'astrophysicist',
	'journalist', 'poet', 'butcher', 'milkman', 'author'
]


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

app.get('/search/occupation', function (request, response) {
	var searchString = request.query.string,
		results      = [];

	console.log(searchString);

	for (var i = 0; i < staticOccupations.length; i++) {
		if (staticOccupations[i].indexOf(searchString.toLowerCase()) >= 0) {
			results.push(staticOccupations[i]);
		}
	}

	response.writeHead(200, {
		'Content-type' : 'application/json'
	});
	response.end(JSON.stringify(results));
    /*res.send(JSON.stringify({ a: 1 }));*/
});

app.get('/', function (request, response) {
	response.sendfile(__dirname + '/client/index.html');
});

console.log('listening on port 3000');