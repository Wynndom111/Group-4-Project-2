// Creating map object
var myMap = L.map("map-id", {
    center: [39.8282, -98.5795],
    zoom: 4.5
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// Use link to get geojson data
var link = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json' 

// Our style object
var mapStyle = {
  color: "white",
  fillColor: "black",
  fillOpacity: 0.5,
  weight: 1.5
};

//demo for choropleth
// https://leafletjs.com/examples/choropleth/

// https://github.com/HandsOnDataViz/leaflet-map-polygon-hover

function getColor(confScale) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}


async function init()
{
  var jsonRequest = d3.json(link);
  var csv = await d3.csv("/static/state_data_df.csv");
  var data = await jsonRequest;

  function getStateData(state) { return csv.filter(x => x.state === state); }

  console.log(data);
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "black",
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
            fillOpacity: 0.8
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
        // click: function(event) {
        //   myMap.fitBounds(event.target.getBounds());
        // }
      });
      // Giving each feature a pop-up with information pertinent to it
      let popupHtml = `<h1> ${feature.properties.name} </h1>`;
      popupHtml += `<ul class="list-group">`
      getStateData(feature.properties.name).forEach(e => {
        popupHtml += `<li class="list-group-item"> ${e.year}\n Population: ${e.confined_population}</li>`
      });
      popupHtml += `</ul>`
      layer.bindPopup(popupHtml, {width: "50px"});  
    }
  }).addTo(myMap);
}


























init();