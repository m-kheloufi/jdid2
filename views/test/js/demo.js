
var p=[]
var tab=[]
var dissource=[]
var distarget=[]
var distram=[]
var somedistance=[]
var jpath;
var routingLayertram,routingLayer,routingLayer1,testtt;
// function getindice(p1,p2){ 
//     var pause=false;
//     var a=[];
// var tram;
// var target=0 ;
// var ida=0;
// var res;

//     $.getJSON("mapdata/tram.json", datad, function (data) {
//              tram = datad.nodes;
//     console.log('tram '+tram.length);

//     for (var i=0;i<tram.length;i++){
//         if(!(tram[i].nomFr===undefined)){
//        var d= distance(p1,p2,tram[i].x,tram[i].y);
//        a[ida]=d;
//        ida=ida+1;
      
//     }}
// console.log('array '+ a);
// console.log('min '+Math.min.apply(null, a))

// for (var i=0;i<tram.length;i++){
//     if(!(tram[i].nomFr===undefined)){
//     var d= distance(p1,p2,tram[i].x,tram[i].y);
//    if(d==Math.min.apply(null, a)){
//     target=i;
 
//     pause=true;
//     return data
//     console.log('takhdeeeeeeeeeeeem target ' +target)
     
    
   
  
   
//    }}
//  }

// }
//      );return  
//     //  console.log('takhdeeeeeeeeeeeem target ' +target)
    
//     //  if(pause===true){return target;}else return 'hiiiiiiii'
     
//     return res;
    
// }
// var ret=getindice(35.22111,-0.64678);
// console.log('sahlaaaaaa '+JSON.stringify(ret))

var X1,Y1,X2,Y2;
var iconObject = L.icon({
    iconUrl: './img/marker-icon.png',
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    iconAnchor: [12, 40]
});

$(document).ready(function (e) {
    jQuery.support.cors = true;

    $(".tab-content").css("display", "none");
    $(".tabs-menu a").click(function (event) {
        // event.preventDefault();
        showTab($(this));
    });

    function showTab(thisDiv) {
        thisDiv.parent().addClass("current");
        thisDiv.parent().siblings().removeClass("current");
        var tab = thisDiv.attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();

        // a bit hackish to refresh the map
        routingMap.invalidateSize(false);
       
    }

    var host;// = "http://localhost:9000/api/1";
    var defaultKey = "72e12178-3f0f-4491-a947-b58853fe7db9";
    var profile = "foot";
    var ghRouting = new GraphHopper.Routing({key: defaultKey, host: host, vehicle: profile, elevation: false});
    var ghGeocoding = new GraphHopper.Geocoding({
        key: '72e12178-3f0f-4491-a947-b58853fe7db9',
        host: host,
        limit: 8,
        locale: "en" /* currently fr, en, de and it are explicitely supported */
    });
    var ghMatrix = new GraphHopper.Matrix({key: defaultKey, host: host, vehicle: profile});
    var ghOptimization = new GraphHopper.Optimization({key: defaultKey, host: host, profile: profile});
    var ghIsochrone = new GraphHopper.Isochrone({key: defaultKey, host: host, vehicle: profile});
    var ghMapMatching = new GraphHopper.MapMatching({key: defaultKey, host: host, vehicle: profile});

//    if (location.protocol === "file:") {
//        ghOptimization.host = 'http://localhost:9000/api/1';
//        ghOptimization.basePath = '/vrp';
//    }

    var overwriteExistingKey = function () {
        var key = $("#custom_key_input").val();
        if (key && key !== defaultKey) {
            $("#custom_key_enabled").show();

            ghRouting.key = key;
            ghMatrix.key = key;
            ghGeocoding.key = key;
            ghOptimization.key = key;
            ghIsochrone.key = key;
            ghMapMatching.key = key;
        } else {
            $("#custom_key_enabled").hide();
        }
    };
    overwriteExistingKey();
    $("#custom_key_button").click(overwriteExistingKey);

    var routingMap = maps
    setupRoutingAPI(routingMap, ghRouting);
  
   

    var tmpTab = window.location.hash;
    if (!tmpTab)
        tmpTab = "#routing";

    showTab($(".tabs-menu li > a[href='" + tmpTab + "']"));
});



