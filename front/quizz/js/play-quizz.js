async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}

// Récupération des paramètres dans l'URL
const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session_id");
const userName = params.get("username");
var user_id = ""

document.getElementById("userName").textContent = userName;

var socket = null;
var url = "";
document.addEventListener("DOMContentLoaded", async () => {
    await get_ip().then((ip) => {
        url = ip;
        socket = io(`http://${url}:5050`, {
            transports: ["websocket"],
            withCredentials: true,
        });
    })

    if (sessionId && userName) {
        socket.emit("joinSession", { code: sessionId, username: userName });
    }
    // Confirmation de connexion
    socket.on("joinedSession", ({ room, userId }) => {
        document.getElementById("connected").textContent = `Vous êtes connecté à la session : ${sessionId}`;
        user_id = userId
    });

    // Joueur : Recevoir une nouvelle question
    socket.on("newQuestion", ({ question, answers, quizz_id, question_id }) => {
        const questionsDiv = document.getElementById("questionsDiv");
        questionsDiv.innerHTML = ""; // Vide les anciennes questions

        // Création de la question
        const questionElement = document.createElement("p");
        questionElement.textContent = `Question : ${question}`;
        questionsDiv.appendChild(questionElement);

        // Création des boutons de réponse
        answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.id = "buttonQuizz";
            button.classList.add("buttonQuizz");
            button.textContent = answer;
            button.onclick = () => sendResponse(index + 1, quizz_id, question_id);
            questionsDiv.appendChild(button);
        });
    });

    socket.on("quizzEnded", async ({quizz_id, code}) => {
        const questionsDiv = document.getElementById("questionsDiv");
        questionsDiv.innerHTML = ""
        var p_finsh = document.createElement("p")
        p_finsh.textContent = "Fin du quizz"
        questionsDiv.append(p_finsh)

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        
        fetch(`http://${url}:5000/session?session_code=`+code, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                users = JSON.parse(result["users"].replace(/'/g, `"`))
                for (i = 0; i < users.length; i++) {
                    if (users[i]["user_id"] == user_id) {
                        var p_score = document.createElement("p")
                        p_score.textContent = "Votre score : " + users[i]["points"]
                        questionsDiv.append(p_score)

                        var button_return_home = document.createElement("button")
                        button_return_home.textContent = "Retourner a l'accueil"
                        button_return_home.onclick = () => {window.location.href = "/"}
                        questionsDiv.append(button_return_home)
                    }
                }    
            })
    } )

    // Envoi de la réponse au serveur
    function sendResponse(answer, quizz_id, question_id) {
        if (sessionId && answer && userName) {
            // Changer la couleur des boutons et le curseur
            const allButtons = document.querySelectorAll(".buttonQuizz");
            allButtons.forEach((allButtons) => {
                allButtons.style.backgroundColor = "darkgrey";
                allButtons.style.cursor = "not-allowed";
                allButtons.style.transition = "none";
                allButtons.style.transform = "none";
                allButtons.style.boxShadow = "none";
            });
            // ajouter une phrase d'attente
            const sentence_wait = document.createElement("p");
            sentence_wait.textContent = "En attente de la prochaine question...";
            const questionsDiv = document.getElementById("questionsDiv");
            questionsDiv.appendChild(sentence_wait);

            socket.emit("answer", {
                code: sessionId,
                answer,
                username: userName,
                user_id:user_id,
                quizz_id,
                question_id,
            });
        }
    }
});
