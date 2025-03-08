import pandas as pd
import json
import ast

def generate_exel_quizz(data_session):
    python_list = ast.literal_eval(data_session)
    data = {
        "Nom": ["Alice", "Bob", "Charlie"],
        "Âge": [30, 25, 35]
    }
    df = pd.DataFrame(data)

    df.to_excel("example.xlsx", index=False)