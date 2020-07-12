// init values
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org./{z}/{x}/{y}.png';


const tiles = L.tileLayer(tileUrl,{attribution});



var issMap = L.map('mapid');
const marker = L.marker([0,0]).addTo(issMap);


tiles.addTo(issMap);
async function getISS(){
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    const { latitude, longitude, velocity, altitude} = data;
    //L.marker([latitude,longitude ]).addToMap(issMap);
    marker.setLatLng([latitude, longitude]);
    issMap.setView([latitude,longitude],2);
    document.getElementById("iss_lat").textContent = latitude;
    document.getElementById("iss_vel").textContent = `${Math.round(velocity * 0.621371)} mph`;
    document.getElementById("iss_lon").textContent = longitude;
    document.getElementById("iss_alt").textContent = `${Math.round(altitude * 0.621371)} miles`;
}

getISS();
