from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room, emit
import random

app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins="*") 

# Stocker les sessions actives : {code: room_name}
active_sessions = {}

def generate_code():
    return str(random.randint(1000, 9999))

# Quand un utilisateur se connecte
@socketio.on('connect')
def handle_connect():
    print(f"Un utilisateur est connecté : {request.sid}")

# Quand un utilisateur se déconnecte
@socketio.on('disconnect')
def handle_disconnect():
    print(f"Un utilisateur est déconnecté : {request.sid}")

# Admin : création d'une session
@socketio.on('createSession')
def create_session():
    code = generate_code() 
    room_name = f"quiz_{code}"
    active_sessions[code] = room_name  # associe le code à la room

    join_room(room_name)  # l'admin rejoint la room qu'il vient de créer
    print(f"L'admin a créé une session : Room - {room_name}, Code - {code}")

    # renvoie le code de la session à l'Admin
    emit('sessionCreated', {'code': code}, to=request.sid)

# Joueur : rejoindre une session via un code
@socketio.on('joinSession')
def join_session(data):
    code = data.get('code')
    username = data.get('username') 

    room_name = active_sessions.get(code) 

    if room_name:
        join_room(room_name)
        print(f"L'utilisateur {username} a rejoint la room : {room_name}")
        emit('joinedSession', {'room': room_name, 'username': username}, to=request.sid)

        # informer admin
        emit('userJoined', {'userId': request.sid, 'username':username}, to=room_name)
    else:
        emit('error', {'message': 'Code invalide ou session inexistante.'}, to=request.sid)

# Admin : envoi d'une question
@socketio.on('sendQuestion')
def send_question(data):
    code = data.get('code')
    question = data.get('question')
    answers = data.get('answers') 
    quizz_id = data.get('quizz_id')
    question_id = data.get('question_id')
    room_name = active_sessions.get(code)

    if room_name:
        print(f"Question envoyée dans la room {room_name}: {question}")
        emit('newQuestion', {'question': question, 'answers':answers, "quizz_id": quizz_id, "question_id": question_id}, to=room_name)

# Joueur : soumission d'une réponse
@socketio.on('answer')
def submit_answer(data):
    code = data.get('code')
    answer = data.get('answer') 
    quizz_id = data.get('quizz_id')
    question_id = data.get('question_id')
    room_name = active_sessions.get(code)

    if room_name:
        print(f"Réponse de {request.sid} dans la room {room_name}: {answer}")
        emit('userAnswer', {'userId': request.sid, 'answer': answer}, to=room_name)

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=5050, debug=True)
