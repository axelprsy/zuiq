from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room, emit
import random
import requests
import ast
import json
import os

app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins="*") 

url_api = os.getenv('API_URL', 'http://127.0.0.1:5000')


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
def create_session(data):
    code = generate_code()
    room_name = f"quiz_{code}"
    user_admin_id = data.get('user_id')
    active_sessions[code] = room_name  # associe le code à la room

    join_room(room_name)  # l'admin rejoint la room qu'il vient de créer
    print(f"L'admin a créé une session : Room - {room_name}, Code - {code}")


    data = {
        "session_code": code,
        "admin_user_id": user_admin_id,
        "users": '[]'
    }
    requests.post(url_api+"/session", data=data)
    # renvoie le code de la session à l'Admin
    emit('sessionCreated', {'code': code}, to=request.sid)

# Joueur : rejoindre une session via un code
@socketio.on('joinSession')
def join_session(data):
    code = data.get('code')
    username = data.get('username')
    user_id = request.sid

    room_name = active_sessions.get(code) 

    if room_name:
        join_room(room_name)
        print(f"L'utilisateur {username} a rejoint la room : {room_name}")
        emit('joinedSession', {'userId': user_id, 'room': room_name, 'username': username}, to=request.sid)

        # informer admin
        emit('userJoined', {'userId': request.sid, 'username':username}, to=room_name)
        url = url_api+"/session"
        response = requests.get(url+ f"?session_code={code}")
        users = ast.literal_eval(response.json()["users"])
        users.append({"user_id": user_id, "username": username, "points":0})

        
        data = {
            "session_code":code,
            "users":str(users)
        }
        requests.patch(url, data=data)

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
    user_id = data.get("user_id")
    room_name = active_sessions.get(code)

    url_quizz = url_api + "/quizz"

    response_quizz = requests.get(url_quizz+f"?quizz_id={quizz_id}")
    res_quizz=response_quizz.json()
    for i in res_quizz["quizz"][0]["questions"]:
        if i["question_id"] == question_id:
            if int(answer) == int(i["correct_answer"]):
                url_session = url_api+"/session"
                response_session = requests.get(url_session+f"?session_code="+code)
                res_session = response_session.json()
                users_list = ast.literal_eval(res_session["users"])
                for u in users_list:
                    if u["user_id"] == user_id:
                        u["points"] += 1
                        requests.patch(url_session, data={"session_code":code ,"users":str(users_list)})
    emit("userAnswered", {"user_id": user_id}, to=room_name)

@socketio.on("answerResult")
def answer_result(data):
    code = data.get('code')
    correct_answer = data.get('correct_answer')
    room_name = active_sessions.get(code)
    emit("questionResult", {"correct_answer": correct_answer}, to=room_name)

@socketio.on("endQuizz")
def end_quizz(data):
    code = data.get('code')
    quizz_id = data.get('quizz_id')
    room_name = active_sessions.get(code)
    emit("quizzEnded", {"quizz_id": quizz_id, "code":code}, to=room_name)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5050, debug=True)
