const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuration des dossier statiques
app.use(express.static(path.join(__dirname, 'auth')));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'quizz')));

// Importation des routes
const indexRouter = require('./routes/routes.js');

// Utilisation des routes
app.use('/', indexRouter);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});