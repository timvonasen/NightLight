function loadData() {
  fetch("/sensorData")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("sensorValue").innerHTML = data.rawValue;
    });
}

function updateLedToggle() {
  fetch("/ledState")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("ledToggle").checked = data.state;
    });
}

function toggleLED() {
  var ledState = document.getElementById("ledToggle").checked;
  fetch("/led", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "state=" + ledState + "&manual=" + true,
  });
}

function setTime() {
  var onTime = document.getElementById("onTime").value;
  var offTime = document.getElementById("offTime").value;
  fetch("/timeSet", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "onTime=" + onTime + "&offTime=" + offTime,
  });
}

function updateCurrentTime() {
  fetch("/currentTime")
    .then((response) => response.text())
    .then((time) => {
      document.getElementById("currentTime").innerHTML = time;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadData();
  updateLedToggle();
  setInterval(function () {
    loadData();
    updateCurrentTime();
  }, 1000);
});
