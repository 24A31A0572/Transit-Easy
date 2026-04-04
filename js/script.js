const cities = {
Hyderabad:["Ameerpet","Charminar","Hitech City","Gachibowli","Secunderabad","Madhapur","Kukatpally","LB Nagar","Uppal","Begumpet"],
Delhi:["India Gate","Rohini","Dwarka","Karol Bagh","Connaught Place","Saket","Lajpat Nagar","Noida","Gurgaon","Janakpuri"],
Mumbai:["Andheri","Bandra","Dadar","Colaba","Thane","Borivali","Powai","Kurla","Malad","Vashi"],
Bengaluru:["MG Road","Whitefield","Electronic City","Indiranagar","Yelahanka","BTM Layout","Marathahalli","Jayanagar","Hebbal","KR Puram"],
Chennai:["T Nagar","Adyar","Velachery","Tambaram","Anna Nagar","Guindy","Porur","Egmore","Mylapore","Chromepet"],
Kolkata:["Park Street","Howrah","Salt Lake","Dum Dum","New Town","Garia","Behala","Sealdah","Tollygunge","Alipore"],
Pune:["Shivajinagar","Hinjewadi","Kothrud","Wakad","Hadapsar","Viman Nagar","Baner","Aundh","Pimpri","Nigdi"],
Vizag:["RK Beach","MVP Colony","Gajuwaka","Simhachalam","Dwaraka Nagar","Madhurawada","Bheemili","Gopalapatnam","NAD","Rushikonda"]
};

const placesData = {
Hyderabad:["Charminar","Golconda Fort","Hussain Sagar","Ramoji Film City"],
Delhi:["India Gate","Red Fort","Qutub Minar","Lotus Temple"],
Mumbai:["Gateway of India","Marine Drive","Juhu Beach","Elephanta Caves"],
Bengaluru:["Lalbagh","Cubbon Park","Bannerghatta Zoo"],
Chennai:["Marina Beach","Kapaleeshwar Temple","Fort St George"],
Kolkata:["Victoria Memorial","Howrah Bridge","Eco Park"],
Pune:["Shaniwar Wada","Sinhagad Fort","Aga Khan Palace"],
Vizag:["RK Beach","Kailasagiri","INS Kursura","Rushikonda Beach"]
};

let totalRoutes = 0;
let cityCount = {};

// ✅ NEW: Store selected route
let selectedCity = "";
let selectedSource = "";
let selectedDestination = "";

window.onload=()=>{
let c=document.getElementById("city");
for(let city in cities){
c.innerHTML+=`<option>${city}</option>`;
}
loadPlaces();
};

function loadPlaces(){
let city=document.getElementById("city").value;
let s=document.getElementById("source");
let d=document.getElementById("destination");

s.innerHTML="";
d.innerHTML="";

cities[city].forEach(p=>{
s.innerHTML+=`<option>${p}</option>`;
d.innerHTML+=`<option>${p}</option>`;
});
}

function showSection(id){
document.querySelectorAll("section").forEach(sec=>sec.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

function generateStops(city, src, dest){
const stopsData = {
Hyderabad:["LB Nagar","Erragadda","Punjagutta","Lakdikapul","Secunderabad"],
Delhi:["Rajiv Chowk","Kashmere Gate","Hauz Khas","Dwarka Sector 21"],
Mumbai:["Kurla","Sion","Ghatkopar","Dadar"],
Bengaluru:["Majestic","Silk Board","BTM","Hebbal"],
Chennai:["Guindy","Central","Egmore","Tambaram"],
Kolkata:["Esplanade","Dum Dum","Howrah","Park Street"],
Pune:["Shivajinagar","Swargate","Hinjewadi","Baner"],
Vizag:["Maddilapalem","Gajuwaka","NAD","Rushikonda"]
};

let stops = stopsData[city] || [];
let randomStop = stops[Math.floor(Math.random() * stops.length)];

return `Stops: ${src} → ${randomStop} → ${dest}`;
}

function findRoute(){
let city=document.getElementById("city").value;
let src=document.getElementById("source").value;
let dest=document.getElementById("destination").value;

if(src===dest){
alert("Choose different locations");
return;
}

// ✅ STORE VALUES FOR TRANSPORT DETAILS
selectedCity = city;
selectedSource = src;
selectedDestination = dest;

totalRoutes++;
document.getElementById("dashRoutes").innerText = totalRoutes;

cityCount[city] = (cityCount[city] || 0) + 1;

let maxCity = Object.keys(cityCount).reduce((a,b)=>
cityCount[a] > cityCount[b] ? a : b
);

document.getElementById("dashCity").innerText = maxCity;

showSection("results");

document.getElementById("routeTitle").innerText =
`${city}: ${src} → ${dest}`;

document.getElementById("path").innerHTML =
`<span>${src}</span> ➝ <span>${dest}</span>`;

document.getElementById("busStops").innerText =
generateStops(city, src, dest);

document.getElementById("metroStops").innerText =
generateStops(city, src, dest);

document.getElementById("metroOnlyStops").innerText =
generateStops(city, src, dest);

document.getElementById("mixedStops").innerText =
generateStops(city, src, dest);

let placesHTML="";
placesData[city].forEach(p=>{
placesHTML += `<div class="card">${p}</div>`;
});

document.getElementById("places").innerHTML = placesHTML;
}

// ✅ FEEDBACK
function submitFeedback(){
let name=document.getElementById("name").value.trim();
let msg=document.getElementById("msg").value.trim();

if(name==="" || msg===""){
alert("Please enter both Name and Message");
return;
}

document.getElementById("thankyou").classList.remove("hidden");
}

// ✅ SHOW PLACES
function showPlaces(){
showSection("placesSection");
}

// ✅ NEW: GENERATE DYNAMIC TIMES
function generateDynamicTimes(baseHour){

let times = [];

for(let i=0;i<5;i++){

let hour24 = baseHour + i;

// convert to 12-hour format
let period = hour24 >= 12 ? "PM" : "AM";
let hour12 = hour24 % 12;
if(hour12 === 0) hour12 = 12;

let minsArray = ["00","15","30","45"];
let mins = minsArray[Math.floor(Math.random()*4)];

times.push(hour12 + ":" + mins + " " + period);
}

return times.join(" , ");
}

// ✅ NEW: SHOW TRANSPORT DETAILS
function showTransportDetails(){

let city = selectedCity;
let src = selectedSource;
let dest = selectedDestination;

// variation logic
let variation = (src.length + dest.length + city.length) % 4;

const baseData = {
Hyderabad:{bus:6, metro:5, train:6},
Delhi:{bus:5, metro:5, train:6},
Mumbai:{bus:6, metro:5, train:5},
Bengaluru:{bus:6, metro:5, train:6},
Chennai:{bus:5, metro:5, train:6},
Kolkata:{bus:5, metro:5, train:5},
Pune:{bus:6, metro:6, train:7},
Vizag:{bus:6, metro:7, train:7}
};

let base = baseData[city];

// generate timings
let busTimes = generateDynamicTimes(base.bus + variation);
let metroTimes = generateDynamicTimes(base.metro + variation);
let trainTimes = generateDynamicTimes(base.train + variation);

// display
document.getElementById("busTimes").innerText =
`${src} → ${dest} : ${busTimes}`;

document.getElementById("metroTimes").innerText =
`${src} → ${dest} : ${metroTimes}`;

document.getElementById("trainTimes").innerText =
`${src} → ${dest} : ${trainTimes}`;

// show section
showSection("transportDetails");
}
