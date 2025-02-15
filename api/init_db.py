from app import create_app, db
from app.models.quiz_model import Quiz
from app.models.user_model import User


app = create_app()

with app.app_context():
    db.create_all()