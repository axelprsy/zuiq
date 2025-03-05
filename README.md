# Kadoute
Projet : Refaire “Kahoot” a notre manière - Application de quizz

## Description
Création d’un site permettant de crée un quizz par soit même ou a l’aide d’une ia. Il permettra également de faire jouer les utilisateurs.

---

## Prérequis

1. **Python3.7** doit être installé sur votre machine.
    - ***Vérifier l'installation :***
    ```bash
    python3 --version   # (Linux/MacOS)
    python --version    # (Windows)
    ```

2. **Pip** (gestionnaire de paquets Python) doit être installé.
    - ***Vérifier l'installation :***
    ```bash
    pip --version
    ```

3. **NodeJS** doit être installé afin de pouvoir lancer le front.
    - ***Vérifier l'installation :***
    ```bash
    node --version
    ```
---

## Installation

### 1. Clonez le dépôt
Clonez le code source sur votre machine a l'aide de la commande suivante :
```bash
git clone https://github.com/LunityAxel/kadoute.git
```

--- 

## Pour lancer le projet 2 options :
 - **Option 1** : Utiliser docker afin de lancer le projet en 1 ligne.
 - **Option 2** : Ne pas utiliser docker, et executer les différentes commandes.

---

## Option 1 (conseillée):

### Prérequis
**Docker** doit être installé sur votre machine.
- ***Vérifier l'installation :***
    ```bash
    docker --version
    ```

### Démarrer le projet
Il suffit uniquement d'executer cette ligne afin d'initialiser la base de donnée, l'api etc.
```bash
docker compose up --build
```

## Option 2 (déconseillée):

## Lancer l'API
Pour démarrer l'API, suivez les étapes ci-dessous selon votre système d'exploitation :

### Documentation
Rendez vous sur la [documentation de l'api](https://verdant-budget-6c4.notion.site/Documentation-API-Kadoute-19caef7c06d880068d5ee16283895db9) pour comprendre son fonctionnement.

### Étape 1 : Accéder au répertoire de l'API
Commencez par naviger dans le dossier contenant l'api :

```bash
cd kadoute
cd api
```

### Étape 2 : (Optionnel) Créer et activer un environnement virtuel
*L'utilisation d'un environnement virtuel permet d'isoler les dépendances du projet.*
    
#### Linux/Mac OS
1. Créez un environnement virtuel :
    ```bash
    python3 -m venv .venv
    ```
2. Activez l'environnement virtuel :
    ```bash
    source .venv/bin/activate
    ```

#### Windows
1. Créez un environnement virtuel :
    ```bash
    python -m venv .venv
    ```
2. Activez l'environnement virutel : 
    ```bash
    .venv/Scripts/activate
    ```
    ### Étape 3 : Télécharger et installer Ollama (optionnel)
    C'est une application permettant d'utiliser des modèles d'IA en local. Elle doit être présente sur votre machine pour avoir accès à toutes les fonctions telles que la génération de quizz.
- ***Choissiez la méthode qui correspond a votre système d'exploitation :***
    ### Linux
    ```bash
    curl -fsSL https://ollama.com/install.sh | sh
    ```

    ### Macos
    ```bash
    brew install ollama
    ```

    ### Windows
    Installez Ollama via leur site web :
    https://ollama.com/download


### Étape 4 : Initialiser l'API
Initialisez la base de données et installez les dépendances en executant :
***Cela peut être un peu long car un model d'IA est téléchargé pour le bon fonctionnement du projet.***

#### Linux/MacOS
```bash
python3 init_api.py
```

#### Windows
```bash
python init_api.py
```

### Étape 4 : Lancer l'API
Demarrez le serveur de l'API avec la commande suivante :

#### Linux/MacOS
```bash
python3 run.py
```

#### Windows
``` bash
python run.py
```

---

### Étape 5 : Lancer la seconde API (socket)
Rendez vous dans le dossier : 
```bash
cd ../api_socketio
```

### Linux/MacOS
```bash
pip3 install -r requirements.txt
python3 run_socketio.py
```

### Windows
```bash
pip install -r requirements.txt
python run_socketio.py
```

---

## Lancer le front
Pour démarrer l'API, suivez les étapes ci-dessous :

### Étape 1 : Accéder au répertoire du front
```bash
cd front
```

### Étape 2 : Installer les dépendances
```bash
npm install
```

### Étape 3 : Lancer le front avec Express.js
```bash
node app.js
```