# Documentation API - Zuiq
### Documentation mise à jour disponible ici : https://verdant-budget-6c4.notion.site/Documentation-API-Zuiq-19caef7c06d880068d5ee16283895db9?pvs=74

## Gestion des utilisateurs

L'API de gestion des utilisateurs vous permet de créer, consulter, mettre à jour et supprimer des utilisateurs. Elle utilise des requêtes HTTP standard (GET, POST, PATCH, DELETE) et travaille avec des données au format JSON.

## Base URL

L’url de base pour cette api est : 

```bash
https://127.0.0.1:5000/user
```

## Endpoints

1. **Récupérer la liste des utilisateurs**
    - Description : Renvoie une liste de tous les utilisateurs
    - Méthode HTTP : `GET`
    - Endpoint : `/users`
    - Paramètres : Aucun
    - Exemple de requête :
        
        ```bash
        curl --location 'http://127.0.0.1:5000/users'
        ```
        
    - Exemple de réponse :
        
        Code HTTP : `200 OK`
        
        ```json
        {
          "status": 200,
          "users": [
            {
              "created_at": "2025-02-16 19:23:16",
              "email": "test@email.com",
              "user_id": 3,
              "username": "test"
            },
            {
              "created_at": "2025-02-16 19:23:26",
              "email": "bonjour@example.com",
              "user_id": 4,
              "username": "bonjour"
            }
          ]
        }
        ```
        

1. **Récupérer les infos d’un utilisateur**
    - Description : Renvoie les infos d’un utilisateur grace a son id, username ou email.
    - Méthode HTTP : `GET`
    - Endpoint : `/user?username={username}` ou `/user?user_id={id}`  ou `/user?email={email}`
    - Paramètres :
        
        
        | **Nom** | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | user_id | id | non | L’id de l’utilisateur  |
        | username | str | non | Pseudo de l’utilisateur |
        | email | str | non | Adresse mail de l’utilisateur |
    - Exemple de requête :
        
        ```bash
        curl --location 'http://127.0.0.1:5000/user?username=charle'
        ```
        
    - Exemple de réponse :
        
        Code HTTP : `200 OK`
        
        ```json
        {
          "res": {
            "created_at": "2025-02-16 19:23:16",
            "email": "test@email.fr",
            "user_id": 3,
            "username": "charle"
          },
          "status": 200
        }
        ```
        

1. **Créer un nouvel utilisateur**
- Description : Renvoie une liste de tous les utilisateurs
- Méthode HTTP : `GET`
- Endpoint : `/user`
- Paramètres :
    
    
    | **Nom** | **Type** | **Requis** | **Description** |
    | --- | --- | --- | --- |
    | username | str | oui | Pseudo de l’utilisateur |
    | email | str | oui | Adresse mail de l’utilisateur |
    | password | str | oui | Mot de passe de l’utilisateur |
- Exemple de requête :
    
    ```bash
    curl --location 'http://127.0.0.1:5000/user' \
    --form 'username="bonjour"' \
    --form 'email="bonjour@mail.com"' \
    --form 'password="hello"'
    ```
    
- Exemple de réponse :
    
    ```json
    {
      "message": "User created successfully.",
      "status": 201,
      "user_id_created": 5
    }
    ```
    

Code HTTP : `201 OK`

1. **Supprimer un utilisateur**
- Description : Supprime un utilisateur dans la db
- Méthode HTTP : `DELETE`
- Endpoint : `/user`
- Paramètres :
    
    
    | **Nom** | **Type** | **Requis** | **Description** |
    | --- | --- | --- | --- |
    | user_id | int | oui | L’id de l’utilisateur a supprimer. |
- Exemple de requête :
    
    ```bash
    curl --location --request DELETE 'http://127.0.0.1:5000/user' \
    --form 'user_id="2"'
    ```
    
- Exemple de réponse :
    
    ```json
    {
        "message": "User deleted successfully.",
        "status": 200
    }
    ```
    

Code HTTP : `200 OK`

1. **Modifier les données d’un utilisateur.**
- Description : Modifier une ou plusieurs donnée d’un utilisateur.
- Méthode HTTP : `PATCH`
- Endpoint : `/user`
- Paramètres :
    
    
    | **Nom** | **Type** | **Requis** | **Description** |
    | --- | --- | --- | --- |
    | user_id | int | oui | L’id de l’utilisateur. |
    | email | str | non | L’email modifié |
    | username | str | non | Username modifié |
