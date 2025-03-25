from flask import Blueprint
import flask_restful as restful
from flask_cors import CORS

from models.users import User, Users
from models.quizz import Quizz
from models.session import Session
from models.generate_csv import GenerateCSV
from models.generate_qrcode import GenerateQrCode

api_blueprint = Blueprint("api,", __name__)
CORS(api_blueprint)
api = restful.Api()

api.add_resource(User, "/user")
api.add_resource(Users, "/users")
api.add_resource(Quizz, "/quizz")
api.add_resource(Session, "/session")
api.add_resource(GenerateCSV, "/generate_excel")
api.add_resource(GenerateQrCode, "/generate_qrcode")

try:
    from models.ai_quizz import GenerateQuizz
    api.add_resource(GenerateQuizz, "/generate_quizz")
except ImportError:
    pass

api.init_app(api_blueprint)