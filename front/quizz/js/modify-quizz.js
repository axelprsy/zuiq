function addDB(title, questions) {
  const formdata = new FormData();
  formdata.append("quizz_id", "2");
  formdata.append("name", title);
  formdata.append("questions", questions);

  const requestOptions = {
    method: "PATCH",
    body: formdata,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:5000/quizz", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function modifyQuizz() {
  const numberOfQuestions =
    window.numberOfQuestions || document.querySelectorAll(".form-group").length;
  const title = document.getElementById("quizz_name")?.value.trim();

  const questionsArray = [];

  for (let i = 1; i <= numberOfQuestions; i++) {
    const title_question = document
      .getElementById(`title_question${i}`)
      ?.value.trim();
    const answer1 = document
      .getElementById(`answer1_question${i}`)
      ?.value.trim();
    const answer2 = document
      .getElementById(`answer2_question${i}`)
      ?.value.trim();
    const answer3 = document
      .getElementById(`answer3_question${i}`)
      ?.value.trim();
    const answer4 = document
      .getElementById(`answer4_question${i}`)
      ?.value.trim();
    const correct_answer = document.getElementById(
      `correct_answer_question${i}`
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
