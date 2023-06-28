console.log("Client-side code running");

const button = document.getElementById("myButton");
button.addEventListener("click", function (e) {
  console.log("myButton button was clicked");
  fetch("/db", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (data) {
      document.getElementById("counter").innerHTML = ` Data: ${data}`;
    })
    .catch(function (error) {
      console.log(error);
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
