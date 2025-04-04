// Récupère l'adresse IP de l'utilisateur en effectuant une requête vers l'endpoint '/get_ip' pour savoir sur quelle ip envoyé les donnés.
async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}

const params = new URLSearchParams(window.location.search);
const quizzId = params.get("quizz_id");
document.getElementById('username').innerText = `${localStorage.getItem('username')}`;

var socket = null;
var url = "";
var number_connectedUsers = 0;

document.addEventListener("DOMContentLoaded", async function () {
    await get_ip().then((ip) => {
        url = ip;
        socket = io(`http://${url}:5050`, {
            transports: ["websocket"],
            withCredentials: true,
        });

        // Récupération des joueurs connectés
        socket.on("userJoined", ({ username }) => {
            number_connectedUsers++;
            var list_connectedUsers = document.getElementById("listConnectedUsers");
            const userElement = document.createElement("li");

            userElement.textContent = username.toUpperCase();
            userElement.classList.add("flex", "items-center", "bg-[#94AFC8]", "text-[#112D4E]", "py-3", "px-6", "rounded-lg", "text-lg", "font-semibold", "justify-center", "my-1");

            list_connectedUsers.appendChild(userElement);

        })

        // Récupére le nombre de joueurs ayant répondu
        socket.on("userAnswered", ({ user_id }) => {
            const playerCount = document.getElementById("playerCount");
            const currentCount = playerCount.textContent.split("/")[0];
            const newCount = parseInt(currentCount) + 1;
            playerCount.textContent = `${newCount} / ${number_connectedUsers} joueurs ont répondu`;
        });
    })
    const user_id = localStorage.user_id;

    // Création de la session
    socket.emit("createSession", { user_id: user_id });

    // Récupération du code de la session et génération du QR Code quand la session est créée
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

// Lorsque le bouton de lancement du quizz est cliqué, on retire l'affichage du code de session et on affiche les infos du quiz
startQuizzButton.addEventListener("click", () => {
    adminContainer.classList.remove("flex");
    adminContainer.innerHTML = "";

    const quizTitle = document.createElement("h1");
    quizTitle.textContent = "Quizz en cours...";
    quizTitle.classList.add("text-4xl", "font-bold", "text-center", "mb-6");

    const questionTitle = document.createElement("h2");
    questionTitle.id = "title_quizz_direct";
    questionTitle.classList.add("text-2xl", "font-semibold", "text-center", "mb-6");

    const answersContainer = document.createElement("div");
    answersContainer.id = "answersContainer";
    answersContainer.classList.add("grid", "grid-cols-2", "gap-6", "w-full", "max-w-xl", "mx-auto");

    const bottomContainer = document.createElement("div");
    bottomContainer.classList.add("flex", "justify-between", "items-center", "mt-6", "w-full", "max-w-xl", "mx-auto");

    const playerCount = document.createElement("p");
    playerCount.id = "playerCount";
    playerCount.textContent = "0/0 joueurs ont répondu";
    playerCount.classList.add("text-lg", "font-medium", "text-[#3F72AF]");

    const nextQuestionButton = document.createElement("button");
    nextQuestionButton.id = "nextQuestion";
    nextQuestionButton.textContent = "Question suivante";
    nextQuestionButton.classList.add("bg-[#3F72AF]", "text-white", "py-2", "px-6", "rounded-lg", "hover:bg-[#2B5A8A]");
    nextQuestionButton.style.display = "none";

    const displayAnswer = document.createElement("button");
    displayAnswer.id = "Afficher la réponse";
    displayAnswer.textContent = "Afficher la réponse";
    displayAnswer.classList.add("bg-[#3F72AF]", "text-white", "py-2", "px-6", "rounded-lg", "hover:bg-[#2B5A8A]");


    const pIndexQuestion = document.createElement("p");
    pIndexQuestion.id = "indexQuestion";
    pIndexQuestion.classList.add("text-lg", "font-medium", "text-[#3F72AF]");

    adminContainer.appendChild(quizTitle);
    adminContainer.appendChild(questionTitle);
    adminContainer.appendChild(answersContainer);
    bottomContainer.appendChild(playerCount);
    bottomContainer.appendChild(pIndexQuestion);
    bottomContainer.appendChild(nextQuestionButton);
    bottomContainer.appendChild(displayAnswer);
    adminContainer.appendChild(bottomContainer);

    let currentQuestionIndex = 0;

    // Chargement des questions
    async function loadQuestion() {
        nextQuestionButton.style.display = "none";
        displayAnswer.style.display = "block";

        fetch(`http://${url}:5000/quizz?quizz_id=${quizzId}`)
            .then((response) => response.json())
            .then((result) => {
                const questions = result.quizz[0]["questions"];
                pIndexQuestion.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;


                if (currentQuestionIndex < questions.length) {
                    const code = sessionCodeDisplay.textContent.split(": ")[1];
                    const question = questions[currentQuestionIndex];
                    const title = question.title;
                    const answers = question.answers;
                    const quizz_id = result.quizz[0].quizz_id;
                    const question_id = question.question_id;

                    questionTitle.textContent = title;
                    nextQuestionButton.textContent = "Question suivante";
                    playerCount.textContent = `0 / ${number_connectedUsers} joueurs ont répondu`;

                    answersContainer.innerHTML = "";
                    answers.forEach((answer, index) => {
                        const answerBlock = document.createElement("div");
                        answerBlock.classList.add(
                            `answerBlock`,
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

                        answerBlock.id = `answerBlock${index}`;

                        const ZuiqColors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500"];
                        answerBlock.classList.add(ZuiqColors[index % 4]);

                        answerBlock.textContent = answer;
                        answersContainer.appendChild(answerBlock);
                    });

                    // Envoie de la question au socket pour les utilisateurs
                    socket.emit("sendQuestion", {
                        code: code,
                        question: title,
                        answers: answers,
                        quizz_id: quizz_id,
                        question_id: question_id,
                    });
                    currentQuestionIndex++;
                } else {
                    pIndexQuestion.remove()
                    bottomContainer.remove()
                    quizTitle.textContent = "Quizz terminé !";
                    questionTitle.textContent = "Résultats des joueurs :";
                    answersContainer.innerHTML = "";
                    nextQuestionButton.style.display = "none";
                    playerCount.style.display = "none";

                    const resultsContainer = document.createElement("div");
                    resultsContainer.id = "resultsContainer";
                    resultsContainer.classList.add("text-center");
                    adminContainer.appendChild(resultsContainer);

                    const code = sessionCodeDisplay.textContent.split(": ")[1];
                    fetch(`http://${url}:5000/session?session_code=${code}`)
                        .then((response) => response.json())
                        .then((result) => {
                            const users = JSON.parse(result["users"].replace(/'/g, `"`));

                            users.sort((a, b) => b.points - a.points);
                            const podiumLabels = ["🥇 1er", "🥈 2ème", "🥉 3ème"];

                            users.forEach((user, index) => {
                                const scoreEntry = document.createElement("p");

                                if (index < 3) {
                                    scoreEntry.textContent = `${podiumLabels[index]} - ${user["username"]} : ${user["points"]}`;
                                    scoreEntry.classList.add("text-xl", "font-bold");
                                } else {
                                    scoreEntry.textContent = `${index + 1}ème - ${user["username"]} : ${user["points"]}`;
                                    scoreEntry.classList.add("text-lg", "font-semibold");
                                }

                                resultsContainer.appendChild(scoreEntry);
                            });


                            const generateExcelButton = document.createElement("button");
                            generateExcelButton.textContent = "Générer un fichier CSV";
                            generateExcelButton.classList.add("bg-green-500", "text-white", "py-2", "px-4", "rounded-lg", "mt-4", "hover:bg-green-700",);
                            generateExcelButton.style.marginRight = "10px";
                            resultsContainer.appendChild(generateExcelButton);

                            generateExcelButton.addEventListener("click", () => {
                                window.location.href = `http://${url}:5000/generate_csv?session_data=` + JSON.stringify(users);
                            });

                            const goToHome = document.createElement("button");
                            goToHome.textContent = "Retourner à l'accueil";
                            goToHome.classList.add("bg-blue-500", "text-white", "py-2", "px-4", "rounded-lg", "mt-4", "hover:bg-blue-700");
                            resultsContainer.appendChild(goToHome);

                            goToHome.addEventListener("click", () => {
                                location.href = "/my-quizz";
                            });
                        });

                    // Envoie de la fin du quizz au socket pour les utilisateurs
                    socket.emit("endQuizz", {
                        quizz_id: quizzId,
                        code: code
                    });
                }
            });
    }

    loadQuestion();

    displayAnswer.addEventListener("click", () => {
        fetch(`http://${url}:5000/quizz?quizz_id=${quizzId}`)
            .then((response) => response.json())
            .then((result) => {
                const questions = result.quizz[0]["questions"];
                const question = questions[currentQuestionIndex - 1];
                const correctAnswer = question.correct_answer;

                // Envoie de la réponse correcte aux utilisateurs
                socket.emit("answerResult", { correct_answer: correctAnswer, code: sessionCodeDisplay.textContent.split(": ")[1] });

                document.querySelectorAll(".answerBlock").forEach(e => {
                    e.style.background = "grey";
                });
                const correctAnswerIndex = correctAnswer - 1;
                const answerBlocks = document.getElementById(`answerBlock${correctAnswerIndex}`);
                answerBlocks.style.background = "green";
                nextQuestionButton.style.display = "block";
                displayAnswer.style.display = "none";
            });
    });
    nextQuestionButton.addEventListener("click", loadQuestion);

});

// Génère un QR Code permettant de rejoindre la session sur téléphone
async function generateQRCode(code) {
    const qrCodeImage = document.createElement("img");
    await get_ip().then((ip) => {
        fetch(`http://${ip}:5000/generate_qrcode?session_url=http://${ip}:3000/play-quizz?code_session=${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => {
                qrCodeImage.src = `${result.qr_code}`;
                qrCodeImage.alt = "QR Code";
                qrCodeContainer.appendChild(qrCodeImage);
            });
    })
}
