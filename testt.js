const fs = require('fs');
const t = require("./nodes6.json");


var times=[105, 94, 98, 224, 100, 100, 95, 200, 120, 110, 150, 145, 120, 122, 85, 103, 78, 87, 110, 130, 130]


for (let i = 0; i <21; i++) {
    setTimeout(function timer() {
      
    
    var k = t[i];
    var js = {
        "nomFr":t[i].nomFr+' TO '+t[i+1].nomFr,
        "distance": times[i],
        "id":t[i].numero
       
    }
    const data = JSON.stringify(js);

    // write JSON string to a file
    fs.appendFile('nodes7.json', data, (err) => {
        if (err) {
            throw err;
        }

    });
}, i * 10);
}