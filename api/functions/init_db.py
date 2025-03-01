import sqlite3

conn = sqlite3.connect('db/app.db')
cursor = conn.cursor()

# initialise la table users de la db
cursor.execute('''
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, -- Identifiant unique auto-incrémenté
    email TEXT NOT NULL UNIQUE,          -- Adresse e-mail unique
    username TEXT NOT NULL UNIQUE,              -- Nom d'utilisateur
    password TEXT NOT NULL,              -- Mot de passe hashé
    created_at TEXT DEFAULT CURRENT_TIMESTAMP -- Date et heure de création (automatique)
)
''')
print("✅ Table 'users' créée avec succès.")

# initialise la table quizz de la db
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
print("✅ Table 'quizz' créée avec succès.")

# initialise la table session de la db
cursor.execute('''
CREATE TABLE session (
    session_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_code TEXT NOT NULL UNIQUE,
    admin_user_id INTEGER NOT NULL,
    users JSON NOT NULL
);             
''')
print("✅ Table 'session' créée avec succès.")

conn.close()
