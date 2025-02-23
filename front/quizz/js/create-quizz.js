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
            console.log(result)
            window.location.replace("/success");
        })
        .catch((error) => {
            console.error(error)
            document.getElementById("error_message").innerText = "Erreur lors de la création du quizz";
        });
}


async function recupInfoForm() {
    const numberOfQuestions = window.numberOfQuestions;
    const title = document.getElementById(`quizz_name`).value;
    const debut_questions_formatJSON = `[`;
    let questions_formatJSON = debut_questions_formatJSON;

    for (let i = 1; i <= numberOfQuestions; i++) {
        const title_question = document.getElementById(`title_question${i}`).value;
        const answer1 = document.getElementById(`answer1_question${i}`).value;
        const answer2 = document.getElementById(`answer2_question${i}`).value;
        const answer3 = document.getElementById(`answer3_question${i}`).value;
        const answer4 = document.getElementById(`answer4_question${i}`).value;
        const correct_answer = document.getElementById(`correct_answer_question${i}`).value;

        const new_question_formatJSON = `{"question_id": ${i}, "title": "${title_question}", "answers": ["${answer1}", "${answer2}", "${answer3}", "${answer4}"], "correct_answer": "${correct_answer}"}`;

        if (i > 1) {
            questions_formatJSON += `,`;
        }
        questions_formatJSON += new_question_formatJSON;
    }

    questions_formatJSON += `]`;

    addDB(title, questions_formatJSON);
}