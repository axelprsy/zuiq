async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}

// Récupération des paramètres dans l'URL
const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session_id");
const userName = params.get("username");
var user_id = "";

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
    });

    if (sessionId && userName) {
        socket.emit("joinSession", { code: sessionId, username: userName });
    }

    // Confirmation de connexion
    socket.on("joinedSession", ({ room, userId }) => {
        document.getElementById("connected").textContent = `Vous êtes connecté à la session : ${sessionId}`;
        user_id = userId;
    });

    // Joueur : Recevoir une nouvelle question
    socket.on("newQuestion", ({ question, answers, quizz_id, question_id }) => {
        const questionsDiv = document.getElementById("questionsDiv");
        questionsDiv.innerHTML = ""; // Vide les anciennes questions

        // Création de la question
        const questionElement = document.createElement("p");
        questionElement.textContent = `Question : ${question}`;
        questionElement.classList.add("text-xl", "font-semibold", "text-center", "mb-4", "px-4");
        questionsDiv.appendChild(questionElement);

        // Conteneur des réponses (grille 2x2, bien responsive)
        const answersContainer = document.createElement("div");
        answersContainer.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "w-full", "max-w-2xl", "mx-auto", "px-4");
        questionsDiv.appendChild(answersContainer);

        // Couleurs façon Kahoot
        const kahootColors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500"];

        // Création des boutons de réponse
        answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.classList.add(
                "buttonQuizz",
                kahootColors[index % 4], // Couleurs Kahoot
                "text-white",
                "py-4",
                "px-6",
                "rounded-lg",
                "text-lg",
                "font-bold",
                "hover:opacity-80",
                "transition-all",
                "duration-200",
                "break-words",
                "w-full",
                "h-full",
                "min-h-[80px]",
                "flex",
                "items-center",
                "justify-center",
                "text-center"
            );
            button.textContent = answer;
            button.onclick = () => sendResponse(index + 1, quizz_id, question_id);
            answersContainer.appendChild(button);
        });
    });

    // Fin du quizz
    socket.on("quizzEnded", async ({ quizz_id, code }) => {
        const questionsDiv = document.getElementById("questionsDiv");
        questionsDiv.innerHTML = "";

        const p_finish = document.createElement("p");
        p_finish.textContent = "Fin du quizz";
        p_finish.classList.add("text-xl", "font-bold", "text-center", "mb-4");
        questionsDiv.append(p_finish);

        fetch(`http://${url}:5000/session?session_code=${code}`)
            .then((response) => response.json())
            .then((result) => {
                users = JSON.parse(result["users"].replace(/'/g, `"`));
                users.forEach(user => {
                    if (user["user_id"] == user_id) {
                        const p_score = document.createElement("p");
                        p_score.textContent = "Votre score : " + user["points"];
                        p_score.classList.add("text-lg", "font-semibold", "text-center", "mb-4");
                        questionsDiv.append(p_score);

                        const button_return_home = document.createElement("button");
                        button_return_home.textContent = "Retourner à l'accueil";
                        button_return_home.classList.add(
                            "bg-[#3F72AF]",
                            "text-white",
                            "py-2",
                            "px-4",
                            "rounded-lg",
                            "mt-2",
                            "w-full",
                            "hover:bg-[#112D4E]",
                            "transition-all",
                            "duration-200"
                        );
                        button_return_home.onclick = () => { window.location.href = "/" };
                        questionsDiv.append(button_return_home);
                    }
                });
            });
    });

    // Envoi de la réponse au serveur
    function sendResponse(answer, quizz_id, question_id) {
        if (sessionId && answer && userName) {
            // Désactiver les boutons après réponse
            const allButtons = document.querySelectorAll(".buttonQuizz");
            allButtons.forEach((button) => {
                button.classList.add("bg-gray-500", "cursor-not-allowed", "opacity-50");
                button.classList.remove("hover:opacity-80");
                button.disabled = true;
            });

            // Message d'attente
            const sentence_wait = document.createElement("p");
            sentence_wait.textContent = "En attente de la prochaine question...";
            sentence_wait.classList.add("text-center", "text-lg", "italic", "mt-4");
            const questionsDiv = document.getElementById("questionsDiv");
            questionsDiv.appendChild(sentence_wait);

            socket.emit("answer", {
                code: sessionId,
                answer,
                username: userName,
                user_id: user_id,
                quizz_id,
                question_id,
            });
        }
    }
});
