document.addEventListener("DOMContentLoaded", function () {
    const modalQuizz = document.getElementById("modal");
    const modalCreateQuizz = document.getElementById("modal-create-quizz");
    const modalQuestions = document.getElementById("modal-questions");
    const questionContainer = document.getElementById("question-container");
    const finishBtn = document.querySelector(".navigation button:nth-child(2)");
    const nextQuestionBtn = document.querySelector(".arrow-right");
    const prevQuestionBtn = document.querySelector(".arrow-left");
    const closeButtons = document.querySelectorAll(".close");

    let currentQuestionIndex = 0;
    let questions = [];
    window.numberOfQuestions = 0;

    function openModalQuizz() {
        modalQuizz.style.display = "flex";
    }

    function openModalCreateQuizz() {
        modalCreateQuizz.style.display = "flex";
    }

    function openModalQuestions() {
        modalQuestions.style.display = "flex";
        questionContainer.innerHTML = "";
        currentQuestionIndex = 0;
        questions = [];
        window.numberOfQuestions = 0;
        addNewQuestion();
    }

    function addNewQuestion() {
        const questionCount = questions.length + 1;
        const questionTemplate = `
            <div class="form-group next">
                <h1>Question ${questionCount}</h1>
                <label for="title_question${questionCount}">Titre de la Question</label>
                <input id="title_question${questionCount}" type="text" name="title_question${questionCount}" required class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                <label for="answer1_question${questionCount}">Réponse 1</label>
                <input id="answer1_question${questionCount}" type="text" name="answer1_question${questionCount}" required class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                <label for="answer2_question${questionCount}">Réponse 2</label>
                <input id="answer2_question${questionCount}" type="text" name="answer2_question${questionCount}" required class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                <label for="answer3_question${questionCount}">Réponse 3</label>
                <input id="answer3_question${questionCount}" type="text" name="answer3_question${questionCount}" required class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                <label for="answer4_question${questionCount}">Réponse 4</label>
                <input id="answer4_question${questionCount}" type="text" name="answer4_question${questionCount}" required class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                <label for="correct_answer_question${questionCount}">Réponse correcte*</label>
                <select id="correct_answer_question${questionCount}" name="correct_answer_question${questionCount}" required class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
        `;

        questionContainer.insertAdjacentHTML("beforeend", questionTemplate);
        questions = document.querySelectorAll(".form-group");
        setTimeout(() => {
            currentQuestionIndex = questions.length - 1;
            updateQuestionDisplay();
        }, 50);
    }

    function updateQuestionDisplay() {
        questions.forEach((q, index) => {
            q.classList.remove("active", "previous", "next");
            if (index === currentQuestionIndex) {
                q.classList.add("active");
            } else if (index < currentQuestionIndex) {
                q.classList.add("previous");
            } else {
                q.classList.add("next");
            }
        });
    }

    function nextQuestion(event) {
        event.preventDefault();
        if (currentQuestionIndex === questions.length - 1) {
            addNewQuestion();
        } else {
            currentQuestionIndex++;
            updateQuestionDisplay();
        }
    }

    function prevQuestion(event) {
        event.preventDefault();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            updateQuestionDisplay();
        }
    }

    function closeModal(event) {
        event.preventDefault();
        modalQuizz.style.display = "none";
        modalCreateQuizz.style.display = "none";
        modalQuestions.style.display = "none";
    }

    document.querySelector(".button_createquizz").addEventListener("click", openModalQuizz);
    document.getElementById("create_quizz").addEventListener("click", openModalCreateQuizz);
    document.getElementById("continue").addEventListener("click", openModalQuestions);
    finishBtn.addEventListener("click", (e) => { e.preventDefault(); finishQuiz(); });
    nextQuestionBtn.addEventListener("click", nextQuestion);
    prevQuestionBtn.addEventListener("click", prevQuestion);
    closeButtons.forEach(button => button.addEventListener("click", closeModal));
});

async function addDB(title, questions) {
    const formdata = new FormData();
    formdata.append("name", title);
    formdata.append("user_id", localStorage.getItem("user_id"));
    formdata.append("questions", questions);

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/quizz", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            window.location.replace("/my-quizz");
        })
        .catch((error) => {
            console.error(error);
            document.getElementById("error_message").innerText = "Erreur lors de la création du quizz";
        });
}

async function recupInfoForm() {
    const numberOfQuestions = window.numberOfQuestions || document.querySelectorAll(".form-group").length;
    const title = document.getElementById("quizz_name")?.value.trim();

    const questionsArray = [];

    for (let i = 1; i <= numberOfQuestions; i++) {
        const title_question = document.getElementById(`title_question${i}`)?.value.trim();
        const answer1 = document.getElementById(`answer1_question${i}`)?.value.trim();
        const answer2 = document.getElementById(`answer2_question${i}`)?.value.trim();
        const answer3 = document.getElementById(`answer3_question${i}`)?.value.trim();
        const answer4 = document.getElementById(`answer4_question${i}`)?.value.trim();
        const correct_answer = document.getElementById(`correct_answer_question${i}`)?.value;

        if (!title_question || !answer1 || !answer2 || !answer3 || !answer4 || !correct_answer) {
            console.error(`Données manquantes pour la question ${i}`);
            continue;
        }

        questionsArray.push({
            question_id: i,
            title: title_question,
            answers: [answer1, answer2, answer3, answer4],
            correct_answer: correct_answer
        });
    }

    addDB(title, JSON.stringify(questionsArray));
}
