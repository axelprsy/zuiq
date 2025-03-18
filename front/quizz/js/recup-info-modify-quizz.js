function recupInfoQuestions(questions) {
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

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(`http://127.0.0.1:5000/quizz?quizz_id=2`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    const allQuizz = result.quizz[0];

    document.getElementById("quizz_name").value = allQuizz.name;

    for (let i = 0; i < allQuizz.questions.length; i++) {
      const [title, correctAnswer, rep1, rep2, rep3, rep4] = recupInfoQuestions(
        allQuizz.questions[i]
      );

      addNewQuestion(title, correctAnswer, rep1, rep2, rep3, rep4);
    }
  })
  .catch((error) => console.error(error));