function setupRoutingAPI(map, ghRouting,x,y,lo,la) {


    
  var tram ,ida11=0;
  var trams=[];
  var ft,dis
  var matrix=[ft,dis];
    $.getJSON("mapdata/tram.json", function (datad) {
        tram = datad.nodes;
console.log('tram '+tram.length);
for (var i=0;i<tram.length;i++){
   if(!(tram[i].nomFr===undefined)){
  trams[ida11]=tram[i];
  console.log('tramss   : ' +trams[ida11])
  ida11=ida11+1;
   }
}})

// const optionsPost = {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             body: 'hiiiiiiiiii07'
//                         };
//                         const response = fetch('enter', optionsPost);
var message = "<%= message %>";
console.log('hi bb'+message);

console.log('matrix ya gada3 77777 '+matrix)


    map.on('click', function (e) {
         routingLayertram = L.geoJson().addTo(map);
        L.marker(e.latlng, {icon: iconObject}).addTo(routingLayertram);
        p.push(e.latlng)
        console.log('points : '+p)
        console.log('point 1 : '+p.length)
      

//         $("#cleartram").click(function () {
//  p=[]
//             ghRouting.clearPoints();
//             routingLayertram.clearLayers();
          
      
//             var x = document.getElementById("limiter");
           
//               x.style.display = "none";
            
          
//         });
        if (p.length ==3 ) {
         
            routingLayertram.clearLayers();
            ghRouting.clearPoints();
          
        }
    })
        
    console.log('points : '+p)
    console.log('point 1 : '+p.length)
            
            $("#start01").click(function () {
                if(p.length==2){
                console.log('p[0} ----'+p[0].lat)
                var text="tram";
var io;   var to;   
if(p.length==2){     
    ghRouting.clearPoints();     
var kk=getpoint1(p[0].lat,p[0].lng,text,io);
var kk1=getpoint1(p[1].lat,p[1].lng,text,to);}
var ob=[]
console.log('indiiiiiiiiiiiiiic io ' +ob[0])
console.log('targettttttttttt to ' +ob[1])
// draww(p[0].la,p[0].lng)
function getpoint1(p1,p2,text,io){
                    
                
    var a=[];
    var nodeName = mapdata.allnodes.length;
    var zk
var tram;
var indice;
var source;
var target ;
var ida=0;

     $.getJSON("mapdata/"+text+".json", function (datad) {
             tram = datad.nodes;
    console.log('tram '+tram.length);

    for (var i=0;i<tram.length;i++){
        if(!(tram[i].nomFr===undefined)){
       var d= distance(p1,p2,tram[i].x,tram[i].y);
       a[ida]=d;
       ida=ida+1;
      
    }}
// console.log('array '+ a);
console.log('min '+Math.min.apply(null, a))

for (var i=0;i<tram.length;i++){
    if(!(tram[i].nomFr===undefined)){
    var d= distance(p1,p2,tram[i].x,tram[i].y);
   if(d==Math.min.apply(null, a)){
       zk=i;
       
    target=i;
    ob.push(target);
    console.log('push dexu points : '+ob)
    io=target
 
    var o=[];
    o.push(tram[i].x,tram[i].y)
    console.log("cha poshiiit "+o[0])
   
ghRouting.clearPoints();
ghRouting.addPoint(new GHInput(tram[i].x,tram[i].y));
   ghRouting.addPoint(new GHInput(p1,p2));
   // ******************
   //  Calculate route! 
   // ******************
   ghRouting.doRequest()
       .then(function (json) {
           
           var path = json.paths[0];
           // console.log('hado sa77777 : '+JSON.stringify(path.points))
           routingLayertram.addData({
               "type": "Feature",
               "geometry": path.points
           });
           var outHtml = 'Distance in meter:'+path.distance+'<br/>Times in seconds:'+path.time / 1000 ;
       
           // outHtml += "<br/><a href='" + ghRouting.getGraphHopperMapsLink() + "'>GraphHopper Maps</a>";
           $("#limiter").html(outHtml);
           // var outHtml1='<div class="limiter">  <div class="wrap-login100"> <form class="login100-form validate-form" >   <div id="routing-response"></form></div> </div>'
           // $("#test").html(outHtml1);
           // if (path.bbox) {
           //     var minLon = path.bbox[0];
           //     var minLat = path.bbox[1];
           //     var maxLon = path.bbox[2];
           //     var maxLat = path.bbox[3];
           //     var tmpB = new L.LatLngBounds(new L.LatLng(minLat, minLon), new L.LatLng(maxLat, maxLon));
           //     map.fitBounds(tmpB);
           // }

           instructionsDiv.empty();
           if (path.instructions) {
               var allPoints = path.points.coordinates;
               var listUL = $("<ol>");
               instructionsDiv.append(listUL);
               for (var idx in path.instructions) {
                   var instr = path.instructions[idx];

                   // use 'interval' to find the geometry (list of points) until the next instruction
                   var instruction_points = allPoints.slice(instr.interval[0], instr.interval[1]);

                   // use 'sign' to display e.g. equally named images

                   $("<li>" + instr.text + " <small>(" + ghRouting.getTurnText(instr.sign) + ")</small>"
                       + " for " + instr.distance + "m and " + Math.round(instr.time / 1000) + "sec"
                       + ", geometry points:" + instruction_points.length + "</li>").appendTo(listUL);
               }
           }

       })
       .catch(function (err) {
           var str = "An error occured: " + err.message;
           $("#routing-response").text(str);
       });


   }}
 }

 console.log('indice --------- '+target);

 var results = dijkstra(ob[0],ob[1]);
//  console.log('7777777777777777 '+results.path);
  
//  console.log(results);
 if (results.path) {
     results.path.forEach(function (step) {
// console.log(step);
         var dist = mapdata.distances[step.source][step.target]
         stepLine = d3.select(
             "line.from" + step.source + "to" + step.target + ","
             + "line.from" + step.target + "to" + step.source
         );
         stepLine.classed({ "shortest": true });

     });
 }

    




});
 routingLayertram = L.geoJson().addTo(map);
routingLayertram.options = {
    style: {color: "#32CD32", "weight": 5, "opacity": 1}
    
    
};
// $("#cleartram").click(function () {
 
//     ghRouting.clearPoints();
//     routingLayertram.clearLayers();
//     testtt.clearLayers();
//     routingLayer.clearLayers();
//     routingLayer1.clearLayers();
  

//     var x = document.getElementById("limiter");
   
//       x.style.display = "none";
    
  
// });

    //   $("#clearnav").click(function () {
    //         x=null;
    //     y=null;
    //     lo=null;
    //     la=null;
    //         ghRouting.clearPoints();
    //         routingLayer.clearLayers();
          
    // //         clear();
    // //  clearGraph();
    //         var x = document.getElementById("test");
           
    //           x.style.display = "none";
            
    //         ghRouting.clearPoints();
    //         routingLayer.clearLayers();
    //     });
        console.log('retuuuuuuuurn ' +target)
        return io
}
            }
});

$("#cleartram").click(function () {
 
    ghRouting.clearPoints();
    if(!(routingLayertram===undefined)){routingLayertram.clearLayers();}
    if(!(testtt===undefined)){testtt.clearLayers();}
    if(!(routingLayer===undefined)){routingLayer.clearLayers();}
    if(!(routingLayer1===undefined)){ routingLayer1.clearLayers();}

    var x = document.getElementById("limiter");
   if( x.style.display === "none"){
    x.style.display = "block";
   }else 
      x.style.display = "none";
    
  
});
$("#start05").click(function () {

var tt;
    getindice(p[0].lat,p[0].lng);



    async function getindice(X1,Y1){
    const response = await fetch('/getbeststation/tram/'+X1+'/'+Y1);
                            const     data = await response.json();
                            console.log('data server path : '+JSON.stringify(data));
                            var tt=data.path[0];
                            console.log('data server time : '+JSON.stringify(data.time));
                            console.log('data distance : '+JSON.stringify(data.distance));
                           var testtt1 = L.geoJson().addTo(map);
testtt1.options = {
    style: {color: "#FFAE42", "weight": 10, "opacity": 1}
 
};
                            testtt1.addData({
                                "type": "Feature",
                                "geometry":tt
                                });
                        
                        }
                          

})
$("#start02").click(function () {
   
    var source,target;
    var sourcet
    var ge3=[];
    var total=[];
    var total2=[]
    var pp=[];
    var X1=p[1].lat;
    var Y1=p[1].lng;
    var ind1;
    getindice(X1,Y1);
    async function getindice(X1,Y1){
                    
                            //  uu1=JSON.stringify(resultt.coordinates[resultt.coordinates.length-1])
                         
                            const response = await fetch('/indice/tram/'+X1+'/'+Y1);
                                 target = await response.json();
                         
                           console.log('targeeeeeeet :' + target)
                           
                                  
                               
                            }
    var a=[], timess=[] , ida=0, ind ,pathss=[],resultt;
    var b=[];
    var s=[]
    var results ;
   
    for (var j=0;j<trams.length;j++){
        
   ghRouting.clearPoints();
   ghRouting.addPoint(new GHInput(JSON.stringify(trams[j].x),JSON.stringify(trams[j].y)));
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
      
}
// console.log('length of ge3 : '+ge3.length)
// console.log('length of pathss : '+ge3.pathss.length)
// for (var q=0;q<ge3.length;q++){

    for (let i = 0; i <4; i++) {
        setTimeout(function timer() {
            if(i==1){
                // console.log('length of ge3 zawjaaa: '+ge3.length)
                for(var z=0;z<ge3.length;z++){
                 talya(ge3[z].pathss,z)
                }
                
            }if(i==2){
                // console.log('talyaaaaaa '+JSON.stringify(total2) );
                var min=Math.min.apply(null, total); 
                for(var k=0;k<total2.length;k++){
                    if(total2[k].kd==min){
                        console.log('talyaaaaaa miiin'+total2[k].kd )
                        console.log('talyaaaaaa resulttt'+total2[k].resultt )
                        testtt.addData({
                                                                "type": "Feature",
                                                                "geometry": total2[k].resultt
                                                                });
                                                                var uu=JSON.stringify(total2[k].resultt.coordinates[0])
                                                                var Y1=uu.substring(1,uu.indexOf(','));
                                                                // console.log('corrdinates '+ge3[ind11].pathss.coordinates)
                                                                var tabId = uu.split(",").pop(); 
                                                                var  X1=tabId.replace(']',''); 
                                                                console.log('X1 = '+ X1+' Y1 = '+Y1)
                                                                getsource1(X1,Y1);
                                                                async function getsource1(X1,Y1){  
                                                                    const response = await fetch('/indice/tram/'+X1+'/'+Y1);
                                                                    sourcet = await response.json();
                                                                   console.log('sourceeeeee talya:' + sourcet)  
                                                                   console.log('targeeeeet talya:' + target)                                                                                                         
                                                                    }

                    }

                }
              
             
                 
                   
            }if(i==3){
                var resultsa1 = dijkstra(sourcet, target);
                                                                 
                                                                                if (resultsa1.path) {
                                                                                    resultsa1.path.forEach(function (step) {
                                                                            
                                                                                        var dist = mapdata.distances[step.source][step.target]
                                                                                        stepLine = d3.select(
                                                                                            "line.from" + step.source + "to" + step.target + ","
                                                                                            + "line.from" + step.target + "to" + step.source
                                                                                        );
                                                                                        stepLine.classed({ "shortest": true });
                                                                            
                                                                                    });
                                                                                }
                                                                              

            }
   
        }, i * 3000);
      }
function talya(resultt,z){ for (let i = 0; i <3; i++) {
    setTimeout(function timer() {
        if(i==1){
    //  for(var z=0;z<pathss.length;z++){
        //  console.log('path numero :'+z+' '+pathss[z])
        // console.log('length of ge3 zawja: '+ge3.length)
        //  resultt=ge3[q].pathss;
        //  console.log('ditansce ta3ha '+ge3[0].distance)
        //  console.log('haja lawla '+JSON.stringify(resultt))
        var o =JSON.stringify(resultt.coordinates.length)
                                // pp.push(resultt)
                                // console.log('pp'+pp)
                            
                                    var uu=JSON.stringify(resultt.coordinates[0])
                                                var Y1=uu.substring(1,uu.indexOf(','))
                                                var tabId = uu.split(",").pop(); 
                                                var  X1=tabId.replace(']',''); 
                                                getsource(X1,Y1);
                                                async function getsource(X1,Y1){  
                                                                        const response = await fetch('/indice/tram/'+X1+'/'+Y1);
                                                                             source = await response.json();
                                                                       console.log('sourceeeeee :' + source)  
                                                                       var resultsa = dijkstra(source, target);
                                                                       if($("#distime option:selected").text()=='distance'){
                                                                        var kd=resultsa.distance+ge3[z].distance;
                                                                        if(source==target){kd=999999;
                                                                    }
                                                                    // if(ge3[z].distance>resultsa.distance){kd=99999}
                                                                       
                                                                       total.push(kd);
                                                                    //    console.log('distance te dijkstra from '+source+' TO '+target+' = '+resultsa.distance)
                                                                    //   console.log('distance te api TP '+source+' = '+ge3[z].distance)
                                                                    //   console.log('distance total '+total);
                                                                      total2.push({"kd":kd,"resultt":resultt});}
                                                                      else if($("#distime option:selected").text()=='time'){
                                                                        var kd=resultsa.time+ge3[z].timess;
                                                                        if(source==target){kd=9999999;
                                                                           }
                                                                        //    if(ge3[z].distance>resultsa.distance){kd=99999}
                                                                               
                                                                               total.push(kd);
                                                                               console.log('time  dijkstra from '+source+' TO '+target+' = '+resultsa.distance)
                                                                              console.log('time te3 api TP '+source+' = '+ge3[z].distance)
                                                                              console.log('time total '+total);
                                                                              total2.push({"kd":kd,"resultt":resultt});

                                                                      }

                                                                    //   routingLayertram.addData({
                                                                    //                                        "type": "Feature",
                                                                    //                                        "geometry": ge3[z].pathss
                                                                    //                                        });                                                                                                         
                                                                        }
                                                                    
    //  }
    }
    if(i==2){
       
    }
    //     console.log('hatcho source '+source)
    //                             console.log('hatcho target '+target)
    //                            var resultsa = dijkstra(source, target);
    //                            console.log('distance te dijkstra '+resultsa.distance)
    //                            console.log('distance te api '+ge3[z].distance)
    //                            total.push(resultsa.distance+ge3[z].distance);
    //                            console.log('distance total '+total)
    //                            var ind11=total.indexOf(Math.min.apply(null, total)); 
    //                            console.log('indice min : '+ind11);
    //                            var outHtml = ' <img id="tram" src="images/tram.png" >   <div id="tt3">'+Math.min.apply(null, total)+' meter<br/>'+(Math.min.apply(null, total))/180+' seconds</div>' ;
    //                            $("#tramdiv").html(outHtml);
    //                            console.log('distance min : '+Math.min.apply(null, total))
    //                            if(z==ge3.length-1){
    //                            routingLayertram.addData({
    //                                     "type": "Feature",
    //                                     "geometry": ge3[ind11].pathss
    //                                     });
                                       
                                       
                                        
    //                                                             for (let i = 0; i <3; i++) {
    //                                                                 setTimeout(function timer() {
    //                                                               if(i==1){
    //                                                                 var o =JSON.stringify(ge3[ind11].pathss.coordinates.length)
    //                                                                 console.log('length te coordinates '+ o)
    //                                                                 var uu=JSON.stringify(ge3[ind11].pathss.coordinates[0])
    //                                                                 var Y1=uu.substring(1,uu.indexOf(','));
    //                                                                 console.log('corrdinates '+ge3[ind11].pathss.coordinates)
    //                                                                 var tabId = uu.split(",").pop(); 
    //                                                                 var  X1=tabId.replace(']',''); 
    //                                                                 console.log('X1 = '+ X1+' Y1 = '+Y1)
    //                                                                 getsource1(X1,Y1);
    //                                                                 async function getsource1(X1,Y1){  
    //                                                                     const response = await fetch('/indice/tram/'+X1+'/'+Y1);
    //                                                                     sourcet = await response.json();
    //                                                                    console.log('sourceeeeee talya:' + sourcet)  
    //                                                                    console.log('targeeeeet talya:' + target)                                                                                                         
    //                                                                     }
                                                                  

    //                                                               }if(i==2){
    //                                                                 var resultsa1 = dijkstra(sourcet, target);
                                                                 
    //                                                                 if (resultsa1.path) {
    //                                                                     resultsa1.path.forEach(function (step) {
                                                                
    //                                                                         var dist = mapdata.distances[step.source][step.target]
    //                                                                         stepLine = d3.select(
    //                                                                             "line.from" + step.source + "to" + step.target + ","
    //                                                                             + "line.from" + step.target + "to" + step.source
    //                                                                         );
    //                                                                         stepLine.classed({ "shortest": true });
                                                                
    //                                                                     });
    //                                                                 }
    //                                                               }
    //                                                                 }, i * 2000);
    //                                                               }
                                                                
                                       
    //                                 }
    // }
      
    }, i * 1500);
  }
return total
}



// jpath=pathss[ind]
// async function getlines(jpath){
//     SelectELM = document.getElementById("setexample")
//     const response = await fetch('/draw/tram'+'/'+JSON.stringify(jpath)+'/'+mapdata);
//         const data = await response.json();
    
//     }
// for(var t=0;t<3;t++){
//     setTimeout(function timer() {
//         if(t>0){

//     resultt=pathss[t];
//       for (let i = 0; i <3; i++) {
                 
//                     setTimeout(function timer() {
//                         if(i==1){
//                         var o =JSON.stringify(resultt.coordinates.length)
//                         console.log('length of corr '+o)
//                         pp.push(resultt)
//                         console.log('pp'+pp)
//                          uu=JSON.stringify(resultt.coordinates[o-1])
//                         console.log('resulttttttttt path  :'+JSON.stringify(resultt.coordinates))
//                             var uu=JSON.stringify(resultt.coordinates[o-1])
//                                         var Y1=uu.substring(1,uu.indexOf(','))
//                                         var tabId = uu.split(",").pop(); 
//                                         var  X1=tabId.replace(']',''); 
//                                         getsource(X1,Y1);
//                                         async function getsource(X1,Y1){
                                                        
//                                                                 //  uu1=JSON.stringify(resultt.coordinates[resultt.coordinates.length-1])
                                                             
//                                                                 const response = await fetch('/indice/tram/'+X1+'/'+Y1);
//                                                                      source = await response.json();
                                                             
//                                                                console.log('sourceeeeee :' + source)
                                                               
                                                                      
                                                                   
//                                                                 }
                                                           
//                      }if(i==2){
//                         console.log('hatcho source '+source)
//                         console.log('hatcho target '+target)
//                        var resultsa = dijkstra(source, target);
//                        console.log('distance te dijkstra '+resultsa.distance)
//                        total.push(resultsa.distance+a[ind]);
//                        console.log('resulta lawla '+total)
        
//         routingLayertram.addData({
//         "type": "Feature",
//         "geometry": resultt
//         });

//                      } }, i *1000); 
          
//             }
// }}, t *1000);
//         }
    // for (let i = 0; i <2; i++) {
    //               if(i==1){
    //                 setTimeout(function timer() {
    //                     const optionsPost = {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-Type': 'application/json'
    //                         },
    //                         body: JSON.stringify(pathss)
    //                     };
                        
    //                     var kl='/mapdata1/tram';
    //                     console.log('khadmet   '+kl)
    //                     const response = fetch(kl, optionsPost);
    //                     // getlines(resultt);
    //             }, i *1000); }}
// var jj=0

// for (let i = 0; i <2; i++) {
//     setTimeout(function timer() {
//     // for(var m=0;m<trams.length;m++){
       
//         draw1(pathss[ind],mapdata.allnodes.length,mapdata.paths.length)
//   console.log('taile jdida 01 : '+mapdata.allnodes.length)
    
//     // }
//     }, i * 1000);
//   }
//   for (let i = 0; i <2; i++) {
//     setTimeout(function timer() {
//         console.log('taile jdida 03 : '+mapdata.allnodes.length)
//     }, i * 3000);
//   }




//         for (let i = 0; i <2; i++) {
//             if(i==1){
//             setTimeout(function timer() {
               
//         //    async   function orsom(k,resultt){  for(var j=0;j<resultt.coordinates.length;j++){
//         //              jj=j+1;
//         //             var uu=JSON.stringify(resultt.coordinates[j])
//         //             var Y1=uu.substring(1,uu.indexOf(','))
//         //             var tabId = uu.split(",").pop(); 
//         //             var  X1=tabId.replace(']','');
//         //             console.log('point ta3 zid J  ' +j+' X1 '+ X1 +'et Y1'+Y1);
//         //             mapdata.allnodes.push({"name":k+j,"x":X1,"y":Y1});
//         //             if(jj<resultt.coordinates.length){
//         //             mapdata.paths.push({"id":k+1+j,"from":k+j,"to":k+jj})}
//         //             if(j==0){
                        
//         //                 getindice(X1,Y1);
//         //                 async function getindice(X1,Y1){
                    
//         //                     //  uu1=JSON.stringify(resultt.coordinates[resultt.coordinates.length-1])
                         
//         //                     const response = await fetch('/indice/tram/'+X1+'/'+Y1);
//         //                         const data = await response.json();
//         //                         // console.log('point ta3 X1 ' + X11 +'et Y1'+Y11)
//         //                         // console.log('source li rahi tat3awed' +data)
//         //                         // console.log('"id" : '+k+resultt.coordinates.length)
//         //                        mapdata.paths.push({"id":k+resultt.coordinates.length,"from":k,"to":data})
//         //                     //    console.log('mapdataaaaaaa ' +JSON.stringify(mapdata))
                                  
                               
//         //                     }
                    
                    
//         //             }
            
//         //         }
               
//                 // console.log('la tay after ' + mapdata.allnodes.length)
//             // }
//             //  console.log('la tay before ' + mapdata.allnodes.length)
          
//             // for (let i = 0; i < 3; i++) {
//             //     setTimeout(function timer() {
//             //     if(i==1){
               
//             //         for(var l=0;l<trams.length;l++){
//             //             // orsom(mapdata.allnodes.length,pathss[l]);
//             //             // console.log('la tay after ' + mapdata.allnodes.length)
//             //             // routingLayertram.addData({
//             //             //     "type": "Feature",
//             //             //     "geometry": pathss[l]
//             //             // });
//             //         }
                   
                   
                
//             //   } 
//             // //   if(i==2){
//             //     // console.log('mapdataaaaaaa ' +JSON.stringify(mapdata))
//             //     // const optionsPost = {
//             //     //                             method: 'POST',
//             //     //                             headers: {
//             //     //                                 'Content-Type': 'application/json'
//             //     //                             },
//             //     //                             body:JSON.stringify(mapdata)
//             //     //                         };
                                        
//             //     //                         var kl='/mapdata1/tram';
//             //     //                         console.log('khadmet   '+kl)
//             //     //                         const response = fetch(kl, optionsPost);
                
//             // //   }
            
//             // }, i * 3000);
//             // }
            
           
               
//             //    redrawLines();
              
              
//                     // getindice();
//                 // console.log('map data ---- '+JSON.stringify(mapdata))
//                 // console.log('resulttttttttt talya : '+uu)
//         //          Y1=uu.substring(1,uu.indexOf(','))
//         //         var tabId = uu.split(",").pop(); 
//         //          X1=tabId.replace(']','')
//         // //          var source11=getindice(X1,Y1);
//         // //   console.log('sourceeeeeeeeeeee '+ source11)
//         //        console.log('X1= '+X1);
//         //        console.log('Y1= '+Y1);
//         //        var point =new Object();
//         //     point.x=X1;
//         //     point.y=Y1;
//         //    tab[0]=X1
//         //    tab[1]=Y1
//         //         console.log('station 07'+JSON.stringify(trams[7]))
               

              
//             }, i *3000); 
//  } }
         
          routingLayertram = L.geoJson().addTo(map);
routingLayertram.options = {
    style: {color: "#32CD32", "weight": 5, "opacity": 1}
 
};
testtt = L.geoJson().addTo(map);
testtt.options = {
    style: {color: "#FFAE42", "weight": 10, "opacity": 1}
 
};

          $("#cleartram").click(function () {
            ghRouting.clearPoints();
            routingLayertram.clearLayers();
            var x = document.getElementById("limiter");
              x.style.display = "none";
        });
     
            
});
$("#start03").click(function () {
    // console.log('p[0} lat ----'+p[1].lat)
    // console.log('p[0} lng ----'+p[1].lng)
var a=[], timess=[] , ida=0, ind ,pathss=[],resultt;
for (var j=0;j<trams.length;j++){
ghRouting.clearPoints();
ghRouting.addPoint(new GHInput(JSON.stringify(trams[j].x),JSON.stringify(trams[j].y)));
ghRouting.addPoint(new GHInput(p[1].lat,p[1].lng));
ghRouting.doRequest()
.then(function (json) {  
  var path = json.paths[0]; 
   a[ida]=path.distance; 
//    console.log('distances '+a);
   pathss.push(path.points);
   ind=a.indexOf(Math.min.apply(null, a));
   timess[ida]=path.time/60000;
//    console.log('times '+timess);
   ida=ida+1;    
//    console.log('miiiiiiiiiiin : '+Math.min.apply(null, a) );
//    console.log('index : '+a[a.indexOf(Math.min.apply(null, a))]);
//    console.log('time min : '+timess[a.indexOf(Math.min.apply(null, a))]);
//    console.log('paths '+JSON.stringify(pathss[ind]));
//    console.log('indexxxxxxxxxxx : '+ind);
    resultt=pathss[ind];
 var outHtml = 'Distance in meter:'+a[m]+'<br/>Times in seconds:'+times[m] / 1000 ;
  $("#limiter").html(outHtml);

})
.catch(function (err) {

});

}distarget=a;
for (let i = 0; i <2; i++) {
setTimeout(function timer() {
    var o =JSON.stringify(resultt.coordinates.length)
    // console.log('length of corr '+o)
     uu=JSON.stringify(resultt.coordinates[o-1])
    // console.log('resulttttttttt path 07 :'+JSON.stringify(resultt.coordinates))
    // console.log('resulttttttttt talya :'+uu)
    Y2=uu.substring(1,uu.indexOf(','))
    var tabId = uu.split(",").pop(); 
     X2=tabId.replace(']','')
//          var source11=getindice(X1,Y1);
//   console.log('sourceeeeeeeeeeee '+ source11)
   console.log('X2= '+X2);
   console.log('Y2= '+Y2);
   var point =new Object();
point.x=X2;
point.y=Y2;
tab[2]=X2;
tab[3]=Y2
    // console.log('station 07'+JSON.stringify(trams[7]))
    routingLayertram.addData({
        "type": "Feature",
        "geometry": resultt
    });
}, i *1000); 
}
routingLayertram = L.geoJson().addTo(map);
routingLayertram.options = {
style: {color: "#32CD32", "weight": 5, "opacity": 1}

};

// $("#cleartram").click(function () {
// ghRouting.clearPoints();
// routingLayertram.clearLayers();
// var x = document.getElementById("limiter");
//   x.style.display = "none";
// });


});

$("#start04").click(function () {
    console.log('les points :'+tab )
 var kka=0;
 var zp=0
 var ind;
     console.log(' point 1 : '+tab[0]+' '+tab[1] )
    getdistance()
    async function getdistance(){
        
        const response = await fetch('/result1/tram/'+tab[0]+'/'+tab[1]+'/'+tab[2]+'/'+tab[3]);
            const data = await response.json();
            console.log('distance tram  ' +JSON.stringify(data.distance))
            console.log('distance source '+Math.min.apply(null, dissource))
            return JSON.stringify(data.distance)
        }
        getdisttram();
        async function getdisttram(){
        for (var j=0;j<trams.length;j++){
            const response = await fetch('/result1/tram/'+trams[j].x+'/'+trams[j].y+'/'+tab[2]+'/'+tab[3]);
            const data = await response.json();
            // console.log('distance tram  ' +JSON.stringify(data.distance))
            distram[kka]=JSON.stringify(data.distance);
            kka=kka+1;
        }}
    
        for (let j = 1; j< trams.length+1; j++) {
            setTimeout(function timer() {

                somedistance[zp]=distram[zp]+dissource[zp];
                console.log('distance some ' + somedistance[zp]);
                if(zp==trams.length-1){
                console.log('miiiiin distance some ' + Math.min.apply(null, somedistance));
                 ind=somedistance.indexOf('0'+Math.min.apply(null, somedistance));
                console.log('indexof : '+dissource[ind])
                 var resultt=jpath[ind];
                routingLayertram.addData({
                    "type": "Feature",
                    "geometry": resultt
                });
            }
                zp=zp+1;
            }, j * 200);
          }

        
})

        // setupRoutingAPI00(map, ghRouting,p[0],p[0].lng,p[1].lat,p[1].lng);
        // x=p[0].lat;
        // y=p[0].lng;
        // lo=p[1].lat;
        // la=p[1].lng;
    
        
    
   
 
    // map.setView([35.20118, -0.6343], 14);

    var instructionsDiv = $("#instructions");
    $("#start").click(function () {
        // console.log('hatchooo '+JSON.stringify(ghRouting))
        console.log('hatchooo '+ghRouting.vehicle);
        ghRouting.vehicle='foot';
        if(p.length==2){
            x=p[0].lat;
            y=p[0].lng;
            lo=p[1].lat;
            la=p[1].lng;
        }
        var d = document.getElementById("limiter");
        if (d.style.display === "none") {
            d.style.display = "block";
          } else {
            d.style.display = "none";
          }
              
        $("#clearnav").click(function () {
            x=null;
        y=null;
        lo=null;
        la=null;
            ghRouting.clearPoints();
            routingLayer.clearLayers();
          
    //         clear();
    //  clearGraph();
            var x = document.getElementById("limiter");
           
              x.style.display = "none";
            
            ghRouting.clearPoints();
            routingLayer.clearLayers();
        });
        if (ghRouting.points.length > 1) {
            ghRouting.clearPoints();
            routingLayer.clearLayers();
        }

        // L.marker(e.latlng, {icon: iconObject}).addTo(routingLayer);
        ghRouting.addPoint(new GHInput(x, y));
        ghRouting.addPoint(new GHInput(lo, la));
        console.log('heda howa :---'+ghRouting)
        console.log('hedi hiya :---'+ghRouting.points)
        if (ghRouting.points.length > 1) {
            // ******************
            //  Calculate route! 
            // ******************
            ghRouting.doRequest()
                .then(function (json) {
                    
                    var path = json.paths[0];
                    // console.log('hado sa77777 : '+JSON.stringify(path.points))
                    routingLayer.addData({
                        "type": "Feature",
                        "geometry": path.points
                    });
                    var outHtml = ' <img id="foot" src="images/foot.png" >   <div id="tt3">'+path.distance+' meter<br/>'+path.time / 60000 +' seconds</div>' ;
                
                    // outHtml += "<br/><a href='" + ghRouting.getGraphHopperMapsLink() + "'>GraphHopper Maps</a>";
                    $("#footdiv").html(outHtml);
                    // var outHtml1='<div class="limiter">  <div class="wrap-login100"> <form class="login100-form validate-form" >   <div id="routing-response"></form></div> </div>'
                    // $("#test").html(outHtml1);
                    // if (path.bbox) {
                    //     var minLon = path.bbox[0];
                    //     var minLat = path.bbox[1];
                    //     var maxLon = path.bbox[2];
                    //     var maxLat = path.bbox[3];
                    //     var tmpB = new L.LatLngBounds(new L.LatLng(minLat, minLon), new L.LatLng(maxLat, maxLon));
                    //     map.fitBounds(tmpB);
                    // }

                    instructionsDiv.empty();
                    if (path.instructions) {
                        var allPoints = path.points.coordinates;
                        var listUL = $("<ol>");
                        instructionsDiv.append(listUL);
                        for (var idx in path.instructions) {
                            var instr = path.instructions[idx];

                            // use 'interval' to find the geometry (list of points) until the next instruction
                            var instruction_points = allPoints.slice(instr.interval[0], instr.interval[1]);

                            // use 'sign' to display e.g. equally named images

                            $("<li>" + instr.text + " <small>(" + ghRouting.getTurnText(instr.sign) + ")</small>"
                                + " for " + instr.distance + "m and " + Math.round(instr.time / 1000) + "sec"
                                + ", geometry points:" + instruction_points.length + "</li>").appendTo(listUL);
                        }
                    }

                })
                .catch(function (err) {
                    var str = "An error occured: " + err.message;
                    $("#routing-response").text(str);
                });
        }
         routingLayer = L.geoJson().addTo(map);
    routingLayer.options = {
        style: {color: "#FF0000", "weight": 5, "opacity": 0.6}
    };
    });

    $("#startcar").click(function () {
    console.log('hatchooo '+JSON.stringify(ghRouting))
    console.log('hatchooo '+ghRouting.vehicle)
    ghRouting.vehicle='car'
    if(p.length==2){
        x=p[0].lat;
        y=p[0].lng;
        lo=p[1].lat;
        la=p[1].lng;
    }
    // var d = document.getElementById("limiter");
    // if (d.style.display === "none") {
    //     d.style.display = "block";
    //   } else {
    //     d.style.display = "none";
    //   }
          
    $("#clearnav").click(function () {
        x=null;
    y=null;
    lo=null;
    la=null;
        ghRouting.clearPoints();
        routingLayer.clearLayers();
      
//         clear();
//  clearGraph();
        var x = document.getElementById("limiter");
       
          x.style.display = "none";
        
        ghRouting.clearPoints();
        routingLayer.clearLayers();
    });
    if (ghRouting.points.length > 1) {
        ghRouting.clearPoints();
        // routingLayer.clearLayers();
    }
 routingLayer1;
    // L.marker(e.latlng, {icon: iconObject}).addTo(routingLayer);
    ghRouting.addPoint(new GHInput(x, y));
    ghRouting.addPoint(new GHInput(lo, la));
    console.log('heda howa :---'+ghRouting)
    console.log('hedi hiya :---'+ghRouting.points)
    if (ghRouting.points.length > 1) {
        // ******************
        //  Calculate route! 
        // ******************
        ghRouting.doRequest()
            .then(function (json) {
                
                var path = json.paths[0];
                // console.log('hado sa77777 : '+JSON.stringify(path.points))
                routingLayer1.addData({
                    "type": "Feature",
                    "geometry": path.points
                });
                var outHtml = ' <img id="car" src="images/car.png" >   <div id="tt3">'+path.distance+' meter<br/>'+path.time / 60000 +' seconds</div>' ;
            
                // outHtml += "<br/><a href='" + ghRouting.getGraphHopperMapsLink() + "'>GraphHopper Maps</a>";
                $("#cardiv").html(outHtml);
                // var outHtml1='<div class="limiter">  <div class="wrap-login100"> <form class="login100-form validate-form" >   <div id="routing-response"></form></div> </div>'
                // $("#test").html(outHtml1);
                // if (path.bbox) {
                //     var minLon = path.bbox[0];
                //     var minLat = path.bbox[1];
                //     var maxLon = path.bbox[2];
                //     var maxLat = path.bbox[3];
                //     var tmpB = new L.LatLngBounds(new L.LatLng(minLat, minLon), new L.LatLng(maxLat, maxLon));
                //     map.fitBounds(tmpB);
                // }

                instructionsDiv.empty();
                if (path.instructions) {
                    var allPoints = path.points.coordinates;
                    var listUL = $("<ol>");
                    instructionsDiv.append(listUL);
                    for (var idx in path.instructions) {
                        var instr = path.instructions[idx];

                        // use 'interval' to find the geometry (list of points) until the next instruction
                        var instruction_points = allPoints.slice(instr.interval[0], instr.interval[1]);

                        // use 'sign' to display e.g. equally named images

                        $("<li>" + instr.text + " <small>(" + ghRouting.getTurnText(instr.sign) + ")</small>"
                            + " for " + instr.distance + "m and " + Math.round(instr.time / 1000) + "sec"
                            + ", geometry points:" + instruction_points.length + "</li>").appendTo(listUL);
                    }
                }

            })
            .catch(function (err) {
                var str = "An error occured: " + err.message;
                $("#routing-response").text(str);
            });
    }
     routingLayer1 = L.geoJson().addTo(map);
routingLayer1.options = {
    style: {color: "#0000ff", "weight": 5, "opacity": 0.6}
};
$("#clearnav").click(function () {
    x=null;
y=null;
lo=null;
la=null;
    ghRouting.clearPoints();
    routingLayer1.clearLayers();
  
//         clear();
//  clearGraph();
    var x = document.getElementById("limiter");
   
      x.style.display = "none";
    
    ghRouting.clearPoints();
    routingLayer1.clearLayers();
});
});
   

    var instructionsHeader = $("#instructions-header");
    instructionsHeader.click(function () {
        instructionsDiv.toggle();
    });

    
}

