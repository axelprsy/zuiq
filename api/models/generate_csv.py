import os
import ast
import pandas as pd
from flask import jsonify, make_response, send_file
from flask_restful import Resource, reqparse

class GenerateCSV(Resource):
    def get(self):
        """
        Générer un fichier CSV avec le résultat de la session.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("session_data", required=True, location="args")
        args = parser.parse_args()
        session_data = args["session_data"]

        try:
            python_list = ast.literal_eval(session_data)
            data = [
                {key: value for key, value in item.items() if key != "user_id"}
                for item in python_list
            ]
        except (ValueError, SyntaxError) as e:
            return jsonify({"status": 400, "message": "Invalid input format. Please provide a valid Python-like list."})

        df = pd.DataFrame(data)

        # Chemin du fichier CSV
        csv_file = "result.csv"
        df.to_csv(csv_file, index=False)

        try:
            response = make_response(send_file(
                csv_file,
                as_attachment=True,
                download_name=csv_file,
                mimetype="text/csv"
            ))
            response.headers["Content-Disposition"] = f"attachment; filename={csv_file}"
            return response
        finally:
            if os.path.exists(csv_file):
                os.remove(csv_file)
