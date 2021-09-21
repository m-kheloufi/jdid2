
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
let app2 = express();
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
app2.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('marker-shadow.png'));
app2.use(express.static('marker-shadow.png'));
app.use(express.static('files'));
app.use('marker-shadow',express.static(__dirname+'marker-shadow'))
app2.use('marker-shadow',express.static(__dirname+'marker-shadow'))
app.use('/images',express.static(__dirname+'/images'))
app2.use('/js',express.static(__dirname+'/js'))
app.use('/js',express.static(__dirname+'/js'))
app.use('/views',express.static(__dirname+'/views'))
app2.use('/images',express.static(__dirname+'/images'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));
app2.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index3.html'));
});
app.get('/enter', function (request, response) {
    // response.render(__dirname + "/views/test/index", {message:"message hiiiii"});
    response.sendFile(path.join(__dirname + '/public/test/index.html'));
   
});
app2.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});
app2.get('/admin', function (request, response) {
    if (request.session.loggedin) {
    
    response.sendFile(path.join(__dirname + '/index4.html'));}
    else {
        response.sendFile(path.join(__dirname + '/plsLogin.html'));
    }
});
app2.get('/station', function (request, response) {
    if (request.session.loggedin) {
    
    response.sendFile(path.join(__dirname + '/index5.html'));}
    else {
        response.sendFile(path.join(__dirname + '/plsLogin.html'));
    }
});
app2.get('/polyline', function (request, response) {
    if (request.session.loggedin) {
    
    response.sendFile(path.join(__dirname + '/index6.html'));}
    else {
        response.sendFile(path.join(__dirname + '/plsLogin.html'));
    }
});
app2.get('/wrong', function (request, response) {
    
    
    response.sendFile(path.join(__dirname + '/psswr.html'));
   
});
app2.post('/auth', function (request, response) {
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
                response.redirect('/wrong');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});


app2.get('/home', function (request, response) {
    if (request.session.loggedin) {
        response.redirect('admin')




    } else {
        response.sendFile(path.join(__dirname + '/plsLogin.html'));
    }
    response.end();
});

app.listen(process.env.PORT || 3002|| 3001)
app2.listen(3000, () => {
    console.log("Started server on 3002");   
  });








const Datastore = require('nedb');
const { type } = require('os');
const { Console } = require('console');


app.use(express.static('public'));
app.use(express.static('static'));
app.use(express.json())
app2.use(express.static('public'));
app2.use(express.static('static'));
app2.use(express.json())
app.use(express.static(__dirname + '/public/test'));
app2.use(express.static(__dirname + '/public/test'));


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
app.delete( "/delete/:name", function ( req, res ) {
    var name = request.params.name;
    stations_sba.find({}).sort({ type: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        } for(var i=0;i<data.length;i++){
            if(name==data[i].nomFr){
                customerDB.remove( {
                    _id: data[i]._id
                  }, function ( err, numRemoved ) {
                    if ( err ) res.status( 500 ).send( err );
                    else res.sendStatus( 200 );
                  } );
                console.log('delete khadmet ')
            }
        }
     });
     

   
  } );
  app2.delete( "/delete/:name", function ( req, res ) {
    var name = request.params.name;
    stations_sba.find({}).sort({ type: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        } for(var i=0;i<data.length;i++){
            if(name==data[i].nomFr){
                customerDB.remove( {
                    _id: data[i]._id
                  }, function ( err, numRemoved ) {
                    if ( err ) res.status( 500 ).send( err );
                    else res.sendStatus( 200 );
                  } );
                console.log('delete khadmet ')
            }
        }
     });
     

   
  } );
app2.delete('/stations_sba/delete/:name', (request, response) => {
    var name = request.params.name;
    
    stations_sba.find({}).sort({ type: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        } for(var i=0;i<data.length;i++){
            if(name.includes(data[i].nomFr)){
                stations_sba.remove({_id: data[i]._id});
            }
        }
     });
});
app2.post('/addline/:name', (request, response) => {
    var name = request.params.name;
    var tr3 = require('./lines.json');
    var t=tr3.lines;
    console.log('chouf body '+request.body)
    const datas = request.body;
    const fs = require('fs');
  
    
    // convert JSON object to string
    
    console.log('datas !!!!!! '+datas)
    t.push(datas)
    console.log('push !!!!!! '+t)
    // write JSON string to a file
    var js={"lines":t}
    var dat=JSON.stringify(js)
    fs.writeFile('lines.json', dat, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    var datT=JSON.stringify(datas)
    console.log('name ta3eh ---- '+name)
 
    console.log('name ta3eh ---- '+datT)
    // var file='';
    // var dat1=JSON.stringify(file)
    // fs.writeFile('public/mapdata/'+name+'.json', dat1, (err) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("JSON data is saved.");
    // });
    response.json({
        status: 'success',
       
    })
   
});
app.post('/addline', (request, response) => {
    

    console.log(request.body)
    const data = request.body;
    const fs = require('fs');
  
    
    // convert JSON object to string
    const datas = JSON.stringify(data);
   
    // write JSON string to a file
    fs.appendFile('lines.json', datas, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

    response.json({
        status: 'success',
       
    })
   
});
app.post('/mapdata/:type', (request, response) => {
    var type = request.params.type;

    console.log(request.body)
    const data = request.body;
    const fs = require('fs');
  
    
    // convert JSON object to string
    const datas = JSON.stringify(data);
    if(type=='tram'){
    // write JSON string to a file
    fs.writeFile('public/mapdata/'+type+'.json', datas, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });}else if(type=='A03'){

         fs.writeFile('A03.json', datas, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

    }

    response.json({
        status: 'success',
       
    })
   
});
app.post('/mapdata1/:type', (request, response) => {
    var type = request.params.type;

    console.log(request.body)
    const data = request.body;
    const fs = require('fs');
  
    
    // convert JSON object to string
    const datas = JSON.stringify(data);
    
    // write JSON string to a file
    fs.writeFile('public/mapdata/'+type+'point.json', datas, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

    response.json({
        status: 'success',
       
    })
   
});
app2.post('/mapdata/:type', (request, response) => {
    var type = request.params.type;

    console.log(request.body)
    const data = request.body;
    const fs = require('fs');
  
    
    // convert JSON object to string
    const datas = JSON.stringify(data);
    
    // write JSON string to a file
    fs.writeFile('public/mapdata/'+type+'.json', datas, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

    response.json({
        status: 'success',
       
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
//-----------------------------------------------

app2.post('/stations_sba', (request, response) => {
    console.log(request.body)
//    var t = require('./public/mapdata/tram.json');
   
//     var m=t.nodes.length
    
//     // create a JSON object
//     const fs = require('fs');
// const nodes = {
//     "name":m,
//             "nomFr": request.body.nomFr,
//             "x": request.body.longitude,
//             "y": request.body.latitude
// };
// console.log('hi user ' +nodes);
// // convert JSON object to string
// const node = JSON.stringify(nodes);

// // write JSON string to a file
// fs.appendFile('public/mapdata/tram.json', node, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("JSON data is saved.");
// });
    const data = request.body;
    stations_sba.insert(data)
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    })
});


app2.post('/subway', (request, response) => {
    console.log(request.body)
    const data = request.body;
    subway.insert(data)
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    })
});

app2.post('/bus', (request, response) => {
    console.log(request.body)
    const data = request.body;
    bus.insert(data)
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    })
});


app2.post('/correspondance', (request, response) => {
    console.log(request.body)
    const data = request.body;
    correspondance.insert(data)
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lng
    })
})