function createMap(divId) {
    var osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    var omniscale = L.tileLayer.wms('https://maps.omniscale.net/v1/ghexamples-3646a190/tile', {
        layers: 'osm',
        attribution: osmAttr + ', &copy; <a href="http://maps.omniscale.com/">Omniscale</a>'
    });

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmAttr
    });

    var map = L.map(divId);
  
    return map;
}

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
// function setupGeocodingAPI(map, ghGeocoding) {
//     //  Find address    
//     map.setView([51.505, -0.09], 13);
//     var iconObject = L.icon({
//         iconUrl: './img/marker-icon.png',
//         shadowSize: [50, 64],
//         shadowAnchor: [4, 62],
//         iconAnchor: [12, 40]
//     });
//     var geocodingLayer = L.geoJson().addTo(map);
//     geocodingLayer.options = {
//         style: {color: "#00cc33", "weight": 5, "opacity": 0.6}
//     };

//     L.NumberedDivIcon = L.Icon.extend({
//         options: {
//             iconUrl: './img/marker-icon.png',
//             iconSize: new L.Point(25, 41),
//             iconAnchor: new L.Point(13, 41),
//             popupAnchor: new L.Point(0, -33),
//             className: 'leaflet-div-icon'
//         },
//         createIcon: function () {
//             var div = document.createElement('div');
//             var img = this._createImg(this.options['iconUrl']);
//             var numdiv = document.createElement('div');
//             numdiv.setAttribute("class", "number");
//             numdiv.innerHTML = this.options['number'] || '';
//             div.appendChild(img);
//             div.appendChild(numdiv);
//             this._setIconStyles(div, 'icon');
//             return div;
//         }
//     });

