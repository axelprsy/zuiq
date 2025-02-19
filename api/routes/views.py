from flask import Blueprint
import flask_restful as restful
from flask_cors import CORS
from models.ai_quizz import GenerateQuizz

from models.users import User, Users
from models.quizz import Quizz

api_blueprint = Blueprint("api,", __name__)
CORS(api_blueprint)
api = restful.Api()

api.add_resource(User, "/user")
api.add_resource(Users, "/users")
api.add_resource(Quizz, "/quizz")
api.add_resource(GenerateQuizz, "/generate_quizz")

api.init_app(api_blueprint)