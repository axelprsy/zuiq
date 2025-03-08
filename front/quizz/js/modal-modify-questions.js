const modalQuizz = document.getElementById("modal");
const modalQuestions = document.getElementById("modal-questions");
const questionContainer = document.getElementById("question-container");
const finishBtn = document.querySelector(".navigation button:nth-child(2)");
const nextQuestionBtn = document.querySelector(".arrow-right");
const prevQuestionBtn = document.querySelector(".arrow-left");
const closeButtons = document.querySelectorAll(".close");

// Variables pour suivre l'index de la question actuelle et la liste des questions
let currentQuestionIndex = 0;
let questions = [];

// Variable globale pour stocker le nombre de questions
window.numberOfQuestions = 0;

// Fonction pour ouvrir la modal du quiz
function openModalQuizz() {
  modalQuizz.style.display = "flex"; // Affiche la modal
}

// Fonction pour ouvrir la modal des questions
function openModalQuestions() {
  modalQuestions.style.display = "flex"; // Affiche la modal
  currentQuestionIndex = 0; // Réinitialise l'index de la question actuelle
  updateQuestionDisplay()
}

// Fonction pour ajouter une nouvelle question
async function addNewQuestion(title, correctAnswer, rep1, rep2, rep3, rep4) {
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
    if (title !== undefined) {
      document.getElementById(`title_question${questionCount}`).value = title;
      document.getElementById(`correct_answer_question${questionCount}`).value = correctAnswer;
      document.getElementById(`answer1_question${questionCount}`).value = rep1;
      document.getElementById(`answer2_question${questionCount}`).value = rep2;
      document.getElementById(`answer3_question${questionCount}`).value = rep3;
      document.getElementById(`answer4_question${questionCount}`).value = rep4;
    }
  }, 50);
}

// Fonction pour mettre à jour l'affichage des questions
function updateQuestionDisplay() {
  questions.forEach((q, index) => {
    q.classList.remove("active", "previous", "next"); // Enlève les classes d'affichage
    if (index === currentQuestionIndex) {
      q.classList.add("active"); // Affiche la question actuelle
    } else if (index < currentQuestionIndex) {
      q.classList.add("previous"); // Cache les questions précédentes
    } else {
      q.classList.add("next"); // Cache les questions suivantes
    }
  });
}

// Fonction pour passer à la question suivante
function nextQuestion(event) {
  event.preventDefault(); // Empêche le rechargement de la page
  if (currentQuestionIndex === questions.length - 1) {
    addNewQuestion(); // Ajoute une nouvelle question si c'est la dernière
  } else {
    currentQuestionIndex++; // Passe à la question suivante
    updateQuestionDisplay(); // Met à jour l'affichage
  }
}

// Fonction pour revenir à la question précédente
function prevQuestion(event) {
  event.preventDefault(); // Empêche le rechargement de la page
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--; // Revient à la question précédente
    updateQuestionDisplay(); // Met à jour l'affichage
  }
}

// Fonction pour fermer les modals
closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    this.parentElement.parentElement.style.display = "none"; // Cache la modal
  });
});

// Ajoute des écouteurs d'événements aux boutons
document
  .querySelector(".button_createquizz")
  .addEventListener("click", openModalQuizz);
document
  .getElementById("continue")
  .addEventListener("click", openModalQuestions);
finishBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modifyQuizz();
});
nextQuestionBtn.addEventListener("click", nextQuestion);
prevQuestionBtn.addEventListener("click", prevQuestion);
