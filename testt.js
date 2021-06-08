var k = require('./khrabus.json');
var fs = require('fs');
var sortJsonArray = require('sort-json-array');
const sortJson = require('sort-json');

var c = k.nodes;

var i = 0, j = 0;


console.log(c.length)
function hactho(zp) {
    
    for (var i = 0; i < c.length; i++) {
        if (c[i].name === zp ) {

            var js = {
                "name":i,
                "x": c[i].x,
                "y": c[i].y,
                "_id":i,
                
            };    
         console.log(js);
            fs.appendFile('nodes4.json', JSON.stringify(js), (err) => {
                if (err) {
                    throw err;
                }
            });

        }
      
    }
   
   
}
for (let i = 0; i < c.length; i++) {
    setTimeout(function timer() {
      hactho(i);
    }, i * 1000);
  }