- Exemple de requête :
    
    ```bash
    curl --location --request PATCH 'http://127.0.0.1:5000/user' \
    --form 'user_id="4"' \
    --form 'email="test@gmail.com"'
    ```
    
- Exemple de réponse :
    
    ```json
    {
        "message": "User updated successfully.",
        "status": 200,
        "user": 4
    }
    ```
    

Code HTTP : `200 OK`

## Gestion des quizz

L'API de gestion des quizz vous permet de créer, consulter, mettre à jour et supprimer des quizz. Elle utilise des requêtes HTTP standard (GET, POST, PATCH, DELETE) et travaille avec des données au format JSON.

### Base URL

```bash
http://127.0.0.1:5000/quizz
```

### Endpoint

1. **Récupérer la liste des quizz appartenant a un utilisateur**
    - Description : Renvoie une liste des quizz crée par un utilisateur
    - Méthode HTTP : `GET`
    - Endpoint : `/quizz`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | user_id | str | oui | L’id de utilisateur |
    - Exemple de requête :
        
        ```bash
        curl --location '127.0.0.1:5000/quizz?user_id=5'
        ```
        
    - Exemple de réponse :
        
        Code HTTP : `200 OK`
        
        ```json
        {
          "res": [
            {
              "quizz_2": {
                "created_at": "2025-02-17 21:35:19",
                "name": "quizz_test2",
                "questions": {"questions":[{"question_id":1,"title":"Quelle est la couleur du tableau de M. Marette ?","answers":["Vert","Bleu","Blanc","Rouge"],"correct_answer":"Blanc"},{"question_id":2,"title":"Quelle est la methode pour supprimer les espaces d'une chaine de caractères ?","answers":["strip()","replace()","split()","join()"],"correct_answer":"strip()"}]},
                "quizz_id": 2,
                "total_questions": 2,
                "user_id": 5
              }
            },
            {
              "quizz_3": {
                "created_at": "2025-02-17 21:58:17",
                "name": "quizz_test3",
                "questions": {"questions":[{"question_id":1,"title":"Quelle est la couleur du tableau de M. Marette ?","answers":["Vert","Bleu","Blanc","Rouge"],"correct_answer":"Blanc"},{"question_id":2,"title":"Quelle est la methode pour supprimer les espaces d'une chaine de caractères ?","answers":["strip()","replace()","split()","join()"],"correct_answer":"strip()"}]},
                "quizz_id": 3,
                "total_questions": 2,
                "user_id": 5
              }
            }
          ],
          "status": 200
        }
        
        ```
        
        Voici comment les questions s’afficheront dans la requête : 
        
        ```json
        "questions": [
                    {
                        "question_id": 1,
                        "title": "Quelle est la couleur du tableau de Mme. Marette ?", 
                        "answers": ["A. Vert", "B. Bleu", "C. Blanc", "D. Rouge"], 
                        "correct_answer": "C"
                    },
                    {
                        "question_id": 2,
                        "title": "Quelle est la methode pour supprimer les espaces d'une chaine de caractères ?", 
                        "answers": ["A. strip()", "B. replace()", "C. split()", "D. join()"],
                        "correct_answer": "A"
                    }
                ]
        ```
        

1. **Crée un nouveau quizz**
    - Description : Ajoute le quizz a la db.
    - Méthode HTTP : `POST`
    - Endpoint : `/quizz`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | name | str | oui | Le nom du quizz |
        | user_id | int | oui | L’id de l’utilisateur |
        | questions | json | oui | Les différentes questions du quizz |
        
        Le paramètre question devra être sous cette forme :
        
        ```json
        [
          {
            "question_id": 1,
            "title": "Quelle est la couleur du tableau de Mme. Marette ?",
            "answers": ["A. Vert", "B. Bleu", "C. Blanc", "D. Rouge"],
            "correct_answer": "C"
          },
          {
            "question_id": 2,
            "title": "Quelle est la methode pour supprimer les espaces d'une chaine de caractères ?",
            "answers": ["A. strip()", "B. replace()", "C. split()", "D. join()"],
            "correct_answer": "A"
          }
        ]
        
        ```
        
    - Exemple de requête :
        
        ```bash
        curl --location '127.0.0.1:5000/quizz' \
        --form 'name="quizz_test3"' \
        --form 'user_id="5"' \
        --form 'questions={
        	"questions": {
                  "answers": [
                    "A. iPhone 4",
                    "B. iPhone 3G",
                    "C. iPhone X",
                    "D. iPhone SE"
                  ],
                  "correct_answer": "C",
                  "question_id": 1,
                  "title": "Quel est le nom du premier smartphone produit par Apple ?"
                } 
        }'
        ```
        
    - Exemple de réponse :
        
        Code HTTP : `201 OK`
        
        ```json
        {
            "message": "Quizz created successfully.",
            "quizz_id_created": 5,
            "status": 201
        }
        ```
        