//     var clearGeocoding = function () {
//         $("#geocoding-results").empty();
//         $("#geocoding-error").empty();
//         $("#geocoding-response").empty();
//         geocodingLayer.clearLayers();
//     };

//     var mysubmit = function () {
//         clearGeocoding();

//         ghGeocoding.doRequest({query: textField.val()})
//             .then(function (json) {
//                 var listUL = $("<ol>");
//                 $("#geocoding-response").append("Locale:" + ghGeocoding.locale + "<br/>").append(listUL);
//                 var minLon, minLat, maxLon, maxLat;
//                 var counter = 0;
//                 for (var hitIdx in json.hits) {
//                     counter++;
//                     var hit = json.hits[hitIdx];

//                     var str = counter + ". " + dataToText(hit);
//                     $("<div>" + str + "</div>").appendTo(listUL);
//                     new L.Marker(hit.point, {
//                         icon: new L.NumberedDivIcon({iconUrl: './img/marker-icon-green.png', number: '' + counter})
//                     }).bindPopup("<div>" + str + "</div>").addTo(geocodingLayer);

//                     if (!minLat || minLat > hit.point.lat)
//                         minLat = hit.point.lat;
//                     if (!minLon || minLon > hit.point.lng)
//                         minLon = hit.point.lng;

//                     if (!maxLat || maxLat < hit.point.lat)
//                         maxLat = hit.point.lat;
//                     if (!maxLon || maxLon < hit.point.lng)
//                         maxLon = hit.point.lng;
//                 }

