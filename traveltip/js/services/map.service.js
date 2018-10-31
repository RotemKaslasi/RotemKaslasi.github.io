
var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap'); 
    return _connectGoogleApi()
    .then(() => {
        console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        console.log('Map!', map);
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng( lat,  lng);
    map.panTo(laLatLng);
}


function copyLocation(address){
    const API_KEY='AIzaSyAqi6VwAtrB2JCTO-Ms1FLKeINU-_FP4yg';
    var prmRes = axios.get (`https://maps.googleapis.com/maps/api/geocode/json?address=${address}
    &key=${API_KEY}`)
    var prmSearched=prmRes.then (res =>{
        return {lat:res.data.results[0].geometry.location.lat, lan:res.data.results[0].geometry.location.lng}
    });
    return prmSearched;
    
}



// function getAddressByCoords(lat, lng) {
//     const API_KEY = 'AIzaSyDgsW7qlWwRjwnDpF0GoPSj_Wc2m2IFA1I';
//     var prmRes = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
//     var description; 
//     var prmLocDesc = prmRes.then(res => {
//         // console.log(res)
//         console.log(res.data.results[0].formatted_address);
//         description = res.data.results[0].formatted_address;
//         document.querySelector('.curr-location').innerText = description;
//         return res.data.results[0].formatted_address

//     }
//     );
//     return prmLocDesc;
// }

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAqi6VwAtrB2JCTO-Ms1FLKeINU-_FP4yg';
    // const API_KEY = '';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}

export default {
    initMap,
    addMarker,
    panTo,
    copyLocation
}

