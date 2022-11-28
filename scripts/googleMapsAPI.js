import hotels from '../utils/hotelsLocations.json' assert {type: 'json'};

function initMap() {
  const initialPosition = hotels[0];

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: initialPosition,
  });

  const markers = hotels.map((position, i) => {
    const marker = new google.maps.Marker({
      position: position,
      map: map,
    });
  });
}

window.initMap = initMap;
