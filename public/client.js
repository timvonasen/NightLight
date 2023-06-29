console.log("Client-side code running");

document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    var currentTime = new Date();

    // Uhrzeit formatieren
    var hours = currentTime.getHours().toString().padStart(2, "0");
    var minutes = currentTime.getMinutes().toString().padStart(2, "0");
    var seconds = currentTime.getSeconds().toString().padStart(2, "0");
    document.getElementById("currentTime").innerText =
      hours + ":" + minutes + ":" + seconds;

    // Datum formatieren
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var formattedDate = currentTime.toLocaleDateString("de-DE", options);
    document.getElementById("currentDate").innerText = formattedDate;
  }, 1000);
});

document.getElementById("myButton").addEventListener("click", function () {
  fetch("/db")
    .then((response) => response.json())
    .then((data) => {
      var formattedJson = JSON.stringify(data.recordset, null, 2);
      document.getElementById("dbData").textContent = formattedJson;
    });
});

const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", function (e) {
  console.log("sendButton button was clicked");

  fetch("/sendMessage", { method: "POST" })
    .then(function (response) {
      if (response.ok) {
        console.log("click was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
});
