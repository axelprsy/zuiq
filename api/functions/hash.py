import hashlib

def hash_password(password):
    """
    Permet de hasher un mot de passe pour augmenter la sécurité.
    """
    return hashlib.sha256(password.encode()).hexdigest()