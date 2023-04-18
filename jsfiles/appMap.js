
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

// Swap long and lat
let centralPolygonDataNew = [];
for (let i = 0; i < centralPolygonData.length; i++) {centralPolygonDataNew.push([centralPolygonData[i][1], centralPolygonData[i][0]])}
let easternPolygonDataNew = [];
for (let i = 0; i < easternPolygonData.length; i++) {easternPolygonDataNew.push([easternPolygonData[i][1], easternPolygonData[i][0]])}
let mountainPolygonDataNew = [];
for (let i = 0; i < mountainPolygonData.length; i++) {mountainPolygonDataNew.push([mountainPolygonData[i][1], mountainPolygonData[i][0]])}
let pacificPolygonDataNew = [];
for (let i = 0; i < pacificPolygonData.length; i++) {pacificPolygonDataNew.push([pacificPolygonData[i][1], pacificPolygonData[i][0]])}

// Create array of unique airline names  
  let airlinesArray = mainData.map(item => item.airline)
  .filter((value, index, self) => self.indexOf(value) === index)
    console.log(airlinesArray);

  let myMap = L.map("map").setView([38, -96], 4);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

function init(){
  let selector = d3.select("#selDataset");
  for (let i = 0; i < airlinesArray.length; i++){
    selector.append("option").text(airlinesArray[i]);
  }

  let airlineData = [];
  for (let i = 0; i < mainData.length; i++){
     if (mainData[i].airline === "Delta") {airlineData.push(mainData[i])}};
  
  // Create variable for type reviews
let centralPositiveReview = 0;
let centralNegativeReview = 0;
let centralNeutralReview = 0;

let easternPositiveReview = 0;
let easternNegativeReview = 0;
let easternNeutralReview = 0;

let mountainPositiveReview = 0;
let mountainNegativeReview = 0;
let mountainNeutralReview = 0;

let pacificPositiveReview = 0;
let pacificNegativeReview = 0;
let pacificNeutralReview = 0;


airlineData.forEach(obj =>{
  if (obj.sentiment == 'positive' && obj.timezone == 'Central Time (US & Canada)'){centralPositiveReview +=1}
  else if (obj.sentiment == 'negative' && obj.timezone == 'Central Time (US & Canada)'){centralNegativeReview +=1 }
  else if (obj.sentiment == 'neutral' && obj.timezone == 'Central Time (US & Canada)'){centralNeutralReview +=1} 
  
  else if (obj.sentiment == 'positive' && obj.timezone == 'Eastern Time (US & Canada)'){easternPositiveReview +=1} 
  else if (obj.sentiment == 'negative' && obj.timezone == 'Eastern Time (US & Canada)'){easternNegativeReview +=1} 
  else if (obj.sentiment == 'neutral' && obj.timezone == 'Eastern Time (US & Canada)'){easternNeutralReview +=1} 
  
  else if (obj.sentiment == 'positive' && obj.timezone == 'Mountain Time (US & Canada)'){mountainPositiveReview +=1} 
  else if (obj.sentiment == 'negative' && obj.timezone == 'Mountain Time (US & Canada)'){mountainNegativeReview +=1} 
  else if (obj.sentiment == 'neutral' && obj.timezone == 'Mountain Time (US & Canada)'){mountainNeutralReview +=1}

  else if (obj.sentiment == 'positive' && obj.timezone == 'Pacific Time (US & Canada)'){pacificPositiveReview +=1} 
  else if (obj.sentiment == 'negative' && obj.timezone == 'Pacific Time (US & Canada)'){pacificNegativeReview +=1} 
  else if (obj.sentiment == 'neutral' && obj.timezone == 'Pacific Time (US & Canada)'){pacificNeutralReview +=1}
  
  });


//Create a yellow polygon for central time zone
L.polygon(centralPolygonDataNew, {
  color: "yellow",
  fillColor: "yellow",
  fillOpacity: 0.50
}).bindPopup(`<h1>Central Time Zone</h1> <hr> <h2>Pozitive Reviews: ${centralPositiveReview}</h2> 
<h2>Negative Reviews: ${centralNegativeReview}</h2><h2>Neutral Reviews: ${centralNeutralReview}</h2>`).addTo(myMap);

L.polygon(easternPolygonDataNew, {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.50
}).bindPopup(`<h1>Eastern Time Zone</h1> <hr> <h2>Pozitive Reviews: ${easternPositiveReview}</h2> 
<h2>Negative Reviews: ${easternNegativeReview}</h2><h2>Neutral Reviews: ${easternNeutralReview}</h2>`).addTo(myMap);

L.polygon(mountainPolygonDataNew, {
  color: "orange",
  fillColor: "orange",
  fillOpacity: 0.50
}).bindPopup(`<h1>Mountain Time Zone</h1> <hr> <h2>Pozitive Reviews: ${mountainPositiveReview}</h2> 
<h2>Negative Reviews: ${mountainNegativeReview}</h2><h2>Neutral Reviews: ${mountainNeutralReview}</h2>`).addTo(myMap);

L.polygon(pacificPolygonDataNew, {
  color: "red",
  fillColor: "red",
  fillOpacity: 0.50
}).bindPopup(`<h1>Pacific Time Zone</h1> <hr> <h2>Pozitive Reviews: ${pacificPositiveReview}</h2> 
<h2>Negative Reviews: ${pacificNegativeReview}</h2><h2>Neutral Reviews: ${pacificNeutralReview}</h2>`).addTo(myMap);

  

};



