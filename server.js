var express    = require('express'),
	bodyParser = require('body-parser'),
	moment     = require('moment');
	app        = express();


var staticOccupations = [
	'programmer', 'plumber', 'freelancer', 'data analyst', 'dancer',
	'lighting designer', 'producer', 'sailor', 'astronaut', 'astrophysicist',
	'journalist', 'poet', 'butcher', 'milkman', 'author'
];


app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/angular'  , express.static(__dirname + '/node_modules/angular'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));
app.use('/moment'   , express.static(__dirname + '/node_modules/moment'));

app.listen(3000);

app.post('/userdata', function (request, response) {
	var isValid           = true,
		momentOfBirth     = moment(request.body.birthdate),
		aMoment18YearsAgo = moment().subtract(18, 'years');

	if (request.body.email && !request.body.email.match(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)) {
		isValid = false;
	}

	if (request.body.birthdate && momentOfBirth > aMoment18YearsAgo) {
		isValid = false;
	}

	if (isValid) {
		response.writeHead(200, {
			'Content-type': 'text/plain'
		});
		response.end('success');
	} else {
		response.writeHead(403, {
			'Content-type': 'text/plain'
		});
		response.end('forbidden');
		// The client side validation has been passed
	}

});

app.get('/search/occupation', function (request, response) {
	var searchString = request.query.string,
		results      = [];

	for (var i = 0; i < staticOccupations.length; i++) {
		if (staticOccupations[i].indexOf(searchString.toLowerCase()) >= 0) {
			results.push(staticOccupations[i]);
		}
	}

	response.writeHead(200, {
		'Content-type' : 'application/json'
	});
	response.end(JSON.stringify(results));
});

app.get('/', function (request, response) {
	response.sendfile(__dirname + '/client/index.html');
});