const user_id = localStorage.getItem("user_id");

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(`http://127.0.0.1:5000/quizz?user_id=${user_id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    const allQuizz = result.quizz;
    console.log(allQuizz)

    for (let i = 0; i < allQuizz.length; i++) {
      const quizzTemplate = `
        <div class="quizz">
        <hr>
          <h2>${allQuizz[i].name}</h2>
          <h2>Nombres de questions : ${allQuizz[i].questions.length}</h2>
          <a href="#" class="btn">Lancer la session</a>
          <button onclick="deleteQuizz(${allQuizz[i].quizz_id})" class"btn">Supprimer le quizz</button>
        </div>
      `;
      const quizzContainer = document.getElementById("quizz-container");
      quizzContainer.insertAdjacentHTML("beforeend", quizzTemplate);
    }

  })
  .catch((error) => console.error(error));


