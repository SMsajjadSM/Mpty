"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
let map, GpsClick;

//current location
navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    map = L.map("map").setView(coords, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //add marker gps
    L.marker(coords)
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("Current Location")
      .openPopup();
    //add event
    map.on("click", function (GpsC) {
      GpsClick = GpsC;
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  },
  function () {
    alert("cant get your location");
  }
);
//event for form
form.addEventListener("submit", (e) => {
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      "";
  e.preventDefault();

  //add marker gps for form data

  const { lat, lng } = GpsClick.latlng;
  console.log(lat, lng);
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});
