import datetime
import json
from functions.hash import hash_password
from functions.connect_db import connect_db, disconnect_db
from flask import jsonify
from flask_restful import Resource, reqparse


class Quizz(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=True, location="form")
        parser.add_argument("user_id", required=True, location="form")
        parser.add_argument("questions", required=True, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('''
        INSERT INTO quizz (name, user_id, questions, total_questions)
        VALUES (?, ?, ?, ?)
        ''', (args["name"], args["user_id"], args["questions"], 10)
        )
        conn.commit()
        cursor.close()
        disconnect_db(conn)

        return jsonify({"message": "Quizz created successfully.", "status": 201, "quizz_id_created": cursor.lastrowid})
    
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", required=False, location="args")
        parser.add_argument("quizz_id", required=False, location="args")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()
 
        for i in args:
            if args[i] != None:
                print(f"SELECT * FROM quizz WHERE {i} = ?", (args[i],))
                cursor.execute(f"SELECT * FROM quizz WHERE {i} = ?", (args[i],))
                quizz = cursor.fetchall()
                print(quizz)
        res = []
        for i in quizz:
            res.append({"quizz_id": i[0], "name": i[1], "created_at": i[2], "user_id": i[3], "questions": json.loads(i[4]), "total_questions": i[5]})
        cursor.close()
        disconnect_db(conn)

        print(res)
        if res != []:
            response = jsonify({
                "quizz": res, 
                "status": 200
                })
        else:
            response = jsonify({"message": "Quizz not exist.", "status": 404})

        return response
    
    def patch(self):
        parser = reqparse.RequestParser()
        parser.add_argument("quizz_id", required=True, location="form")
        parser.add_argument("questions", required=False, location="form")
        parser.add_argument("name", required=False, location="form")
        parser.add_argument("user_id", required=False, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()

        for i in args:
            if args[i] != None:
                cursor.execute(f"UPDATE quizz SET {i} = ? WHERE quizz_id = ?", (args[i], args["quizz_id"]))
                conn.commit()
                if cursor.rowcount !=0:
                    response = jsonify({"message": "Quizz updated successfully.", "quizz_id": args["quizz_id"] ,"status": 200})
                else:
                    response = jsonify({"message": "Quizz not exist.", "status": 404})

        cursor.close()
        disconnect_db(conn)

        return response
    
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument("quizz_id", required=True, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM quizz WHERE quizz_id = ?", (args["quizz_id"],))
        conn.commit()

        if cursor.rowcount != 0:
            response = jsonify({"message": "Quizz deleted successfully.", "status": 200})
        else:
            response = jsonify({"message": "Quizz not exist.", "status": 404})

        cursor.close()
        disconnect_db(conn)

        return response