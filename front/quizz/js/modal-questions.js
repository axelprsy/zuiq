document.addEventListener("DOMContentLoaded", function () {
    const modalQuizz = document.getElementById("modal");
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
                <input id="title_question${questionCount}" type="text" name="title_question${questionCount}" required>
                <label for="answer1_question${questionCount}">Réponse 1</label>
                <input id="answer1_question${questionCount}" type="text" name="answer1_question${questionCount}" required>
                <label for="answer2_question${questionCount}">Réponse 2</label>
                <input id="answer2_question${questionCount}" type="text" name="answer2_question${questionCount}" required>
                <label for="answer3_question${questionCount}">Réponse 3</label>
                <input id="answer3_question${questionCount}" type="text" name="answer3_question${questionCount}" required>
                <label for="answer4_question${questionCount}">Réponse 4</label>
                <input id="answer4_question${questionCount}" type="text" name="answer4_question${questionCount}" required>
                <label for="correct_answer_question${questionCount}">Réponse correcte*</label>
                <select id="correct_answer_question${questionCount}" name="correct_answer_question${questionCount}" required>
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

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.parentElement.parentElement.style.display = "none";
        });
    });

    document.querySelector(".button_createquizz").addEventListener("click", openModalQuizz);
    document.getElementById("continue").addEventListener("click", openModalQuestions);
    finishBtn.addEventListener("click", (e) => { e.preventDefault(); finishQuiz(); });
    nextQuestionBtn.addEventListener("click", nextQuestion);
    prevQuestionBtn.addEventListener("click", prevQuestion);
});
