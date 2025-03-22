import json
import os
import pandas as pd
import ast
from flask import jsonify, send_file, make_response
from flask_restful import Resource, reqparse


class GenerateExcel(Resource):
    def get(self):
        """
        Générer un fichier excel avec le resultat de la session.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("session_data", required=True, location="args")
        args = parser.parse_args()
        session_data = args["session_data"]
        try:
            python_list = ast.literal_eval(session_data)
            data = [{key: value for key, value in item.items() if key != "user_id"} for item in python_list]
        except (ValueError, SyntaxError) as e:
            return jsonify({"status": 400, "message": "Invalid input format. Please provide a valid Python-like list."})

        df = pd.DataFrame(data)

        excel_file = "result.xlsx"
        df.to_excel(excel_file, index=False)

        try:
            response = make_response(send_file(
                excel_file,
                as_attachment=True,
                download_name=excel_file,
                mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ))
            response.headers["Content-Disposition"] = f"attachment; filename={excel_file}"
            return response
        finally:
            if os.path.exists(excel_file):
                os.remove(excel_file)