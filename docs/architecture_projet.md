## Explication des fichiers JavaScript

# Dossier : `pages`


### `edit-profile.js`
Permer à l'utilisateur grace à l'ouverture d'une modal de changer ses informations puis envoie les modifications dans la BDD

### `profile.js`
Affiche les informations de l'utilisateur sur la page de profil

### `security-pages.js`
Vérifie la sécurité des pages, redirige les utilisateurs non authentifiés vers la page de connexion.

# Dossier : `auth`

## Fichiers JavaScript

### `connect-user.js`
Gère la connexion utilisateur, vérifie les informations d'identification et envoie une requête à l'API pour la validation puis connecte l'utilisateur grace a une session sur son navigateur.

### `create-user.js`
Permet la création d'un nouvel utilisateur en envoyant les informations au serveur via l'API.

### `security-auth.js`
Gère la sécurité des pages d'authentification.

---

# Dossier : `quizz`

## Fichiers JavaScript

### `create-quizz.js`
Permet de créer un quiz en collectant des informations via le formulaire, puis les envoie à l'API.

### `delete-quizz.js`
Gère la suppression d'un quiz en envoyant une requête de suppression à l'API.

### `generate-quizz-with-ai.js`
Utilise l'IA pour générer des questions de quiz. Envoie une requête à l'API pour récupérer les questions générées puis les envois dans la bdd.

### `join-quizz.js`
Permet à un utilisateur de rejoindre un quiz existant en validant le code du quiz et son pseudo.

### `modal-modify-questions.js`
Gestion du modal pour modifier les questions d'un quiz.

### `modal-questions.js`
Affiche et gère l'interaction avec les questions sous forme de modals.

### `modify-quizz.js`
Permet de modifier un quiz existant en envoyant les modifications à l'API.

### `play-quizz.js`
Gère le déroulement du quiz, la navigation entre les questions et l'enregistrement des réponses (coté joueurs).

### `recup-quizz.js`
Récupère et affiche les quiz existants depuis l'API.

### `security-quizz.js`
Gère les aspects sécuritaires des pages liées quiz.

### `start-quizz.js`
Lance le quiz, envoie les informations nécessaires pour démarrer le jeu et afficher les questions (coté administrateur).

---

# Dossier : `routes`

## Fichiers JavaScript

### `routes.js`
Contient les définitions des routes principales de l'application, qui gèrent les interactions entre le client et le serveur.

---

# Documentation des fichiers Python

## Dossier : `api`

Ce dossier regroupe tous les fichiers nécessaires pour assurer la liaison entre la base de données et l'utilisateur final.

### `.dockerignore`
Ce fichier sert à spécifier les éléments à ignorer pendant le processus de build de l'application.

### `Dockerfile`
Le `Dockerfile` contient les instructions nécessaires au processus de build.

### `init_api.py`
Ce fichier initialise l'API en installant les dépendances nécessaires et en configurant la base de données.

### `requirements.txt`
Ce fichier liste l'ensemble des dépendances requises pour exécuter l'API.

### `run.py`
Fichier principal de l'API. Il permet de lancer l'application.

---

## Dossier : `db`

Ce dossier contient la base de données. Elle est créée automatiquement lorsque le fichier `init_api.py` est exécuté.

---

## Dossier : `functions`

Ce dossier contient différents fichiers Python qui regroupent des fonctions utilitaires et génériques.

### `connect_db.py`
Ce fichier contient les fonctions nécessaires pour se connecter et se déconnecter de la base de données.

### `hash.py`
Ce fichier est dédié au chiffrement des mots de passe.

### `init_db.py`
Ce fichier initialise la base de données en créant les différentes tables nécessaires. Il est exécuté automatiquement par le fichier `init_api.py`.

---

## Dossier : `models`

Ce dossier contient toutes les fonctionnalités relatives à l'API. Chaque fichier se concentre sur une thématique précise et regroupe les actions telles que `GET`, `UPDATE`, `DELETE` et `POST`.

### `ia_quizz.py`
Génère des quizz à l'aide d'une intelligence artificielle.

### `generate_csv.py`
Crée un fichier CSV contenant les résultats d'une session de quiz.

### `generate_qrcode.py`
Génère des QR codes avec le lien associé à une session de quiz.

### `quizz.py`
Gère l'ajout, la suppression, la modification et la récupération des quizz.

### `session.py`
Gère l'ajout, la suppression, la modification et la récupération des sessions.

### `users.py`
Gère l'ajout, la suppression, la modification et la récupération des utilisateurs.

---

## Dossier : `routes`

### `views.py`
Ce fichier contient toutes les routes de l'API. Il redirige les appels vers les fichiers correspondants comme `session.py`, `users.py`, etc.