//                 if (minLat) {
//                     var tmpB = new L.LatLngBounds(new L.LatLng(minLat, minLon), new L.LatLng(maxLat, maxLon));
//                     map.fitBounds(tmpB);
//                 }
//             })
//             .catch(function (err) {
//                 $("#geocoding-error").text("An error occured: " + err.message);
//             });
//     };

//     // reverse geocoding
//     var iconObject = L.icon({
//         iconUrl: './img/marker-icon.png',
//         shadowSize: [50, 64],
//         shadowAnchor: [4, 62],
//         iconAnchor: [12, 40],
//         popupAnchor: new L.Point(0, -33),
//     });
//     map.on('click', function (e) {
//         clearGeocoding();

//         ghGeocoding.doRequest({point: e.latlng.lat + "," + e.latlng.lng})
//             .then(function (json) {
//                 var counter = 0;
//                 for (var hitIdx in json.hits) {
//                     counter++;
//                     var hit = json.hits[hitIdx];
//                     var str = counter + ". " + dataToText(hit);
//                     L.marker(hit.point, {icon: iconObject}).addTo(geocodingLayer).bindPopup(str).openPopup();

//                     // only show first result for now
//                     break;
//                 }
//             })
//             .catch(function (err) {
//                 $("#geocoding-error").text("An error occured: " + err.message);
//             });
//     });

