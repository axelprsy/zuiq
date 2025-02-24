
const socket = io('http://localhost:5050', {
    transports: ["websocket"],
    withCredentials: true
});

document.addEventListener("DOMContentLoaded", function () {
    socket.emit('createSession');
    socket.on('sessionCreated', ({ code }) => {
        sessionCodeDisplay.textContent = `Code de session : ${code}`;   
    }); 
});

const sessionCodeDisplay = document.getElementById('sessionCode');
const startQuizzButton = document.getElementById('startQuizz');

// Recevoir le code de session généré
// socket.on('sessionCreated', ({ code }) => {
//     sessionCodeDisplay.textContent = `Code de session : ${code}`;   
// });

// Admin : Envoyer une question
startQuizzButton.addEventListener('click', () => {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
    fetch("http://127.0.0.1:5000/quizz?user_id=4", requestOptions)
      .then((response) => response.json())
        .then((result) => {
            // console.log(result.quizz[0].questions[0].title)
            const code = sessionCodeDisplay.textContent.split(': ')[1];
            const question = result.quizz[0].questions[0].title
            const answers = result.quizz[0].questions[0].answers
            const quizz_id = result.quizz[0].quizz_id
            const question_id = result.quizz[0].questions[0].question_id

            console.log(question)

            if (code && question) {
                socket.emit('sendQuestion', { code, question, answers, quizz_id, question_id });
                // questionInput.value = ''; // Réinitialise l'input
            }
        })
});

// Admin : Créer une session
// createSessionButton.addEventListener('click', () => {
//     socket.emit('createSession');
// });

// Admin : Voir les réponses des joueurs
socket.on('userAnswer', ({ userId, answer }) => {
    console.log(`Réponse reçue de ${userId} : ${answer}`);
});