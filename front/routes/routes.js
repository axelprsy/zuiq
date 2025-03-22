const express = require("express");
const os = require("os");
const router = express.Router();
const path = require("path");
const config = require('../config.json');

// ------------------------------------------------
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
// Routes
router.get('/get_ip', (req, res) => {
  res.send({ ip: getLocalIPAddress() });
});

// Définition de la route pour /login
router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../auth/html/login.html"));
});

// Définition de la route pour la page d'accueil
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/join-game.html"));
});
router.get("/join-quizz", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/join-game.html"));
});
router.get("/play-quizz", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/join-game.html"));
});

// Définition de la route pour /profile
router.get("/profile", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../pages/html/profile.html"));
});

// Définition de la route pour /sigunp
router.get("/signup", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../auth/html/signup.html"));
});

// Définition de la route pour /create-quizz
router.get("/create-quizz", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/my-quizz.html"));
});

// Définition de la route pour /my-quizz
router.get("/my-quizz", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/my-quizz.html"));
});
router.get("/dashboard", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/my-quizz.html"));
});
// Définition de la route pour /play-quizz
router.get("/play", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/play-quizz.html"));
});
// Définition de la route pour /start-my-quizz
router.get("/start-my-quizz", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/start-quizz.html"));
});
// Définition de la route pour /modify (temp)
router.get('/modify', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../quizz/html/modify.html"));
});

router.all('*', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "../pages/html/page-404.html"));
});

module.exports = router;