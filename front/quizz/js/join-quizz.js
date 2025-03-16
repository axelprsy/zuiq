async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
document.addEventListener('DOMContentLoaded', async function() {
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
    
    
    // Joueur : Rejoindre une session
    joinQuizButton.addEventListener('click', () => {
        const code = joinCodeInput.value;
        const username = usernameInput.value;
        if (code && username) {
            window.location.href = `/play?session_id=${joinCodeInput.value}&username=${usernameInput.value}`;
        }
    });
    
    
    // Joueur : Recevoir une nouvelle question
    socket.on('newQuestion', ({ question, answers, quizz_id, question_id }) => {
        const questionElement = document.createElement('p');
        questionElement.textContent = `Question : ${question}`;
        questionsDiv.appendChild(questionElement);
    
        for (let i = 0; i < answers.length; i++) {
            var button = document.createElement('button')
            button.innerHTML = answers[i]
            button.onclick = function () {sendResponse(i+1, quizz_id, question_id)}
            questionsDiv.appendChild(button)
        }
    });
    
    function sendResponse(answer, quizz_id, question_id, ) {
        const code = joinCodeInput.value;
        const username = usernameInput.value
    
            if (code && answer && username) {
                socket.emit('answer', { code, answer, username, quizz_id, question_id });
            }
    }
})

// Joueur : Envoyer une réponse
// sendAnswerButton.addEventListener('click', () => {
//     const code = joinCodeInput.value;
//     const answer = answerInput.value;

//     if (code && answer) {
//         socket.emit('answer', { code, answer });
//         answerInput.value = ''; // Réinitialise le champ réponse
//     }
// });