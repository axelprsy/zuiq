# Zuiq
Projet : Refaire “Kahoot” à notre manière - Application de quiz interactif

Création d’un site permettant de créer un quiz soi-même ou à l’aide d’une IA. Il permettra également aux utilisateurs de jouer.


<p align="center">
  <img width="712" height="450" src="https://cdn.discordapp.com/attachments/1005937387140022302/1351960670673043616/banniere.png?ex=67dc46fe&is=67daf57e&hm=0fa068f0cff7dac843d357ee591eab80afafc725783bf8b96a33762ac5b3b8cc&">
</p>

---

## Prérequis


1. **Python 3.7** doit être installé sur votre machine.  
   - ***Vérifier l’installation :***  
   ```bash
   python3 --version   # Linux/MacOS
   python --version    # Windows
   ```

2. **Pip** (le gestionnaire de paquets Python) doit être installé.  
   - ***Vérifier l’installation :***  
   ```bash
   pip --version
   ```

3. **Node.js** doit être installé pour exécuter le front-end.  
   - ***Vérifier l’installation :***  
   ```bash
   node --version
   ```
---

## Installation

### 1. Clonez le dépôt
Clonez le code source sur votre machine à l'aide de la commande suivante :
```bash
git clone https://github.com/axelprsy/zuiq.git
```

--- 

## Pour lancer le projet 2 options :

- **Option 1** : Utiliser Docker pour lancer le projet en une seule commande.  
- **Option 2** : Ne pas utiliser Docker et exécuter les différentes commandes manuellement.

---

## Option 1 (conseillée)  

### Prérequis  
**Docker** doit être installé sur votre machine.  
- ***Vérifier l’installation :***  
  ```bash
  docker --version
  ```

### Démarrer le projet  
Il suffit d’exécuter ces deux lignes pour initialiser la base de données, l’API, etc.  

**Windows**  
```powershell
./start.ps1
```  

**MacOS / Linux**  
```bash
chmod +x start.sh
./start.sh
```

---

## Option 2 (déconseillée)  

### Lancer l’API  
Pour démarrer l’API, suivez les étapes ci-dessous en fonction de votre système d’exploitation.  

### Documentation  
Consultez la [documentation de l’API](https://verdant-budget-6c4.notion.site/Documentation-API-Zuiq-19caef7c06d880068d5ee16283895db9) pour comprendre son fonctionnement.  

---

### Étape 1 : Accéder au répertoire de l’API  
Naviguez dans le dossier contenant l’API :  
```bash
cd zuiq/api
```  

---

### Étape 2 : (Optionnel) Créer et activer un environnement virtuel  
*L’utilisation d’un environnement virtuel permet d’isoler les dépendances du projet.*  

#### Linux / MacOS  
1. Créez un environnement virtuel :  
    ```bash
    python3 -m venv .venv
    ```  
2. Activez l’environnement virtuel :  
    ```bash
    source .venv/bin/activate
    ```  

#### Windows  
1. Créez un environnement virtuel :  
    ```bash
    python -m venv .venv
    ```  
2. Activez l’environnement virtuel :  
    ```bash
    .venv\Scripts\activate
    ```  

---

### Étape 3 : Initialiser l’API  
Initialisez la base de données et installez les dépendances en exécutant :  

#### Linux / MacOS  
```bash
python3 init_api.py
```  

#### Windows  
```bash
python init_api.py
```  

---

### Étape 4 : Lancer l’API  
Démarrez le serveur de l’API avec la commande suivante :  

#### Linux / MacOS  
```bash
python3 run.py
```  

#### Windows  
```bash
python run.py
```  

---

### Étape 5 : Lancer la seconde API (Socket.io)  
Accédez au dossier :  
```bash
cd ../api_socketio
```  

#### Linux / MacOS  
```bash
pip3 install -r requirements.txt
python3 run_socketio.py
```  

#### Windows  
```bash
pip install -r requirements.txt
python run_socketio.py
```  
---

## Lancer le front  
Pour démarrer le front-end, suivez les étapes ci-dessous :  

### Étape 1 : Accéder au répertoire du front-end  
```bash
cd front
```  

### Étape 2 : Installer les dépendances  
```bash
npm install
```  

### Étape 3 : Lancer le front-end avec Express.js  
```bash
node app.js
```