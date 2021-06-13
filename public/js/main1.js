var graphmap, svg, maps, g;
var markers = L.layerGroup();
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
 maps =  L.map('svg-map').setView([35.20118, -0.6343], 14);
 mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; '+mapLink+ 'contributors'
}).addTo(maps);



maps._initPathRoot()
svg = d3.select("#svg-map").select("svg")
    .attr("class", "svgmap")
    .on("contextmenu", function () { d3.event.preventDefault(); })




maps.on("viewreset", redrawmapwhenviewchanges);

function redrawmapwhenviewchanges() {
    redrawNodes();
    redrawLines();
}





var selector = L.control({
    position: 'topright'
  });
selector.onAdd = function(maps) {
    //create div container
    var div = L.DomUtil.create('div', 'mySelector');
    //create select element within container (with id, so it can be populated later)
    div.innerHTML = '<select id="marker_select"><option value="init">(select station)</option></select>';
    return div;
  };
  selector.addTo(maps);


function dragNode() {
    return function (d, i) {
        var d = d;

        var golf = true;
        maps.on('mousemove', function (e) {
            if (golf == true) {

                var nodeDatum =
                    {
                        name: d.name,
                        x: e.latlng.lat,
                        y: e.latlng.lng
                    };

                mapdata.allnodes[i] = nodeDatum;
                calculateDistancesbetweennodes();
                redrawLines();
                redrawNodes();
            }
            else {
                return
            }


        });
        maps.on('mouseup', function (e) {
            golf = false;
            return
        });




    }
};




function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}
// maps.on('click', function (e) {
//     var a=[];
//     var nodeName = mapdata.allnodes.length;
//     console.log(e.latlng.lat + ", " + e.latlng.lng);
// var tram;
// var indice;
// var source;
// var target ;
// var ida=0;

//      $.getJSON("mapdata/all.json", function (datad) {
//              tram = datad.nodes;
//     console.log('tram '+tram.length);

//     for (var i=0;i<tram.length;i++){
//         if(!(tram[i].nomFr===undefined)){
//        var d= distance(e.latlng.lat,e.latlng.lng,tram[i].x,tram[i].y);
//        a[ida]=d;
//        ida=ida+1;
      
//     }}
// console.log('array '+ a);
// console.log('min '+Math.min.apply(null, a))

// for (var i=0;i<tram.length;i++){
//     if(!(tram[i].nomFr===undefined)){
//     var d= distance(e.latlng.lat,e.latlng.lng,tram[i].x,tram[i].y);
//    if(d==Math.min.apply(null, a)){
//     target=i;
//    }}
//  }

//  console.log('indice '+target);
 
//  var results = dijkstra(0, target);
//  console.log('7777777777777777 '+results.path);
  
//  console.log(results);
//  if (results.path) {
//      results.path.forEach(function (step) {
// console.log(step);
//          var dist = mapdata.distances[step.source][step.target]
//          stepLine = d3.select(
//              "line.from" + step.source + "to" + step.target + ","
//              + "line.from" + step.target + "to" + step.source
//          );
//          stepLine.classed({ "shortest": true });

//      });
//  }

    




// });
      
   
  

// });

function redrawNodes() {

    svg.selectAll("g.nodes").data([]).exit().remove();

    var elements = svg.selectAll("g.nodes").data(mapdata.allnodes, function (d, i) { return d.name; });

    var nodesEnter = elements.enter().append("g")
        .attr("class", "nodes");


    elements.attr("transform", function (d, i) {


        return "translate(" +
            maps.latLngToLayerPoint(new L.LatLng(d.x, d.y)).x + "," +
            maps.latLngToLayerPoint(new L.LatLng(d.x, d.y)).y + ")";
    });

    nodesEnter.append("circle")
        .attr("nodeId", function (d, i) { return i; })
        .attr("b", '15')
        .attr("class", "node")
        .style("cursor", "pointer")
        .on('click', nodeClick)
        .on("mouseenter", function () { maps.dragging.disable(); })
        .on("mouseout", function () { maps.dragging.enable(); })
        .on('contextmenu', function (d, i) { startEndPath(i); })
        .call(dragManager)

        nodesEnter
        .append("text")
        .attr("nodeLabelId", function (d, i) { return i; })
        .attr("dx", "-7")
        .attr("dy", "7")
        .attr("class", "label")
        .on('contextmenu', function (d, i) { startEndPath(i); })
        .call(dragManager)
        .text(function (d, i) { return d.name });
    

    elements.exit().remove();
};


