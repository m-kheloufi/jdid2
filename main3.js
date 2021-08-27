map.on('click', function (e) {
      var a=[];
      var nodeName = mapdata.allnodes.length;
      console.log(e.latlng.lat + ", " + e.latlng.lng);
  var tram;
  var indice;
  var source;
  var target ;
  var ida=0;
  
       $.getJSON("mapdata/all.json", function (datad) {
               tram = datad.nodes;
      console.log('tram '+tram.length);
  
      for (var i=0;i<tram.length;i++){
          if(!(tram[i].nomFr===undefined)){
         var d= distance(e.latlng.lat,e.latlng.lng,tram[i].x,tram[i].y);
         a[ida]=d;
         ida=ida+1;
        
      }}
  console.log('array '+ a);
  console.log('min '+Math.min.apply(null, a))
  
  for (var i=0;i<tram.length;i++){
      if(!(tram[i].nomFr===undefined)){
      var d= distance(e.latlng.lat,e.latlng.lng,tram[i].x,tram[i].y);
     if(d==Math.min.apply(null, a)){
      target=i;
     }}
   }
  
   console.log('indice '+target);
   
   var results = dijkstra(0, target);
   console.log('7777777777777777 '+results.path);
    
   console.log(results);
   if (results.path) {
       results.path.forEach(function (step) {
  console.log(step);
           var dist = mapdata.distances[step.source][step.target]
           stepLine = d3.select(
               "line.from" + step.source + "to" + step.target + ","
               + "line.from" + step.target + "to" + step.source
           );
           stepLine.classed({ "shortest": true });
  
       });
   }
  
      
  
  
  
  
  });
        
     
    
  
  });