//     var textField = $("#geocoding_text_field");
//     textField.keypress(function (e) {
//         if (e.which === 13) {
//             mysubmit();
//             return false;
//         }
//     });

//     $("#geocoding_search_button").click(mysubmit);

//     function dataToText(data) {
//         var text = "";
//         if (data.name)
//             text += data.name;

//         if (data.postcode)
//             text = insComma(text, data.postcode);

//         // make sure name won't be duplicated
//         if (data.city && text.indexOf(data.city) < 0)
//             text = insComma(text, data.city);

//         if (data.country && text.indexOf(data.country) < 0)
//             text = insComma(text, data.country);
//         return text;
//     }

//     function insComma(textA, textB) {
//         if (textA.length > 0)
//             return textA + ", " + textB;
//         return textB;
//     }
// }

// function setupMatrixAPI(ghMatrix) {
//     $('#matrix_search_button').click(function () {

//         // possible out_array options are: weights, distances, times, paths
//         ghMatrix.addOutArray("distances");
//         ghMatrix.addOutArray("times");

//         ghMatrix.clearPoints();
//         $('.point').each(function (idx, div) {
//             // parse the input strings and adds it as from_point and to_point
//             ghMatrix.addPoint(new GHInput($(div).val()));

//             // To create an NxM matrix you can simply use the other methods e.g.
//             // ghm.addFromPoint(new GHInput(someCoordinateString))
//             // or
//             // ghm.addToPoint(new GHInput(someCoordinateString))
//         });

