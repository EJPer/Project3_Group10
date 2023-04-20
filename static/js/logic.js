
// Perform the call to data to get the time zone information. Call createMarkers when it completes.
d3.json("http://127.0.0.1:5000/api/v1.0/main").then(function(mainData) {
  d3.json("http://127.0.0.1:5000/api/v1.0/central").then(function(centralData) {
    d3.json("http://127.0.0.1:5000/api/v1.0/eastern").then(function(easternData) {
      d3.json("http://127.0.0.1:5000/api/v1.0/mountain").then(function(mountainData) {
        d3.json("http://127.0.0.1:5000/api/v1.0/pacific").then(function(pacificData) {

 let centralPolygonData = centralData.features[0].geometry.coordinates[0];
 let easternPolygonData = easternData.features[0].geometry.coordinates[0];
 let mountainPolygonData = mountainData.features[0].geometry.coordinates[0];
 let pacificPolygonData = pacificData.features[0].geometry.coordinates[0];

// Create the map
let myMap = L.map("map").setView([38, -96], 4);

// Add a tile layer (the background map image) to our map.
// Use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Swap long and lat
let centralPolygonDataNew = [];
for (let i = 0; i < centralPolygonData.length; i++) {
  centralPolygonDataNew.push([centralPolygonData[i][1], centralPolygonData[i][0]])
  }
let easternPolygonDataNew = [];
for (let i = 0; i < easternPolygonData.length; i++) {
  easternPolygonDataNew.push([easternPolygonData[i][1], easternPolygonData[i][0]])
  }
let mountainPolygonDataNew = [];
for (let i = 0; i < mountainPolygonData.length; i++) {
  mountainPolygonDataNew.push([mountainPolygonData[i][1], mountainPolygonData[i][0]])
  }
let pacificPolygonDataNew = [];
for (let i = 0; i < pacificPolygonData.length; i++) {
  pacificPolygonDataNew.push([pacificPolygonData[i][1], pacificPolygonData[i][0]])
  }




//Create a yellow polygon for central time zone
L.polygon(centralPolygonDataNew, {
  color: "yellow",
  fillColor: "yellow",
  fillOpacity: 0.50
}).bindPopup("Central").addTo(myMap);

L.polygon(easternPolygonDataNew, {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.50
}).bindPopup("Eastern").addTo(myMap);

L.polygon(mountainPolygonDataNew, {
  color: "orange",
  fillColor: "orange",
  fillOpacity: 0.50
}).bindPopup("Mountain").addTo(myMap);

L.polygon(pacificPolygonDataNew, {
  color: "red",
  fillColor: "red",
  fillOpacity: 0.50
}).bindPopup("Pacific").addTo(myMap);


});
});
});
});
});
