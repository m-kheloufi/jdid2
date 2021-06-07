var x=localStorage.getItem("viss");

if(x=="false"){
   
}
    if(x=="true"){
        var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polygon: false,
                rectangle: false,
                circle: false,
                circlemarker: false,
            },
            edit: {
                featureGroup: featureGroup
            }
        }).addTo(map);}
