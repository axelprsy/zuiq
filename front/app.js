const express = require('express');
const path = require('path');
const app = express();
const os = require("os");

const config_file = require("./config.json");

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'auth')));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'quizz')));

const indexRouter = require('./routes/routes.js');
app.use('/', indexRouter);

// Récupére l'adresse IP de la machine
function getLocalIPAddress() {
  if (config_file.url != "") {
    return config_file.url;
  } else if (process.env.HOST_IP != undefined) {
    return process.env.HOST_IP;
  } else {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
      for (const interface of interfaces[interfaceName]) {
        if (interface.family === "IPv4" && !interface.internal) {
          return interface.address;
        }
      }
    }
  }
}

const ip = getLocalIPAddress();
console.log(ip);

app.listen("3000", "0.0.0.0", () => {
  console.log(`Server is running : http://${ip}:3000`);
});
