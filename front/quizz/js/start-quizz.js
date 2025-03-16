async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}


// Récupération des paramètres dans l'URL
const params = new URLSearchParams(window.location.search);
const quizzId = params.get("quizz_id");

// Pour revenir a la page my-quizz
function myQuizzPage() {
    window.location.href = "/my-quizz";
}

var socket = null;
var url="";
document.addEventListener("DOMContentLoaded", async function () {
    await get_ip().then((ip) => {
        url = ip;
        socket = io(`http://${url}:5050`, {
            transports: ["websocket"],
            withCredentials: true,
        });
    })
    const user_id = localStorage.user_id;
    socket.emit("createSession", { user_id: user_id });
    socket.on("sessionCreated", ({ code }) => {
        sessionCodeDisplay.textContent = `Code de session : ${code}`;
    });
});

const sessionCodeDisplay = document.getElementById("sessionCode");
const startQuizzButton = document.getElementById("startQuizz");

// Admin : Envoyer une question
startQuizzButton.addEventListener("click", () => {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch(`http://${url}:5000/quizz?quizz_id=${quizzId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const input_number_of_question =
                document.getElementById("numberOfQuestion");
            const number_of_question = parseInt(input_number_of_question.value);
            const questions = result.quizz[0]["questions"];
            if (questions.length != number_of_question) {
                const code = sessionCodeDisplay.textContent.split(": ")[1];
                const title = questions[number_of_question].title;
                const answers = questions[number_of_question].answers;
                const quizz_id = result.quizz[0].quizz_id;
                const question_id = questions[number_of_question].question_id;
                
                document.getElementById("title_quizz_direct").textContent = `Quizz en cours`;
                document.getElementById("text_quizz_direct").textContent = `Question en cours : ${title}`;
                document.getElementById("startQuizz").textContent = "Question suivante";

                if (code && title) {
                    socket.emit("sendQuestion", {
                        code: code,
                        question: title,
                        answers: answers,
                        quizz_id: quizz_id,
                        question_id: question_id,
                    });
                    input_number_of_question.value = number_of_question + 1;
                }
            } else {
                document.getElementById("title_quizz_direct").textContent = `Quizz terminé !`;
                document.getElementById("text_quizz_direct").textContent = `Résultats :`;
                document.getElementById("startQuizz").style.display = "none";
                document.getElementById("endQuizz").style.display = "inline";
                var div_quizz_direct = document.getElementById("div_quizz-direct");


                const code = sessionCodeDisplay.textContent.split(": ")[1];
                
                fetch(`http://${url}:5000/session?session_code=`+code, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    users = JSON.parse(result["users"].replace(/'/g, `"`))
                    for (i = 0; i < users.length; i++) {
                        var p_score = document.createElement("p")
                        p_score.textContent = users[i]["username"] + " : "  + users[i]["points"]
                        div_quizz_direct.append(p_score)
                    }    
                })

                const generate_exel_file = document.createElement("button")
                generate_exel_file.classList.add("button")
                generate_exel_file.textContent = "Génerer un fichier exel"
                
                generate_exel_file.addEventListener("click", () => {
                    // fetch("http://192.168.1.117:5000/generate_exel?session_data="+JSON.stringify(users), requestOptions)
                    // .then((response) => response.json())
                    // .then((result) => {})
                    window.location.href = `http://${url}:5000/generate_exel?session_data=`+JSON.stringify(users)
                })
                // div_quizz_direct.appendChild(generate_exel_file)
                div_quizz_direct.children[0].insertAdjacentElement("afterend", generate_exel_file)

                const quizz_id = result.quizz[0].quizz_id;
                socket.emit("endQuizz", {
                    quizz_id: quizz_id,
                    code: sessionCodeDisplay.textContent.split(": ")[1]
                })
            }
        });
});

// Admin : Créer une session    
// createSessionButton.addEventListener('click', () => {
//     socket.emit('createSession');
// });

// Admin : Voir les réponses des joueurs
// socket.on("userAnswer", ({ userId, answer }) => {
//     console.log(`Réponse reçue de ${userId} : ${answer}`);
// });
