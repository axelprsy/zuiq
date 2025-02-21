import datetime
from functions.hash import hash_password
from functions.connect_db import connect_db, disconnect_db
from flask import jsonify
from flask_restful import Resource, reqparse


class User(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True, location="form")
        parser.add_argument("email", required=True, location="form")
        parser.add_argument("password", required=True, location="form")
        args = parser.parse_args()

        password = hash_password(args["password"])
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('''
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
        ''', (args["username"], args["email"], password))

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
                    print(cursor)
                    user = cursor.fetchone()

            res = {"user_id": user[0], "email": user[1], "username": user[2], "created_at": user[4], "password": user[3]}
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
        parser.add_argument("password", required=False, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()

        try: 
            for i in args:
                if i == "password" and args[i] != None:
                    args[i] = hash_password(args[i])
                
                if args[i] != None:
                    cursor.execute(f"UPDATE users SET {i} = ? WHERE user_id = ?", (args[i], args["user_id"]))
                    response = jsonify({"message": "User updated successfully.", "user": args["user_id"] ,"status": 200})
            if cursor.rowcount == 0:
                response = jsonify({"message": "User not exist.", "status": 404})

            conn.commit()
        except Exception as e:
            print(e)
            response = jsonify({"message": "The username or e-mail address you entered is already present in the db.", "status": 404})
        cursor.close()
        disconnect_db(conn)

        return response
    
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", required=True, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM users WHERE user_id = ?", (args["user_id"],))
        conn.commit()

        if cursor.rowcount != 0:
            response = jsonify({"message": "User deleted successfully.", "status": 200})
        else:
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
            res.append({"user_id": user[0], "email": user[1], "username": user[2], "created_at": user[4]})

        cursor.close()
        disconnect_db(conn)

        return jsonify({"users": res, "status": 200})