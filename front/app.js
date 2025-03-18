const express = require('express');
const path = require('path');
const app = express();

const config_file = require("./config.json");
const port = config_file.front_port;


// Configuration des dossier statiques
app.use(express.static(path.join(__dirname, 'auth')));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'quizz')));
app.use(express.static(path.join(__dirname, 'assets')));

// Importation des routes
const indexRouter = require('./routes/routes.js');

// Utilisation des routes
app.use('/', indexRouter);

// Démarrage du serveur
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running`);
});
