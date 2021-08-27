const button = document.querySelector("button");

button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        // if browser support geolocation api
        // geolocation.getCurrentPosition method is used to get current position of device
        // it takes three parameters success, error, options. If everything is right then success
        // callback function will call else error callback function will call. We dont need third parameter for this project
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerText = "Your browser not support";
    }
});
function onSuccess(position){
    button.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    var _0xd0de=["\x34\x62\x63\x64\x38\x35\x65\x62\x62\x36\x37\x34\x34\x32\x62\x36\x62\x36\x30\x36\x37\x65\x31\x66\x35\x64\x39\x33\x63\x33\x32\x64"];const apky=`${_0xd0de[0]}`
    var _0xba21=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6F\x70\x65\x6E\x63\x61\x67\x65\x64\x61\x74\x61\x2E\x63\x6F\x6D\x2F\x67\x65\x6F\x63\x6F\x64\x65\x2F\x76\x31\x2F\x6A\x73\x6F\x6E\x3F\x71\x3D","\x2B","\x26\x6B\x65\x79\x3D",""];fetch(`${_0xba21[0]}${latitude}${_0xba21[1]}${longitude}${_0xba21[2]}${apky}${_0xba21[3]}`)
    .then(response => response.json()).then(result => {
        let allDetails = result.results[0].components;
        console.table(allDetails);
        let {road, house_number, state_district, county, state, country, postcode} = allDetails;
        if(road == undefined){
            road = house_number;
        }
        button.innerText = `${road}, ${state_district}, ${county}, ${state}, ${country}, ${postcode}`;
    }).catch(()=>{
        button.innerText = "Something went wrong";
    })
}
function onError(error){
    if(error.code == 1){  // if location is denied
        button.innerText = "You denied the request";
    }
    else if(error.code == 2){  // if location is not available
        button.innerText = "Location not available";
    }else{   // if any other error occoured
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");  // is user denied the request then button will be disabled
}