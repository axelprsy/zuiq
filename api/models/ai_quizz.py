import json
import os
from datetime import datetime
from ollama import Client
from flask import jsonify
from flask_restful import Resource, reqparse


class GenerateQuizz(Resource):
    def get(self):
        """
        Générer un quizz avec ia.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("theme", required=True, location="args")
        parser.add_argument("number_of_questions", required=True, location="args")
        parser.add_argument("public", required=True, location="args")
        args = parser.parse_args()

        client = Client(
        host="http://ollama.lunity.dev:11434",
        headers={'x-some-header': 'some-value'}
        )
        response = client.chat(model='mistral', messages=[
            {
            'role': 'user',
            'content': f"""
            Crée un quiz amusant et éducatif sur le thème {args['theme']} avec {args['number_of_questions']} questions.
            Chaque question doit comporter un énoncé clair et concis, avec 4 propositions et précise la seule bonne réponse.
            Les questions doivent être adaptées à des {args['public']}.
            Je veux que ta réponse soit exclusivement un objet JSON structuré sous cette forme (sans préfixes ou balises Markdown, oublie le ```json et toute indication de langage) :

            {{
                "quizz" : {{
                    "name": "[nom_du_quizz]",
                    "questions": [
                        {{
                            "question_id": 1,
                            "title": "[intitulé_de_la_question]",
                            "answers": ["[option_1]", "[option_2]", "[option_3]", "[option_4]"],
                            "correct_answer": donne le numéro de la bonne réponse (1, 2, 3 ou 4)
                        }},
                        // autres questions...
                    ]
                    "total_questions": [nombre total de questions]
                }}
            }}

            Veille a utiliser le plus de français possible surtout la question.
            Veille à remplir chaque champ correctement et génère les données en suivant le thème, le niveau de difficulté et le nombre de questions demandés.
            """
        }
        ])
        print(response.message.content)
        quizz=json.loads(response.message.content)
        quizz["quizz"]["created_at"]=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return jsonify({"status": 200, "quizz": quizz})