function updateMap(){

let selector = d3.select("#selDataset");
let option = selector.property("value"); 
let airlineData = [];
  for (let i = 0; i < mainData.length; i++){
     if (mainData[i].airline === option) {
      airlineData.push(mainData[i])     
     }};
  
// Create variable for type reviews
let centralPositiveReview = 0;
let centralNegativeReview = 0;
let centralNeutralReview = 0;

let easternPositiveReview = 0;
let easternNegativeReview = 0;
let easternNeutralReview = 0;

let mountainPositiveReview = 0;
let mountainNegativeReview = 0;
let mountainNeutralReview = 0;

let pacificPositiveReview = 0;
let pacificNegativeReview = 0;
let pacificNeutralReview = 0;


airlineData.forEach(obj =>{
  if (obj.sentiment == 'positive' && obj.timezone == 'Central Time (US & Canada)'){centralPositiveReview +=1}
  else if (obj.sentiment == 'negative' && obj.timezone == 'Central Time (US & Canada)'){centralNegativeReview +=1 }
  else if (obj.sentiment == 'neutral' && obj.timezone == 'Central Time (US & Canada)'){centralNeutralReview +=1} 
  
  else if (obj.sentiment == 'positive' && obj.timezone == 'Eastern Time (US & Canada)'){easternPositiveReview +=1} 
  else if (obj.sentiment == 'negative' && obj.timezone == 'Eastern Time (US & Canada)'){easternNegativeReview +=1} 
  else if (obj.sentiment == 'neutral' && obj.timezone == 'Eastern Time (US & Canada)'){easternNeutralReview +=1} 
  
  else if (obj.sentiment == 'positive' && obj.timezone == 'Mountain Time (US & Canada)'){mountainPositiveReview +=1} 
  else if (obj.sentiment == 'negative' && obj.timezone == 'Mountain Time (US & Canada)'){mountainNegativeReview +=1} 
  else if (obj.sentiment == 'neutral' && obj.timezone == 'Mountain Time (US & Canada)'){mountainNeutralReview +=1}

  else if (obj.sentiment == 'positive' && obj.timezone == 'Pacific Time (US & Canada)'){pacificPositiveReview +=1} 
  else if (obj.sentiment == 'negative' && obj.timezone == 'Pacific Time (US & Canada)'){pacificNegativeReview +=1} 
  else if (obj.sentiment == 'neutral' && obj.timezone == 'Pacific Time (US & Canada)'){pacificNeutralReview +=1}
  
  });


//Create a yellow polygon for central time zone
L.polygon(centralPolygonDataNew, {
  color: "yellow",
  fillColor: "yellow",
  fillOpacity: 0.50
}).bindPopup(`<h1>Central Time Zone</h1> <hr> <h2>Pozitive Reviews: ${centralPositiveReview}</h2> 
<h2>Negative Reviews: ${centralNegativeReview}</h2><h2>Neutral Reviews: ${centralNeutralReview}</h2>`).addTo(myMap);

L.polygon(easternPolygonDataNew, {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.50
}).bindPopup(`<h1>Eastern Time Zone</h1> <hr> <h2>Pozitive Reviews: ${easternPositiveReview}</h2> 
<h2>Negative Reviews: ${easternNegativeReview}</h2><h2>Neutral Reviews: ${easternNeutralReview}</h2>`).addTo(myMap);

L.polygon(mountainPolygonDataNew, {
  color: "orange",
  fillColor: "orange",
  fillOpacity: 0.50
}).bindPopup(`<h1>Mountain Time Zone</h1> <hr> <h2>Pozitive Reviews: ${mountainPositiveReview}</h2> 
<h2>Negative Reviews: ${mountainNegativeReview}</h2><h2>Neutral Reviews: ${mountainNeutralReview}</h2>`).addTo(myMap);

L.polygon(pacificPolygonDataNew, {
  color: "red",
  fillColor: "red",
  fillOpacity: 0.50
}).bindPopup(`<h1>Pacific Time Zone</h1> <hr> <h2>Pozitive Reviews: ${pacificPositiveReview}</h2> 
<h2>Negative Reviews: ${pacificNegativeReview}</h2><h2>Neutral Reviews: ${pacificNeutralReview}</h2>`).addTo(myMap);

  
};


init();
 // Call functions to update the charts and displayed data
 d3.selectAll("#selDataset").on("change", function(){updateMap()});



});
});
});
});
});