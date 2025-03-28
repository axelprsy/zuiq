import os
import subprocess
import sys
import sqlite3


def install_requirements():
    """
    Installe les dépendances depuis requirements.txt.
    """
    print("Installation des dépendances depuis requirements.txt...")

    pip_executable = "pip" if os.name == "nt" else "pip3"

    try:
        subprocess.run([pip_executable, "install", "-r", "requirements.txt"], check=True)
        print("\n\n✅ Les dépendances ont été installées avec succès.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de l'installation des dépendances : {e}")
        sys.exit(1)


def create_db():
    """
    Création de la base de donnée.
    """
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
    """
    Initialise la base de données.
    """
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

    install_requirements()

    create_db()

    init_db()

    print("\n\n🎉 Configuration terminée avec succès. Vous pouvez maintenant lancer votre API !")
