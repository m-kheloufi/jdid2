function getLatLngs(layer) {
            var lng, lat, chemin = [];
            if (layer instanceof L.Polyline) {
                var current = new Date;
                var latlngs = layer.getLatLngs();
                var type = prompt("Saisir le type du polyline", "Correspondance");
                console.log("Test56 " + latlngs);

                for (var i = 0; i < latlngs.length; i++) {
                    var latlngs1 = latlngs[i];
                    chemin.push("{\"latitude\": " + latlngs[i].lat + "," + "\"longitude\": " + latlngs[i].lng + ","
                        + "\"ID\": " + (sequence + 1)
                        + "," + "\"type\": \"" + type + "\"" + "}");
                    sequence += 1;
                    if (i === 0) {
                        lng = latlngs[i].lng;
                        lat = latlngs[i].lat;
                    }
                }
                ;


                const data = "[" + chemin.join(",") + "]"
                const optionsPost = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data
                };
                const response = fetch('/correspondance', optionsPost);
                console.log(data)
                return "[" + chemin.join(",") + "]";
            } else if (layer instanceof L.Marker) {

                var nomFr = prompt("Saisir le nom de la station en Français", "");
                var type = prompt("Saisir le type de la station", "bus");

                if (nomFr != null && type != null) {
                    layer.bindTooltip(nomFr + " " + type,
                        {
                            permanent: true,
                            direction: 'right'
                        })
                    if (type === 'tramway') {
                        var numero = prompt("Saisir le numero de la station", "");
                        const data = "{\"latitude\": " + layer.getLatLng().lat + ", " + "\"longitude\" :" + layer.getLatLng().lng
                            + ", " + "\"nomFr\": \"" + nomFr + "\"" + ", " + "\"type\": \"" + type + "\"" + ", " + "\"numero\": \"" + numero + "\"" + "}";
                        console.log(data);
                        const fs = require('fs');

// create a JSON object
const user = {
    "name": data.length,
            "nomFr": data.nomFr,
            "x": data.longitude,
            "y": data.latitude
};

// convert JSON object to string
const d = JSON.stringify(user);

// write JSON string to a file
fs.writeFile('user.json', d, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
                        id = id + 1;
                        const optionsPost = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: data
                        };
                        const response = fetch('/stations_sba', optionsPost);
                        return "{\"latitude\": " + layer.getLatLng().lat + ", " + "\"longitude\" :" + layer.getLatLng().lng + "}";
                    } else if (type === 'bus') {
                        var nomligne = prompt("Saisir le numéro de la ligne", "A27");
                        const data = "{\"latitude\": " + layer.getLatLng().lat + ", " + "\"longitude\" :" + layer.getLatLng().lng
                            + ", " + "\"nomFr\": \"" + nomFr + "\"" + ", " + "\"type\": \"" + type + "\"" + ", " + "\"numero\": \"" + nomligne + "\"" + "}";
                        const optionsPost = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: data
                        };
                        const response = fetch('/stations_sba', optionsPost);
                        return "{\"latitude\": " + layer.getLatLng().lat + ", " + "\"longitude\" :" + layer.getLatLng().lng + "}";
                    }
                }

                return "{\"latitude\": " + layer.getLatLng().lat + ", " + "\"longitude\" :" + layer.getLatLng().lng + "}";
            }
        }
        ;