//         $("#matrix-error").empty();
//         $("#matrix-response").empty();

//         ghMatrix.doRequest()
//             .then(function (json) {
//                 var outHtml = "Distances in meters: <br/>" + ghMatrix.toHtmlTable(json.distances);
//                 outHtml += "<br/><br/>Times in seconds: <br/>" + ghMatrix.toHtmlTable(json.times);
//                 $("#matrix-response").html(outHtml);
//             })
//             .catch(function (err) {
//                 var str = "An error occured: " + err.message;
//                 $("#matrix-error").text(str);
//             });

//         return false;
//     });
// }

// function setupIsochrone(map, ghIsochrone) {
//     map.setView([37.44, -122.16], 12);
//     var isochroneLayer;
//     var inprogress = false;

//     map.on('click', function (e) {
//         var pointStr = e.latlng.lat + "," + e.latlng.lng;

//         if (!inprogress) {
//             inprogress = true;
//             $('#isochrone-response').text("Calculating ...");
//             ghIsochrone.doRequest({point: pointStr, buckets: 2})
//                 .then(function (json) {
//                     if (isochroneLayer)
//                         isochroneLayer.clearLayers();

//                     isochroneLayer = L.geoJson(json.polygons, {
//                         style: function (feature) {
//                             var num = feature.properties.bucket;
//                             var color = (num % 2 === 0) ? "#00cc33" : "blue";
//                             return {color: color, "weight": num + 2, "opacity": 0.6};
//                         }
//                     });

