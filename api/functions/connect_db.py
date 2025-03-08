import sqlite3

def connect_db():
    """
    Connection à la base de données.
    """
    conn = sqlite3.connect('db/app.db', timeout=10, check_same_thread=False) 
    return conn


def disconnect_db(conn):
    """
    Déconnexion de la base de données.
    """
    conn.close()


if __name__ == "__main__":
    connect_db()
    disconnect_db(connect_db())