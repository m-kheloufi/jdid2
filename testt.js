var cc = require('./nd.json');
var fs = require('fs');
var sortJsonArray = require('sort-json-array');
const sortJson = require('sort-json');

var c=cc.nodes;


    
    for (let i = 0; i < c.length; i++) {
        setTimeout(function timer() {
        var j=i+1

            var js = {
                "id":i,
                "from": i,
                "to": j,
               
            };   
         console.log(js);
            fs.appendFile('nodesA03.json', JSON.stringify(js), (err) => {
                if (err) {
                    throw err;
                }
            });
        }, i * 10);
      
    }
   
   