//                     map.addLayer(isochroneLayer);

//                     $('#isochrone-response').text("Calculation done");
//                     inprogress = false;
//                 })
//                 .catch(function (err) {
//                     inprogress = false;
//                     $('#isochrone-response').text("An error occured: " + err.message);
//                 })
//             ;
//         } else {
//             $('#isochrone-response').text("Please wait. Calculation in progress ...");
//         }
//     });
// }



// function setupMapMatching(map, mmClient) {
//     map.setView([35.20118, -0.6343], 14);
//     var routeLayer = L.geoJson().addTo(map);
//     routeLayer.options = {
//         // use style provided by the 'properties' entry of the geojson added by addDataToRoutingLayer
//         style: function (feature) {
//             return feature.properties && feature.properties.style;
//         }
//     };

//     function mybind(key, url, vehicle) {
//         $("#" + key).click(function (event) {
//             $("#" + key).prop('disabled', true);
//             $("#map-matching-response").text("downloading file ...");
//             $.get(url, function (content) {
//                 var dom = (new DOMParser()).parseFromString(content, 'text/xml');
//                 var pathOriginal = toGeoJSON.gpx(dom);
//                 routeLayer.clearLayers();
//                 pathOriginal.features[0].properties = {style: {color: "black", weight: 2, opacity: 0.9}};
//                 routeLayer.addData(pathOriginal);
//                 $("#map-matching-response").text("send file ...");
//                 $("#map-matching-error").text("");
//                 if (!vehicle)
//                     vehicle = "car";
//                 mmClient.vehicle = vehicle;
//                 mmClient.doRequest(content)
//                     .then(function (json) {
//                         $("#map-matching-response").text("calculated map matching");
//                         var matchedPath = json.paths[0];
//                         var geojsonFeature = {
//                             type: "Feature",
//                             geometry: matchedPath.points,
//                             properties: {style: {color: "#00cc33", weight: 6, opacity: 0.4}}
//                         };
//                         routeLayer.addData(geojsonFeature);
//                         if (matchedPath.bbox) {
//                             var minLon = matchedPath.bbox[0];
//                             var minLat = matchedPath.bbox[1];
//                             var maxLon = matchedPath.bbox[2];
//                             var maxLat = matchedPath.bbox[3];
//                             var tmpB = new L.LatLngBounds(new L.LatLng(minLat, minLon), new L.LatLng(maxLat, maxLon));
//                             map.fitBounds(tmpB);
//                         }
//                         $("#" + key).prop('disabled', false);
//                     })
//                     .catch(function (err) {
//                         $("#map-matching-response").text("");
//                         $("#map-matching-error").text(err.message);
//                         $("#" + key).prop('disabled', false);
//                     });//doRequest
//             });// get
//         });//click
//     }

//     var host = "https://raw.githubusercontent.com/graphhopper/directions-api-js-client/master/map-matching-examples";
//     mybind("bike_example1", host + "/bike.gpx", "bike");
//     mybind("car_example1", host + "/car.gpx", "car");
// }
