import os
from flask import Flask
from routes.views import api_blueprint
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

def create_app():
    """
    Création de l'application Flask.
    """
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api_blueprint)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
