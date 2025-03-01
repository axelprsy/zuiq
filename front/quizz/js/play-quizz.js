const socket = io("http://localhost:5050", {
    transports: ["websocket"],
    withCredentials: true,
});

// Récupération des paramètres dans l'URL
const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session_id");
const userName = params.get("username");

document.getElementById("userName").textContent = userName;

// Joueur : Rejoindre une session
if (sessionId && userName) {
    socket.emit("joinSession", { code: sessionId, username: userName });
}

// Confirmation de connexion
socket.on("joinedSession", ({ room }) => {
    console.log("Vous avez rejoint la session : ", room);
    document.getElementById("connected").textContent = `Vous êtes connecté à la session : ${sessionId}`;
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
            quizz_id,
            question_id,
        });
    }
}
