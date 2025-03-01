const socket = io('http://localhost:5050', {
    transports: ["websocket"],
    withCredentials: true
});

// Récupération des paramètres dans l'URL
const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session_id");
const userName = params.get("username");

document.getElementById("userName").textContent = userName;
document.getElementById("sessionId").textContent = sessionId;

// Joueur : Rejoindre une session
if (sessionId && userName) {
    socket.emit('joinSession', { code: sessionId, username: userName });
}

// Confirmation de connexion
socket.on('joinedSession', ({ room }) => {
    alert(`Vous avez rejoint la session : ${room}`);
});

// Joueur : Recevoir une nouvelle question
socket.on('newQuestion', ({ question, answers, quizz_id, question_id }) => {
    const questionsDiv = document.getElementById('questionsDiv');
    questionsDiv.innerHTML = ''; // Vide les anciennes questions

    // Création de la question
    const questionElement = document.createElement('p');
    questionElement.textContent = `Question : ${question}`;
    questionsDiv.appendChild(questionElement);

    // Création des boutons de réponse
    answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => sendResponse(index + 1, quizz_id, question_id);
        questionsDiv.appendChild(button);
    });
});

// Envoi de la réponse au serveur
function sendResponse(answer, quizz_id, question_id) {
    if (sessionId && answer && userName) {
        socket.emit('answer', { code: sessionId, answer, username: userName, quizz_id, question_id });
    }
}