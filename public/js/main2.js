var graphmap, svg, map, g;

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



svg = d3.select("#svg-map").select("svg")
    .attr("class", "svgmap")
    .on("contextmenu", function () { d3.event.preventDefault(); })




map.on("viewreset", redrawmapwhenviewchanges);

function redrawmapwhenviewchanges() {
    redrawNodes();
    redrawLines();
}



map.on('click', function (e) {


    var nodeName = mapdata.allnodes.length;
    console.log(e.latlng.lat + ", " + e.latlng.lng);

    mapdata.allnodes.push({
        name: nodeName, x: e.latlng.lat, y: e.latlng.lng
    });
    redrawNodes();
    addNodeToSelect(nodeName);






});




function dragNode() {
    return function (d, i) {
        var d = d;

        var golf = true;
        map.on('mousemove', function (e) {
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
        map.on('mouseup', function (e) {
            golf = false;
            return
        });




    }
};


function redrawNodes() {

    svg.selectAll("g.nodes").data([]).exit().remove();

    var elements = svg.selectAll("g.nodes").data(mapdata.allnodes, function (d, i) { return d.name; });

    var nodesEnter = elements.enter().append("g")
        .attr("class", "nodes");


    elements.attr("transform", function (d, i) {


        return "translate(" +
            map.latLngToLayerPoint(new L.LatLng(d.x, d.y)).x + "," +
            map.latLngToLayerPoint(new L.LatLng(d.x, d.y)).y + ")";
    });

    nodesEnter.append("circle")
        .attr("nodeId", function (d, i) { return i; })
        .attr("r", '8')
        .attr("class", "node")
        .style("cursor", "pointer")
        .on('click', nodeClick)
        .on("mouseenter", function () { map.dragging.disable(); })
        .on("mouseout", function () { map.dragging.enable(); })
        .on('contextmenu', function (d, i) { startEndPath(i); })
        .call(dragManager)


    

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
        .attr("x1", function (d) { return map.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.from].x, mapdata.allnodes[d.from].y)).x; })
        .attr("y1", function (d) { return map.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.from].x, mapdata.allnodes[d.from].y)).y; })
        .attr("x2", function (d) { return map.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.to].x, mapdata.allnodes[d.to].y)).x; })
        .attr("y2", function (d) { return map.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.to].x, mapdata.allnodes[d.to].y)).y; });


    var text = group.append("text")
        .attr("x", function (d) { return parseInt((map.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.from].x, mapdata.allnodes[d.from].y)).x + map.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.to].x, mapdata.allnodes[d.to].y)).x) / 2) + 5; })
        .attr("y", function (d) { return parseInt((map.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.from].x, mapdata.allnodes[d.from].y)).y + map.latLngToLayerPoint(new L.LatLng(mapdata.allnodes[d.to].x, mapdata.allnodes[d.to].y)).y) / 2) - 5; })
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
    var ??1 = this.lat.toRadians(), ??1 = this.lon.toRadians();
    var ??2 = point.lat.toRadians(), ??2 = point.lon.toRadians();
    var ???? = ??2 - ??1;
    var ???? = ??2 - ??1;
    var a = Math.sin(???? / 2) * Math.sin(???? / 2)
        + Math.cos(??1) * Math.cos(??2)
        * Math.sin(???? / 2) * Math.sin(???? / 2);
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
                addNodeToSelect(node.name);
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });






    }
    else if (value == 2) {
        
 
        

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
                addNodeToSelect(node.name);
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    }else if(value == 3) {
        
 
        map.setView(new L.LatLng(35.20118, -0.6343), 14);

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
                addNodeToSelect(node.name);
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    }
    else if(value == 4) {
        
 
        map.setView(new L.LatLng(35.20118, -0.6343), 14);

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
                addNodeToSelect(node.name);
            });

            calculateDistancesbetweennodes();
            redrawLines();
            redrawNodes();
        });
    }
    else if(value == 999) {
        
 
        map.setView(new L.LatLng(35.20118, -0.6343), 14);

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
                addNodeToSelect(node.name);
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
        map.setView(new L.LatLng(valuelat, valuelong), 10);
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
            addNodeToSelect(node.name);
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
    var targetNode = $(mapdata.getui.htmlSelectEndNode).val();
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
    clearGraph();

});








function addNodeToSelect(nodeName) {
    $(mapdata.getui.htmlSelectStartingNode).append($("<option></option>").attr("value", nodeName).text(nodeName));
    $(mapdata.getui.htmlSelectEndNode).append($("<option></option>").attr("value", nodeName).text(nodeName));
};

function clearGraph() {
    

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