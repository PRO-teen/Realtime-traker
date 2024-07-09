// const socket = io();
// if(navigator.geolocation){
//     navigator.geolocation.watchPosition(
//         (position)=>{
//         const {latitude , longitute} = position.coords;
//         socket.emit("send-location",{latitude , longitude});
//     },
//     (error)=>{
//         console.error(error);
//     },{
//         enableHighAccuracy:true,
//         timeout:5000,
//         maximumAge:0,
//     }
// );
// }


// const map = L.map("map").setView([0,0] , 16);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
//     attribution:"ayush yadav"
// }).addTo(map);

// const markers = {};

// socket.on("receive-location",(data)=>{
//     const {id,latitude,longitude} = data;
//     map.setView([ latitude , longitude] ,15);
//     if(markers[id]){
//         markers[id].setLatLng([latitude , longitude]);
//     }else{
//         markers[id] = L.marker([latitude,longitude]).addTo(map);
//     }
// });

// socket.on("user-disconnected",(id)=>{
//     if(markers[id]){
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// })








//new



const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords; // Corrected typo
            socket.emit("send-location", { latitude, longitude }); // Corrected typo
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "ayush yadav",
}).addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data; // Corrected typo
    map.setView([latitude, longitude], 15);
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