app2.get('/subway', (request, response) => {
    subway.find({}).sort({ timestamp: 1, ID: 1, }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})

app2.get('/bus', (request, response) => {
    bus.find({}).sort({ timestamp: 1, ID: 1, }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})

app2.get('/bus/:numero', (request, response) => {
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

app2.get('/bus/:numero', (request, response) => {
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
app2.get('/stations_sba/bus', (request, response) => {
    stations_sba.find({ type: 'bus' }).sort({ nomFr: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})
app2.get('/lines', (request, response) => {
    t = require('./lines.json');
    lines=t.lines;
       var data= JSON.stringify(t);
        response.json(lines);
        // console.log('hado lines 111: '+ lines[0].name)
        // console.log('hado lines : '+ JSON.stringify(t).name)
    
})
app.get('/lines', (request, response) => {
    t = require('./lines.json');
    lines=t.lines;
       var data= JSON.stringify(t);
        response.json(lines);
        // console.log('hado lines 111: '+ lines[0].name)
        // console.log('hado lines : '+ JSON.stringify(t).name)
    
})
app2.get('/stations_sba/tramway', (request, response) => {
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
app2.get('/stations_sba/bus1/:numero', (request, response) => {
    var x = request.params.numero;
    var datas=[];
    var idatas=0;
    
    var c=0;
    console.log(x);
    console.log(stations_sba.length);
    stations_sba.find({ type: 'bus', numero: RegExp("^" + x) }).sort({ nomFr: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
     
          
       
       
        response.json(data);
    });
})
//----------------------------------------


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
app.get('/stations_sba/bus1/:numero', (request, response) => {
    var x = request.params.numero;
    var datas=[];
    var idatas=0;
    
    var c=0;
    console.log(x);
    console.log(stations_sba.length);
    stations_sba.find({ type: 'bus', numero: RegExp("^" + x) }).sort({ nomFr: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
     
          
       
       
        response.json(data);
    });
})
app.get('/stations_sba/bus/:numero', (request, response) => {
    var x = request.params.numero;
    var datas=[];
    var idatas=0;
    
    var c=0;
    console.log(x);
    console.log(stations_sba.length);
    stations_sba.find({ type: 'bus', numero: RegExp("^" + x) }).sort({ nomFr: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        console.log(data.length);
        for(var i=0;i<data.length;i++){
            var ds = {
                latitude:'',
                longitude:'',
                nomFr:'',
                type:'',
                numero:'',
                _id:''
            };
           if(!(x.includes('bis'))&&!(data[i].numero.includes('bis'))){
               console.log('trueeeeeeeeeeeeeeeeee')
                ds.latitude=data[i].latitude
                ds.longitude=data[i].longitude
                ds.nomFr=data[i].nomFr
                ds.type=data[i].type
                ds.numero=data[i].numero
                ds._id=data[i]._id
                datas[idatas]=ds
                idatas=idatas+1;
        }else if(x.includes('bis')) {
            ds.latitude=data[i].latitude
                ds.longitude=data[i].longitude
                ds.nomFr=data[i].nomFr
                ds.type=data[i].type
                ds.numero=data[i].numero
                ds._id=data[i]._id
                datas[idatas]=ds
                idatas=idatas+1;

            }
            
        }
       
       
        response.json(datas);
    });
})
app2.get('/stations_sba/bus/:numero', (request, response) => {
    var x = request.params.numero;
    var datas=[];
    var idatas=0;
    
    var c=0;
    console.log(x);
    console.log(stations_sba.length);
    stations_sba.find({ type: 'bus', numero: RegExp("^" + x) }).sort({ nomFr: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        console.log(data.length);
        for(var i=0;i<data.length;i++){
            var ds = {
                latitude:'',
                longitude:'',
                nomFr:'',
                type:'',
                numero:'',
                _id:''
            };
           if(!(x.includes('bis'))&&!(data[i].numero.includes('bis'))){
               console.log('trueeeeeeeeeeeeeeeeee')
                ds.latitude=data[i].latitude
                ds.longitude=data[i].longitude
                ds.nomFr=data[i].nomFr
                ds.type=data[i].type
                ds.numero=data[i].numero
                ds._id=data[i]._id
                datas[idatas]=ds
                idatas=idatas+1;
        }else if(x.includes('bis')) {
            ds.latitude=data[i].latitude
                ds.longitude=data[i].longitude
                ds.nomFr=data[i].nomFr
                ds.type=data[i].type
                ds.numero=data[i].numero
                ds._id=data[i]._id
                datas[idatas]=ds
                idatas=idatas+1;

            }
            
        }
       
       
        response.json(datas);
    });
})
app.get('/getbeststation4/:type/:x1/:y1/:x2/:y2', (request, response) => {
    var x1 = request.params.x1;
    var y1 = request.params.y1;
    var x2 = request.params.x2;
    var y2 = request.params.y2;
    var type = request.params.type;
    var all = require('./public/mapdata/all01.json');
    var tts=all.nodes
    var trams=[]
    var t = require('./Matrixdb.json');
    var tr=[]
    var a3bis=[]
    var a17=[]
    var a22=[]
    var a25=[]
    var a16=[]
    var a11=[]
    var a13=[]
    var a3=[]
    var a27=[]
    var result;
    var ida11=0
    var alls=[]
    var tabs=[]
    const fs = require('fs');
    var x=0;
  var bo=false
    var re;
    var la=0;
    var tal=[]
    var source,target;
    const Graph = require('dijkstra-short-path');
    const route = new Graph();
    const Datastore = require('nedb');
    var datt; var lp=0;
    const https = require('https');
    // var myLines = [{
    //     "type": "LineString",
    //     "coordinates": []
    // }];

    for (var i=0;i<tts.length;i++){
        if(!(tts[i].nomFr===undefined)){
       trams[ida11]=tts[i];
     //   console.log('tramss   : ' +trams[0])
       ida11=ida11+1;
        }
     }

    const stations_sba = new Datastore('stations_sba');
    stations_sba.loadDatabase();
    stations_sba.find({}).sort({ type: 1 }).exec(function (err, data) {
        if (err) {
          
            response.end();
            return;
        }
        datt=data
source=getind11(x1,y1,datt)
target=getind11(x2,y2,datt)
// console.log('source : '+source)
// console.log('target : '+target)
//    console.log('ttttttttt : '+JSON.stringify(t[0]))
    for(var i=0;i<datt.length;i++){
        setTimeout(function timer() {
            var n=datt[x].nomFr+'&'+datt[x].numero
            re=hatcho(n)
            tabs.push(re)
            // console.log('lawlaaaa : '+JSON.stringify(tabs[0]))
        for (var j=0;j<t.length;j++){
            if(re.name==t[j].nomFrarrive+t[j].numeroarrive){
                if(type=='distance'){ re.tab.push([t[j].nomFrdepart+t[j].numerodepart,t[j].distance])}
                else if(type=='duration') {
                    re.tab.push([t[j].nomFrdepart+t[j].numerodepart,t[j].duration])
                  }
            }
        }
            route.addNode(re.name, new Map(re.tab));
            if(x==112){
        result=route.path(source,target)
        console.log(result)
            }
        
            x=x+1;
            }, i * 1);
       
    }

    function hatcho(name){
        var tab=[]
        var numd;
        var numa;
        var n ,op
    for (var i=0;i<t.length;i++){
        n=t[i].nomFrdepart+t[i].numerodepart
       
        if(name==n){
            op=i
            numa=t[i].numeroarrive
            if(type=='distance'){
      tt=[t[i].nomFrarrive+numa,t[i].distance]}
      else if(type=='duration') {
        tt=[t[i].nomFrarrive+numa,t[i].duration]
      }
          tab.push(tt)
        
          
        }
      
      
    }
    
    return {"name":name,"tab":tab}
    
    }
   
    console.log('hiiiiii')
    for(var j=1;j<2;j++){
       
    setTimeout(function timer() {
    for(var i=0;i<result.path.length;i++){
        setTimeout(function timer() {
        var uu=JSON.stringify(result.path[la])
        var Y11=uu.substring(1,uu.indexOf('&'))
        var tabId = uu.split("&").pop(); 
        var ka=Y11+'&'
        var  X11=tabId.replace(ka,"");
      console.log('numero y11 : '+X11)
        if(X11.length==3){
            tr.push({"name":Y11,'numero':parseInt(X11,10)})
            if(tr.length>=2){
                for(var i=0;i<tr.length-1;i++){
                    if((tr[i].numero-tr[i+1].numero)==1||(tr[i].numero-tr[i+1].numero)==-1){
                        trac(tr[i].name,tr[i+1].name,'tram');
                    }
                }
            
            } 
        }  if(X11.includes("A03bis")){
        
         a3bis.push({"name":Y11,'numero':parseInt(X11.replace('A03bis_',""),10)})
         if(a3bis.length>=2){
            console.log('a3bis------------- '+JSON.stringify(a3bis))
            for(var i=0;i<a3bis.length-1;i++){
                if((a3bis[i].numero-a3bis[i+1].numero)==1||(a3bis[i].numero-a3bis[i+1].numero)==-1){
                    trac(a3bis[i].name,a3bis[i+1].name,'A03bis');
                }
            }
        
        }
       
        } 
        if(X11.includes("A03_")){
        
            a3.push({"name":Y11,'numero':parseInt(X11.replace('A03_',""),10)})
            if(a3.length>=2){
                console.log('a3------------- '+JSON.stringify(a3))
               for(var i=0;i<a3.length-1;i++){
                   if((a3[i].numero-a3[i+1].numero)==1||(a3[i].numero-a3[i+1].numero)==-1){
                       trac(a3[i].name,a3[i+1].name,'A03');
                   }
               }
           
           }
       
            
           }
         if(X11.includes("A17")){
        
            a17.push({"name":Y11,'numero':parseInt(X11.replace('A17_',""),10)})
            if(a17.length>=2){
                for(var i=0;i<a17.length-1;i++){
                    if((a17[i].numero-a17[i+1].numero)==1||(a17[i].numero-a17[i+1].numero)==-1){
                        trac(a17[i].name,a17[i+1].name,'A17');
                    }
                }
            
            }
           }
           if(X11.includes("A22")){
        
            a22.push({"name":Y11,'numero':parseInt(X11.replace('A22_',""),10)})
            if(a22.length>=2){
                for(var i=0;i<a22.length-1;i++){
                    if((a22[i].numero-a22[i+1].numero)==1||(a22[i].numero-a22[i+1].numero)==-1){
                        trac(a22[i].name,a22[i+1].name,'A22');
                    }
                }
            
            }
           
           }
           if(X11.includes("A25")){
        
            a25.push({"name":Y11,'numero':parseInt(X11.replace('A25_',""),10)})
            if(a25.length>=2){
                for(var i=0;i<a25.length-1;i++){
                    if((a25[i].numero-a25[i+1].numero)==1||(a25[i].numero-a25[i+1].numero)==-1){
                        trac(a25[i].name,a25[i+1].name,'A25');
                    }
                }
    
            }
           }
           if(X11.includes("A11")){
               
        
            a11.push({"name":Y11,'numero':parseInt(X11.replace('A11_',""),10)})
            if(a11.length>=2){
                for(var i=0;i<a11.length-1;i++){
                    if((a11[i].numero-a11[i+1].numero)==1||(a11[i].numero-a11[i+1].numero)==-1){
                        trac(a11[i].name,a11[i+1].name,'A11');
                    }
                }
    
            }
           }
           if(X11.includes("A16")){
        
            a16.push({"name":Y11,'numero':parseInt(X11.replace('A16_',""),10)})
            if(a16.length>=2){
                for(var i=0;i<a16.length-1;i++){
                    if((a16[i].numero-a16[i+1].numero)==1||(a16[i].numero-a16[i+1].numero)==-1){
                        trac(a16[i].name,a16[i+1].name,'A16');
                    }
                }
    
            }
           }
           if(X11.includes("A27")){
        
            a27.push({"name":Y11,'numero':parseInt(X11.replace('A27_',""),10)})
            if(a27.length>=2){
                for(var i=0;i<a27.length-1;i++){
                    if((a27[i].numero-a27[i+1].numero)==1||(a27[i].numero-a27[i+1].numero)==-1){
                        trac(a27[i].name,a27[i+1].name,'A27');
                    }
                }
    
            }
           }
        
           la=la+1;
        }, i*10);
      
    }
    // console.log('a3 '+JSON.stringify(a3bis))
    // trac(tr,'tram');
    // // console.log('a3bis : '+a3bis[0].name)
    // // trac(a3bis,'A03bis');
    // trac(a17,'A17') 
    // trac(a22,'A22')
    // trac(a25,'A25')
    
    // console.log('a3 '+JSON.stringify(a11))
    // trac(a16,'A16')
 function trac(tr1,tr2,type){
     var lh=0;
    // for(var i=0;i<tr.length-1;i++){

    //     setTimeout(function timer() {
       
       
//    if(tr.length>=2){
        var src =getn(tr1,type)
        var trt=getn(tr2,type)
       
        var request = require('request');
        request("http://localhost:3002/result/"+type+"/"+src.x+"/"+src.y+"/"+trt.x+"/"+trt.y+"", function (error, response, body) {
            if (!error && response.statusCode === 200) { 
                var dattt=JSON.parse(body)
                 tal.push(JSON.stringify(dattt[0]))

             }
        })
        // var hat=getpol(tty,tr[i].name,tr[i+1].name);
        // tal.push(hat)
        // "http://localhost:3002/result/tram/"+src.x+"/"+src.y+"/"+trt.x+"/"+trt.y+""
    //     if(src>trt){
    //         // bdl=src 
    //         // src=trt 
    //         // trt=bdl
    //         for (var i = src ; i >= trt; i--) {
    //             myLines[0].coordinates.push([tts[i].y,tts[i].x])
    //         }
    //     }else { for (var j=src;j<=trt;j++){
    //       myLines[0].coordinates.push([tts[j].y,tts[j].x])

    //   } }
        // console.log('station src '+tr[i].name +' name '+ src)
        // console.log('station trt '+tr[i+1].name +' name '+ trt)
     lh=lh+1;
    //  } 
    // }, i*1);}

}
 
    
 
    function getn(name,type){
   var       t = require('./public/mapdata/'+type+'.json');
   var trams=t.nodes
        var sour
        for(var j=0;j<trams.length;j++){
         
                if(name===trams[j].nomFr){ 
                   sour=trams[j].name
                   var tt={"x":trams[j].x,"y":trams[j].y}
                   return tt;
                }

            }
        
        }
    
    
}, j*800);}

for(var j=1;j<2;j++){
       
    setTimeout(function timer() {
        console.log('  steps'+JSON.stringify(result))
        response.json(tal)
    }, j*6000);}




// --------------------------------------------------------------------------------------
// for(var j=1;j<2;j++){
// setTimeout(function timer() {

//     for(var i=0;i<tr.length-1;i++){
//         setTimeout(function timer() {
//         var bdl
//       var sourcee =getname(tr[lp])
//       var targett=getname(tr[lp+1])
//       console.log('length all '+tts.length)
//       console.log('src '+sourcee+' name '+tr[lp])
//       console.log('trt '+targett+' name '+tr[lp+1])
//       if(sourcee>=targett){
//           bdl=targett
//           targett=sourcee
//           sourcee=bdl
//       }
//       for(var j=sourcee;j<=targett;j++){
//        myLines.coordinates.push([tts[j].x,tts[j].y])
//       }
//     }, i*500);  
// lp=lp+1;
//     }
//     console.log(' my lines'+JSON.stringify(myLines))
//     response.json(myLines)
// }, j*500);
// }
// -----------
// function getname(name){
//     console.log('yess '+name)
//     console.log('name te3 all '+ trams[12].nomFr)
//     var n
// for(var i=0;i<trams.length;i++){
//     // console.log('nameee '+name+' name te3 all '+ trams[i].nomFr)
//     if(name===trams[i].nomFr){
//         n=trams[i].name;
//         console.log('yess name 1111111111111111111 '+name+' te3 all'+trams[i].name)
//     }
//     return n
// }

// }
// ---------
    // ---------------------------
    function getind11(x,y,trams){
        var a=[];
        var ida=0;
        var ind;
        for (var i = 0; i < trams.length; i++) {
       
            var d = distance(x, y, trams[i].latitude, trams[i].longitude);
            a[ida] = d;
            ida = ida + 1;
    
        
    }
    
    for (var i = 0; i < trams.length; i++) {
        
            var d = distance(x, y, trams[i].latitude, trams[i].longitude);
            if (d == Math.min.apply(null, a)) {
              
             
               ind=trams[i].nomFr+'&'+trams[i].numero
              
             
    
            }
        
    } return ind
    }
    // ----------------------
    
    })
    
      
    

})
app.get('/getbeststation3/:x1/:y1/:x2/:y2', (request, response) => {
    var x1 = request.params.x1;
    var y1 = request.params.y1;
    var x2 = request.params.x2;
    var y2 = request.params.y2;
   var all;
   var tabt=[];
   var ret_source=[]
   var ret_target=[]
   var ida11=0;
   var alls=[]
    var t = require('./public/mapdata/all01.json');
    all=t.nodes; 
    for (var i=0;i<all.length;i++){
        
        if(!(all[i].nomFr===undefined)){
        alls[ida11]=all[i];
    ida11=ida11+1;
    }}
   


ret_target=getind1(x2,y2,alls);
ret_source=getind1(x1,y1,alls);
console.log('name source  '+ ret_source[0])
console.log('indice source '+ret_source[1])
console.log('name source '+ret_source[2])
console.log('line source  '+ret_source[3])
console.log('name target  '+ ret_target[0])
console.log('indice target '+ret_target[1])
console.log('name target '+ret_target[2])
console.log('line target '+ret_target[3])

var s_source = require('./public/mapdata/lines/'+ret_source[3]+'/'+'_'+ret_source[0]+'.json');
var s_target = require('./public/mapdata/lines/'+ret_target[3]+'/'+'_'+ret_target[0]+'.json');
for (var i=0;i<alls.length;i++){
if(alls[i].line=='tram'){

    tabt.push(alls[i].name)
}
}
for (var i=0;i<tabt.length;i++){


}






    function getind1(x,y,trams){
        var a=[];
        var ab=[];
        var ida=0;
        var ind;
        for (var i = 0; i < trams.length; i++) {
       
            var d = distance(x, y, trams[i].x, trams[i].y);
            a[ida] = d;
            ida = ida + 1;
    
        
    }
    
    for (var i = 0; i < trams.length; i++) {
        
            var d = distance(x, y, trams[i].x, trams[i].y);
            if (d == Math.min.apply(null, a)) {
              
             
               ind=trams[i].nomFr
              ab.push(ind);
              ab.push(i)
              ab.push(trams[i].name)
              ab.push(trams[i].line)
             
    
            }
        
    } return ab
    }


    // ----- function rout1------------
    function rout1(x22,y22,z){
        var hat;
      https.get("https://graphhopper.com/api/1/route?point="+x1+","+y1+"&point="+x22+","+y22+"&vehicle=foot&locale=de&points_encoded=false&key=72e12178-3f0f-4491-a947-b58853fe7db9", (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          var corr =JSON.parse(data).paths[0].points
          tab[z]=corr
          hat=corr;
          var path=JSON.parse(data).paths[0];
               var time =JSON.parse(data).paths[0].time/1000
               var distance =JSON.parse(data).paths[0].distance
               pathss.push(corr);
               timess.push(time);
               a.push(distance);  
               ge3.push({"pathss":path.points,"timess":path.time/1000,"distance":path.distance})      
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });   
  }
    // -------------------------
})
app.get('/getbeststation2/:type/:x1/:y1/:x2/:y2', (request, response) => {
   
    var x1 = request.params.x1;
    var y1 = request.params.y1;
    var x2 = request.params.x2;
    var y2 = request.params.y2;
    var bdl,bo=false;
    var type = request.params.type;
    var ida=0
    var hatcho;
    var sourcet
    var source,target,sourcename,targetname;
    var sourcet
    var ge3=[];
    var total=[];
    var total2=[]
    var a=[], timess=[] , ind ,pathss=[],ge3=[];
    var tab=[]
    var x0,y0;
        var d5 =[];
        // var x2=35.19829
        // var y2=-0.64459  
        var ida11=0;
        var tram,trams=[];
        const https = require('https');
        // console.log('type '+type)
        var t = require('./public/mapdata/'+type+'.json');
        tram=t.nodes;
       mapdata.allnodes=t.nodes
      
       mapdata.paths = t.paths;
       mapdata.distances = [];
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
    for (var i=0;i<tram.length;i++){
        
    if(!(tram[i].nomFr===undefined)){
    trams[ida11]=tram[i];
ida11=ida11+1;
}}
// console.log('point X :' +x2+' Y : '+y2)
target=getind(x2,y2,trams);
// console.log('returnn '+target)
 
for (let i = 0; i <trams.length; i++) {
    setTimeout(function timer() {
    rout(trams[i].x,trams[i].y,i);
    }, i * 1);
  } 
        for (let i = 0; i <3; i++) {
            setTimeout(function timer() {
          if(i==1){
            // console.log('hiiii 3333 '+JSON.stringify(d5))
            // response.json(d5)
            console.log('ge333 length : '+ge3.length)
            for(var z=0;z<ge3.length;z++){
               
                talya(ge3[z].pathss,z)
                
        
  
      }
            
          }else if(i==2){
            var min=Math.min.apply(null, total); 
            for(var k=0;k<total2.length;k++){
                if(total2[k].kd==min){
                    // console.log('talyaaaaaa miiin'+total2[k].kd )
                    // console.log('talyaaaaaa resulttt'+JSON.stringify(total2[k].resultt) )
                    console.log('source talyaaaaaa '+total2[k].pathtram[0].source )
                    var start=total2[k].pathtram[0].source;
                     bdl;
                    if(start>target){
                        bo=true;
                        bdl=start;
                        start=target;
                        target=bdl;
                    }
                    console.log('target talyaaaaaa '+target )
                           var res=total2[k].resultt
                           if(bo==false){
                    for(var j=start;j<=target;j++){
                          res.coordinates.push([tram[j].y,tram[j].x])
if(j==target){
    for(var e=0;e<trams.length;e++){
        if(trams[e].name==target){
            x0=trams[e].x;
            y0=trams[e].y
        }
    }
    https.get("https://graphhopper.com/api/1/route?point="+x0+","+y0+"&point="+x2+","+y2+"&vehicle=foot&locale=de&points_encoded=false&key=72e12178-3f0f-4491-a947-b58853fe7db9", (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
            var corr =JSON.parse(data).paths[0].points
      for(var m=0;m<corr.coordinates.length;m++){
         
          var uu=JSON.stringify(corr.coordinates[m])
                                        var Y11=uu.substring(1,uu.indexOf(','))
                                        var tabId = uu.split(",").pop(); 
                                        var  X11=tabId.replace(']',''); 
                                   res.coordinates.push([Y11,X11])
                                   if(m==corr.coordinates.length-1){
                                       
                                    
                                    response.json(res)}
                                    }
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });



}}
                    }else if(bo==true){
                        for(var j=target;j>=start;j--){
                            res.coordinates.push([tram[j].y,tram[j].x])
  if(j==target){
      for(var e=0;e<trams.length;e++){
          if(trams[e].name==start){
              x0=trams[e].x;
              y0=trams[e].y
          }
      }
      https.get("https://graphhopper.com/api/1/route?point="+x0+","+y0+"&point="+x2+","+y2+"&vehicle=foot&locale=de&points_encoded=false&key=72e12178-3f0f-4491-a947-b58853fe7db9", (resp) => {
          let data = '';
          resp.on('data', (chunk) => {
            data += chunk;
          });
          resp.on('end', () => {
              var corr =JSON.parse(data).paths[0].points
        for(var m=0;m<corr.coordinates.length;m++){
           
            var uu=JSON.stringify(corr.coordinates[m])
                                          var Y11=uu.substring(1,uu.indexOf(','))
                                          var tabId = uu.split(",").pop(); 
                                          var  X11=tabId.replace(']',''); 
                                     res.coordinates.push([Y11,X11])
                                     if(m==corr.coordinates.length-1){
                                         
                                      
                                      response.json(res)}
                                      }
          });
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
  
  
  
  }
                      }

                    }
                   
                                                 

                }

            }
          
         
          }
            }, i * 1500);
          }
        




 //------------------------------------------------------------
          function talya(resultt,z){ 
            for (let i = 0; i <3; i++) {
                setTimeout(function timer() {
                    if(i==1){
     
                    var o =JSON.stringify(resultt.coordinates.length)
               
                                            var uu=JSON.stringify(resultt.coordinates[o-1])
                                                        var Y11=uu.substring(1,uu.indexOf(','))
                                                        var tabId = uu.split(",").pop(); 
                                                        var  X11=tabId.replace(']',''); 
                                                        getind1()
                                                  async function getind1(){
                                                    // console.log('point222 X :' +X11+' Y : '+Y11)  
                                                 
                                                     sourcet=getind(X11,Y11,trams)
                                                    // console.log('sourceeeee '+sourcet)
                                                    // console.log('targettttt '+target)
                                                    var resultsa = dijkstra(sourcet, target);  
                                                    // console.log('resulta '+JSON.stringify(resultsa))           
                                                    var kd=resultsa.time+ge3[z].timess;
                                                    // console.log('la some kd '+kd)
                                                    // console.log('dijikstra distance '+resultsa.distance)
                                                    // console.log('api distance'+ge3[z].distance)
                                                    if(source==target){kd=9999999;
                                                       }
                                                           total.push(kd);
                                                          total2.push({"kd":kd,"resultt":resultt,"pathtram":resultsa.path});  
                                                        //   console.log('total2 '+JSON.stringify(total2)  )                                                                                                            
                                                    
                                                  }
                                                        
                                                             
                                                }          
                                                              
                                                                   }, i * 1000);
          }
    
        }

                                                    
                                                                            
                                                        
                                                           
                                                                        
                                                                       
                                                                     
                                                        
                                                                    
                                                                
                                                            
                                                                                                              
                                                                            
        
                    
      
//----------------------------------------------------


        //   curl= "https://graphhopper.com/api/1/route?point="+x1+","+y1+"&point="+x2+","+y2+"&vehicle=foot&locale=de&calc_points=false&key=72e12178-3f0f-4491-a947-b58853fe7db9"


          function rout(x22,y22,z){
              var hat;
            https.get("https://graphhopper.com/api/1/route?point="+x1+","+y1+"&point="+x22+","+y22+"&vehicle=foot&locale=de&points_encoded=false&key=72e12178-3f0f-4491-a947-b58853fe7db9", (resp) => {
              let data = '';
              resp.on('data', (chunk) => {
                data += chunk;
              });
              resp.on('end', () => {
                // console.log(JSON.parse(data).explanation);
                // console.log('hiiiiii '+JSON.stringify(JSON.parse(data).features[0].geometry))
                // console.log('dataaaaa '+JSON.stringify(JSON.parse(data).paths[0].points))
                var corr =JSON.parse(data).paths[0].points
                // // console.log('hi 222222 '+corr)
                tab[z]=corr
                hat=corr;
                var path=JSON.parse(data).paths[0];
                     var time =JSON.parse(data).paths[0].time/1000
                     var distance =JSON.parse(data).paths[0].distance
                     pathss.push(corr);
                     timess.push(time);
                     a.push(distance);  
                     ge3.push({"pathss":path.points,"timess":path.time/1000,"distance":path.distance}) 
                   d5={
                      path: '',
                      time :'',
                      distance:''
                  }
                  d5.path=pathss;
                  d5.time=timess;
                  d5.distance=a;
                 
                   
                  
              });
            
            }).on("error", (err) => {
              console.log("Error: " + err.message);
            });
            
           
        }
    
    
})


app.get('/getbeststation1/:type/:x1/:y1/', (request, response) => {
    var tram ,ida11=0;
    
    var trams=[];
    var a=[], timess=[] , ida=0, ind ,pathss=[],ge3=[];
    var host;// = "http://localhost:9000/api/1";
    var defaultKey = "72e12178-3f0f-4491-a947-b58853fe7db9";
    var profile = "foot";
    var GraphHopperRouting = require('graphhopper-js-api-client/src/GraphHopperRouting');
    var ghRouting = new GraphHopper.Routing({key: defaultKey, host: host, vehicle: profile, elevation: false});
  
    var t = require('./public/mapdata/tram.json');
    tram=t.nodes;
for (var i=0;i<tram.length;i++){
if(!(tram[i].nomFr===undefined)){
trams[ida11]=tram[i];
     
ghRouting.clearPoints();
ghRouting.addPoint(new GHInput(JSON.stringify(trams[ida11].x),JSON.stringify(trams[ida11].y)));
   ghRouting.addPoint(new GHInput(p[0].lat,p[0].lng));
   
   ghRouting.doRequest()
       .then(function (json) {  
           var path = json.paths[0]; 
            a[ida]=path.distance; 
            pathss.push(path.points);
           ind=a.indexOf(Math.min.apply(null, a));   
            timess[ida]=path.time/60000;
          ge3.push({"pathss":path.points,"timess":path.time/1000,"distance":path.distance})
         //    console.log('chasraaaaaa : '+ ge3)
            ida=ida+1;    
         //  var outHtml = 'Distance in meter:'+a[m]+'<br/>Times in seconds:'+times[m] / 1000 ;
         //   $("#limiter").html(outHtml);
       })
       .catch(function (err) {
     
       });
ida11=ida11+1;
}
}




})
// app.get('/getbeststation/:type/:x1/:y1/', (request, response) => {
//     var host;// = "http://localhost:9000/api/1";
//     var x1 = request.params.x1;
//     var y1 = request.params.y1;
//     var x2=35.19829
//     var y2=-0.64459
//     var pathss=[];
//     var timess=[]
//     var a=[];
//     var type = request.params.x1;
    
//      request = require('request');
//     var tram ,ida11=0;
//     var trams=[];
//     var tab=[]
//     var d55 =[];
    
      
//           var t = require('./public/mapdata/tram.json');
//           tram=t.nodes;
//   console.log('tram '+tram.length);
//   for (var i=0;i<tram.length;i++){
//      if(!(tram[i].nomFr===undefined)){
//     trams[ida11]=tram[i];
//     // rout(trams[ida11].x,trams[ida11].y,ida11)
//     // console.log('tramss   : ' +trams[ida11])
//     ida11=ida11+1;
//      }
//   }
  
// rout(x2,y2,0)

//     function rout(x2,y2,z){
        
//         var d5
//         request({
//         method: 'GET',
//         url: 'https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf62486717a883d8fc4b21a9e17154eaafe74e&start='+y1+','+x1+'&end='+y2+','+x2+'',
//         // headers: {
//         //   'Accept': 'application/json, application/geo+json ; charset=utf-8'
//         // }
//     }, function (error, response1, body) {

     
//        var corr =JSON.parse(body).features[0].geometry;
//     //    console.log('ki kanet '+ JSON.stringify(corr))
//        var time =JSON.parse(body).features[0].properties.segments[0].duration;
//        var distance =JSON.parse(body).features[0].properties.segments[0].distance;
//        pathss.push(corr);
//        timess.push(time);
//        a.push(distance);
  
  
//      d5={
//         path: '',
//         time :'',
//         distance:''
//     }
//     d5.path=pathss;
//     d5.time=timess;
//     d5.distance=a;
//  tab[z]=d5

//  d55.push(d5)
// //  console.log('hatchooooo '+d5)
 
 
//       }
      
      
//       );

   
    
//     }
      
      
//       for (let i = 0; i <2; i++) {
//         setTimeout(function timer() {
//             if(i==1){
                
//             console.log('length of times'+ tab)
//             response.json(tab[0]);
        
//         }
           
//         }, i *1000);
//       }


//     // var k=rout(35.19829,-0.64459);
//     // response.json(k);

     

// });
app.get('/result/:type/:x1/:x2/:x3/:x4', (request, response) => {
    var x1 = request.params.x1;
    var x2 = request.params.x2;
    var x3 = request.params.x3;
    var x4 = request.params.x4;
    var type = request.params.type;
    var datas = [],
    b = true,
    source,
    target,
    a = [],
    b = [],
    ida = 0,
    ida1 = 0,
    idatas = 0,
    w=false,
    v=1,
    q=0,
    change;
    var dtt=0;
    var dtt2=0
    var v2=1;
    var v3=1;
    var v8=1
    var v9=1
    var op=0;
    var op1=0;
    var targetname;
    var sourcename;
    var test=0;
    var test1=0;
    var bb=true;
    var bb1=true;
    var poly=[]
    var myLines = [{
        "type": "LineString",
        "coordinates": []
    }]; 
    var isource,itarget;
   var t

    var times=[105, 94, 98, 224, 100, 100, 95, 200, 120, 110, 150, 145, 120, 122, 85, 103, 78, 87, 110, 130, 130]

    Result.find({}).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
if(type==='tram'){
         t = require('./public/mapdata/tram.json');
}else if (type.includes('A03_')){
         t = require('./public/mapdata/A03.json');
}else if (type.includes('bis')){
    t = require('./public/mapdata/A03bis.json');
}else if (type.includes('A11')){
    t = require('./public/mapdata/A11.json');
}else if (type.includes('A16')){
    t = require('./public/mapdata/A16.json');
}else if (type.includes('A17')){
    t = require('./public/mapdata/A17.json');
}else if (type.includes('A22')){
    t = require('./public/mapdata/A22.json');
}else if (type.includes('A25')){
    t = require('./public/mapdata/A25.json');
}
else if (type.includes('A27')){
    t = require('./public/mapdata/A27.json');
}
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
                    sourcename=tram[i].nomFr;
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
                    targetname=tram[i].nomFr;
                    target = i;
                    console.log('target' + target);
                    console.log('target name ' + target);

                }
            }
        }

        var nd6 = require('./nodes6.json');
        for (var i=0;i<nd6.length;i++){
            if(nd6[i].nomFr===targetname){
                itarget=nd6[i].numero-1;
               
            }
           
        }
      

        for (var i=0;i<nd6.length;i++){
            if(nd6[i].nomFr===sourcename){
                isource=nd6[i].numero;
            }
        }
        console.log('indice source  '+isource);
        console.log('indice target  '+itarget);
        
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
        if(source<target){
            change=source;
        }else{change=target}
        var results = dijkstra(source, target);
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
            var diff;
            diff=results.path[i].target-results.path[i].source;
            var aba=0;
            
            aba=aba+1;
            
            if(diff >1){w=true;
                
            corr=true;}
            if(w===true){
                if(v9===1){
                    var tr2 = require('./nodes7.json');
                  
                   
                       
                         
                    var chn;
                   
                        for(var iw=itarget;iw>=isource;iw--){
                            console.log(' jjjjj '+tr2[iw].id)
                            console.log(' jjjjj '+tr2[iw].distance)
                            dtt2=dtt2+tr2[iw].distance;
                                
                        }
                        
                    
                   
                         dtt2=dtt2-875;
                         console.log('duréé with corrsp  '+dtt2);
                        





                    v9=2
                }
             



              

             
            if(v===1){
                q=results.path[i].source;
                var x01 = getpoint(q).x;
            var y01 = getpoint(q).y;
            ds.x = x01;
            ds.y = y01;
            ds.name=q;
            myLines[0].coordinates.push([y01,x01])
            datas[idatas] = ds;
            idatas=idatas+1;
            v=0;
            }else{ 
            
               
        
           
            var x01 = getpoint(results.path[i].source).x;
            var y01 = getpoint(results.path[i].source).y;
            ds.x = x01;
            ds.y = y01;
            ds.name=results.path[i].source;
            myLines[0].coordinates.push([y01,x01])
            datas[idatas] = ds;
            q=results.path[i].target;
            idatas=idatas+1;
        
        }
    }
            else{

                if(v8===1){
                     var tr3 = require('./nodes7.json');
                  
                   
                       
                        
                        for(var z=isource;z<=itarget;z++){ 
                            dtt=dtt+tr3[z].distance;

                  console.log('ssssssssss '+tr3[z].distance);}
                         
                         console.log('duréé without corrsp  '+dtt);
                         v8=2
                         
                }
               
                q=results.path[i].source;
                
            
            var x01 = getpoint(q).x;
            var y01 = getpoint(q).y;
            ds.x = x01;
            ds.y = y01;
            ds.name = idatas+change;
            myLines[0].coordinates.push([y01,x01])
             datas[idatas] = ds;
            idatas = idatas + 1;
           
        }}
        var x011 = getpoint(target).x;
        console.log('point te3 '+x011);
        var y011 = getpoint(target).y;
        console.log('point te3 '+y011);
        console.log('point te3 idatas '+idatas);
        var ds11 = {
            x: '',
            y: '',
            name: ''
        };
        ds11.x=x011;
        ds11.y=y011;
        ds11.name=target;
        myLines[0].coordinates.push([y011,x011])
        datas[idatas]=ds11;
        var datass = {
            datas: '',
            duration:''
        };
       datass.datas=datas;
       datass.duration=dtt2;
       var duration ={
        duration:dtt2
       }
       
        
       var d5={
           datas: [],
           duration
       }
       d5.datas=datas;
      
        console.log('datas : '+datas);
        console.log('myLines : '+JSON.stringify(myLines));
        response.json(myLines);
    });



})
app.get('/draw/:type/:len1/:len2', (request, response) => {
    var mapdata = request.params.mapdata;
    var path = require('./public/mapdata/'+type+'point.json');
    var type = request.params.type;
    var t = require('./public/mapdata/'+type+'.json');
    
         var len1 =request.params.len1;
         var len2=request.params.len2;    
         console.log('len1 === '+len1)   
         console.log('len2 === '+len2)   
                    for(var j=0;j<1;j++){
                         jj=j+1;
                        var uu=JSON.stringify(path.coordinates[j])
                        var Y1=uu.substring(1,uu.indexOf(','))
                        var tabId = uu.split(",").pop(); 
                        var  X1=tabId.replace(']','')
                        t.nodes.push({"name":len1+j,"x":X1,"y":Y1});
                        if(jj<path.coordinates.length){
                        t.paths.push({"id":len2+j,"from":len1+j,"to":len1+jj})}        
                    }
                    console.log(t)
                    response.json(t);

})
app.get('/indice/:type/:x1/:x2', (request, response) => {
    var x1 = request.params.x1;
    var x2 = request.params.x2;
    var type = request.params.type;
  var  a = [],
  
    ida = 0;
var source;
    var t = require('./public/mapdata/'+type+'.json');
    var tram = t.nodes;
    // console.log('length ' + tram.length);
    for (var i = 0; i < tram.length; i++) {
        if (!(tram[i].nomFr === undefined)) {
            var d = distance(x1, x2, tram[i].x, tram[i].y);
            a[ida] = d;
            ida = ida + 1;

        }
    }
  
    for (var i = 0; i < tram.length; i++) {
        if (!(tram[i].nomFr === undefined)) {
            var d = distance(x1, x2, tram[i].x, tram[i].y);
            if (d == Math.min.apply(null, a)) {
             
                source = i;
                sourcename=tram[i].nomFr;
             

            }
        }
    }
    response.json(source);


})
app.get('/result1/:type/:x1/:x2/:x3/:x4', (request, response) => {
    var x1 = request.params.x1;
    var x2 = request.params.x2;
    var x3 = request.params.x3;
    var x4 = request.params.x4;
    var type = request.params.type;
    var datas = [],
    b = true,
    source,
    target,
    a = [],
    b = [],
    ida = 0,
    ida1 = 0,
    idatas = 0,
    w=false,
    v=1,
    q=0,
    change;
    var dtt=0;
    var dtt2=0
    var v2=1;
    var v3=1;
    var v8=1
    var v9=1
    var op=0;
    var op1=0;
    var targetname;
    var sourcename;
    var test=0;
    var test1=0;
    var bb=true;
    var bb1=true;
    var isource,itarget;
   var t

    var times=[105, 94, 98, 224, 100, 100, 95, 200, 120, 110, 150, 145, 120, 122, 85, 103, 78, 87, 110, 130, 130]

    Result.find({}).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
if(type==='tram'){
         t = require('./public/mapdata/tram.json');
}else if (type.includes('A03')){
         t = require('./public/mapdata/A03.json');
}else if (type.includes('A03bis')){
    t = require('./public/mapdata/A03bis.json');
}else if (type.includes('A11')){
    t = require('./public/mapdata/A11.json');
}else if (type.includes('A16')){
    t = require('./public/mapdata/A16.json');
}else if (type.includes('A17')){
    t = require('./public/mapdata/A17.json');
}else if (type.includes('A22')){
    t = require('./public/mapdata/A22.json');
}else if (type.includes('A25')){
    t = require('./public/mapdata/A25.json');
}
else if (type.includes('A27')){
    t = require('./public/mapdata/A27.json');
}
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
                    sourcename=tram[i].nomFr;
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
                    targetname=tram[i].nomFr;
                    target = i;
                    console.log('target' + target);
                    console.log('target name ' + target);

                }
            }
        }

        var nd6 = require('./nodes6.json');
        for (var i=0;i<nd6.length;i++){
            if(nd6[i].nomFr===targetname){
                itarget=nd6[i].numero-1;
               
            }
           
        }
      

        for (var i=0;i<nd6.length;i++){
            if(nd6[i].nomFr===sourcename){
                isource=nd6[i].numero;
            }
        }
        console.log('indice source  '+isource);
        console.log('indice target  '+itarget);
        
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
        if(source<target){
            change=source;
        }else{change=target}
        var results = dijkstra(source, target);
        console.log('hadi iiiiiiiii ' +results.distance);
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
            var diff;
            diff=results.path[i].target-results.path[i].source;
            var aba=0;
            
            aba=aba+1;
            
            if(diff >1){w=true;
                
            corr=true;}
            if(w===true){
                if(v9===1){
                    var tr2 = require('./nodes7.json');
                  
                   
                       
                         
                    var chn;
                   
                        for(var iw=itarget;iw>=isource;iw--){
                            console.log(' jjjjj '+tr2[iw].id)
                            console.log(' jjjjj '+tr2[iw].distance)
                            dtt2=dtt2+tr2[iw].distance;
                                
                        }
                        
                    
                   
                         dtt2=dtt2-875;
                         console.log('duréé with corrsp  '+dtt2);
                        





                    v9=2
                }
             



              

             
            if(v===1){
                q=results.path[i].source;
                var x01 = getpoint(q).x;
            var y01 = getpoint(q).y;
            ds.x = x01;
            ds.y = y01;
            ds.name=q
            datas[idatas] = ds;
            idatas=idatas+1;
            v=0;
            }else{ 
            
               
        
           
            var x01 = getpoint(results.path[i].source).x;
            var y01 = getpoint(results.path[i].source).y;
            ds.x = x01;
            ds.y = y01;
            ds.name=results.path[i].source;
            
            datas[idatas] = ds;
            q=results.path[i].target;
            idatas=idatas+1;
        
        }
    }
            else{

                if(v8===1){
                     var tr3 = require('./nodes7.json');
                  
                   
                       
                        
                        for(var z=isource;z<=itarget;z++){ 
                            dtt=dtt+tr3[z].distance;

                  console.log('ssssssssss '+tr3[z].distance);}
                         
                         console.log('duréé without corrsp  '+dtt);
                         v8=2
                         
                }
               
                q=results.path[i].source;
                
            
            var x01 = getpoint(q).x;
            var y01 = getpoint(q).y;
            ds.x = x01;
            ds.y = y01;
            ds.name = idatas+change;
             datas[idatas] = ds;
            idatas = idatas + 1;
           
        }}
        var x011 = getpoint(target).x;
        console.log('point te3 '+x011);
        var y011 = getpoint(target).y;
        console.log('point te3 '+y011);
        console.log('point te3 idatas '+idatas);
        var ds11 = {
            x: '',
            y: '',
            name: ''
        };
        ds11.x=x011;
        ds11.y=y011;
        ds11.name=target;
        datas[idatas]=ds11;
        var datass = {
            datas: '',
            duration:''
        };
       datass.datas=datas;
       datass.duration=dtt2;
       var duration ={
        duration:dtt2
       }
       
        
       var d5={
           datas: [],
           distance:''
       }
       d5.datas=datas;
       d5.distance=results.distance
      
        console.log(datas);
        response.json(d5);
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
app2.get('/stations_sba', (request, response) => {
    stations_sba.find({}).sort({ type: 1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})
app.get('/stat1', (request, response) => {
    stations_sba.find({}).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        var t = require('./public/mapdata/stat1.json');
        data=t;
        response.json(data);
    });
})
app2.get('/stat1', (request, response) => {
    stations_sba.find({}).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        var t = require('./public/mapdata/stat1.json');
        data=t;
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
app2.get('/correspondance', (request, response) => {
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
            distance: totalDistance,
            time:totalDistance/5.5
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


function getind(x,y,trams){
    var a=[];
    var ida=0;
    var ind;
    for (var i = 0; i < trams.length; i++) {
   
        var d = distance(x, y, trams[i].x, trams[i].y);
        a[ida] = d;
        ida = ida + 1;

    
}

for (var i = 0; i < trams.length; i++) {
    
        var d = distance(x, y, trams[i].x, trams[i].y);
        if (d == Math.min.apply(null, a)) {
          
         
           ind=trams[i].name
          
         

        }
    
} return ind
}



function getpol(type,src,trt){
    
   
    var datas = [],
 
    source,
    target,
   
    idatas = 0,
    w=false,
    v=1,
    q=0,
    change;
    var dtt=0;
    var dtt2=0
    var v8=1
    var v9=1 
    var targetname;
    var sourcename;
    var isource,itarget;
   var t
    var times=[105, 94, 98, 224, 100, 100, 95, 200, 120, 110, 150, 145, 120, 122, 85, 103, 78, 87, 110, 130, 130]

    Result.find({}).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
if(type==='tram'){
         t = require('./public/mapdata/tram.json');
}else if (type.includes('A03')){
         t = require('./public/mapdata/A03.json');
}else if (type.includes('A03bis')){
    t = require('./public/mapdata/A03bis.json');
}else if (type.includes('A11')){
    t = require('./public/mapdata/A11.json');
}else if (type.includes('A16')){
    t = require('./public/mapdata/A16.json');
}else if (type.includes('A17')){
    t = require('./public/mapdata/A17.json');
}else if (type.includes('A22')){
    t = require('./public/mapdata/A22.json');
}else if (type.includes('A25')){
    t = require('./public/mapdata/A25.json');
}
else if (type.includes('A27')){
    t = require('./public/mapdata/A27.json');
}

        var tram = t.nodes;
        console.log('length 99999 : '+tram.length)
        
        for (var i = 0; i < tram.length; i++) {
            if ((tram[i].nomFr === src)) {
            
          
                    source = i;
                    sourcename=tram[i].nomFr;
                    console.log('source' + source);

                
            }
        }
        for (var i = 0; i < tram.length; i++) {
            if ((tram[i].nomFr === trt)) {
            
             
                
                    targetname=tram[i].nomFr;
                    target = i;
                    console.log('target' + target);

                
            }
        }

        var nd6 = require('./nodes6.json');
        for (var i=0;i<nd6.length;i++){
            if(nd6[i].nomFr===targetname){
                itarget=nd6[i].numero-1;
               
            }
           
        }
      

        for (var i=0;i<nd6.length;i++){
            if(nd6[i].nomFr===sourcename){
                isource=nd6[i].numero;
            }
        }
        console.log('indice source  '+isource);
        console.log('indice target  '+itarget);
        
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
        if(source<target){
            change=source;
        }else{change=target}
        var results = dijkstra(source, target);
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
            var diff;
            diff=results.path[i].target-results.path[i].source;
            var aba=0;
            
            aba=aba+1;
            
            if(diff >1){w=true;
                
            corr=true;}
            if(w===true){
                if(v9===1){
                    var tr2 = require('./nodes7.json');
                  
                   
                       
                         
                    var chn;
                   
                        for(var iw=itarget;iw>=isource;iw--){
                            console.log(' jjjjj '+tr2[iw].id)
                            console.log(' jjjjj '+tr2[iw].distance)
                            dtt2=dtt2+tr2[iw].distance;
                                
                        }
                        
                    
                   
                         dtt2=dtt2-875;
                         console.log('duréé with corrsp  '+dtt2);
                        





                    v9=2
                }
             



              

             
            if(v===1){
                q=results.path[i].source;
                var x01 = getpoint(q).x;
            var y01 = getpoint(q).y;
            ds.x = x01;
            ds.y = y01;
            ds.name=q
            datas[idatas] = ds;
            idatas=idatas+1;
            v=0;
            }else{ 
            
               
        
           
            var x01 = getpoint(results.path[i].source).x;
            var y01 = getpoint(results.path[i].source).y;
            ds.x = x01;
            ds.y = y01;
            ds.name=results.path[i].source;
            
            datas[idatas] = ds;
            q=results.path[i].target;
            idatas=idatas+1;
        
        }
    }
            else{

                if(v8===1){
                     var tr3 = require('./nodes7.json');
                  
                   
                       
                        
                        for(var z=isource;z<=itarget;z++){ 
                            dtt=dtt+tr3[z].distance;

                  console.log('ssssssssss '+tr3[z].distance);}
                         
                         console.log('duréé without corrsp  '+dtt);
                         v8=2
                         
                }
               
                q=results.path[i].source;
                
            
            var x01 = getpoint(q).x;
            var y01 = getpoint(q).y;
            ds.x = x01;
            ds.y = y01;
            ds.name = idatas+change;
             datas[idatas] = ds;
            idatas = idatas + 1;
           
        }}
        var x011 = getpoint(target).x;
        console.log('point te3 '+x011);
        var y011 = getpoint(target).y;
        console.log('point te3 '+y011);
        console.log('point te3 idatas '+idatas);
        var ds11 = {
            x: '',
            y: '',
            name: ''
        };
        ds11.x=x011;
        ds11.y=y011;
        ds11.name=target;
        datas[idatas]=ds11;
        var datass = {
            datas: '',
            duration:''
        };
       datass.datas=datas;
       datass.duration=dtt2;
       var duration ={
        duration:dtt2
       }
       
        
       var d5={
           datas: [],
           duration
       }
       d5.datas=datas;
      
        console.log(datas);
    
        return datas
    });
    }