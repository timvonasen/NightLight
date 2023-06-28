document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    var currentTime = new Date();
    var hours = currentTime.getHours().toString().padStart(2, "0");
    var minutes = currentTime.getMinutes().toString().padStart(2, "0");
    var seconds = currentTime.getSeconds().toString().padStart(2, "0");
    document.getElementById("currentTime").innerText =
      hours + ":" + minutes + ":" + seconds;
  }, 1000);
});

// function loadData() {
//   fetch("/sensorData")
//     .then((response) => response.json())
//     .then((data) => {
//       document.getElementById("sensorValue").innerHTML = data.rawValue;
//     });
// }

// function updateLedToggle() {
//   fetch("/ledState")
//     .then((response) => response.json())
//     .then((data) => {
//       document.getElementById("ledToggle").checked = data.state;
//     });
// }

// function toggleLED() {
//   var ledState = document.getElementById("ledToggle").checked;
//   fetch("/led", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "state=" + ledState + "&manual=" + true,
//   });
// }

// function setTime() {
//   var onTime = document.getElementById("onTime").value;
//   var offTime = document.getElementById("offTime").value;
//   fetch("/timeSet", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "onTime=" + onTime + "&offTime=" + offTime,
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   loadData();
//   updateLedToggle();
//   setInterval(function () {
//     loadData();
//     updateCurrentTime();
//   }, 1000);
// });
