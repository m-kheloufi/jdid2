var c = require('./nd.json');
var fs = require('fs');
var sortJsonArray = require('sort-json-array');
const sortJson = require('sort-json');

var k = c.length;

var i = 0, j = 0;


    
    for (let i = 0; i < c.length; i++) {
       
        setTimeout(function timer() {
            var js = {
                "name":i,
                "x": c[i].latitude,
                "y": c[i].longitude
                
            };    
         console.log(js);
            fs.appendFile('nodes11.json', JSON.stringify(js), (err) => {
                if (err) {
                    throw err;
                }
            });
        
        }, i * 1000);
    }
   
   




