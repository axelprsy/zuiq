from flask import Blueprint
import flask_restful as restful
from flask_cors import CORS

from models.users import User, Users

api_blueprint = Blueprint("api,", __name__)
CORS(api_blueprint)
api = restful.Api()

api.add_resource(User, "/user")
api.add_resource(Users, "/users")

api.init_app(api_blueprint)