// Creating map object
var myMap = L.map("map", {
    center: [39.8282, -98.5795],
    zoom: 11
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

var link = "data/usstates.geojson"

// Our style object
var mapStyle = {
  color: "black",
  fillColor: "white",
  fillOpacity: 0.5,
  weight: 1.5
};

//demo for choropleth
// https://leafletjs.com/examples/choropleth/

// https://github.com/HandsOnDataViz/leaflet-map-polygon-hover

var abrToFullName = {
  'AR' : "Arkencsa",
  "CA" : "CANADA",
}

////Framework supported by inclass example
// Grabbing our GeoJSON data..
async function init()
{
  var jsonRequest = d3.json(link);
  var csvRequest = d3.csv("/static/????");
  var [data, csv] = await Promise.all(jsonRequest, csvRequest);
  
  //Expects full name of state and year is optional
  //if year is omited then returns average
  function getConfPop (state,year) {

    if (year === undefined) {
      //get the average for state
      let totalConfiedPop = 0;
      let count = 0;
      for (var i = 0; i < csv.length; i++) {
        if(abrToFullName[csv[i].state] === state) {
          totalConfiedPop += csv[i].confined_population;
          count++;
        }
      }
      return totalConfiedPop / count;
    }
    else {
      for(var i = 0;i < csv.length; i++){
        if(abrToFullName[csv[i].state] === state && +csv[i].year == year){
          return csv[i].confined_population;
        }
      }
    }

  }
  
  
  
  
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.name),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

    }
  }).addTo(myMap);

}






d3.json(link).then(function(data) {
  console.log(data);
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.name),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

    }
  }).addTo(myMap);
});
