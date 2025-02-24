from flask import Flask
import os
from routes.views import api_blueprint
from dotenv import load_dotenv
from pathlib import Path
from flask_cors import CORS

dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api_blueprint)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)
