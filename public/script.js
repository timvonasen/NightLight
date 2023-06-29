document.addEventListener("DOMContentLoaded", function () {
  loadSensorValue();
  loadLightState();
});

setInterval(function () {
  loadSensorValue();
  loadLightState();
}, 5000);

function loadSensorValue() {
  fetch("/db")
    .then((response) => response.json())
    .then((data) => {
      if (data.recordset) {
        // Durchlaufen der Daten und Suchen nach dem Sensorwert
        for (let item of data.recordset) {
          if (item.hasOwnProperty("SensorValue")) {
            document.getElementById("SensorValue").innerHTML = item.SensorValue;
            break;
          }
        }
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function loadLightState() {
  fetch("/db")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.recordset) {
        // Durchlaufen der Daten und Suchen nach dem Sensorwert
        for (let item of data.recordset) {
          if (item.hasOwnProperty("LightState")) {
            const lightState = item.LightState;
            console.log(lightState, typeof lightState);

            document.getElementById("light-toggle").checked =
              lightState === "1" ? true : false;

            break;
          }
        }
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  const lightSwitch = document.getElementById("light-toggle");

  if (lightSwitch) {
    lightSwitch.addEventListener("click", function (e) {
      console.log("lightSwitch button was clicked");

      fetch("/toggleLight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response.ok) {
            console.log("click was recorded");
            return;
          }
          throw new Error("Request failed.");
        })
        .catch(function (error) {
          console.log(JSON.stringify(error));
        });
    });
  } else {
    console.error("Element with id 'light-toggle' not found");
  }
});
