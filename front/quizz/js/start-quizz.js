// Récupération des paramètres dans l'URL
const params = new URLSearchParams(window.location.search);
const quizzId = params.get("quizz_id");
document.getElementById('username').innerText = `${localStorage.getItem('username')}`;


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
const adminContainer = document.getElementById("admin-container");

// Admin : Lancer le quizz
startQuizzButton.addEventListener("click", () => {
    adminContainer.classList.remove("flex");
    adminContainer.innerHTML = "";

    // Titre du quizz
    const quizTitle = document.createElement("h1");
    quizTitle.textContent = "Quizz en cours...";
    quizTitle.classList.add("text-4xl", "font-bold", "text-center", "mb-6");

    // Titre de la question
    const questionTitle = document.createElement("h2");
    questionTitle.id = "title_quizz_direct";
    questionTitle.classList.add("text-2xl", "font-semibold", "text-center", "mb-6");

    // Conteneur pour les réponses (grille 2x2)
    const answersContainer = document.createElement("div");
    answersContainer.id = "answersContainer";
    answersContainer.classList.add("grid", "grid-cols-2", "gap-6", "w-full", "max-w-xl", "mx-auto");

    // Conteneur en bas (compteur + bouton)
    const bottomContainer = document.createElement("div");
    bottomContainer.classList.add("flex", "justify-between", "items-center", "mt-6", "w-full", "max-w-xl", "mx-auto");

    const playerCount = document.createElement("p");
    playerCount.id = "playerCount";
    playerCount.textContent = "0/24 joueurs ont répondu";
    playerCount.classList.add("text-lg", "font-medium", "text-[#3F72AF]");

    const nextQuestionButton = document.createElement("button");
    nextQuestionButton.id = "nextQuestion";
    nextQuestionButton.textContent = "Question suivante";
    nextQuestionButton.classList.add("bg-[#3F72AF]", "text-white", "py-2", "px-6", "rounded-lg", "hover:bg-[#2B5A8A]");

    adminContainer.appendChild(quizTitle);
    adminContainer.appendChild(questionTitle);
    adminContainer.appendChild(answersContainer);
    bottomContainer.appendChild(playerCount);
    bottomContainer.appendChild(nextQuestionButton);
    adminContainer.appendChild(bottomContainer);

    let currentQuestionIndex = 0;

    function loadQuestion() {
        fetch(`http://127.0.0.1:5000/quizz?quizz_id=${quizzId}`)
            .then((response) => response.json())
            .then((result) => {
                const questions = result.quizz[0]["questions"];

                if (currentQuestionIndex < questions.length) {
                    const code = sessionCodeDisplay.textContent.split(": ")[1];
                    const question = questions[currentQuestionIndex];
                    const title = question.title;
                    const answers = question.answers;
                    const quizz_id = result.quizz[0].quizz_id;
                    const question_id = question.question_id;

                    questionTitle.textContent = title;
                    nextQuestionButton.textContent = "Question suivante";
                    playerCount.textContent = "0/24 joueurs ont répondu";

                    answersContainer.innerHTML = "";
                    answers.forEach((answer, index) => {
                        const answerBlock = document.createElement("div");
                        answerBlock.classList.add(
                            "answerBlock",
                            "p-6",
                            "rounded-lg",
                            "shadow-md",
                            "text-white",
                            "font-bold",
                            "text-xl",
                            "flex",
                            "justify-center",
                            "items-center"
                        );

                        const ZuiqColors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500"];
                        answerBlock.classList.add(ZuiqColors[index % 4]);

                        answerBlock.textContent = answer;
                        answersContainer.appendChild(answerBlock);
                    });

                    socket.emit("sendQuestion", {
                        code: code,
                        question: title,
                        answers: answers,
                        quizz_id: quizz_id,
                        question_id: question_id,
                    });

                    currentQuestionIndex++;
                } else {
                    // Fin du quizz
                    quizTitle.textContent = "Quizz terminé !";
                    questionTitle.textContent = "Résultats des joueurs :";
                    answersContainer.innerHTML = "";
                    nextQuestionButton.style.display = "none";
                    playerCount.style.display = "none";

                    const resultsContainer = document.createElement("div");
                    resultsContainer.id = "resultsContainer";
                    resultsContainer.classList.add("mt-6", "text-center");
                    adminContainer.appendChild(resultsContainer);

                    const code = sessionCodeDisplay.textContent.split(": ")[1];
                    fetch(`http://127.0.0.1:5000/session?session_code=${code}`)
                        .then((response) => response.json())
                        .then((result) => {
                            const users = JSON.parse(result["users"].replace(/'/g, `"`));
                            users.forEach((user) => {
                                const scoreEntry = document.createElement("p");
                                scoreEntry.textContent = `${user["username"]} : ${user["points"]}`;
                                scoreEntry.classList.add("text-lg", "font-semibold");
                                resultsContainer.appendChild(scoreEntry);
                            });

                            // Bouton "Générer un Excel" debrouille toi il marche plus my bad bebou
                            const generateExcelButton = document.createElement("button");
                            generateExcelButton.textContent = "Générer un fichier Excel";
                            generateExcelButton.classList.add("bg-green-500", "text-white", "py-2", "px-4", "rounded-lg", "mt-4", "hover:bg-green-700",);
                            generateExcelButton.style.marginRight = "10px";
                            resultsContainer.appendChild(generateExcelButton);

                            generateExcelButton.addEventListener("click", () => {
                                window.location.href = "http://127.0.0.1:5000/generate_exel?session_data=" + JSON.stringify(users);
                            });

                            // Bouton relancer un quizz
                            const restartButton = document.createElement("button");
                            restartButton.textContent = "Relancer un quizz";
                            restartButton.classList.add("bg-blue-500", "text-white", "py-2", "px-4", "rounded-lg", "mt-4", "hover:bg-blue-700");
                            resultsContainer.appendChild(restartButton);

                            restartButton.addEventListener("click", () => {
                                location.reload();
                            });
                        });

                    socket.emit("endQuizz", {
                        quizz_id: quizzId,
                        code: code
                    });
                }
            });
    }

    loadQuestion();

    nextQuestionButton.addEventListener("click", loadQuestion);

    socket.on("userAnswer", ({ totalPlayers, answeredPlayers }) => {
        playerCount.textContent = `${answeredPlayers}/${totalPlayers} joueurs ont répondu`;
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
