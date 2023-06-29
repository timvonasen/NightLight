console.log("Server-side code running");

const express = require("express");
const sql = require("mssql");

const app = express();
const port = 3000;

require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
  },
};

// serve files from the public directory
app.use(express.static("public"));

// start the express web server listening on 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//GET API
app.get("/db", (req, res) => {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    console.log(request);

    // query to the database and get the records
    request.query(
      "SELECT TOP 10 SensorValue, LightState, EventProcessedUtcTime FROM [dbo].[NachtlichtTabelle] ORDER BY EventProcessedUtcTime DESC;",
      function (err, recordset) {
        if (err) {
          console.log(err);
        }

        res.status(200).json(recordset);
      }
    );
  });
});

//POST API
app.post("/toggleLight", (req, res) => {
  var Client = require("azure-iothub").Client;
  var Message = require("azure-iot-common").Message;

  var connectionString =
    "HostName=AnTiFa-AntonTimFalcon.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=MfGwLbUQEsVPvMI2y850+eLarEsEcIhbviBB82hnqjg=";

  var targetDevice = "iot-device-1";

  var client = Client.fromConnectionString(connectionString);

  client.open(function (err) {
    if (err) {
      console.error("Could not connect: " + err.message);
      res.status(500).send("Could not connect: " + err.message);
      return;
    }

    console.log("Client connected");

    // Send a structured message to the IoT device
    // This is now modified to send 0 or 1

    var data = JSON.stringify({ LightState: 1 });

    var message = new Message(data);

    console.log("Sending message: " + message.getData());

    client.send(targetDevice, message, function (err) {
      if (err) {
        console.log("Error sending message: " + err);
        res.status(500).send("Error sending message: " + err);
      } else {
        console.log("Message sent successfully");
        res.status(200).send("Message sent successfully");
      }
    });
  });
});
