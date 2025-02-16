import sqlite3

def connect_db():
    """Connect to MySQL database"""
    conn = sqlite3.connect('db/app.db') 

    return conn


def disconnect_db(conn):
    conn.close()


if __name__ == "__main__":
    connect_db()
    disconnect_db(connect_db())