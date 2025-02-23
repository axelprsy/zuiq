const express = require('express');
const router = express.Router();
const path = require('path');

// Définition de la route pour /login
router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../auth/html/login.html'));
  });

// Définition de la route pour la page d'accueil
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../auth/html/join-game.html'));
  });
router.get('/join-quizz', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../auth/html/join-game.html'));
  });

// Définition de la route pour /profile
router.get('/profile', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../pages/html/profile.html'));
  });

// Définition de la route pour /sigunp
router.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../auth/html/signup.html'));
    });

// Définition de la route pour /quizz
router.get('/create-quizz', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../quizz/html/create-quizz.html'));
    });

// Définition de la route pour /succes (après la création d'un quizz)
router.get('/success', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../quizz/html/success.html'));
    });

// Définition de la route pour /my-quizz
router.get('/my-quizz', (req, res) => {
    res.sendFile( path.resolve(__dirname, '../quizz/html/my-quizz.html'));
    });

module.exports = router;