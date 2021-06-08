
const { request, response } = require('express');




var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wawa.sba47',
    database: 'nodelogin'
});
var app = express();
var mapdata = {
    allnodes: [],
    paths: [],
    distances: [],
    getui: {
        htmlSelectStartingNode: "#from-starting",
        htmlSelectEndNode: "#to-end"
    },
    getstate: {
        selectedNode: null,
        fromNode: null,
        toNode: null
    }
};


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            console.log("query result:", results);
            console.log(error)
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                var vis = "true";
                if (typeof localStorage === "undefined" || localStorage === null) {
                    var LocalStorage = require('node-localstorage').LocalStorage;
                    localStorage = new LocalStorage('./scratch');
                }


                localStorage.setItem("viss", vis);
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


app.get('/home', function (request, response) {
    if (request.session.loggedin) {
        response.redirect('index.html')




    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(3000);








const Datastore = require('nedb');
const { type } = require('os');

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
const Result = new Datastore('Result');
Result.loadDatabase();


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
    console.log(data + 'hi');
    console.log(data)
    bus.find({ numero: data.substring(0, 7) }).sort({ timestamp: 1, ID: 1, }).exec(function (err, data) {
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
    console.log(data + 'hi');
    console.log(data)
    bus.find({ numero: data.substring(0, 7) }).sort({ timestamp: 1, ID: 1, }).exec(function (err, data) {
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
    console.log(data);
    console.log(stations_sba.length);
    stations_sba.find({ type: 'bus', numero: RegExp("^" + data) }).sort({ nomFr: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})
app.get('/result/:x1/:x2/:x3/:x4', (request, response) => {
    var x1 = request.params.x1;
    var x2 = request.params.x2;
    var x3 = request.params.x3;
    var x4 = request.params.x4;
    var ht;
    var hs;
    var datas = [];
    var b = true;
    var change;
    var indice;
    var source;
    var target;
    var a = [];
    var b = [];
    var ida = 0;
    var ida1 = 0
    var idatas = 0


    Result.find({}).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }

        var t = require('./public/mapdata/all.json');
        var tram = t.nodes;
        console.log('length ' + tram.length);
        for (var i = 0; i < tram.length; i++) {
            if (!(tram[i].nomFr === undefined)) {
                var d = distance(x1, x2, tram[i].x, tram[i].y);
                a[ida] = d;
                ida = ida + 1;

            }
        }
        console.log('array ' + a);
        console.log('min ' + Math.min.apply(null, a));
        for (var i = 0; i < tram.length; i++) {
            if (!(tram[i].nomFr === undefined)) {
                var d = distance(x1, x2, tram[i].x, tram[i].y);
                if (d == Math.min.apply(null, a)) {
                    console.log('source ' + tram[i].nomFr);
                    source = i;
                    console.log('source' + source);

                }
            }
        }

        for (var i = 0; i < tram.length; i++) {
            if (!(tram[i].nomFr === undefined)) {
                var d = distance(x3, x4, tram[i].x, tram[i].y);
                b[ida1] = d;
                ida1 = ida1 + 1;

            }
        }

        for (var i = 0; i < tram.length; i++) {
            if (!(tram[i].nomFr === undefined)) {
                var d = distance(x3, x4, tram[i].x, tram[i].y);
                if (d == Math.min.apply(null, b)) {
                    console.log('target ' + tram[i].nomFr);
                    target = i;
                    console.log('target' + target);

                }
            }
        }



        for (var i = 0; i < tram.length; i++) {
            if (data[i].x == x1) {
                ht = i;
                console.log(ht + 'ht')
                break;

            }


        }
        mapdata.allnodes = t.nodes;
        mapdata.paths = t.paths;
        mapdata.distances = [];
        mapdata.getstate.selectedNode = null;
        mapdata.getstate.fromNode = null;
        mapdata.getstate.toNode = null;
        function calculateDistancesbetweennodes() {
            mapdata.distances = [];
            for (var i = 0; i < mapdata.allnodes.length; i++) {
                mapdata.distances[i] = [];
                for (var j = 0; j < mapdata.allnodes.length; j++)
                    mapdata.distances[i][j] = 'x';
            }
            for (var i = 0; i < mapdata.paths.length; i++) {
                var sourceNodeId = parseInt(mapdata.paths[i].from);
                var targetNodeId = parseInt(mapdata.paths[i].to);
                var sourceNode = mapdata.allnodes[sourceNodeId];
                var targetNode = mapdata.allnodes[targetNodeId];
                var p1 = new LatLon(sourceNode.x, sourceNode.y);
                var p2 = new LatLon(targetNode.x, targetNode.y);
                var d = p1.distanceTo(p2);
                mapdata.distances[sourceNodeId][targetNodeId] = d;
                mapdata.distances[targetNodeId][sourceNodeId] = d;
            };
        };

        calculateDistancesbetweennodes();

        console.log('diji source' + source);
        console.log('diji target' + target);
        var results = dijkstra(40, 182);
        console.log(results);
        var point = {
            x: '',
            y: ''
        };
        function getpoint(name) {
            var point = {
                x: '',
                y: ''
            };

            for (var i = 0; i < tram.length; i++) {
                if (name == tram[i].name) {
                    point.x = tram[i].x;
                    point.y = tram[i].y;
                    return point;
                }
            }


        }


        for (var i = 0; i < results.path.length; i++) {
            var ds = {
                x: '',
                y: '',
                name: ''
            };
console.log('wchhhhhhhh '+results.path[0].source)
            var x01 = getpoint(results.path[0].source).x;
            var y01 = getpoint(results.path[0].source).y;
            ds.x = x01;
            ds.y = y01;
            ds.name = idatas;
            datas[idatas] = ds;
            console.log('ta9balha wela la ')
            console.log('return te3 x01 ' + x01);
            console.log('return te3 x02 ' + x02);
            var name = idatas;
            var x02 = getpoint(target).x;
            var y02 = getpoint(target).y;
            var name = idatas + 1;
            idatas = idatas + 1;

        }










        response.json(datas);
    });



})

app.get('/stations_sba', (request, response) => {
    stations_sba.find({}).sort({ type: 1 }).exec(function (err, data) {
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


function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
}



function dijkstra(start, end) {

    var nodeCount = mapdata.distances.length,
        infinity = 99999, // infinity
        shortestPath = new Array(nodeCount),
        nodeChecked = new Array(nodeCount),
        pred = new Array(nodeCount);


    for (var i = 0; i < nodeCount; i++) {
        shortestPath[i] = infinity;
        pred[i] = null;
        nodeChecked[i] = false;
    }

    shortestPath[start] = 0;

    for (var i = 0; i < nodeCount; i++) {

        var minDist = infinity;
        var closestNode = null;

        for (var j = 0; j < nodeCount; j++) {

            if (!nodeChecked[j]) {
                if (shortestPath[j] <= minDist) {
                    minDist = shortestPath[j];
                    closestNode = j;
                }
            }
        }

        nodeChecked[closestNode] = true;

        for (var k = 0; k < nodeCount; k++) {
            if (!nodeChecked[k]) {
                var nextDistance = distanceBetween(closestNode, k, mapdata.distances);
                if ((parseInt(shortestPath[closestNode]) + parseInt(nextDistance)) < parseInt(shortestPath[k])) {
                    soFar = parseInt(shortestPath[closestNode]);
                    extra = parseInt(nextDistance);
                    shortestPath[k] = soFar + extra;
                    pred[k] = closestNode;
                }
            }
        }

    }

    if (shortestPath[end] < infinity) {

        var newPath = [];
        var step = {
            target: parseInt(end)
        };

        var v = parseInt(end);

        while (v >= 0) {
            v = pred[v];
            if (v !== null && v >= 0) {
                step.source = v;
                newPath.unshift(step);
                step = {
                    target: v
                };
            }
        }

        totalDistance = shortestPath[end];

        return {
            mesg: 'Status: OK',
            path: newPath,
            source: start,
            target: end,
            distance: totalDistance
        };
    } else {
        return {
            mesg: 'Sorry No path found',
            path: null,
            source: start,
            target: end,
            distance: 0
        };
    }

    function distanceBetween(fromNode, toNode, distances) {
        dist = distances[fromNode][toNode];
        if (dist === 'x') dist = infinity;
        return dist;
    }

};


function LatLon(lat, lon) {
    this.lat = Number(lat);
    this.lon = Number(lon);
}

LatLon.prototype.distanceTo = function (point, radius) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
    radius = (radius === undefined) ? 6378137 : Number(radius);
    if (Number.prototype.toRadians === undefined) {
        Number.prototype.toRadians = function () { return this * Math.PI / 180; };
    }
    if (Number.prototype.toDegrees === undefined) {
        Number.prototype.toDegrees = function () { return this * 180 / Math.PI; };
    }
    var R = radius;
    var φ1 = this.lat.toRadians(), λ1 = this.lon.toRadians();
    var φ2 = point.lat.toRadians(), λ2 = point.lon.toRadians();
    var Δφ = φ2 - φ1;
    var Δλ = λ2 - λ1;
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
        + Math.cos(φ1) * Math.cos(φ2)
        * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};