function redrawLines() {

    svg.selectAll("g.line").data([]).exit().remove();

    var elements = svg
        .selectAll("g.line")
        .data(mapdata.paths, function (d) { return d.id });

    var newElements = elements.enter();


    var group = newElements
        .append("g")
        .attr("class", "line");

    var line = group.append("line")
        .attr("class", function (d) {
            return "from" + mapdata.allnodes[d.from].name + "to" + mapdata.allnodes[d.to].name
        })
        .attr("x1", function (d) { return maps.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.from].x, mapdata.allnodes[d.from].y)).x; })
        .attr("y1", function (d) { return maps.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.from].x, mapdata.allnodes[d.from].y)).y; })
        .attr("x2", function (d) { return maps.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.to].x, mapdata.allnodes[d.to].y)).x; })
        .attr("y2", function (d) { return maps.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.to].x, mapdata.allnodes[d.to].y)).y; });


    var text = group.append("text")
        .attr("x", function (d) { return parseInt((maps.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.from].x, mapdata.allnodes[d.from].y)).x + maps.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.to].x, mapdata.allnodes[d.to].y)).x) / 2) + 5; })
        .attr("y", function (d) { return parseInt((maps.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.from].x, mapdata.allnodes[d.from].y)).y + maps.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.to].x, mapdata.allnodes[d.to].y)).y) / 2) - 5; })
        .attr("class", "line-label");


    


};


function LatLon(lat, lon) {
    this.lat = Number(lat);
    this.lon = Number(lon);
}


// Haversine distance formula, see http://en.wikipedia.org/wiki/Haversine_formula

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



$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val("")

});

$("#submit").click(function () {
    var email = $("#sender-email").val();
    var messeage = $("#message-text").val();
    var dataString = 'Name=' + " " + '&Mail=' + email + '&Comment=' + messeage;
    if (email == '' || messeage == '') {
        alert("Please Fill All Fields");
    }
    else {
        $.ajax({
            type: 'POST',
            url: 'http://www.senniksoft.com/senniksoft-email/mail.php',
            data: dataString,
            success: function (responseData, textStatus, jqXHR) {
                alert(responseData);
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed. Please Email Me :)');
            }
        });





    }
});


var dragManager = d3.behavior.drag()
    .on('dragstart', dragNodeStart())
    .on('drag', dragNode())
    .on('dragend', dragNodeEnd());