1. **Supprimer un quizz**
    - Description : Supprimer un quizz de la db
    - Méthode HTTP : `DELETE`
    - Endpoint : `/quizz`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | quizz_id | int | oui | L’id du quizz à supprimer. |
    - Exemple de requête :
        
        ```bash
        	curl --location --request DELETE '127.0.0.1:5000/quizz' \
        --form 'quizz_id=10'
        ```
        
    - Exemple de réponse :
        
        Code HTTP : `200 OK`
        
        ```json
        {
            "message": "Quizz deleted successfully.",
            "status": 200
        }
        ```
        

1. **Modifier un quizz**
    - Description : Permet de modifier n'importe quel élément d'un quizz/
    - Méthode HTTP : `PATCH`
    - Endpoint : `/quizz`
    - Paramètres : vous mettez uniquement le(s) paramètre(s) que souhaitez modifié.
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | quizz_id | int | oui | L’id du quizz à modifié. |
        | name | str | non | Nom du quizz |
        | questions | json | non | Questions du quizz |
    - Exemple de requête :
        
        ```bash
        curl --location --request PATCH '127.0.0.1:5000/quizz' \
        --form 'quizz_id="800"' \
        --form 'name="changement de nom"' \
        --form 'questions={"questions":[...]}'
        ```
        
        Le paramètre question doit être sous cette forme : ["questions": [
                    {
                        "question_id": 1,
                        "title": "Quelle est la couleur du tableau de Mme. Marette ?", 
                        "answers": ["A. Vert", "B. Bleu", "C. Blanc", "D. Rouge"], 
                        "correct_answer": "C"
                    },
                    {
                        "question_id": 2,
                        "title": "Quelle est la methode pour supprimer les espaces d'une chaine de caractères ?", 
                        "answers": ["A. strip()", "B. replace()", "C. split()", "D. join()"],
                        "correct_answer": "A"
                    }
                ]](https://www.notion.so/questions-question_id-1-title-Quelle-est-l-5a7fa7d3ffcd4803bed20e23a887b400?pvs=21) 
        
    - Exemple de réponse :
        
        ```json
        {
            "message": "Quizz updated successfully.",
            "quizz_id": "6",
            "status": 200
        }
        ```
        
        Code HTTP : `200 OK`
        

1. **Générer un quizz avec [Gamma](https://ollama.com/library/gemma2)** 
    - Description : Permet généré un quizz avec de l’ia
    - Méthode HTTP : `GET`
    - Endpoint : `/generate_quizz`
    - Paramètres :
        
        
        | **Nom** | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | theme | str | Oui | Thème du quizz. |
        | public | str | Oui | Public cible pour lequel le quizz doit être créé. |
        | number_of_questions | int |  | Nombre de questions a généré dans le quizz. |
    - Exemple de requête :
        
        ```bash
        curl --location '127.0.0.1:5000/
        generate_quizz?
        theme=L histoire d apple
        &public=jeunes étudiants
        &number_of_questions=4'
        ```
        
    
    - Exemple de réponse
        
        ```json
        {
            "quizz": {
              "created_at": "2025-02-19 16:30:11",
              "name": "Quiz sur l'univers d'Apple",
              "questions": [
                {
                  "answers": [
                    "A. iPhone 4",
                    "B. iPhone 3G",
                    "C. iPhone X",
                    "D. iPhone SE"
                  ],
                  "correct_answer": "C",
                  "question_id": 1,
                  "title": "Quel est le nom du premier smartphone produit par Apple ?"
                },
                {
                  "answers": [
                    "A. Etats-Unis",
                    "B. Allemagne",
                    "C. Japon",
                    "D. Chine"
                  ],
                  "correct_answer": "A",
                  "question_id": 2,
                  "title": "Dans quel pays est basé le siège social d'Apple ?"
                },
                {
                  "answers": [
                    "A. Apple Wallet",
                    "B. Google Pay",
                    "C. Samsung Pay",
                    "D. Microsoft Pay"
                  ],
                  "correct_answer": "A",
                  "question_id": 3,
                  "title": "Quelle application permet de payer à l'iPhone ?"
                },
                {
                  "answers": [
                    "A. Windows",
                    "B. Android",
                    "C. Linux",
                    "D. macOS"
                  ],
                  "correct_answer": "D",
                  "question_id": 4,
                  "title": "Quel est le nom du système d'exploitation utilisé par les ordinateurs Mac ?"
                }
              ],
              "total_questions": 4
            }
          },
          "status": 200
        }
        
        ```
        
        Code HTTP : `200 OK`
        

## Gestion des sessions

L'API de gestion des sessions vous permet de créer, consulter, mettre à jour et supprimer des sessions. Elle utilise des requêtes HTTP standard (GET, POST, PATCH, DELETE) et travaille avec des données au format JSON.

### Base URL

```bash
	http://127.0.0.1:5000/session
```

### Endpoint

1. **Récupérer les infos d’une session**
    - Description : Renvoie les infos de la session souhaitée
    - Méthode HTTP : `GET`
    - Endpoint : `/session`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | session_code | int | oui | Le code à 4 chiffres de la session |
    - Exemple de requête :
        
        ```bash
        curl --location '127.0.0.1:5000/session?session_code=7865'
        ```
        
    - Exemple de réponse :
        
        ```json
        {
            "admin_user_id": 4,
            "session_code": "7865",
            "session_id": 16,
            "status": 200,
            "users": "[{'user_id': '-q1CD46DWPO7MMkOAAAP', 'username': 'axel', 'points': 2}, {'user_id': 'RSmQ3IRZHcpioAwtAAAL', 'username': 'abdel', 'points': 2}]"
        }
        ```
        
2. **Crée une nouvelle session**
    - Description : Ajouter une session a la db.
    - Méthode HTTP : `POST`
    - Endpoint : `/session`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | session_code | int | oui | Le code à 4 chiffres de la session |
        | user_id | int | oui | L’id de l’utilisateur |
        | admin_user_id | int | oui | L’id de l’utilisateur créant la session |
        | users | json | oui | La liste des users participant a la session (par défaut : []) |
    - Exemple de requête :
        
        ```bash
        curl --location '127.0.0.1:5000/session' \
        --form 'session_code="2010"' \
        --form 'admin_user_id="6"' \
        --form 'users="[]"'
        ```
        
    - Exemple de réponse :
        
        ```json
        {
            "message": "Session created successfully.",
            "sesion_id_created": 17,
            "status": 201
        }
        ```
        

1. **Modifier les users présent dans la session.**
    - Description : Modifie les users présent dans la session (par exemple : ajout de point)
    - Méthode HTTP : `PATCH`
    - Endpoint : `/session`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | session_code | int | oui | Le code à 4 chiffres de la session que vous souhaitez modifier |
        | users | json | oui | La liste des users participant a la session. |
    - Exemple de requête :
        
        ```bash
        curl --location --request PATCH '127.0.0.1:5000/session' \
        --form 'session_code="4439"' \
        --form 'users="[{"user_id": "-q1CD46DWPO7MMkOAAAP", "username": "axel", "points": 2}, {"user_id": "RSmQ3IRZHcpioAwtAAAL", "username": "abdel", "points": 2}]"'
        ```
        
    - Exemple de réponse :
        
        ```json
        {
            "message": "Session updated successfully.",
            "session_code": "4439",
            "status": 200
        }
        ```
        
2. **Supprimer une session**
    - Supprimer une session de la db
    - Méthode HTTP : `DELETE`
    - Endpoint : `/session`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | session_code | int | oui | Le code à 4 chiffres de la session que vous souhaitez modifier |
    - Exemple de requête :
        
        ```bash
        curl --location --request DELETE '127.0.0.1:5000/session' \
        --form 'session_code="2010"'
        ```
        
    - Exemple de réponse :
        
        ```json
        {
          "message": "Session deleted successfully.",
          "status": 200
        }
        ```
        

## Génération de fichier excel avec les résultats

L'API de génération de fichier excel vous permet de crée un fichier excel avec les résultats d’une session. Elle utilise des requêtes HTTP standard (GET) et travaille avec des données au format JSON.

1. Récupérer le fichier excel avec resultat
    - Méthode HTTP : `GET`
    - Endpoint : `/generate_csv`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | session_data | liste | oui | Les informations des user présent dans la session |
    - Exemple de requête :
        
        ```bash
        curl --location --globoff 'http://127.0.0.1:5000/generate_csv?session_data=[{'user_id': '8A2QplX5RvCYFfDfAABP', 'username': 'axel', 'points': 0}]'
        ```
        
    - Exemple de réponse :
        
        ```json
        {
        	*fichier en .csv*
        }
        ```
        
    - Exemple d’utilisation :
        
        ```json
        window.location.href = "http://127.0.0.1:5000/generate_excel?session_data="+JSON.stringify(users))
        ```
        
        *Puis ça téléchargera le fichier sur l’ordinateur / téléphone de l’utilisateur.*
        

## Génération de QR Code

L'API de génération de QR Code vous permet de crée une image contenant le qrcode avec le lien pour rejoindre la session. Elle utilise des requêtes HTTP standard (GET) et travaille avec des données au format JSON.

1. Récupérer le qr code avec le lien de session
    - Méthode HTTP : `GET`
    - Endpoint : `/generate_qrcode`
    - Paramètres :
        
        
        | **Nom**  | **Type** | **Requis** | **Description** |
        | --- | --- | --- | --- |
        | session_url | str | oui | l’url pour rejoindre la session |
    - Exemple de requête :
        
        ```json
        curl --location 'http://127.0.0.1:5000/generate_qrcode?session_url=http://127.0.0.1:3000/join?session_code=2543'
        ```
        
    - Exemple de réponse :
        
        ```json
        {
            "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAEiAQAAAAB1xeIbAAABlUlEQVR4nO2aTWrEMAyFJSfQpQ1zgDmKc4MeqfRIvUF8lN4gWQYSVCzbaQuF6SbjP73FjPF8kEdGViQRJHgsp/4BAQiVJFSSUElCJQmVm8KoMa6mNe1MWX11QVnyWgBo1jvQDANvUB3uK6fWM8bXl3DH+Rhk99UZdeCzr/iHuqTsMlA8AUX5apAa47f2iWbl1Rbinipwr1qgHBc1BgCnkO+PUObk9tVB3NP3hjOA8Rjk9KW6oRDN4av6MZSXAGvMRVLfP6G+/xyB3u8bgqU9bPFfcd0VH6gHakyLYQ/R7l4XIGcGAHffkMp2r6qmIPSvtMTmluM+bM3nr3Op7lVDcW945fP9bY97mXypjijtb7PmAY5/6nKRrzeZpV2fcyDq1wTtR/Yp1b1qao4JvssKx8Bxq5XXV1dzTJzOknNOE83y3Vf+rE2yH/6Bq8l3t2fDW6p71dS9J2e44rntBKtBsHPJ7lUTlI4FPb5x0g+p3lebmX11EPcuTCwH/3EgWeITANLXXkmhvBsVJVSSUElCJQmVVDf1BUdpo2xOvc14AAAAAElFTkSuQmCC"
        }
        ```
        
    - Exemple d’utilisation
        
        ```json
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAEiAQAAAAB1xeIbAAABlUlEQVR4nO2aTWrEMAyFJSfQpQ1zgDmKc4MeqfRIvUF8lN4gWQYSVCzbaQuF6SbjP73FjPF8kEdGViQRJHgsp/4BAQiVJFSSUElCJQmVm8KoMa6mNe1MWX11QVnyWgBo1jvQDANvUB3uK6fWM8bXl3DH+Rhk99UZdeCzr/iHuqTsMlA8AUX5apAa47f2iWbl1Rbinipwr1qgHBc1BgCnkO+PUObk9tVB3NP3hjOA8Rjk9KW6oRDN4av6MZSXAGvMRVLfP6G+/xyB3u8bgqU9bPFfcd0VH6gHakyLYQ/R7l4XIGcGAHffkMp2r6qmIPSvtMTmluM+bM3nr3Op7lVDcW945fP9bY97mXypjijtb7PmAY5/6nKRrzeZpV2fcyDq1wTtR/Yp1b1qao4JvssKx8Bxq5XXV1dzTJzOknNOE83y3Vf+rE2yH/6Bq8l3t2fDW6p71dS9J2e44rntBKtBsHPJ7lUTlI4FPb5x0g+p3lebmX11EPcuTCwH/3EgWeITANLXXkmhvBsVJVSSUElCJQmVVDf1BUdpo2xOvc14AAAAAElFTkSuQmCC">
        ```