// // import * as GraphHopper from 'graphhopper-js-api-client';
//     // If you only need e.g. Routing, you can only require the needed parts
//     //var GraphHopperRouting = require('graphhopper-js-api-client/src/GraphHopperRouting');
//     //var GHInput = require('graphhopper-js-api-client/src/GHInput');
//     var GraphHopper = require('graphhopper-js-api-client/src/GraphHopperRouting');
//     exports.getss =function(x1,y1) {  
    
//         var defaultKey = "72e12178-3f0f-4491-a947-b58853fe7db9";
//         var profile = "foot";
    
//         var host;
//         var ghRouting = new GraphHopper.Routing({key: defaultKey, host: host, vehicle: profile, elevation: false});
//          // If you only need e.g. Routing, you can only require the needed parts
//         //var ghRouting = new GraphHopperRouting({key: defaultKey, host: host, vehicle: profile, elevation: false});
    
//         // Setup your own Points
//         ghRouting.addPoint(new GHInput(x1,y1));
//         ghRouting.addPoint(new GHInput(35.20692, -0.63352));
    
//         ghRouting.doRequest()
//         .then(function(json){
//             var path = json.paths[0]; 
//             response.json(path.points)
//            // Add your own result handling here
//            console.log(json);
//         })
//         .catch(function(err){
//            console.error(err.message);
//         });}