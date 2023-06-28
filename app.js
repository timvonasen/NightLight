console.log("Server-side code running");

const express = require("express");
const sql = require("mssql");

const app = express();
const port = process.env.PORT || 3000;

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

    // query to the database and get the records
    request.query(
      "SELECT TOP (1000) * FROM [dbo].[testDevice]",
      function (err, recordset) {
        if (err) console.log(err);
        res.status(200).json(recordset);
      }
    );
  });
});

//POST API
app.post("/sendMessage", (req, res) => {
  var Client = require("azure-iothub").Client;
  var Message = require("azure-iot-common").Message;

  var connectionString =
    "HostName=iot-hub-ys.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=niYzPywhaM6SREd8skteZt9qopH1MB8dCZL70Dvtu/c=";
  var targetDevice = "storageDevice";

  var client = Client.fromConnectionString(connectionString);

  client.open(function (err) {
    if (err) {
      console.error("Could not connect: " + err.message);
    } else {
      console.log("Client connected");

      // Create a message and send it to the IoT Hub every second
      var data = JSON.stringify({ text: "food123456" });
      var message = new Message(data);
      console.log("Sending message: " + message.getData());
      client.send(targetDevice, message, printResultFor("send"));
    }
  });

  // Helper function to print results in the console
  function printResultFor(op) {
    return function printResult(err, resLokal) {
      if (err) {
        console.log(op + " error: " + err.toString());
      } else {
        console.log(op + " status: " + resLokal.constructor.name);
        res.status(201).json(op + " status: " + resLokal.constructor.name);
      }
    };
  }
});
