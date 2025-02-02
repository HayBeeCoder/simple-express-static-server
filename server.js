#!/usr/bin/env node

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  errorHandler = require("errorhandler"),
  methodOverride = require("method-override"),
  hostname = process.env.HOSTNAME || "localhost",
  port = parseInt(process.env.PORT, 10) || 4567,
  publicDir = process.argv[2] || __dirname + "/public",
  path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

app.get("/details", (req, res) => {
  const response = {
    driverLicense: "valid",
    vehicleLicense: "not ok",
    vehicleNo: "aaaaaaa",
    vehicleInsurance: "done",
  };
  res.status(200);
  res.send(JSON.stringify(response));
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(publicDir));
app.use(
  errorHandler({
    dumpExceptions: true,
    showStack: true,
  })
);

console.log(
  "Simple static server showing %s listening at http://%s:%s",
  publicDir,
  hostname,
  port
);
app.listen(port, hostname);
