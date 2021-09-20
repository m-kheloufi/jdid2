// const Datastore = require('nedb');
// var datt
// const stations_sba = new Datastore('stations_sba');
// stations_sba.loadDatabase();
// stations_sba.find({}).sort({ type: 1 }).exec(function (err, data) {
//     if (err) {
      
//         response.end();
//         return;
//     }
//     datt=data
//     // console.log('length 0000: '+datt.length)


     
// var t = require('./public/mapdata/all01.json');
// var all=t.nodes
const fs = require('fs');
var t = require('./Matrixdb.json');
for(var i=0;i<t.length;i++){
    t[i].numerodepart='&'+t[i].numerodepart
    t[i].numeroarrive='&'+t[i].numeroarrive
    if(i==t.length-1){
        var dat=JSON.stringify(t)
        fs.writeFile('all022.json', dat, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        }); 
    }

}
// var tt

// var ida11=0
// var alls=[]
// var tabs=[]

// const Graph = require('dijkstra-short-path');

// const route = new Graph();

//     // console.log(' stations length : '+alls.length)
//     // console.log(' stations length : '+alls[0].nomFr)
//     // console.log(' stations length : '+t[0].nomFrdepart)
// const fs = require('fs');
// var x=0;
// // console.log('length : '+t.length)
// var re;
// for(var i=0;i<datt.length;i++){
//     // console.log('name : '+datt[i].nomFr+' indice : '+ i)
//     setTimeout(function timer() {
//         var n=datt[x].nomFr+datt[x].numero
//         // console.log('ghi haba  : '+datt[0].nomFr+datt[0].numero)
//         re=hatcho(n)
//         tabs.push(re)
//     for (var j=0;j<t.length;j++){
//         if(re.name==t[j].nomFrarrive+t[j].numeroarrive){
//             re.tab.push([t[j].nomFrdepart+t[j].numerodepart,t[j].duration])

//         }
//     }
//         route.addNode(re.name, new Map(re.tab));
//         // console.log("x : "+x)
//         if(x==112){
          
//             // console.log('tabs : '+JSON.stringify(tabs))
//             var dat=JSON.stringify(tabs)
// fs.writeFile('all02.json', dat, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("JSON data is saved.");
// });
//     //         console.log('from :'+datt[1].nomFr)
//     // console.log('to :'+datt[50].nomFr)
//     // // console.log('tabsss : '+JSON.stringify(tabs))
//     console.log(route.path("Sidi Lahcene, Terminus A11A11_13","Bouaîch, Terminus A27A27_06"))
//     // console.log("route : "+JSON.stringify(route))
//         }
    
//         x=x+1;
//         }, i * 1);
   
// }



// // console.log(route.path(tabs[1].name, tabs[0].name))
// function hatcho(name){
//     var tab=[]
//     var numd;
//     var numa;
//     var n ,op
// for (var i=0;i<t.length;i++){
//     n=t[i].nomFrdepart+t[i].numerodepart
   
//     if(name==n){
//         op=i
//         numa=t[i].numeroarrive
//   tt=[t[i].nomFrarrive+numa,t[i].duration]
//       tab.push(tt)
    
      
//     }
  
  
// }

// return {"name":name,"tab":tab}

// }

// // var dat=JSON.stringify(tab)
// // fs.writeFile('all02.json', dat, (err) => {
// //     if (err) {
// //         throw err;
// //     }
// //     console.log("JSON data is saved.");
// // });





// })

  