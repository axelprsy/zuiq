const modalQuizzModify = document.getElementById("modal_modify");
const modalQuestionsModifyModify = document.getElementById("modal-questions_modify");
const questionContainerModify = document.getElementById("question-container_modify");
const finishBtnModify = document.querySelector(".navigation_modify button:nth-child(2)");
const nextQuestionModifyBtnModify = document.querySelector(".arrow-right_modify");
const prevQuestionModifyBtnModify = document.querySelector(".arrow-left_modify");
const closeButtonsModify = document.querySelectorAll(".close_modify");

let currentQuestionIndexModify = 0;
let questions = [];

window.numberOfQuestions = 0;

function openmodalQuizzModify() {
  modalQuizzModify.style.display = "flex";
}

function openmodalQuestionsModifyModify() {
  modalQuestionsModifyModify.style.display = "flex";
  if (questions.length === 0) {
    addNewQuestionModify();
  }
  currentQuestionIndexModify = 0;
  updateQuestionDisplayModify();
}

async function addNewQuestionModify(title, correctAnswer, rep1, rep2, rep3, rep4) {
  const questionCount = questions.length + 1;
  const questionTemplate = `
            <div class="form-group_modify ${questionCount === 1 ? 'active_modify' : 'next_modify'} space-y-4 p-6 bg-[#F9F7F7]">
                <h1 class="text-2xl font-bold text-[#112D4E]">Question ${questionCount}</h1>
                
                <label for="title_question${questionCount}_modify" class="text-[#112D4E] font-semibold">Titre de la Question</label>
                <input id="title_question${questionCount}_modify" type="text" name="title_question${questionCount}_modify" required
                    class="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                
                <label for="answer1_question${questionCount}_modify" class="text-[#112D4E] font-semibold">Réponse 1</label>
                <input id="answer1_question${questionCount}_modify" type="text" name="answer1_question${questionCount}_modify" required
                    class="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                
                <label for="answer2_question${questionCount}_modify" class="text-[#112D4E] font-semibold">Réponse 2</label>
                <input id="answer2_question${questionCount}_modify" type="text" name="answer2_question${questionCount}_modify" required
                    class="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                
                <label for="answer3_question${questionCount}_modify" class="text-[#112D4E] font-semibold">Réponse 3</label>
                <input id="answer3_question${questionCount}_modify" type="text" name="answer3_question${questionCount}_modify" required
                    class="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                
                <label for="answer4_question${questionCount}_modify" class="text-[#112D4E] font-semibold">Réponse 4</label>
                <input id="answer4_question${questionCount}_modify" type="text" name="answer4_question${questionCount}_modify" required
                    class="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                
                <label for="correct_answer_question${questionCount}_modify" class="text-[#112D4E] font-semibold">Réponse correcte*</label>
                <select id="correct_answer_question${questionCount}_modify" name="correct_answer_question${questionCount}_modify" required
                    class="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
        `;

  questionContainerModify.insertAdjacentHTML("beforeend", questionTemplate);
  questions = document.querySelectorAll(".form-group_modify");
  setTimeout(() => {
    currentQuestionIndexModify = questions.length - 1;
    updateQuestionDisplayModify();
    if (title !== undefined) {
      document.getElementById(`title_question${questionCount}_modify`).value = title;
      document.getElementById(`correct_answer_question${questionCount}_modify`).value = correctAnswer;
      document.getElementById(`answer1_question${questionCount}_modify`).value = rep1;
      document.getElementById(`answer2_question${questionCount}_modify`).value = rep2;
      document.getElementById(`answer3_question${questionCount}_modify`).value = rep3;
      document.getElementById(`answer4_question${questionCount}_modify`).value = rep4;
    }
  }, 50);
}

function updateQuestionDisplayModify() {
  questions.forEach((q, index) => {
    q.classList.remove("active_modify", "previous_modify", "next_modify");
    if (index === currentQuestionIndexModify) {
      q.classList.add("active_modify");
    } else if (index < currentQuestionIndexModify) {
      q.classList.add("previous_modify");
    } else {
      q.classList.add("next_modify");
    }
  });
}

function nextQuestionModify(event) {
  event.preventDefault();
  if (currentQuestionIndexModify === questions.length - 1) {
    addNewQuestionModify();
  } else {
    currentQuestionIndexModify++;
    updateQuestionDisplayModify();
  }
}

function prevQuestionModify(event) {
  event.preventDefault();
  if (currentQuestionIndexModify > 0) {
    currentQuestionIndexModify--;
    updateQuestionDisplayModify();
  }
}

closeButtonsModify.forEach((button) => {
  button.addEventListener("click", function () {
    window.location.href = "/my-quizz";
  });
});

openmodalQuizzModify();
document
  .getElementById("continue_modify")
  .addEventListener("click", openmodalQuestionsModifyModify);
finishBtnModify.addEventListener("click", (e) => {
  e.preventDefault();
  modifyQuizz();
});
nextQuestionModifyBtnModify.addEventListener("click", nextQuestionModify);
prevQuestionModifyBtnModify.addEventListener("click", prevQuestionModify);