$('#setexample').on('change', function () {
    var value = $(this).val();
    if (value == 1) {
        maps.setView(new L.LatLng(35.19971906404343, -0.6247837572740723), 14);
        clearGraph();
      clear();
        gettram('stat1');

        $.getJSON("mapdata/tram.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }
          
            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });






    }
    else if (value == 2) {
        
 var file='stations_sba/bus/A03'
 clearGraph();
        clear();
        gettram(file);
        maps.setView(new L.LatLng(35.20777265583833, -0.615674942808335), 14);
        $.getJSON("mapdata/A03.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    }else if(value == 3) {
        var file='stations_sba/bus/A03bis'
        clearGraph();
        clear();
        gettram(file);
        
 
        maps.setView(new L.LatLng(35.202124120749275, -0.64303643623008), 14);

        $.getJSON("mapdata/A03bis.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    }
    else if(value == 4) {
        var file='stations_sba/bus/A27'
        clearGraph();
        clear();
        gettram(file);
 
        maps.setView(new L.LatLng(35.15556500491665, -0.600728988647460), 13);

        $.getJSON("mapdata/A27.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    }  else if(value == 5) {
        var file='stations_sba/bus/A17'
        clearGraph();
        clear();
        gettram(file);
 
        maps.setView(new L.LatLng(35.21001968745649, -0.6392197608988681), 14);

        $.getJSON("mapdata/A17.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    } else if(value == 6) {
        var file='stations_sba/bus/A22'
        clearGraph();
        clear();
        gettram(file);
 
        maps.setView(new L.LatLng(35.236716325352084, -0.6007361407682765), 12);

        $.getJSON("mapdata/A22.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    } else if(value == 7) {
        var file='stations_sba/bus/A16'
        clearGraph();
        clear();
        gettram(file);
 
        maps.setView(new L.LatLng(35.20458462765031, -0.6138194597613668), 14);

        $.getJSON("mapdata/A16.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    } else if(value == 8) {
        var file='stations_sba/bus/A25'
        clearGraph();
        clear();
        gettram(file);
 
        maps.setView(new L.LatLng(35.18273786282256, -0.609065067133654), 13);

        $.getJSON("mapdata/A25.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    } else if(value == 9) {
        var file='stations_sba/bus/A11'
        clearGraph();
        clear();
        gettram(file);
 
        maps.setView(new L.LatLng(35.18164817676656, -0.6591367721557618), 14);

        $.getJSON("mapdata/A11.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    }
    else if(value == 999) {
        var file='stations_sba'
        clearGraph();
        clear();
        gettram(file);
 
        maps.setView(new L.LatLng(35.20118, -0.6343), 13);

        $.getJSON("mapdata/all.json", function (datad) {
            var importedData = datad;

            if (importedData.nodes === undefined
                || importedData.paths === undefined
                || Object.keys(importedData).length !== 2) {
                console.log("** JSON format error:");
                console.log(importedData);
                return;
            }

            mapdata.allnodes = importedData.nodes;
            mapdata.paths = importedData.paths;
            mapdata.distances = [];
            mapdata.getstate.selectedNode = null;
            mapdata.getstate.fromNode = null;
            mapdata.getstate.toNode = null;

            mapdata.allnodes.forEach(function (node) {
                var b=false;
                if (node.nomFr === undefined){b=true};
               if(!b){
                addNodeToSelect(node);}
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    }
   



});



$("#data-export").click(function (e) {

    e.stopPropagation()

    var exportData = JSON.stringify({
        nodes: mapdata.allnodes,
        paths: mapdata.paths
    });

    var target = $(this);

    var link = $("<a></a>")
        .addClass("exportLink")
        .click(function (e) { e.stopPropagation(); })
        .attr('target', '_self')
        .attr("download", "nodesandpaths.json")
        .attr("href", "data:application/json," + exportData)

    link.appendTo(target).get(0).click();

    $(".exportLink").remove();

});

$("#getmethere").on('click',function () {
   
    var valuelat = $("#latitude").val();
    var valuelong = $("#longitude").val();
    clearGraph();

    if (valuelat == '' || valuelong == '' ){
      alert("Please Enter Lat. and Long.");  
    }
    else {
        maps.setView(new L.LatLng(valuelat, valuelong), 10);
    }
    









});





$("#data-import").change(function (e) {
    e.stopPropagation();
    var files = e.target.files;
    var file = files[0];
    if (file === undefined) return;
    var reader = new FileReader();
    reader.onload = function () {
        try {
            var importedData = JSON.parse(this.result);
        }
        catch (exception) {
            console.log("** Error importing JSON: %s", exception);
            return;
        }
        if (importedData.nodes === undefined
            || importedData.paths === undefined
            || Object.keys(importedData).length !== 2) {
            console.log("** JSON format error:");
            console.log(importedData);
            return;
        }


        mapdata.allnodes = importedData.nodes;
        mapdata.paths = importedData.paths;
        mapdata.distances = [];
        mapdata.getstate.selectedNode = null;
        mapdata.getstate.fromNode = null;
        mapdata.getstate.toNode = null;

        mapdata.allnodes.forEach(function (node) {
            addNodeToSelect(node);
        });

        calculateDistancesbetweennodes();
        redrawLines();
        redrawNodes();
    }
    reader.readAsText(file);
});




$('#getshortestroute').on('click', function () {
    d3.selectAll("line").classed({ "shortest": false });
    calculateDistancesbetweennodes();
    if (!$(mapdata.getui.htmlSelectStartingNode).val() || !$(mapdata.getui.htmlSelectEndNode).val()) return;
    var sourceNode = $(mapdata.getui.htmlSelectStartingNode).val();
    console.log(sourceNode);
    var targetNode = $(mapdata.getui.htmlSelectEndNode).val();
    console.log(targetNode);
    var results = dijkstra(sourceNode, targetNode);
    
    if (results.path) {
        results.path.forEach(function (step) {

            var dist = mapdata.distances[step.source][step.target]
            stepLine = d3.select(
                "line.from" + step.source + "to" + step.target + ","
                + "line.from" + step.target + "to" + step.source
            );
            stepLine.classed({ "shortest": true });

        });
    }

});
$('#getshortestroute1').on('click', function () {
    d3.selectAll("line").classed({ "shortest": false });
    calculateDistancesbetweennodes();
    if (!$(mapdata.getui.htmlSelectStartingNode).val() || !$(mapdata.getui.htmlSelectEndNode).val()) return;
    var sourceNode = $(mapdata.getui.htmlSelectStartingNode).val();
    console.log(sourceNode);
    var targetNode = $(mapdata.getui.htmlSelectEndNode).val();
    console.log(targetNode);
    var results = dijkstra(sourceNode, targetNode);
    console.log(results);
    if (results.path) {
        results.path.forEach(function (step) {

            var dist = mapdata.distances[step.source][step.target]
            stepLine = d3.select(
                "line.from" + step.source + "to" + step.target + ","
                + "line.from" + step.target + "to" + step.source
            );
            stepLine.classed({ "shortest": true });

        });
    }

});
$('#clearmap').on('click', function () {
    clear();
    clearGraph();

});








function addNodeToSelect(node) {
    $(mapdata.getui.htmlSelectStartingNode).append($("<option></option>").attr("value", node.name).text(node.nomFr));
    $(mapdata.getui.htmlSelectEndNode).append($("<option></option>").attr("value", node.name).text(node.nomFr));
};

function clearGraph() {
    
    mapdata.allnodes = [];
    mapdata.paths = [];
    $(mapdata.getui.htmlSelectStartingNode).empty();
    $(mapdata.getui.htmlSelectEndNode).empty();
    $("#results").empty();
    $('#svg-map').css({
        'background-image': 'url(' + null + ')'

    });
    redrawNodes();
    redrawLines();

};
function clear() {
    
    mapdata.allnodes = [];
    mapdata.paths = [];
    $(mapdata.getui.htmlSelectStartingNode).empty();
    $(mapdata.getui.htmlSelectEndNode).empty();
    $("#results").empty();
   
  

};



function nodeClick(d, i) {
    console.log("node:click %s", i);
    console.log(d);

    d3.event.preventDefault();
    d3.event.stopPropagation();
};

function dragNodeStart() {
    return function (d, i) {
        console.log("dragging node " + i);

    }
};


function dragNodeEnd() {
    return function (d, i) {
        console.log("node " + i + " repositioned");
    }
};

function killEvent() {
    if (d3.event.preventDefault) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
    }
};

function startEndPath(index) {
    d3.event.stopPropagation();
    d3.event.preventDefault();
    if (mapdata.getstate.fromNode === null) {

        mapdata.getstate.fromNode = index;
    }
    else {
        if (mapdata.getstate.fromNode === index) {

            return;
        }

        mapdata.getstate.toNode = index;
        console.log(index + " Node lar");
        var pathDatum = {
            id: mapdata.paths.length,
            from: mapdata.getstate.fromNode,
            to: index
        };
        mapdata.paths.push(pathDatum);
        calculateDistancesbetweennodes();
        redrawLines();
        redrawNodes();
        mapdata.getstate.fromNode = null;
        mapdata.getstate.toNode = null;
    }
};

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
            distance: totalDistance
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


var chemin = L.layerGroup();
        var markers = L.layerGroup();

async function addBusRoute(numero) {
            const response = await fetch('/bus/' + numero);
            const data = await response.json();
            for (var i = 0; i < data.length; i += 1) {
                if ((i + 1) == data.length) {
                } else {
                    var pointA = new L.LatLng(data[i].latitude, data[i].longitude)
                    var pointB = new L.LatLng(data[i + 1].latitude, data[i + 1].longitude)
                    var pointList = [pointA, pointB];
                    // console.log("|" + pointList + "|")
                    if (numero === "A03") {
                        var firstpolyline = new L.Polyline(pointList, {
                            color: 'red',
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "2,5",
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(chemin)
                    } else if (numero === "A03 bis") {
                        var firstpolyline = new L.Polyline(pointList, {
                            color: 'red',
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "2,5",
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(chemin)
                    } else if (numero === "A11") {
                        var firstpolyline = new L.Polyline(pointList, {
                            color: 'black',
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "2,5",
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(chemin)
                    } else if (numero === "A16") {
                        var firstpolyline = new L.Polyline(pointList, {
                            color: 'blue',
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "2,5",
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(chemin)
                    } else if (numero === "A17") {
                        var firstpolyline = new L.Polyline(pointList, {
                            color: 'green',
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "1,5",
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(chemin)
                    } else if (numero === "A25") {
                        var firstpolyline = new L.Polyline(pointList, {
                            color: 'rgb(255,0,255)',
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "2,5",
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(chemin)
                    } else if (numero === "A27") {
                        var firstpolyline = new L.Polyline(pointList, {
                            color: 'rgb(0,255,255)',
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "2,5",
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(chemin)
                    } else if (numero === "A22") {
                        var firstpolyline = new L.Polyline(pointList, {
                            color: 'rgb(6, 170, 108)',
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "2,5",
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(chemin)
                    }
                }
                ;
             
                // console.log("last :"+i);
            }

        }
        async function addBusStationsByNumero(numero) {
            console.log("add stations by bus number");
            console.log(numero);
            
            const response = await fetch('/stations_sba/bus/' + numero);
            const data = await response.json();
          
            if (numero === 'A03' ) {
                var bus_stop_icon = L.icon({
                    iconUrl: 'pin_bus_3.png',


                    iconSize: [35, 35], // size of the icon
                    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
                });
                $.each(data, function(i, f) {
          if(!f.numero.includes('bis')){
              var data = {
                  "latitude":f.latitude,
              "longitude":f.longitude,
              "nomFr":f.nomFr,
              "type":f.type,
              "numero":f.numero,
              "_id":f._id}
          }
        
            });
                
            }
            else if (numero === 'A03bis' ) {
                var bus_stop_icon = L.icon({
                    iconUrl: 'pin_bus_3.png',


                    iconSize: [35, 35], // size of the icon
                    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
                });
            } else if (numero === 'A11') {
                var bus_stop_icon = L.icon({
                    iconUrl: 'pin_bus_11.png',


                    iconSize: [35, 35], // size of the icon
                    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
                });
            }
            else if (numero === 'A16') {
                var bus_stop_icon = L.icon({
                    iconUrl: 'pin_bus_16.png',


                    iconSize: [35, 35], // size of the icon
                    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
                });
            }
            else if (numero==='A17')  {
                var bus_stop_icon = L.icon({
                    iconUrl: 'pin_bus_17.png',


                    iconSize: [35, 35], // size of the icon
                    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
                });
            }
            else if (numero==='A22')  {
                var bus_stop_icon = L.icon({
                    iconUrl: 'pin_bus_22.png',


                    iconSize: [35, 35], // size of the icon
                    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
                });
            }
            else if (numero==='A25')  {
                var bus_stop_icon = L.icon({
                    iconUrl: 'pin_bus_25.png',


                    iconSize: [35, 35], // size of the icon
                    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
                });
            }
            else if (numero==='A27')  {
                var bus_stop_icon = L.icon({
                    iconUrl: 'pin_bus_27.png',


                    iconSize: [35, 35], // size of the icon
                    iconAnchor: [17.5, 35], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
                });
            }
           
            for (item of data) {
                var station = L.marker([item.latitude, item.longitude], { icon: bus_stop_icon }).bindPopup(
                    "<b>" + item.nomFr + "</b>" + "<br>" + " <b> " + item.numero + "</b>"
                ).addTo(markers);
                markers.addTo(maps)
            } 

        }

      
          
       function gettram(file){
       
    //create Leaflet control for selector
    $.getJSON(file, function(data) {
        $.each(data, function(i, f) {
         var stations = {
   "type": "FeatureCollection",
   "features": [{
     "type": "Feature",
     "properties": {
       "STATION": f.nomFr,
       "NUMERO": f.numero,
     },
     "geometry": {
       "type": "Point",
       "coordinates": [f.longitude, f.latitude]
     }
   }]} 


   var markerLayer = L.geoJson(stations, {
    onEachFeature: function (feature, layer)
    {
        layer.bindPopup("<b>" + feature.properties.STATION + "</b><br>" +
    "Station Code: " + feature.properties.NUMERO);
    }
}).addTo(markers);
markers.addTo(maps);



      
      
      
      markerLayer.eachLayer(function(layer) {
        //create option in selector element
        //with content set to city name
        //and value set to the layer's internal ID
        var optionElement = document.createElement("option");
        optionElement.innerHTML = layer.feature.properties.STATION;
        optionElement.value = layer._leaflet_id;
        L.DomUtil.get("marker_select").appendChild(optionElement);
      });
             
      var marker_select = L.DomUtil.get("marker_select");
      L.DomEvent.addListener(marker_select, 'click', function(e) {
        L.DomEvent.stopPropagation(e);
        
      });
      
      L.DomEvent.addListener(marker_select, 'change', changeHandler);
      
      function changeHandler(e) {
        if (e.target.value == "init") {
          maps.closePopup();
        } else {
          markerLayer.getLayer(e.target.value).openPopup();
          
        }
      }
      
          });
          
             });
          
       }  


       function clear (){
      
        var select = document.getElementById("marker_select");
        var length = select.options.length;
        for (i = length-1; i > 0; i--) {
          select.options[i] = null;
        }
        
        markers.clearLayers();
           
       
    }
    document.getElementById('clr').onclick = function(){
        clear();
        mapdata.allnodes = null
        mapdata.paths = null;
    }

    