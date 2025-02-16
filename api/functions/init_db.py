import sqlite3

conn = sqlite3.connect('db/app.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, -- Identifiant unique auto-incrémenté
    email TEXT NOT NULL UNIQUE,          -- Adresse e-mail unique
    username TEXT NOT NULL,              -- Nom d'utilisateur
    password TEXT NOT NULL,              -- Mot de passe hashé
    created_at TEXT DEFAULT CURRENT_TIMESTAMP -- Date et heure de création (automatique)
)
''')
print("Table 'users' créée avec succès.")

cursor.execute('''
CREATE TABLE quizz (
    quizz_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    questions JSON NOT NULL,
    total_questions INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
''')
print("Table 'quizz' créée avec succès.")
conn.close()

# def hash_password(password):
#     """Retourne le hash SHA-256 d'un mot de passe."""
#     return hashlib.sha256(password.encode()).hexdigest()

# # 5. Fonction pour ajouter un utilisateur
# def add_user(email, username, password):
#     """Ajoute un utilisateur dans la table 'users'."""
#     hashed_password = hash_password(password)  # Hash du mot de passe
#     try:
#         cursor.execute('''
#         INSERT INTO users (email, username, password) 
#         VALUES (?, ?, ?)
#         ''', (email, username, hashed_password))
#         conn.commit()
#         print(f"Utilisateur '{username}' ajouté avec succès.")
#     except sqlite3.IntegrityError as e:
#         print(f"Erreur : {e}")

# # 6. Tester l'ajout d'utilisateurs
# add_user("john.doe@example.com", "johndoe", "password123")
# add_user("jane.smith@example.com", "janesmith", "securepassword")

# # 7. Afficher tous les utilisateurs dans la table
# cursor.execute('SELECT * FROM users')
# rows = cursor.fetchall()
# print("\nVoici les utilisateurs enregistrés :")
# for row in rows:
#     print(row)

# # 8. Fermer la connexion à la base de données
# conn.close()
