const params = new URLSearchParams(window.location.search);
const quizzID = params.get("quizz_id");

function recupInfoQuizz(questions) {
  let title = questions.title;
  let correct_answer = questions.correct_answer;
  let answers = questions.answers;

  // Initialisez les variables pour chaque réponse
  let rep1 = "",
    rep2 = "",
    rep3 = "",
    rep4 = "";

  for (let j = 0; j < answers.length; j++) {
    if (j === 0) {
      rep1 = answers[j];
    } else if (j === 1) {
      rep2 = answers[j];
    } else if (j === 2) {
      rep3 = answers[j];
    } else if (j === 3) {
      rep4 = answers[j];
    }
  }

  return [title, correct_answer, rep1, rep2, rep3, rep4];
}

const requestOptionsRecupInfo = {
  method: "GET",
  redirect: "follow",
};

async function get_ip() {
  const response = await fetch('/get_ip');
  const data = await response.json();
  return data["ip"];
}

get_ip().then((ip) => {
  fetch(`http://${ip}:5000/quizz?quizz_id=${quizzID}`, requestOptionsRecupInfo)
  .then((response) => response.json())
  .then((result) => {
    const allQuizz = result.quizz[0];

    document.getElementById("quizz_name_modify").value = allQuizz.name;

    for (let i = 0; i < allQuizz.questions.length; i++) {
      const [title, correctAnswer, rep1, rep2, rep3, rep4] = recupInfoQuizz(
        allQuizz.questions[i]
      );

      addNewQuestionModify(title, correctAnswer, rep1, rep2, rep3, rep4);
    }
  })
  .catch((error) => console.error(error));
});


function addDB(title, questions) {
  const formdata = new FormData();
  formdata.append("quizz_id", quizzID);
  formdata.append("name", title);
  formdata.append("questions", questions);

  const requestOptions = {
    method: "PATCH",
    body: formdata,
    redirect: "follow",
  };
  get_ip().then((ip) => {
    fetch(`http://${ip}:5000/quizz`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        window.location.replace("/my-quizz");
      })
      .catch((error) => console.error(error));
  });
}

function modifyQuizz() {
  const numberOfQuestions =
    window.numberOfQuestions || document.querySelectorAll(".form-group_modify").length;
  const title = document.getElementById("quizz_name_modify")?.value.trim();

  const questionsArray = [];

  for (let i = 1; i <= numberOfQuestions; i++) {
    const title_question = document
      .getElementById(`title_question${i}_modify`)
      ?.value.trim();
    const answer1 = document
      .getElementById(`answer1_question${i}_modify`)
      ?.value.trim();
    const answer2 = document
      .getElementById(`answer2_question${i}_modify`)
      ?.value.trim();
    const answer3 = document
      .getElementById(`answer3_question${i}_modify`)
      ?.value.trim();
    const answer4 = document
      .getElementById(`answer4_question${i}_modify`)
      ?.value.trim();
    const correct_answer = document.getElementById(
      `correct_answer_question${i}_modify`
    )?.value;

    if (
      !title_question ||
      !answer1 ||
      !answer2 ||
      !answer3 ||
      !answer4 ||
      !correct_answer
    ) {
      console.error(`Données manquantes pour la question ${i}`);
      continue;
    }

    questionsArray.push({
      question_id: i,
      title: title_question,
      answers: [answer1, answer2, answer3, answer4],
      correct_answer: correct_answer,
    });
  }

  addDB(title, JSON.stringify(questionsArray));
}
