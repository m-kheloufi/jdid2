var c03 = require('./nodesA03.json');
var tt = require('./nd.json');
var c16 = require('./nodesA16.json');
var test = require('./testA03_A16.json');
// var request = require('request');
var t=tt.nodes;
var fs = require('fs');
var k=0;


// for (let i = 0; i < 232; i++) {
    
//     var j=i+1

//          var js = {
//              "id":i,
//              "from": i,
//              "to": j,
            
//          };   
//       console.log(js);
//          fs.appendFile('tes03.json', JSON.stringify(js), (err) => {
//              if (err) {
//                  throw err;
//              }
//          });
      
   
//  }

    
    for (let i = 0; i < t.length; i++) {
        
        setTimeout(function timer() {

            var js = {
                "name":i,
                "nomFr": t[i].nomFr,
                "x": t[i].x,
                "y": t[i].y,
                "line": t[i].line
                
            };    
         
         console.log(js);
            fs.appendFile('tes0311.json', JSON.stringify(js), (err) => {
                if (err) {
                    throw err;
                }
            });
        }, i * 1000);
        
      
    }
   
   

// for (let i = 0; i < test.length; i++) {
//     var zp=0;
//         setTimeout(function timer() {
//             for (let j = 0; j < t.length; j++) {
//                 setTimeout(function timer() {
//         if(test[i].name===t[j].FROM_TO){
//             zp=zp+1;
//             var js = {
//                                     "name":k,
//                                     "FROM_TO":test[i].name,
//                                     "x": t[j].x,
//                                     "y": t[j].y,
//                                     "indice":zp
                                    
//                                 };   k=k+1; 
//                              console.log(js);
//                                 fs.appendFile('tes03.json', JSON.stringify(js), (err) => {
//                                     if (err) {
//                                         throw err;
//                                     }
//                                 });

//         }else {zp=0}



//                 }, j * 100);}
//         }, i * 200);}

// for (let i = 0; i < test.length; i++) {
//     setTimeout(function timer() {
//         for (let j = 0; j < test[i].points.length; j++) {
//             setTimeout(function timer() {
//                 var d=test[i].points[j].toString();
//             var y = d.substring(0,
//               d.lastIndexOf(",") + 1
  
//               );
//          var x = d.substring(
//             d.lastIndexOf(",") + 1
  
//             );

//                 var js = {
//                     "name":k,
//                     "FROM_TO":test[i].name,
//                     "x": x,
//                     "y": y
                    
//                 };   k=k+1; 
//              console.log(js);
//                 fs.appendFile('tes03.json', JSON.stringify(js), (err) => {
//                     if (err) {
//                         throw err;
//                     }
//                 });
             
//             }, j * 10);
//           }
        
//     }, i * 8000);
//   }


// for(let i=0;i<1;i++){
//     setTimeout(function timer() {
//     for (let j=0;j<c16.length;j++){
//         var x1=c03[i].latitude;
//         var y1=c03[i].longitude;
//         var x2=c16[j].latitude;
//         var y2=c16[j].longitude;
//         request({
//             method: 'GET',
//             url: 'https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf62486717a883d8fc4b21a9e17154eaafe74e&start='+y1+','+x1+'&end='+y2+','+x2+'',
//             headers: {
//               'Accept': 'application/json, application/geo+json ; charset=utf-8'
//             }}, function (error, response, body) {
//           //   console.log('Status:', response.statusCode);
//           //   console.log('Headers:', JSON.stringify(response.headers));
//           //   console.log('Response:', body);
//           console.log('heda '+c03[i].nomFr+' m3a heda '+c16[j].nomFr);
//            var corr =JSON.parse(body).features[0].geometry.coordinates;
//            console.log(corr);
//            var js = {
//             "name":'From '+c03[i].nomFr+' To '+c16[j].nomFr,
//             "points": corr
            
//         };    
//      console.log(js);
//         fs.appendFile('testA03_A16.json', JSON.stringify(js), (err) => {
//             if (err) {
//                 throw err;
//             }
//         });
            
//           });
          
//             // var js ={
//             //     name:'From' +c03[i].nomFr+' TO '+c16[j].nomFr,
//             //     path:d
//             // }

        
        
//     }
// }, k * 2000);
// k=k+1;
// }












  
   
   




