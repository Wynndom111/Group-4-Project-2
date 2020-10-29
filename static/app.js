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


async function init() {
  var jsonRequest = d3.json(link);
  var csv = await d3.csv("/MapData");
  var data = await jsonRequest;

  function getStateData(state) { return csv.filter(x => x.state === state); }

  console.log(data);
  L.geoJson(data, {
    // Style each feature
    style: function (feature) {
      return {
        color: "white",
        fillColor: "black",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function (feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 80% so that it stands out
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.8
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back 
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
      });
      // Giving each feature a pop-up with information pertinent to it
      let popupHtml = `<h1> ${feature.properties.name} </h1>`;
      let stateData = getStateData(feature.properties.name);
      if (stateData.length === 0) {
        popupHtml += `<h2>No Data</h2>`
      } else {
        popupHtml += `<ul class="list-group">`
        stateData.forEach(e => {
          popupHtml += `<li class="list-group-item"> ${e.year}\n Population: ${e.confined_population}</li>`
        });
        popupHtml += `</ul>`
      }
      layer.bindPopup(popupHtml, { width: "50px" });
    }
  }).addTo(myMap);
}


























init();