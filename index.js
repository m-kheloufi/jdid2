
const { request, response } = require('express');




var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'wawa.sba47',
	database : 'nodelogin'
});
var app = express();


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			console.log("query result:", results);
			console.log(error)
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
                var vis="true";
                if (typeof localStorage === "undefined" || localStorage === null) {
                    var LocalStorage = require('node-localstorage').LocalStorage;
                    localStorage = new LocalStorage('./scratch');
                 }
                 
                 
         localStorage.setItem("viss",vis);
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.redirect('index.html')
		
        
		
		
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);








const Datastore = require('nedb')

app.listen(3001, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.static('static'));
app.use(express.json())

const subway = new Datastore('polyline.db')
subway.loadDatabase();
const station = new Datastore('stations.db')
station.loadDatabase();
const stationBus = new Datastore('stationsBus')
stationBus.loadDatabase();
const bus = new Datastore('bus.db')
bus.loadDatabase();
const correspondance = new Datastore('correspondance');
correspondance.loadDatabase();
const stations_sba = new Datastore('stations_sba');
stations_sba.loadDatabase();


app.post('/stations_sba', (request, response) => {
    console.log(request.body)
    const data = request.body;
    stations_sba.insert(data)
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    })
});


app.post('/subway', (request, response) => {
    console.log(request.body)
    const data = request.body;
    subway.insert(data)
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    })
});

app.post('/bus', (request, response) => {
    console.log(request.body)
    const data = request.body;
    bus.insert(data)
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    })
});


app.post('/correspondance', (request, response) => {
    console.log(request.body)
    const data = request.body;
    correspondance.insert(data)
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lng
    })
})


app.get('/subway', (request, response) => {
    subway.find({}).sort({ timestamp: 1, ID: 1, }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})

app.get('/bus', (request, response) => {
    bus.find({}).sort({ timestamp: 1, ID: 1, }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})

app.get('/bus/:numero', (request, response) => {
    console.log('hi');
    var data = request.params.numero;
    console.log('hi');
    console.log(data+'hi');
    console.log(data)
    bus.find({ numero: data.substring(0,7) }).sort({ timestamp: 1, ID: 1, }).exec(function (err, data) {
        if (err) {
            
            response.end();
            return;
        }
        
        response.json(data);
    });
})


app.get('/stations_sba/bus', (request, response) => {
    stations_sba.find({ type: 'bus' }).sort({ nomFr: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})

app.get('/stations_sba/tramway', (request, response) => {
    var data = request.params.type;
    console.log(data)
    stations_sba.find({ type: 'tramway' }).sort({ numero: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})

app.get('/stations_sba/bus/:numero', (request, response) => {
    var data = request.params.numero;
    console.log(data)
    stations_sba.find({ type: 'bus', numero: RegExp("^"+data)  }).sort({ nomFr: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})

app.get('/stations_sba', (request, response) => {
    stations_sba.find({}).sort({type:1}).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})

app.get('/correspondance', (request, response) => {
    correspondance.find({}).sort({ ID: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})