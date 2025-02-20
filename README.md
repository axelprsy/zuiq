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

---

## Installation

### 1. Clonez le dépôt
Clonez le code source sur votre machine a l'aide de la commande suivante :
```bash
git clone https://github.com/LunityAxel/kadoute.git
```

--- 

## Lancer l'API
Pour démarrer l'API, suivez les étapes ci-dessous selon votre système d'exploitation :

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

### Étape 3 : Télécharger et installer Ollama
C'est une application permettant d'utiliser des modèles d'IA en local. Elle doit être presente sur votre machine pour avoir accès a toute les fonctions.
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
    ```bash
    winget install ollama.ollama
    ```

    ### Via le site d'ollama
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

