import hotels from "../utils/hotelsLocations.json" assert { type: "json" };
import comunidadesAutonomas from "../utils/ccaa.js";
import espanaComunidades from "../utils/comEsp.js";

let map, infoWindow, commShapes;

function initMap() {
  //Initial position (Main Miranda Hotel, located in Madrid)
  const initialPosition = hotels[0];

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: initialPosition,
  });

  //Custom Pin
  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "green",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(12, 22),
  };

  //Add makers to map
  let markers = hotels.map((position, i) => {
    let marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: svgMarker,
    });

    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  //Make Cluster for close locations
  new markerClusterer.MarkerClusterer({ map, markers });

  //GeoLocation
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");
  locationButton.textContent = "My location 📍";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(locationButton);

  let pos = {};
  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("This is where you are");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
      Swal.fire("No geolocation supported");
    }
  };

  locationButton.addEventListener("click", findMyLocation);

  // Search by input
  let location__button = document.getElementById("location__button");
  location__button.addEventListener("click", codeAddress);

  var geocoder;
  function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == "OK") {
        pos = results[0].geometry.location;
        searchByNearestLocation();
      } else {
        Swal.fire(
          "The location has not returned results. Please check that it is valid."
        );
      }
    });
  }

  // Nearest hotels location
  const nearestLocationsButton = document.createElement("button");
  nearestLocationsButton.textContent = "Find nearest hotels";
  nearestLocationsButton.classList.add("nearest-location-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    nearestLocationsButton
  );

  const searchByNearestLocation = () => {
    const service = new google.maps.DistanceMatrixService();
    if (Object.keys(pos) != 0) {
      const destinations = hotels;
      const request = {
        origins: [pos],
        destinations: destinations,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };

      service.getDistanceMatrix(request).then((response) => {
        const distancesToOrder = response.rows[0].elements.map(
          (item, index) => {
            return [
              destinations[index].name,
              (item.distance.value / 1000).toFixed(2),
            ];
          }
        );

        distancesToOrder.sort((a, b) => {
          return a[1] - b[1];
        });

        var distancesList = "<h3>Closest hotels from your location: </h3>";

        distancesToOrder.map((element, i) => {
          distancesList += `<div class='location__item'> • Distance to ${element[0]} → ${element[1]} kms </div>`;
        });

        document.getElementById("locations").innerHTML = distancesList;
      });
    } else {
      Swal.fire("Please set your location first");
    }
  };
  nearestLocationsButton.addEventListener("click", searchByNearestLocation);

  // Polygons by CCAA
  let selectContainer = document.getElementById("select__container");
  let select = document.createElement("select");
  select.classList.add("select");

  for (let i = 0; i < comunidadesAutonomas.length; i++) {
    select.innerHTML += `<option value='${i}' class='map__option'>${comunidadesAutonomas[i]}</option>`;
  }

  

  select.addEventListener("change", (e) => {

    if (commShapes) {
      commShapes.setMap(null);
    }

    commShapes = new google.maps.Polygon({
      paths: espanaComunidades[e.target.selectedIndex],
      strokeColor: "#329da8",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#66b2ba",
      fillOpacity: 0.8,
    });

    // map = new google.maps.Map(document.getElementById("map"), {
    //   zoom: 6,
    //   center: initialPosition,
    // });
    commShapes.setMap(map);
  });

  selectContainer.appendChild(select);
}

window.initMap = initMap;
