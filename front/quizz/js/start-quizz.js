// Récupération des paramètres dans l'URL
const params = new URLSearchParams(window.location.search);
const quizzId = params.get("quizz_id");

const socket = io("http://localhost:5050", {
    transports: ["websocket"],
    withCredentials: true,
});

function reload() {
    location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
    const user_id = localStorage.user_id;
    socket.emit("createSession", { user_id: user_id });
    socket.on("sessionCreated", ({ code }) => {
        sessionCodeDisplay.textContent = `Code de session : ${code}`;
        generateQRCode(code);
    });
});

const sessionCodeDisplay = document.getElementById("sessionCode");
const startQuizzButton = document.getElementById("startQuizz");
const connectedUsersContainer = document.getElementById("connectedUsers");
const qrCodeContainer = document.getElementById("qrCode");

// Admin : Envoyer une question
startQuizzButton.addEventListener("click", () => {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch(`http://127.0.0.1:5000/quizz?quizz_id=${quizzId}`, requestOptions)
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
                    console.log(questions.length, number_of_question);
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
                console.log("fin du quizz");
                document.getElementById("title_quizz_direct").textContent = `Quizz terminé !`;
                document.getElementById("text_quizz_direct").textContent = `Résultats :`;
                document.getElementById("startQuizz").style.display = "none";
                document.getElementById("endQuizz").style.display = "inline";
                var div_quizz_direct = document.getElementById("div_quizz-direct");


                const code = sessionCodeDisplay.textContent.split(": ")[1];

                fetch("http://127.0.0.1:5000/session?session_code=" + code, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        users = JSON.parse(result["users"].replace(/'/g, `"`))
                        for (i = 0; i < users.length; i++) {
                            var p_score = document.createElement("p")
                            p_score.textContent = users[i]["username"] + " : " + users[i]["points"]
                            div_quizz_direct.append(p_score)
                        }
                    })

                const generate_exel_file = document.getElementById("generate_exel_file")
                generate_exel_file.style.display = "inline";

                generate_exel_file.addEventListener("click", () => {
                    // fetch("http://127.0.0.1:5000/generate_exel?session_data="+JSON.stringify(users), requestOptions)
                    // .then((response) => response.json())
                    // .then((result) => {})
                    window.location.href = "http://127.0.0.1:5000/generate_exel?session_data=" + JSON.stringify(users)
                })

                const quizz_id = result.quizz[0].quizz_id;
                socket.emit("endQuizz", {
                    quizz_id: quizz_id,
                    code: sessionCodeDisplay.textContent.split(": ")[1]
                })
            }
        });
});

// Admin : Voir les réponses des joueurs
socket.on("userAnswer", ({ userId, answer }) => {
    console.log(`Réponse reçue de ${userId} : ${answer}`);
});

// Admin : Générer un QR code
function generateQRCode(code) {
    const qrCodeImage = document.createElement("img");
    qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/join-quizz?code_session=${code}`;
    qrCodeImage.alt = "QR Code";
    qrCodeContainer.appendChild(qrCodeImage);
}
