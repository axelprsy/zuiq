// Récupère l'adresse IP de l'utilisateur en effectuant une requête vers l'endpoint '/get_ip' pour savoir sur quelle ip envoyé les donnés.
async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}

document.addEventListener('DOMContentLoaded', async function () {
    await get_ip().then((ip) => {
        url = ip;
    })

    const socket = io(`http://${url}:5050`, {
        transports: ["websocket"],
        withCredentials: true
    });

    const joinQuizButton = document.getElementById('joinQuiz');
    const joinCodeInput = document.getElementById('joinCodeInput');
    const questionsDiv = document.getElementById('questions');
    const usernameInput = document.getElementById('usernameInput');

    const params = new URLSearchParams(window.location.search);
    const sessionCode = params.get("code_session");

    if (sessionCode !== null) {
        joinCodeInput.value = sessionCode;
    }

    // Rejoins la session demandée
    joinQuizButton.addEventListener('click', () => {
        const code = joinCodeInput.value;
        const username = usernameInput.value;
        if (code && username) {
            window.location.href = `/play?session_id=${joinCodeInput.value}&username=${usernameInput.value}`;
        }
    });

    socket.on('newQuestion', ({ question, answers, quizz_id, question_id }) => {
        const questionElement = document.createElement('p');
        questionElement.textContent = `Question : ${question}`;
        questionsDiv.appendChild(questionElement);

        for (let i = 0; i < answers.length; i++) {
            var button = document.createElement('button')
            button.innerHTML = answers[i]
            button.onclick = function () { sendResponse(i + 1, quizz_id, question_id) }
            questionsDiv.appendChild(button)
        }
    });

    // Envoie la réponse de l'utilisateur au socket pour la traiter
    function sendResponse(answer, quizz_id, question_id,) {
        const code = joinCodeInput.value;
        const username = usernameInput.value

        if (code && answer && username) {
            socket.emit('answer', { code, answer, username, quizz_id, question_id });
        }
    }
})