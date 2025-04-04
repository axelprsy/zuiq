// Récupère l'adresse IP de l'utilisateur en effectuant une requête vers l'endpoint '/get_ip' pour savoir sur quelle ip envoyé les donnés.
async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
get_ip().then((ip) => {
    url = ip;
})

// Ajoutes les informations à la Bdd
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

    fetch(`http://${url}:5000/quizz`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            window.location.replace("/my-quizz");
        })
        .catch((error) => {
            console.error(error)
            document.getElementById("error_message").innerText = "Erreur lors de la création du quizz";
        });
}

// Récupère les informations du formulaire
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
