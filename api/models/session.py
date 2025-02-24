import datetime
import json
from functions.hash import hash_password
from functions.connect_db import connect_db, disconnect_db
from flask import jsonify
from flask_restful import Resource, reqparse


class Session(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("session_code", required=True, location="form")
        parser.add_argument("admin_user_id", required=True, location="form")
        parser.add_argument("users", required=True, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('''
        INSERT INTO session (session_code, admin_user_id, users)
        VALUES (?, ?, ?)
        ''', (args["session_code"], args["admin_user_id"], args["users"])
        )
        conn.commit()
        cursor.close()
        disconnect_db(conn)

        return jsonify({"message": "Session created successfully.", "status": 201, "sesion_id_created": cursor.lastrowid})
    
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("session_code", required=True, location="args")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM session WHERE session_code = ?", (args["session_code"],))
        session = cursor.fetchone()
        cursor.close()
        disconnect_db(conn)

        if session != None:
            response = jsonify({
                "session_id": session[0],
                "session_code": args["session_code"],
                "admin_user_id": session[2],
                "users": session[3],
                "status": 200
                })
        else:
            response = jsonify({"message": "Session not exist.", "status": 404})

        return response
    
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument("session_code", required=True, location="form")
        args = parser.parse_args()

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM session WHERE session_code = ?", (args["session_code"],))
        conn.commit()

        if cursor.rowcount != 0:
            response = jsonify({"message": "Session deleted successfully.", "status": 200})
        else:
            response = jsonify({"message": "Session not exist.", "status": 404})

        cursor.close()
        disconnect_db(conn)

        return response