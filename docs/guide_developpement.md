# Guide de Développement

## Installation et Exécution

### Prérequis
- **Python 3** (dernière version stable)
- **Node.js** (dernière version stable)

### Installation

```sh
git clone https://github.com/axelprsy/zuiq.git
cd zuiq
```

# Démarrer le Projet

## Option 1 : Utiliser Docker (rapide et efficace)

### Prérequis
- Assure-toi que **Docker** est installé sur ta machine.
- Vérifie l'installation avec la commande :  
  `docker --version`

### Démarrer le projet avec Docker
Il suffit d'exécuter ces commandes pour lancer le projet :

- **Windows** :  
  Dans PowerShell, exécute la commande suivante :
  ```powershell
  cd sources
  powershell.exe -ExecutionPolicy Bypass -File ./start.ps1
  ```

- **MacOS / Linux** :  
  Ouvre le terminal et exécute ces commandes :  
  ```bash
  cd sources
  chmod +x start.sh 
  sudo ./start.sh
  ```

---

## Option 2 : Démarrer le projet manuellement (conseillé pour le développement)

### Prérequis
- **Python 3.x**
- **Node.js**

### Étape 2 : Créer et activer un environnement virtuel

#### Pour **MacOS/Linux** :

1. Créer un environnement virtuel :
   ```bash
   cd sources
   python3 -m venv .venv
   ```

2. Activer l'environnement virtuel :
   ```bash
   source .venv/bin/activate
   ```

#### Pour **Windows** :

1. Créer un environnement virtuel :
   ```bash
   python -m venv .venv
   ```

2. Activer l'environnement virtuel :
   ```bash
   .venv\Scripts\activate
   ```

---

### Étape 3 : Initialiser la base de données et l'API

- **MacOS/Linux** :
  ```bash
  cd api
  python3 init_api.py
  ```

- **Windows** :
  ```bash
  cd api
  python init_api.py
  ```

---

### Étape 4 : Démarrer l'API

Une fois l'API initialisée, lance le serveur de l'API.

- **MacOS/Linux** :
  ```bash
  python3 run.py
  ```

- **Windows** :
  ```bash
  python run.py
  ```

---

### Étape 5 : Lancer la seconde API (Socket.io)

L'API Socket.io est utilisée pour la gestion en temps réel des jeux.

1. Accède au répertoire `api_socketio` :
   ```bash
   cd api_socketio
   ```

2. Installe les dépendances :
   - **MacOS/Linux** :
     ```bash
     pip3 install -r requirements.txt
     ```

   - **Windows** :
     ```bash
     pip install -r requirements.txt
     ```

3. Démarre l'API Socket.io :
   ```bash
   python run_socketio.py
   ```

---

### Lancer le Front-End

Maintenant, il est temps de démarrer le front-end.

1. Accède au répertoire `front` :
   ```bash
   cd front
   ```

2. Installe les dépendances JavaScript :
   ```bash
   npm install
   ```

3. Lance le front-end avec Express.js :
   ```bash
   node app.js
   ```

## Contribution

1. **Fork** le projet.
2. Crée une branche pour chaque nouvelle fonctionnalité ou correction (par exemple, `front/modify-quiz` ou `back/fix-api`).
3. Respecte le format de code (JS/Flask).
4. Effectue un commit en suivant ce format :
   - `fix: explication`
   - `feat: détail`
   - `chore: tâche générique`
5. Teste ton code avant de faire un push et toutes les fonctions latérales ainsi que le docker.