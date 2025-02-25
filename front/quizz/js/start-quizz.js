
const socket = io('http://localhost:5050', {
    transports: ["websocket"],
    withCredentials: true
});

document.addEventListener("DOMContentLoaded", function () {
    const user_id = localStorage.user_id
    socket.emit('createSession', {"user_id": user_id});
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
      
    fetch("http://127.0.0.1:5060/quizz?user_id=1", requestOptions)
      .then((response) => response.json())
        .then((result) => {
            const input_number_of_question = document.getElementById("numberOfQuestion")
            const number_of_question = parseInt(input_number_of_question.value)
            const questions = result.quizz[0]["questions"]
                if (questions.length != number_of_question) {
                const code = sessionCodeDisplay.textContent.split(': ')[1];
                const title = questions[number_of_question].title
                const answers = questions[number_of_question].answers
                const quizz_id = result.quizz[0].quizz_id
                const question_id = questions[number_of_question].question_id

                if (code && title) {
                    console.log(questions.length, number_of_question)
                    socket.emit('sendQuestion', { "code":code, "question":title, "answers":answers, "quizz_id": quizz_id, "question_id":question_id });
                    input_number_of_question.value = number_of_question+1
                }
            } else {
                console.log("fin du quizz")
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