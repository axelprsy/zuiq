import os
import subprocess
import sys
import sqlite3

def create_venv():
    """Créer un environnement virtuel"""
    print("Création de l'environnement virtuel...")
    try:
        subprocess.run([sys.executable, "-m", "venv", ".venv"], check=True)
        print("✅ Environnement virtuel créé avec succès.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de la création du venv : {e}")
        sys.exit(1)

def activate_venv():
    if os.name == "nt":
        activation_script = r".venv\Scripts\activate"
    else:  # macOS / Linux
        activation_script = "source .venv/bin/activate"
    
    print(f"Activation de l'environnement virtuel : {activation_script}")
    return activation_script

def install_requirements():
    print("Installation des dépendances depuis requirements.txt...")
    try:
        subprocess.run([os.path.join(".venv", "bin", "pip") if os.name != "nt" else os.path.join(".venv", "Scripts", "pip"), 
                        "install", "-r", "requirements.txt"], check=True)
        print("\n\n✅ Les dépendances ont été installées avec succès.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de l'installation des dépendances : {e}")
        sys.exit(1)

def create_db():
    print("ℹ️ Création du dossier et de la base de données...")
    try:
        if not os.path.exists("db"):
            os.mkdir("db")
            print("✅ Dossier 'db' créé avec succès.")
        else:
            print("ℹ️ Le dossier 'db' existe déjà.")

        db_path = os.path.join("db", "app.db")
        if not os.path.exists(db_path):
            connection = sqlite3.connect(db_path)
            connection.close()
            print("✅ Fichier de base de données 'app.db' créé avec succès.")
        else:
            print("ℹ️ Le fichier 'app.db' existe déjà.")
    except Exception as e:
        print(f"❌ Erreur lors de la création de la base de données : {e}")
        sys.exit(1)

def init_db():
    print("🔧 Exécution de init_db.py dans le dossier 'functions'...")
    init_db_path = os.path.join("functions", "init_db.py")
    if not os.path.exists(init_db_path):
        print(f"❌ Le fichier {init_db_path} n'existe pas. Assurez-vous qu'il est présent.")
        sys.exit(1)

    try:
        subprocess.run([sys.executable, init_db_path], check=True)
        print("✅ Le fichier 'init_db.py' a été exécuté avec succès.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Une erreur est survenue lors de l'exécution de 'init_db.py' : {e}")
        sys.exit(1)



if __name__ == "__main__":

    create_venv()

    activation_command = activate_venv()

    install_requirements()

    create_db()

    init_db()

    print("\n\n🎉 Configuration terminée avec succès. Vous pouvez maintenant lancer votre API !")
    print("IMPORTANT : Activez manuellement le venv avant de lancer votre API :")
    print(f"  - Sous Linux/macOS : `{activation_command}`")
    print(f"  - Sous Windows : `.venv\\Scripts\\activate`")
