const express = require('express');
const path = require('path');
const app = express();
const os = require("os");

const config_file = require("./config.json");
const port = config_file.front_port;


// Configuration des dossier statiques
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'auth')));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'quizz')));


// Importation des routes
const indexRouter = require('./routes/routes.js');

// Utilisation des routes
app.use('/', indexRouter);

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    for (const interface of interfaces[interfaceName]) {
      if (interface.family === "IPv4" && !interface.internal) {
        return interface.address; 
      }
    }
  }
  return null; 
}
const ip = getLocalIPAddress();
// Démarrage du serveur
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running : http://${ip}:${port}`);
});
