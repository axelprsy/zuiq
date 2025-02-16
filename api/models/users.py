# Third-party Libraries
import datetime
from functions.connect_db import connect_db, disconnect_db  # Importez les fonctions spécifiques
from flask import jsonify
from flask_restful import Resource, reqparse


class User(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True, location="form")
        parser.add_argument("email", required=True, location="form")
        parser.add_argument("password", required=True, location="form")
        args = parser.parse_args()

        conn = connect_db()  # Utilisez la fonction importée
        cursor = conn.cursor()
        cursor.execute('''
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
        ''', (args["username"], args["email"], args["password"]))

        conn.commit()
        cursor.close()
        disconnect_db(conn)

        return jsonify({"message": "User created successfully.", "status": 201, "user_id_created": cursor.lastrowid})
    
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", required=False, location="args")
        parser.add_argument("username", required=False, location="args")
        parser.add_argument("email", required=False, location="args")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()

        try: 
            for i in args:
                if args[i] != None:
                    print(f"SELECT * FROM users WHERE {i} = ?", (args[i],))
                    cursor.execute(f"SELECT * FROM users WHERE {i} = ?", (args[i],))
                    user = cursor.fetchone()

            res = {"user_id": user[0], "username": user[1], "email": user[2], "created_at": user[4]}
            cursor.close()
            disconnect_db(conn)

            response = jsonify({
                "res": res, 
                "status": 200
                })
        
        except TypeError:
            response = jsonify({"message": "User not exist.", "status": 404})

        return response
    
    def patch(self):
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", required=True, location="form")
        parser.add_argument("username", required=False, location="form")
        parser.add_argument("email", required=False, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()

        try: 
            for i in args:
                if args[i] != None:
                    cursor.execute(f"UPDATE users SET {i} = ? WHERE user_id = ?", (args[i], args["user_id"]))
                    conn.commit()
                    response = jsonify({"message": "User updated successfully.", "user": cursor.lastrowid ,"status": 200})

        except TypeError:
            response = jsonify({"message": "User not exist.", "status": 404})

        cursor.close()
        disconnect_db(conn)

        return response
    
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", required=True, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()

        try:
            cursor.execute("DELETE FROM users WHERE user_id = ?", (args["user_id"],))
            conn.commit()
            response = jsonify({"message": "User deleted successfully.", "status": 200})

        except TypeError:
            response = jsonify({"message": "User not exist.", "status": 404})

        cursor.close()
        disconnect_db(conn)

        return response
    
class Users(Resource):
    def get(self):
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()

        res = []
        for user in users:
            res.append({"user_id": user[0], "username": user[1], "email": user[2], "created_at": user[4]})

        cursor.close()
        disconnect_db(conn)

        return jsonify({"users": res, "status": 200})